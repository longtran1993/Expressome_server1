/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 6/2/15 1:03 AM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

module.exports = {


    /**
     * Join group page chat room
     *
     * @param groupId
     * @param userId
     * @param callback
     */
    joinGroupPage: function (groupId, userId, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatRoomServices -> joinGroupPage');

        try {

            var chatRoom = null;
            var roomMember = null;

            // Create new room
            var roomName = "grouppage_" + groupId;
            var chatRoom = {
                type : 'grouppage',
                roomName : roomName,
                recordId : groupId,
                status : 'normal'
            }

            ChatRoomInfo.findOrCreate(chatRoom).exec(function(err, result) {

                if (!err && result && Object.keys(result).length > 0) {

                    // Get chat room
                    var chatRoom = result;

                    // Get socket connect
                    ChatSocketConnect.find({ where: {userId: userId, disconnectedAt : null},
                                        sort: { connectedAt:  1, id: 1 } }).exec(function(err, result){
                        if( !err && result && Object.keys(result).length > 0){
                            for(var i = 0 ; i < result.length ; i++){

                                // Get socket
                                var socketObj = result[i];
                                var socketId = socketObj.id;

                                // Get socket
                                var socket = global.socketsArray[socketObj.socketId];

                                // Check socket
                                if(socket){

                                    roomMember = {
                                        userId : userId,
                                        roomId : chatRoom.id,
                                        deviceId : socketObj.deviceId
                                    }

                                    ChatRoomMember.findOrCreate(roomMember, function(err, result){
                                        if(!err){
                                            roomMember = result;
                                            roomMember.socketId = socketId;
                                            roomMember.status = 'online';
                                            roomMember.joinedAt = new Date();
                                            roomMember.leftAt = null;

                                            sails.sockets.join(socket, roomName);
                                            roomMember.save(function(err){});

                                        } else {
                                            sails.log(err ? err.toString() : 'No result');
                                        }
                                    })
                                }
                            }
                        } else {
                            sails.log(err ? err.toString() : 'No result');
                        }
                    });

                    // Callback with chat room
                    callback(chatRoom);

                } else {
                    sails.log(err ? err.toString() : 'No result');
                    callback(chatRoom);
                }
            })

        } catch(err) {
            sails.log(err ? err.toString() : 'No result');
            callback(chatRoom);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatRoomServices -> joinGroupPage');
    },

    /**
     * Leave group page chat room
     *
     * @param groupId
     * @param userId
     * @param callback
     */
    leaveGroupPage: function (groupId, userId, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatRoomServices -> leaveGroupPage');

        try {

            // Find chat room
            ChatRoomInfo.findOne({type : 'grouppage', recordId : groupId}).exec(function(err, chatRoom){
                callback(chatRoom);
            })

            // Leave all socket
            ChatSocketConnect.find({ where: {userId: userId, disconnectedAt : null},
                                    sort: { connectedAt:  1, id: 1 } }).exec(function(err, result){
                if( !err ) {
                    if (result && Object.keys(result).length > 0) {
                        for(var i = 0 ; i < result.length ; i++) {

                            // Get socket
                            var socketObj = result[i];
                            var socketId = socketObj.id;
                            var roomName = "grouppage_" + groupId;

                            // Get socket
                            var socket = global.socketsArray[socketObj.socketId];

                            // Check socket
                            if (socket) {
                                sails.sockets.leave(socket, roomName);
                                sails.log("Leave socket " + socketId + " from room " + roomName + ". And disconnect it.");
                                socket.disconnect();
                            }
                        }
                    }
                }
            });

            // Destroy room member
            ChatRoomMember.destroy({userId: userId}, function(err){
                sails.log(err ? err.toString() : 'No error');
            });

        } catch(err) {
            sails.log(err ? err.toString() : 'No error');
            callback(null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatRoomServices -> leaveGroupPage');
    },

    /**
     * Join group page chat room
     *
     * @param groupId
     * @param userId
     * @param callback
     */
    joinContestChat: function (socket, contestId, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatRoomServices -> joinContestChat');

        try {

            // Parallel series
            async.parallel(
                [
                    function(callbackFunc){
                        // Find user account
                        ChatSocketConnect.findOne({socketId : socket.id }).exec(function(err, result){
                            callbackFunc(null, result);
                        })
                    },
                    function(callbackFunc){
                        // Find group member
                        ExpContestInfo.findOne({id : contestId }).exec(function(err, result){
                            callbackFunc(null, result);
                        })
                    }
                ],
                function(err, results){

                    // Check error
                    if( !err ) {

                        // Check results
                        if ( results && Object.keys(results).length > 0) {

                            // Get contest info
                            var socketObj = results[0];
                            var contest = results[1];

                            // Check info
                            if( socketObj && contest
                                && Object.keys(socketObj).length > 0 && Object.keys(contest).length > 0 ){

                                // Check contest status
                                if(contest.status == 2){

                                    // Check socket authenticated
                                    if(socketObj.userId){

                                        // Find or create chat room
                                        var chatRoom = {
                                            type : 'contestchat',
                                            recordId : contest.id,
                                            roomName : 'contestchat_' + contest.id
                                        }
                                        ChatRoomInfo.findOrCreate(chatRoom).exec(function(err, result){

                                            if(!err && result && Object.keys(result).length > 0 ){

                                                // get new chat room
                                                chatRoom = result;

                                                // Create room member
                                                var roomMember = {
                                                    userId : socketObj.userId,
                                                    deviceId : socketObj.deviceId,
                                                    roomId : chatRoom.id,
                                                    socketId : socketObj.id
                                                }
                                                ChatRoomMember.findOrCreate(roomMember).exec(function(err, result){

                                                    if(!err && result && Object.keys(result).length > 0 ){

                                                        // Re assign room member
                                                        roomMember = result;

                                                        // Join socket into room
                                                        var roomName = 'contestchat_' + contest.id;
                                                        sails.sockets.join(socket, roomName);

                                                        // Update room member status
                                                        roomMember.status = 'online';
                                                        roomMember.save(function(err){});

                                                        // Create response json object
                                                        var response = {
                                                            status : 'success',
                                                            code: 200,
                                                            message : '',
                                                            data : {
                                                                roomName : roomName
                                                            }
                                                        }

                                                        // Response json with error message
                                                        callback(null, response);


                                                    } else {
                                                        callback(err, result);
                                                    }
                                                })

                                            } else {
                                                callback(err, result);
                                            }
                                        })
                                    } else {

                                        // Create response json object
                                        var response = {
                                            status : 'error',
                                            code: 745,
                                            message : 'This socket has not authenticated.',
                                            data : {}
                                        }

                                        // Response json with error message
                                        callback(null, response);
                                    }
                                } else {

                                    // Create response json object
                                    var response = {
                                        status : 'error',
                                        code: 745,
                                        message : 'This contest is not in round 2.',
                                        data : {}
                                    }

                                    // Response json with error message
                                    callback(null, response);
                                }

                            } else{
                                callback(null, null);
                            }
                        } else{
                            callback(err, null);
                        }
                    } else {
                        callback(err, null);
                    }
                });


        } catch(err) {
            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatRoomServices -> joinContestChat');
    }

};
