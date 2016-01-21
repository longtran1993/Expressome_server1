/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 5/30/15 3:32 PM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

module.exports = {


    /**
     * New socket connect
     *
     * @param socket
     * @param callback
     */
    connect : function (socket, callback) {

        try {

            // Create request information object
            var socketObj = {
                socketId : socket.id,
                connectedAt : new Date()
            }

            // Find or create
            ChatSocketConnect.findOrCreate({socketId : socket.id}).exec(function(err, result){

                if( !err){

                    // Callback function with result
                    sails.log.info("=== New socket connected: ");
                    sails.log.info(result);
                    callback(err, result);

                } else {
                    callback(err, null);
                }

            })

        } catch(err) {

            callback(err, null);
        }
    },


    /**
     * Socket on disconnect
     *
     * @param socket
     * @param callback
     */
    disconnect: function (socket, callback) {

        try {

            // Find socket information
            ChatSocketConnect.find({socketId : socket.id}).exec(function(err, result){

                if( !err){

                    if ( result && Object.keys(result).length > 0){

                        // Get socket object
                        var socketObj = result.pop();

                        if(socketObj.userId){

                            // Update disconnect time
                            socketObj.disconnectedAt = new Date();
                            socketObj.save(function(err, result){
                                sails.log.info("=== Socket disconnected: ");
                                sails.log.info(result);
                                callback(err, result);
                            })

                            // Offline room member
                            ChatRoomMember.find({socketId : socketObj.id}).exec(function(err, result){
                                if(err){
                                    console.log(err.toString());
                                } else {
                                    if(result && Object.keys(result).length > 0){
                                        for(var i=0; i< result.length; i++){
                                            var object= result[i];
                                            object.status = 'offline';
                                            object.leftAt = new Date();
                                            object.updatedAt = object.leftAt;
                                            object.save(function(err){});
                                        }
                                    }
                                }
                            });

                        } else {
                            ChatSocketConnect.destroy({socketId : socket.id}).exec(function(err, result){});
                        }
                    } else {
                        callback(err, result);
                    }

                } else {
                    callback(err, null);
                }

            })

        } catch(err) {

            callback(err, null);
        }
    },

    /**
     * Socket on join
     *
     * @param socket
     * @param authToken
     * @param callback
     */
    join: function (socket, authToken, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatSocketConnectServices -> join');

        try {

            // Find socket information
            ChatSocketConnect.findOne({socketId : socket.id}).exec(function(err, result){

                if( !err && result && Object.keys(result).length > 0){

                        // Update discontect time
                        var socketObj = result;
                        socketObj.updatedAt = new Date();

                        // Find auth token info
                        UserAuthToken.findOne({token : authToken}).exec(function(err, result){

                            if( !err ) {

                                if ( result && Object.keys(result).length > 0) {

                                    // Update discontect time
                                    var authObj = result;
                                    socketObj.disconnectedAt = null;
                                    socketObj.userId = authObj.userId;
                                    socketObj.deviceId = authObj.deviceId;

                                    // Save object
                                    socketObj.save(function(err, result){

                                        if( !err ){

                                            // Find all room
                                            UserAccountInfo.findOne({id : authObj.userId}).exec(function(err, groupMember){

                                                if( !err ){

                                                    if ( groupMember && Object.keys(groupMember).length > 0 && groupMember.group){

                                                        // Get group info
                                                        var groupChatName = "grouppage_" + groupMember.group;

                                                        // Join socket to group
                                                        sails.sockets.join(socket, groupChatName);

                                                        // Chat room & room member
                                                        ChatSocketConnectServices.grouppage(groupChatName,
                                                            groupMember.group, authObj.userId, authObj.deviceId, socketObj.id, callback);

                                                    } else {

                                                        // Create response
                                                        var response = {
                                                            status : 'success',
                                                            message : 'You have authenticated success.',
                                                            data : []
                                                        }

                                                        callback(err, response);
                                                    }

                                                } else {
                                                    callback(err, result);
                                                }
                                            })

                                        } else {
                                            callback(err, result);
                                        }
                                    })

                                } else {

                                    // Create response
                                    var response = {
                                        status : 'error',
                                        code : 732,
                                        message : 'Your token is incorrect.',
                                        data : {}
                                    }

                                    callback(err, response);
                                }

                            } else {
                                callback(err, null);
                            }

                        });

                } else {
                    callback(err, result);
                }
            })
        } catch(err) {

            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatSocketConnectServices -> join');
    },

    /**
     *
     * @param roomName
     * @param groupId
     * @param userId
     * @param deviceId
     * @param socketId
     * @param callback
     */
    grouppage : function(roomName, groupId, userId, deviceId, socketId, callback){

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatSocketConnectServices -> grouppage');

        try {

            // Create new room
            var chatRoom = {
                type : 'grouppage',
                roomName : roomName,
                recordId : groupId,
                status : 'normal'
            }

            // Create chat room info
            ChatRoomInfo.findOrCreate(chatRoom).exec(function(err, result){

                if( !err ){

                    // Get chat info
                    var chatRoomInfo = result;

                    // Create room member
                    var roomMember = {
                        userId : userId,
                        deviceId : deviceId,
                        roomId : chatRoomInfo.id
                    }

                    // Create chat room info
                    ChatRoomMember.findOrCreate(roomMember).exec(function(err, result){

                        if( !err ){

                            // Get chat info
                            roomMember = result;
                            roomMember.status = 'online';
                            roomMember.socketId = socketId;

                            roomMember.save(function(err){

                                // Check error
                                if( !err ){

                                    // Create response
                                    var response = {
                                        status : 'success',
                                        message : 'You have joined success',
                                        data : []
                                    }
                                    callback(null, response);
                                } else {
                                    sails.log(err.toString());
                                    callback(err, result);
                                }
                            })
                        } else {
                            sails.log(err.toString());
                            callback(err, result);
                        }
                    })

                } else {
                    sails.log(err.toString());
                    callback(err, result);
                }
            })
        } catch(err) {
            sails.log(err.toString());
            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatSocketConnectServices -> grouppage');
    }

};
