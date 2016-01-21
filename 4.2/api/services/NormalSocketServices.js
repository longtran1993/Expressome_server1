///*
// *=============================================================================
// *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
// *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
// *==                                                                         ==
// *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
// *=============================================================================
// *
// *== File Name:
// *== Created at: 6/11/15 3:27 AM
// *== Created by: DuongNguyen
// *== Project: 01_ExpressSome
// *
// */
//
//module.exports = {
//
//
//    /**
//     * Handsake for new connect
//     *
//     * @param socketId
//     * @param authToken
//     * @param callback
//     */
//    handshake: function (socketId, authToken, callback) {
//
//        // Log begin function
//        sails.log.info('=== BEGIN SERVICE | NormalSocketServices -> handshake');
//
//        try {
//
//            UserAuthToken.find({token : authToken}).exec(function(err, result){
//
//                if( !err ){
//
//                    if(result && Object.keys(result).length > 0 && result[0]){
//
//                        // Get user info
//                        var authInfo = result[0];
//
//                        // Insert new socket into into database
//                        var socket = {
//                            socketId : socketId,
//                            userId : authInfo.userId,
//                            connectedAt : new Date()
//                        }
//
//                        ChatSocketConnect.create(socket, function(err, result){
//
//                            if( !err ){
//
//                                // Callback with user info
//                                callback(result);
//
//                            } else {
//                                sails.log("Error when try to handsake");
//                                sails.log(err);
//                                callback(null);
//                            }
//                        });
//
//                    } else {
//                        callback(null);
//                    }
//
//                } else {
//                    sails.log("Error when try to handsake");
//                    sails.log(err);
//                    callback(null);
//                }
//            })
//
//        } catch(err) {
//
//            callback(err, null);
//        }
//
//        // Log begin function
//        sails.log.info('=== END SERVICE   | NormalSocketServices -> handshake');
//    },
//
//    /**
//     * Auth to join room when handsake
//     *
//     * @param socket
//     * @param connectId
//     * @param userId
//     */
//    autoJoinRoom: function (socket, connectId, userId) {
//
//        // Log begin function
//        sails.log.info('=== BEGIN SERVICE | NormalSocketServices -> autoJoinRoom');
//
//        try {
//
//            ExpGroupMember.find({userId : userId}).exec(function(err, result){
//
//                if( !err ){
//
//                    if(result && Object.keys(result).length > 0){
//
//                        for(var i=0; i < result.length; i++){
//
//                            // Get chat room name
//                            var groupMember = result[0];
//                            var roomName = "grouppage_" + groupMember.groupId;
//
//                            // Find chat room info
//                            ChatRoomInfo.find({roomName : roomName}).exec(function(err, result){
//
//                                if(!err){
//
//                                    if(result && Object.keys(result).length > 0){
//
//                                        // Get room info
//                                        var chatRoom = result[0];
//
//                                        // Create room member
//                                        var member = {
//                                                roomId : chatRoom.id,
//                                                socketId : connectId,
//                                                userId : userId,
//                                                status : 'online'
//                                            }
//
//                                        // Save to database
//                                        ChatRoomMember.create(member, function(err, result){
//
//                                            if(!err){
//                                                socket.join(roomName);
//                                            } else {
//                                                sails.log("Error when try to autoJoinRoom");
//                                                sails.log(err);
//                                            }
//                                        })
//
//                                    } else {
//
//                                        // Create chat room
//                                        var chatRoom = {
//                                            roomName : roomName,
//                                            type : 'grouppage',
//                                            recordId : groupMember.groupId,
//                                            totalMember : 0,
//                                            status : 'online'
//                                        }
//
//                                        // Save to database
//                                        ChatRoomInfo.create(chatRoom, function(err, result){
//
//                                            if(!err){
//
//                                                // Create room member
//                                                chatRoom = result;
//                                                var member = {
//                                                    roomId : chatRoom.id,
//                                                    socketId : connectId,
//                                                    userId : userId,
//                                                    status : 'online'
//                                                }
//
//                                                // Save to database
//                                                ChatRoomMember.create(member, function(err, result){
//
//                                                    if(!err){
//                                                        socket.join(roomName);
//                                                    } else {
//                                                        sails.log("Error when try to autoJoinRoom");
//                                                        sails.log(err);
//                                                    }
//                                                })
//
//                                            } else {
//                                                sails.log("Error when try to autoJoinRoom");
//                                                sails.log(err);
//                                            }
//                                        })
//                                    }
//
//                                } else {
//                                    sails.log("Error when try to autoJoinRoom");
//                                    sails.log(err);
//                                }
//                            })
//                        }
//
//                    } else {
//                    }
//
//                } else {
//                    sails.log("Error when try to autoJoinRoom");
//                    sails.log(err);
//                }
//            })
//
//        } catch(err) {
//            sails.log("Error when try to autoJoinRoom");
//            sails.log(err);
//        }
//
//        // Log begin function
//        sails.log.info('=== END SERVICE   | NormalSocketServices -> autoJoinRoom');
//    },
//
//    /**
//     * Auth to join room when handsake
//     *
//     * @param socket
//     * @param connectId
//     * @param userId
//     */
//    newMessage: function (type, data, userId) {
//
//        // Log begin function
//        sails.log.info('=== BEGIN SERVICE | NormalSocketServices -> newMessage');
//
//        try {
//
//
//            // Parallel series
//            async.parallel(
//                [
//                    function(callbackFunc){
//                        // Find user account
//                        UserAccountInfo.find({id : userId }).exec(function(err, result){
//                            callbackFunc(null, result);
//                        })
//                    },
//                    function(callbackFunc){
//                        // Find group info
//                        ChatRoomInfo.find({roomName : 'grouppage_' + data.groupId }).exec(function(err, result){
//                            callbackFunc(null, result);
//                        })
//                    },
//                ],
//                function(err, results){
//
//                    // Check error
//                    if( !err ) {
//
//                        // Check result
//                        if( results && Object.keys(results).length > 0){
//
//                            // Get data
//                            var userInfo = results[0][0];
//                            var roomInfo = results[1][0];
//
//                            // Create data
//                            var messageData = {
//                                user : {
//                                    id : userInfo.id,
//                                    username : userInfo.username,
//                                    image: userInfo.image },
//                                room : {
//                                    roomName : roomInfo.roomName,
//                                    type : roomInfo.type,
//                                    recordId : roomInfo.recordId },
//                                message : data.message,
//                                sent : new Date()
//                            }
//
//                            console.log('Send message to room ' + roomInfo.roomName);
//                            console.log(messageData);
//                            global.MyIO.sockets.to(roomInfo.roomName).emit('message', messageData);
//
//                        }
//                    } else {
//                        sails.log("Error when try to newMessage");
//                        sails.log(err);
//                    }
//
//                });
//
//        } catch(err) {
//            sails.log("Error when try to newMessage");
//            sails.log(err);
//        }
//
//        // Log begin function
//        sails.log.info('=== END SERVICE   | NormalSocketServices -> newMessage');
//    }
//
//};
