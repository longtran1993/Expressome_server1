/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 5/31/15 11:08 PM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

module.exports = {

    /**
     * Socket on disconnect
     *
     * @param socket
     * @param callback
     */
    groupPageMessage: function (socket, message, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatMessageServices -> groupPageMessage');

        try {

            // Find socket information
            ChatSocketConnect.findOne({socketId : socket.id}).exec(function(err, result){

                if( !err ){

                    if ( result && Object.keys(result).length > 0) {

                        // Get socket object
                        var socketObj = result;

                        if ( socketObj.userId && socketObj.userId != 0){

                            ChatRoomMember.findOne({userId : socketObj.userId, socketId: socketObj.id })
                                                                                .exec(function(err, result){
                                if( !err ) {

                                    if ( result && Object.keys(result).length > 0) {

                                        // Get room member info
                                        var roomMember = result;

                                        ChatRoomInfo.findOne({id : roomMember.roomId}).exec(function(err, result){

                                            if( !err ) {

                                                // Get room info
                                                var roomInfo = result;

                                                // Parallel series
                                                async.parallel(
                                                    [
                                                        function(callbackFunc){
                                                            // Find group info
                                                            UserAccountInfo.findOne({id : roomMember.userId}).exec(function(err, result){
                                                                callbackFunc(null, result);
                                                            })
                                                        },
                                                        function(callbackFunc){
                                                            // Find group member
                                                            ExpGroupInfo.findOne({id : roomInfo.recordId }).exec(function(err, result){
                                                                callbackFunc(null, result);
                                                            })
                                                        }
                                                    ],
                                                    function(err, results) {

                                                        // Check error
                                                        if (!err) {

                                                            // Check results
                                                            if (results && Object.keys(results).length > 0
                                                                    && results[0] && Object.keys(results[0]).length > 0
                                                                        && results[1] && Object.keys(results[1]).length > 0) {

                                                                // Get info
                                                                var userInfo = results[0];
                                                                var groupInfo = results[1];

                                                                // Create message data
                                                                var messageData = {
                                                                    user : {
                                                                        id : userInfo.id,
                                                                        username : userInfo.username,
                                                                        image : userInfo.image,
                                                                        groupName : groupInfo.name,
                                                                        groupImage : groupInfo.image
                                                                    },
                                                                    room : {
                                                                        roomName : roomInfo.roomName,
                                                                        type : roomInfo.type,
                                                                        recordId : roomInfo.recordId,
                                                                        displayName : groupInfo.name,
                                                                        displayImage : groupInfo.image
                                                                    },
                                                                    type : 'chat_message',
                                                                    message : message,
                                                                    data : {},
                                                                    sentAt : new Date()
                                                                }

                                                                // Create chat message
                                                                var chatMessage = {
                                                                    roomId : roomInfo.id,
                                                                    userId : roomMember.userId,
                                                                    memberId : roomMember.id,
                                                                    type : 'chat_message',
                                                                    message : message,
                                                                    data : JSON.stringify(messageData),
                                                                    sentAt : new Date()
                                                                }

                                                                // Create chat message
                                                                ChatMessageInfo.create(chatMessage, function(err, result){

                                                                    if( !err ){


                                                                        // Push message data
                                                                        messageData.id = result.id;

                                                                        // Send message
                                                                        sails.sockets.broadcast(roomInfo.roomName, "message", messageData);

                                                                        //// Send notify
                                                                        var notifyMessage = groupInfo.name + ' | ' + userInfo.username + ': ' + message;
                                                                        NotificationServices.sendGroupChatMessage(groupInfo.id, notifyMessage, messageData, function(err, result){});

                                                                        // Error not in room
                                                                        var response = {
                                                                            status : "success",
                                                                            message : "Your message is sent.",
                                                                            data : messageData
                                                                        }

                                                                        callback(null, response);

                                                                    } else {
                                                                        callback(err, result);
                                                                    }
                                                                })

                                                            } else {

                                                                // Error not in room
                                                                var response = {
                                                                    status : "error",
                                                                    code : 000,
                                                                    message: "Not found user info or group info."
                                                                }

                                                                callback(null, response);

                                                            }
                                                        } else {
                                                            callback(err, results);
                                                        }
                                                    })

                                            } else {
                                                callback(err, null);
                                            }
                                        })
                                    } else {

                                        // Error not in room
                                        var response = {
                                            status : "error",
                                            code : 000,
                                            message: "Your socket is not in nay chat room."
                                        }

                                        callback(null, response);
                                    }

                                } else {
                                    callback(err, null);
                                }
                            })
                        } else {
                            // Error not authenticate
                            var response = {
                                status : "error",
                                code : 000,
                                message: "Your socket is not authenticated."
                            }

                            callback(null, response);
                        }
                    } else {
                        // Error not authenticate
                        var response = {
                            status : "error",
                            code : 000,
                            message: "Your socket is not authenticated."
                        }

                        callback(null, response);
                    }
                } else {
                    callback(err, null);
                }

            })

        } catch(err) {

            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatMessageServices -> groupPageMessage');
    },

    /**
     * Socket on disconnect
     *
     * @param socket
     * @param callback
     */
    contestChatMessage: function (socket, contestId, message, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatMessageServices -> contestChatMessage');

        try {

            // Find socket information
            ChatSocketConnect.find({socketId : socket.id}).exec(function(err, result){

                if( !err && result && Object.keys(result).length > 0){

                    // Get socket object
                    var socketObj = result.pop();

                    if ( socketObj.userId && socketObj.userId != 0){

                        ChatRoomInfo.findOne({roomName : 'contestchat_' + contestId}).exec(function(err, result){

                            if( !err && result && Object.keys(result).length > 0) {

                                // Get room info
                                var roomInfo = result;

                                ChatRoomMember.find({roomId : roomInfo.id, userId : socketObj.userId, socketId: socketObj.id }).exec(function(err, result){
                                    if( !err ) {

                                        if ( result && Object.keys(result).length > 0 ) {

                                            // Get room member info
                                            var roomMember = result.pop();

                                            // Parallel series
                                            async.parallel(
                                                [
                                                    function(callbackFunc){
                                                        // Find group info
                                                        UserAccountInfo.findOne({id : roomMember.userId}).exec(function(err, result){
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
                                                function(err, results) {

                                                    // Check error
                                                    if (!err) {

                                                        // Check results
                                                        if (results && Object.keys(results).length > 0
                                                            && results[0] && Object.keys(results[0]).length > 0
                                                            && results[1] && Object.keys(results[1]).length > 0) {

                                                            // Get info
                                                            var userInfo = results[0];
                                                            var contestInfo = results[1];

                                                            ExpGroupInfo.findOne({id : userInfo.group}).exec(function(err, result){
                                                                if(!err && result && Object.keys(result).length > 0){

                                                                    // get group info
                                                                    var groupInfo = result;

                                                                    // Create message data
                                                                    var messageData = {
                                                                        id : result.id,
                                                                        user : {
                                                                            id : userInfo.id,
                                                                            username : userInfo.username,
                                                                            image : userInfo.image,
                                                                            groupName : groupInfo.name,
                                                                            groupImage : groupInfo.image
                                                                        },
                                                                        room : {
                                                                            roomName : roomInfo.roomName,
                                                                            type : roomInfo.type,
                                                                            recordId : roomInfo.recordId,
                                                                            displayName : contestInfo.name,
                                                                            displayImage : contestInfo.image
                                                                        },
                                                                        type : 'chat_message',
                                                                        message : message,
                                                                        data : {},
                                                                        sentAt : new Date()
                                                                    }

                                                                    // Create chat message
                                                                    var chatMessage = {
                                                                        roomId : roomInfo.id,
                                                                        userId : roomMember.userId,
                                                                        memberId : roomMember.id,
                                                                        type : 'chat_message',
                                                                        message : message,
                                                                        data : JSON.stringify(messageData),
                                                                        sentAt : new Date()
                                                                    }


                                                                    // Create chat message
                                                                    ChatMessageInfo.create(chatMessage, function(err, result){

                                                                        if( !err && Object.keys(result).length > 0){

                                                                            // Push message id
                                                                            messageData.id = result.id;

                                                                            // Send message
                                                                            sails.sockets.broadcast(roomInfo.roomName, "message", messageData);

                                                                            // Error not in room
                                                                            var response = {
                                                                                status : "success",
                                                                                message : "Your message is sent.",
                                                                                data : messageData
                                                                            }

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
                                                            callback(err, results);
                                                        }
                                                    } else {
                                                        callback(err, results);
                                                    }
                                                })

                                        } else {

                                            // Error not in room
                                            var response = {
                                                status : "error",
                                                code : 000,
                                                message: "Your socket is not in nay chat room."
                                            }

                                            callback(null, response);
                                        }

                                    } else {
                                        callback(err, null);
                                    }
                                })
                            } else {
                                callback(err, null);
                            }
                        })
                    } else {
                        // Error not authenticate
                        var response = {
                            status : "error",
                            code : 000,
                            message: "Your socket is not authenticated."
                        }

                        callback(null, response);
                    }
                } else {
                    callback(err, null);
                }

            })

        } catch(err) {

            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatMessageServices -> contestChatMessage');
    },

    /**
     * Get group page miss message
     * @param groupId
     * @param limit
     * @param page
     * @param callback
     */
    groupPageAllMessage: function (groupId, limit, page, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatMessageServices -> groupPageAllMessage');

        try {

            if( groupId && limit){

                // Find user account
                ChatRoomInfo.findOne({type : 'grouppage', recordId : groupId }).exec(function(err, chatRoom){
                    if(!err && chatRoom && Object.keys(chatRoom).length > 0){

                        // Get list data with paginate
                        DataCommonServices.paginate(ChatMessageInfo,
                            { where: {roomId : chatRoom.id, sentAt :{'>=' : new Date(limit)}}, sort : {sentAt: 0} }, page, 30, function(err, result){

                            if(!err){

                                if(result && Object.keys(result).length  > 0 && result.list && result.list.length > 0){

                                    // Get list message
                                    var data = result;
                                    var listMessage = data.list;
                                    var listNewMessage = [];
                                    var userIdArray = [];
                                    data.list = listNewMessage;
                                    for(var i = 0; i < listMessage.length; i++){
                                        var message = JSON.parse(listMessage[i].data);
                                        message.id = listMessage[i].id;
                                        listNewMessage[i] = message;
                                        userIdArray[i] = message.user.id;
                                    }

                                    // Find user info
                                    UserAccountInfo.find({id : userIdArray}).exec(function(err, userArray){
                                        if(!err && userArray && Object.keys(userArray).length > 0){

                                            for(var i = 0; i < listNewMessage.length; i++){
                                                for(var j = 0; j < userArray.length; j++){
                                                    if(listNewMessage[i].user.id == userArray[j].id){
                                                        listNewMessage[i].user.image = userArray[j].image;
                                                    }
                                                }
                                            }

                                            // Create response json object
                                            var response = {
                                                status : 'success',
                                                code: 200,
                                                message : '',
                                                data : data
                                            }

                                            // Response json with error message
                                            callback(null, response);

                                        } else {
                                            callback(err, null);
                                        }
                                    })

                                } else {
                                    // Create response json object
                                    var response = {
                                        status : 'success',
                                        code: 200,
                                        message : '',
                                        data : result
                                    }

                                    // Response json with error message
                                    callback(null, response);
                                }

                            } else {
                                callback(err, result);
                            }
                        });

                    } else {
                        callback(err, null);
                    }
                })
            } else {

                // Create response json object
                var response = {
                    status : 'error',
                    code: 719,
                    message : 'You have not joined any group yet.',
                    data : {}
                }
                callback(null, response);
            }

        } catch(err) {
            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatMessageServices -> groupPageAllMessage');
    },

    /**
     *
     * @param contestId
     * @param page
     * @param callback
     */
    contestChatAllMessage: function (contestId, userId, page, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatMessageServices -> contestChatAllMessage');

        try {

            // Find user account
            ChatRoomInfo.findOne({type : 'contestchat', recordId : contestId }).exec(function(err, chatRoom){
                if(!err && chatRoom && Object.keys(chatRoom).length > 0){

                    // Find room member
                    ChatRoomMember.findOne({userId : userId, roomId : chatRoom.id}).exec(function(err, member){
                        if(!err && member && Object.keys(member).length > 0){

                            // Get list data with paginate
                            DataCommonServices.paginate(ChatMessageInfo,
                                { where: {roomId : chatRoom.id, sentAt :{'>=' : new Date(member.joinedAt)}}, sort : {sentAt: 0} }, page, 30, function(err, result){

                                    if(!err){

                                        if(result && Object.keys(result).length  > 0 && result.list && result.list.length > 0){

                                            // Get list message
                                            var data = result;
                                            var listMessage = data.list;
                                            var listNewMessage = [];
                                            var userIdArray = [];
                                            data.list = listNewMessage;
                                            for(var i = 0; i < listMessage.length; i++){
                                                var message = JSON.parse(listMessage[i].data);
                                                message.id = listMessage[i].id;
                                                listNewMessage[i] = message;
                                                userIdArray[i] = message.user.id;
                                            }

                                            // Find user info
                                            UserAccountInfo.find({id : userIdArray}).exec(function(err, userArray){
                                                if(!err && userArray && Object.keys(userArray).length > 0){

                                                    for(var i = 0; i < listNewMessage.length; i++){
                                                        for(var j = 0; j < userArray.length; j++){
                                                            if(listNewMessage[i].user.id == userArray[j].id){
                                                                listNewMessage[i].user.image = userArray[j].image;
                                                            }
                                                        }
                                                    }

                                                    // Create response json object
                                                    var response = {
                                                        status : 'success',
                                                        code: 200,
                                                        message : '',
                                                        data : data
                                                    }

                                                    // Response json with error message
                                                    callback(null, response);

                                                } else {
                                                    callback(err, null);
                                                }
                                            })

                                        } else {
                                            // Create response json object
                                            var response = {
                                                status : 'success',
                                                code: 200,
                                                message : '',
                                                data : result
                                            }

                                            // Response json with error message
                                            callback(null, response);
                                        }

                                    } else {
                                        callback(err, result);
                                    }
                                });
                        } else{
                            callback(err, null);
                        }
                    })
                } else{
                    callback(err, null);
                }
            })
        } catch(err) {
            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatMessageServices -> contestChatAllMessage');
    }
};
