/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 6/2/15 12:49 AM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

module.exports = {

    /**
     *
     * @param eventName
     * @param data
     * @param callback
     */
    newEvent: function (eventName, data, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatEventServices -> newEvent');

        try {

            switch (eventName){

                case 'create_group' :
                    ChatEventServices.createGroup(data, function(err, result){
                        callback(err, result);
                    });
                    break;

                case 'join_group' :
                    ChatEventServices.joinGroup(data, function(err, result){
                        callback(err, result);
                    });
                    break;

                case 'leave_group' :
                    ChatEventServices.leaveGroup(data, function(err, result){
                        callback(err, result);
                    });
                    break;

                case 'invite_join_contest' :
                    ChatEventServices.inviteContest(data, function(err, result){
                        callback(err, result);
                    });
                    break;

                case 'join_contest' :
                    ChatEventServices.joinContest(data, function(err, result){
                        callback(err, result);
                    });
                    break;

                case 'vote_image' :
                    ChatEventServices.voteImage(data, function(err, result){
                        callback(err, result);
                    });
                    break;

                case 'contest_start_round1' :
                    ChatEventServices.contestStartRound1(data, function(err, result){
                        callback(err, result);
                    });
                    break;

                case 'contest_start_round2' :
                    ChatEventServices.contestStartRound2(data, function(err, result){
                        callback(err, result);
                    });
                    break;

                case 'contest_has_finished' :
                    ChatEventServices.contestWinner(data, function(err, result){
                        callback(err, result);
                    });
                    ChatEventServices.contestHasFinished(data, function(err, result){
                        callback(err, result);
                    });
                    break;
            }

        } catch(err) {

            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatEventServices -> newEvent');
    },

    /**
     *
     * @param data
     * @param callback
     */
    createGroup : function(data, callback){

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatEventServices -> createGroup');

        try {

            ChatRoomServices.joinGroupPage(data.groupId, data.userId, function(chatRoom){
                if(chatRoom && Object.keys(chatRoom).length > 0){

                    // Create message data
                    var messageData = {
                        user : {
                            id : data.userId,
                            username : data.username,
                            image : data.userImage,
                            groupName : data.groupName,
                            groupImage : data.groupImage
                        },
                        room : {
                            roomName : chatRoom.roomName,
                            type : chatRoom.type,
                            recordId : chatRoom.recordId,
                            displayName : data.groupName,
                            displayImage : data.groupImage
                        },
                        type : 'join_group',
                        message : 'Congratulations on your new group! Competing is better together. Share your group name with your friends so that they can join you in the competition.',
                        data : data,
                        sentAt : new Date()
                    }

                    // Create new message object
                    var chatMessage = {
                        roomId : chatRoom.id,
                        userId : data.userId,
                        type : 'join_group',
                        message : 'Congratulations on your new group! Competing is better together. Share your group name with your friends so that they can join you in the competition.',
                        data : JSON.stringify(messageData),
                        sentAt : new Date()
                    }

                    // Create chat message
                    ChatMessageInfo.create(chatMessage, function(err, messageInfo){

                        if( !err && messageInfo && Object.keys(messageInfo).length > 0){


                            // Push message id
                            messageData.id = messageInfo.id;

                            // Send message
                            sails.sockets.broadcast(chatRoom.roomName, "message", messageData);

                            // Push notify
                            console.log("Push message join_group to group:" + messageData.room.recordId);
                            NotificationServices.pushNotificationToGroup(messageData.room.recordId, messageData);

                            // Error not in room
                            var response = {
                                status : "success",
                                message : "Your message is sent.",
                                data : messageData
                            }

                            callback(null, response);

                        } else {
                            callback(err, null);
                        }
                    })

                }
            })
        } catch(err) {
            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatEventServices -> createGroup');
    },

    /**
     *
     * @param data
     * @param callback
     */
    joinGroup : function(data, callback){

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatEventServices -> joinGroup');

        try {

            ChatRoomServices.joinGroupPage(data.groupId, data.userId, function(chatRoom){
                if(chatRoom && Object.keys(chatRoom).length > 0){

                    // Create message data
                    var messageData = {
                        user : {
                            id : data.userId,
                            username : data.username,
                            image : data.userImage,
                            groupName : data.groupName,
                            groupImage : data.groupImage
                        },
                        room : {
                            roomName : chatRoom.roomName,
                            type : chatRoom.type,
                            recordId : chatRoom.recordId,
                            displayName : data.groupName,
                            displayImage : data.groupImage
                        },
                        type : 'join_group',
                        message : 'Has joined your group.',
                        data : data,
                        sentAt : new Date()
                    }

                    // Create new message object
                    var chatMessage = {
                        roomId : chatRoom.id,
                        userId : data.userId,
                        type : 'join_group',
                        message : 'Has joined your group.',
                        data : JSON.stringify(messageData),
                        sentAt : new Date()
                    }

                    // Create chat message
                    ChatMessageInfo.create(chatMessage, function(err, messageInfo){

                        if( !err && messageInfo && Object.keys(messageInfo).length > 0){


                            // Push message id
                            messageData.id = messageInfo.id;

                            // Send message
                            sails.sockets.broadcast(chatRoom.roomName, "message", messageData);

                            // Change message for notification
                            messageData.message = messageData.user.username + ' has joined your group.';

                            // Push notify
                            console.log("Push message join_group to group:" + messageData.room.recordId);
                            NotificationServices.pushNotificationToGroup(messageData.room.recordId, messageData);

                            // Error not in room
                            var response = {
                                status : "success",
                                message : "Your message is sent.",
                                data : messageData
                            }

                            callback(null, response);

                        } else {
                            callback(err, null);
                        }
                    })

                }
            })
        } catch(err) {
            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatEventServices -> joinGroup');
    },

    /**
     *
     * @param data
     * @param callback
     */
    leaveGroup : function(data, callback){

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatEventServices -> leaveGroup');

        try {

            // Down vote
            ExpContestPlayerServices.downPlayerVote(data.userId, function(err, result){
                if(!err){
                    // Delete player && vote
                    ExpContestPlayerServices.deletePlayerAndUserVoted(data.userId);
                } else {
                    callback(err, null);
                }
            })

            // Leave from chat room
            ChatRoomServices.leaveGroupPage(data.groupId, data.userId, function(chatRoom){
                if(chatRoom && Object.keys(chatRoom).length > 0){

                } else {
                    callback(err, null);
                }
            })
        } catch(err) {
            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatEventServices -> leaveGroup');
    },

    /**
     *
     * @param data
     * @param callback
     */
    inviteContest : function(data, callback){

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatEventServices -> inviteContest');

        try {

            // Find user group
            ExpGroupInfo.findOne({id : data.userGroup}).exec(function(err, userGroup){
                if(!err && userGroup && Object.keys(userGroup).length > 0){
                    ChatRoomInfo.findOne({type : 'grouppage', recordId : data.groupId}).exec(function(err, chatRoom){
                        if(!err && chatRoom && Object.keys(chatRoom).length > 0){

                            // Create message data
                            var messageData = {
                                user : {
                                    id : data.userId,
                                    username : data.username,
                                    image : data.userImage,
                                    groupName : userGroup.name,
                                    groupImage : userGroup.image
                                },
                                room : {
                                    roomName : chatRoom.roomName,
                                    type : chatRoom.type,
                                    recordId : chatRoom.recordId
                                },
                                type : 'invite_join_contest',
                                message : 'Invited your Group to the contest ' + data.contestName + '.',
                                data : data,
                                sentAt : new Date()
                            }

                            // Create new message object
                            var chatMessage = {
                                roomId : chatRoom.id,
                                userId : data.userId,
                                type : 'invite_join_contest',
                                message : 'Invited your Group to the contest ' + data.contestName + '.',
                                data : JSON.stringify(messageData),
                                sentAt : new Date()
                            }

                            // Create chat message
                            ChatMessageInfo.create(chatMessage, function(err, messageInfo){

                                if( !err && messageInfo && Object.keys(messageInfo).length > 0){

                                    // Push message id
                                    messageData.id = messageInfo.id;

                                    // Send message
                                    sails.sockets.broadcast(chatRoom.roomName, "message", messageData);

                                    // Change message for notification
                                    messageData.message = messageData.user.username
                                        + ' invited your Group to the contest ' + messageData.data.contestName + '.';

                                    // Push notify
                                    console.log("Push message invite_join_contest to group:" + messageData.room.recordId);
                                    NotificationServices.pushNotificationToGroup(messageData.room.recordId, messageData);

                                    // Error not in room
                                    var response = {
                                        status : "success",
                                        message : "Your message is sent.",
                                        data : messageData
                                    }

                                    callback(null, response);

                                } else {
                                    callback(err, null);
                                }
                            })

                        }
                    })
                } else {
                    callback(err, null);
                }

            })
        } catch(err) {
            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatEventServices -> inviteContest');
    },

    /**
     *
     * @param data
     * @param callback
     */
    joinContest : function(data, callback){

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatEventServices -> joinContest');

        try {

            ExpGroupInfo.findOne({id : data.groupId}).exec(function(err, groupInfo) {
                if (!err && groupInfo && Object.keys(groupInfo).length > 0) {

                    ChatRoomInfo.findOne({type : 'grouppage', recordId : groupInfo.id}).exec(function(err, chatRoom){
                        if(!err && chatRoom && Object.keys(chatRoom).length > 0){

                            // Create message data
                            var messageData = {
                                user : {
                                    id : data.userId,
                                    username : data.username,
                                    image : data.userImage,
                                    groupName : groupInfo.name,
                                    groupImage : groupInfo.image
                                },
                                room : {
                                    roomName : chatRoom.roomName,
                                    type : chatRoom.type,
                                    recordId : chatRoom.recordId
                                },
                                type : 'join_contest',
                                message : 'Has joined the contest ' + data.contestName + '.',
                                data : data,
                                sentAt : new Date()
                            }

                            // Create new message object
                            var chatMessage = {
                                roomId : chatRoom.id,
                                userId : data.userId,
                                type : 'join_contest',
                                message : 'Has joined the contest ' + data.contestName + '.',
                                data : JSON.stringify(messageData),
                                sentAt : new Date()
                            }

                            // Create chat message
                            ChatMessageInfo.create(chatMessage, function(err, messageInfo){

                                if( !err && messageInfo && Object.keys(messageInfo).length > 0){

                                    // Push message id
                                    messageData.id = messageInfo.id;

                                    // Send message
                                    sails.sockets.broadcast(chatRoom.roomName, "message", messageData);

                                    // Change message for notification
                                    messageData.message = messageData.user.username
                                            +' has joined the contest ' + messageData.data.contestName + '.';

                                    // Push notify
                                    console.log("Push message join_contest to group:" + messageData.room.recordId);
                                    NotificationServices.pushNotificationToGroup(messageData.room.recordId, messageData);

                                    // Error not in room
                                    var response = {
                                        status : "success",
                                        message : "Your message is sent.",
                                        data : messageData
                                    }

                                    callback(null, response);

                                } else {
                                    callback(err, null);
                                }
                            })
                        }
                    })
                } else {
                    callback(err, null);
                }
            });
        } catch(err) {
            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatEventServices -> joinContest');
    },

    /**
     *
     * @param data
     * @param callback
     */
    voteImage : function(data, callback){

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatEventServices -> voteImage');

        try {

            // Parallel series
            async.parallel(
                [
                    function(callbackFunc){
                        // Find contest info to get contest name
                        ExpContestInfo.findOne({id : data.contestId}).exec(function(err, result){
                            callbackFunc(null, result);
                        })
                    },
                    function(callbackFunc){
                        // Find all player of contest to find all group need to notification
                        ExpContestPlayer.find({contestId : data.contestId}).exec(function(err, result){
                            callbackFunc(null, result);
                        })
                    },
                    function(callbackFunc){
                        // Voted use info
                        UserAccountInfo.findOne({id : data.votedBy }).exec(function(err, result){
                            callbackFunc(null, result);
                        })

                    },
                    function(callbackFunc){
                        // Image owner info
                        UserAccountInfo.findOne({id : data.userId}).exec(function(err, result){
                            callbackFunc(null, result);
                        })
                    }
                ],
                function(err, results){
                    if (!err && results && Object.keys(results).length > 0 && results.length > 0) {

                        console.log(results);

                        // Get info
                        var contest = results[0];
                        var players = results[1];
                        var player = results[2];
                        var voter = results[3];

                        // Get group of voter
                        ExpGroupInfo.findOne({id : voter.group}).exec(function(err, groupInfo){
                            if (!err && groupInfo && Object.keys(groupInfo).length > 0) {

                                // Create message data
                                var messageData = {
                                    user : {
                                        id : voter.userId,
                                        username : voter.username,
                                        image : voter.userImage,
                                        groupName : groupInfo.name,
                                        groupImage : groupInfo.image
                                    },
                                    room : {
                                        roomName : 'grouppage_' + groupInfo.id,
                                        type : 'grouppage',
                                        recordId : groupInfo.id
                                    },
                                    type : 'vote_image',
                                    message : player.username + ' voted for '+voter.username+'\'s photo in the contest ' + contest.name + '.',
                                    data : data,
                                    sentAt : new Date()
                                }

                                console.log(messageData);

                                // Push notification
                                var sentGroupId = "";
                                for(var i=0; i< players.length; i++){
                                    if (sentGroupId.indexOf(players[i].groupId + '|') < 0) {

                                        // Change room info
                                        messageData.room.roomName = 'grouppage_' + players[i].groupId;
                                        messageData.room.recordId = players[i].groupId;

                                        // Push notify
                                        console.log("Push message vote_image to group:" + players[i].groupId);
                                        NotificationServices.pushNotificationToGroup(players[i].groupId, messageData);

                                        // Mark as sent
                                        sentGroupId += players[i].groupId + '|';
                                    }
                                }

                            } else {
                                sails.log.info(err ? err : '');
                            }
                        })
                    } else {
                        sails.log.info(err ? err : '');
                    }
                })
        } catch(err) {
            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatEventServices -> voteImage');
    },

    /**
     *
     * @param data
     * @param callback
     */
    contestStartRound1 : function(data, callback){

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatEventServices -> contestStartRound1');

        try {

            // Find all contest player
            ExpContestPlayer.find({contestId : data.contestId}).exec(function(err, result){
                if(!err && result && Object.keys(result).length > 0){

                    // Get result
                    var contestPlayers = result;

                    UserAccountInfo.findOne({id : data.contestOwner}).exec(function(err, userInfo) {
                        if (!err && userInfo && Object.keys(userInfo).length > 0) {

                            // Get user id array
                            var strGroupId = "";
                            for(var i=0; i< contestPlayers.length; i++){
                                if(strGroupId.indexOf(contestPlayers[i].groupId + "|") < 0){

                                    // Get group id
                                    var groupId = contestPlayers[i].groupId;
                                    strGroupId = strGroupId + groupId + "|";

                                    ChatRoomInfo.findOne({type : 'grouppage', recordId : groupId}).exec(function(err, result){
                                        if(!err && result && Object.keys(result).length > 0){

                                            // Get result
                                            var chatRoom = result;

                                            // Create message data
                                            var messageData = {
                                                user : {
                                                    id : userInfo.id,
                                                    username : userInfo.username,
                                                    image : userInfo.image,
                                                    groupName : data.groupName,
                                                    groupImage : data.groupImage
                                                },
                                                room : {
                                                    roomName : chatRoom.roomName,
                                                    type : chatRoom.type,
                                                    recordId : chatRoom.recordId
                                                },
                                                type : 'contest_start_round1',
                                                message : 'Time to vote! Round 1 of ' + data.contestName + ' has begun.',
                                                data : data,
                                                sentAt : new Date()
                                            }

                                            // Create new message object
                                            var chatMessage = {
                                                roomId : chatRoom.id,
                                                userId : userInfo.userId,
                                                type : 'contest_start_round1',
                                                message : 'Time to vote! Round 1 of ' + data.contestName + ' has begun.',
                                                data : JSON.stringify(messageData),
                                                sentAt : new Date()
                                            }

                                            // Create chat message
                                            ChatMessageInfo.create(chatMessage, function(err, messageInfo){

                                                if( !err && messageInfo && Object.keys(messageInfo).length > 0){

                                                    // Push message id
                                                    messageData.id = messageInfo.id,

                                                    // Send message
                                                    sails.sockets.broadcast(chatRoom.roomName, "message", messageData);

                                                    // Push notify
                                                    console.log("Push message contest_start_round1 to group:" + messageData.room.recordId);
                                                    NotificationServices.pushNotificationToGroup(messageData.room.recordId, messageData);

                                                    // Error not in room
                                                    var response = {
                                                        status : "success",
                                                        message : "Your message is sent.",
                                                        data : messageData
                                                    }

                                                    callback(null, response);

                                                } else {
                                                    callback(err, null);
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        } else{
                            callback(err, null);
                        }
                    })
                } else {
                    callback(err, null);
                }
            });
        } catch(err) {
            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatEventServices -> contestStartRound1');
    },

    /**
     *
     * @param data
     * @param callback
     */
    contestStartRound2 : function(data, callback){

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatEventServices -> contestStartRound2');

        try {

            // Find all contest player
            ExpContestPlayer.find({contestId : data.contestId}).exec(function(err, contestPlayers){
                if(!err && contestPlayers && Object.keys(contestPlayers).length > 0){

                    for(var i=0; i< contestPlayers.length; i++){

                        // Get player
                        var player = contestPlayers[i];

                        UserAccountInfo.findOne({id : contestPlayers[i].userId}).exec(function(err, userInfo) {
                            if (!err && userInfo && Object.keys(userInfo).length > 0) {

                                ExpGroupInfo.findOne({id : userInfo.group}).exec(function(err, groupInfo) {
                                    if (!err && groupInfo && Object.keys(groupInfo).length > 0) {

                                        ChatRoomInfo.findOne({type : 'grouppage', recordId : groupInfo.id}).exec(function(err, chatRoom){
                                            if(!err && chatRoom && Object.keys(chatRoom).length > 0){

                                                // Push player id && player status
                                                var tempPlayer = player;
                                                for(var j=0; j< contestPlayers.length; j++){
                                                    if(contestPlayers[j].userId == userInfo.id){
                                                        tempPlayer = contestPlayers[j];
                                                        break;
                                                    }
                                                }
                                                data.playerId = tempPlayer.id;
                                                data.playerStatus = tempPlayer.status;
                                                var message = tempPlayer.status == 2 ?
                                                    "Has advanced to the next round of " + data.contestName
                                                                    : "Was eliminated from " + data.contestName + " in round 1";
                                                var notifyMessage = tempPlayer.status == 2 ?
                                                    userInfo.username
                                                        + " has advanced to the next round of " + data.contestName
                                                            : userInfo.username
                                                                        + " was eliminated from " + data.contestName  + " in round 1";

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
                                                        roomName : chatRoom.roomName,
                                                        type : chatRoom.type,
                                                        recordId : chatRoom.recordId
                                                    },
                                                    type : 'contest_start_round2',
                                                    message : message,
                                                    data : data,
                                                    sentAt : new Date()
                                                }

                                                // Create new message object
                                                var chatMessage = {
                                                    roomId : chatRoom.id,
                                                    userId : data.userId,
                                                    type : 'contest_start_round2',
                                                    message : message,
                                                    data : JSON.stringify(messageData),
                                                    sentAt : new Date()
                                                }

                                                // Create chat message
                                                ChatMessageInfo.create(chatMessage, function(err, messageInfo){

                                                    if( !err && messageInfo && Object.keys(messageInfo).length > 0){

                                                        // Push message data id
                                                        messageData = JSON.parse(chatMessage.data);
                                                        messageData.id = messageInfo.id;

                                                        // Send message
                                                        sails.sockets.broadcast(chatRoom.roomName, "message", messageData);

                                                        // Push notify
                                                        NotificationServices.pushNotificationToGroupWithMessage(messageData.room.recordId, notifyMessage, messageData);

                                                        // Error not in room
                                                        var response = {
                                                            status : "success",
                                                            message : "Your message is sent.",
                                                            data : messageData
                                                        }

                                                        callback(null, response);

                                                    } else {
                                                        callback(err, null);
                                                    }
                                                })
                                            }
                                        })
                                    }else {
                                        callback(err, null);
                                    }
                                })
                            } else{
                                callback(err, null);
                            }
                        })
                    }
                } else {
                    callback(err, null);
                }
            });
        } catch(err) {
            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatEventServices -> contestStartRound2');
    },

    /**
     *
     * @param data
     * @param callback
     */
    contestWinner : function(data, callback){

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatEventServices -> contestWinner');

        try {

            // Find all contest player where: {roomId : chatRoom.id}, sort : {sentAt: 0}
            ExpContestPlayer.find({where : {contestId : data.contestId}, sort : {joinedAt: 0} }).exec(function(err, contestPlayers){
                if(!err && contestPlayers && Object.keys(contestPlayers).length > 0){
                    UserAccountInfo.findOne({id : data.contestOwner}).exec(function(err, contestOwner) {
                        if (!err && contestOwner && Object.keys(contestOwner).length > 0) {

                            // Find winner
                            var winnerId = 0;
                            var maxVote = 0;
                            for(var i=0; i< contestPlayers.length; i++) {
                                if (contestPlayers[i].status == 2 && contestPlayers[i].round2Vote >= maxVote) {
                                    maxVote = contestPlayers[i].round2Vote;
                                    winnerId = contestPlayers[i].userId;
                                }
                            }

                            UserAccountInfo.findOne({id : winnerId}).exec(function(err, contestWinner) {
                                if (!err && contestWinner && Object.keys(contestWinner).length > 0) {

                                    // Get user id array
                                    var strGroupId = "";
                                    for(var i=0; i< contestPlayers.length; i++) {
                                        if (strGroupId.indexOf(contestPlayers[i].groupId + "|") < 0) {

                                            // Mark as sent
                                            strGroupId += contestPlayers[i].groupId + "|";

                                            // Create message data
                                            var messageData = {
                                                user : {
                                                    id : contestOwner.id,
                                                    username : contestOwner.username,
                                                    image : contestOwner.image,
                                                    groupName : data.groupName,
                                                    groupImage : data.groupImage
                                                },
                                                room : {
                                                    roomName : 'grouppage_' + contestPlayers[i].groupId,
                                                    type : 'grouppage',
                                                    recordId : contestPlayers[i].groupId
                                                },
                                                type : 'contest_winner',
                                                message : contestWinner.username + ' took first place in the contest ' + data.contestName +'!',
                                                data : data,
                                                sentAt : new Date()
                                            }

                                            // Push notify
                                            console.log("Push message contest_winner to group:" + messageData.room.recordId);
                                            //NotificationServices.pushNotificationToGroup(messageData.room.recordId, messageData);

                                        }
                                    }
                                }else{
                                    callback(err, null);
                                }
                            })
                        } else{
                            callback(err, null);
                        }
                    })
                } else {
                    callback(err, null);
                }
            });
        } catch(err) {
            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatEventServices -> contestWinner');
    },


    /**
     *
     * @param data
     * @param callback
     */
    contestHasFinished : function(data, callback){

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ChatEventServices -> contestHasFinished');

        try {

            // Find all contest player
            ExpContestPlayer.find({contestId : data.contestId}).exec(function(err, contestPlayers){
                if(!err && contestPlayers && Object.keys(contestPlayers).length > 0){
                    UserAccountInfo.findOne({id : data.contestOwner}).exec(function(err, userInfo) {
                        if (!err && userInfo && Object.keys(userInfo).length > 0) {

                            // Get user id array
                            var strGroupId = "";
                            for(var i=0; i< contestPlayers.length; i++){
                                if(strGroupId.indexOf(contestPlayers[i].groupId + "|") < 0){

                                    // Get group id
                                    var groupId = contestPlayers[i].groupId;
                                    strGroupId = strGroupId + groupId + "|";

                                    ChatRoomInfo.findOne({type : 'grouppage', recordId : groupId}).exec(function(err, chatRoom){
                                        if(!err && chatRoom && Object.keys(chatRoom).length > 0){

                                            // Create message data
                                            var messageData = {
                                                user : {
                                                    id : userInfo.id,
                                                    username : userInfo.username,
                                                    image : userInfo.image,
                                                    groupName : data.groupName,
                                                    groupImage : data.groupImage
                                                },
                                                room : {
                                                    roomName : chatRoom.roomName,
                                                    type : chatRoom.type,
                                                    recordId : chatRoom.recordId
                                                },
                                                type : 'contest_has_finished',
                                                message : 'The final round of ' + data.contestName +' has ended. Go see where your group ranked!',
                                                data : data,
                                                sentAt : new Date()
                                            }

                                            // Create new message object
                                            var chatMessage = {
                                                roomId : chatRoom.id,
                                                userId : data.userId,
                                                type : 'contest_has_finished',
                                                message : 'The final round of ' + data.contestName +' has ended. Go see where your group ranked!',
                                                data : JSON.stringify(messageData),
                                                sentAt : new Date()
                                            }

                                            // Create chat message
                                            ChatMessageInfo.create(chatMessage, function(err, messageInfo){

                                                if( !err && messageInfo && Object.keys(messageInfo).length > 0){

                                                    // Push message id
                                                    messageData.id = messageInfo.id;

                                                    // Send message
                                                    sails.sockets.broadcast(chatRoom.roomName, "message", messageData);

                                                    // Push notify
                                                    console.log("Push message contest_has_finished to group:" + messageData.room.recordId);
                                                    NotificationServices.pushNotificationToGroup(messageData.room.recordId, messageData);

                                                    // Error not in room
                                                    var response = {
                                                        status : "success",
                                                        message : "Your message is sent.",
                                                        data : messageData
                                                    }

                                                    callback(null, response);

                                                } else {
                                                    callback(err, null);
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        } else{
                            callback(err, null);
                        }
                    })
                } else {
                    callback(err, null);
                }
            });
        } catch(err) {
            callback(err, null);
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | ChatEventServices -> contestHasFinished');
    }

};
