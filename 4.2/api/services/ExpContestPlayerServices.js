/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 6/7/15 2:34 PM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

/**
 *  ContentPlayerServices
 *
 * @description :: Server-side logic for managing UserAccountInfo
 * @help        :: See http://links.sailsjs.org/docs/services
 */
module.exports = {

    /**
     * ContentPlayerServices.listPlayerRound1()
     *
     * @param userId
     * @param contestId
     * @param callback
     */
    listPlayerRound1: function (userId, groupId, contestId, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ContentPlayerServices -> listPlayerRound1');

        // Get list player round 1
        try {

            // Parallel series
            async.parallel(
                [
                    function(callbackFunc){
                        // Find user account
                        ExpContestInfo.findOne({id: contestId}).exec(function (err, result){
                            callbackFunc(null, result);
                        })
                    },
                    function(callbackFunc){
                        // Find group member
                        UserAccountInfo.find({group : groupId }).exec(function(err, result){
                            callbackFunc(null, result);
                        })
                    },
                    function(callbackFunc){
                        // Find group info
                        ExpGroupInfo.findOne({id : groupId }).exec(function(err, result){
                            callbackFunc(null, result);
                        })
                    }
                ],
                function(err, results){

                    // Check error
                    if (!err) {

                        var contest = results[0];
                        var groupMembers = results[1];
                        var groupInfo = results[2];

                        // Check result
                        if (contest && Object.keys(contest).length > 0) {

                            // Check contest status
                            if( contest.status == 1){

                                if( groupMembers && groupInfo
                                    && groupMembers.length > 0 && Object.keys(groupInfo).length > 0 ) {

                                    // Create user id array
                                    var userIdArray = [];
                                    for(var i = 0; i < groupMembers.length; i++){
                                        userIdArray[i] = groupMembers[i].id;
                                    }

                                    ExpContestVote.findOne({contestId: contestId, votedBy: userId, round : 1}).exec(function(err, voted) {
                                        if (!err) {

                                            // Get voted player id
                                            var votedId = voted ? voted.playerId : 0;

                                            // Find contest player
                                            ExpContestPlayer.find({contestId : contestId, userId : userIdArray}).exec(function(err, result) {

                                                // Check error
                                                if (!err) {

                                                    // Check result
                                                    if (result && Object.keys(result).length > 0) {

                                                        console.log(result);

                                                        // Create list player
                                                        var listPlayer = result;
                                                        for(var i = 0; i < listPlayer.length; i++){
                                                            var player = listPlayer[i];
                                                            player.username = null;
                                                            player.userImage = null;
                                                            player.groupName = groupInfo.name;
                                                            player.groupImage = groupInfo.image;
                                                            player.votedStatus = player.id == votedId ? 1 : 0;
                                                            for(var j = 0; j < groupMembers.length; j++){
                                                                if(player.userId == groupMembers[j].id){
                                                                    player.username = groupMembers[j].username;
                                                                    player.userImage = groupMembers[j].image;
                                                                    break;
                                                                }
                                                            }
                                                        }

                                                        // Create success message
                                                        var response = {
                                                            status : 'success',
                                                            message : '',
                                                            data : listPlayer
                                                        }

                                                        // Callback with response
                                                        callback(null, response);


                                                    } else {
                                                        // Create success message
                                                        var response = {
                                                            status : 'success',
                                                            message : '',
                                                            data : []
                                                        }

                                                        // Callback with response
                                                        callback(null, response);
                                                    }
                                                } else {
                                                    // Callback with error
                                                    callback(err, null);
                                                }
                                            })
                                        } else {
                                            // Callback with error
                                            callback(err, null);
                                        }
                                    })
                                } else {

                                    // Create success message
                                    var response = {
                                        status : 'success',
                                        message : 'Not found any players in same group with you',
                                        data : []
                                    }

                                    // Callback with response
                                    callback(null, response);
                                }
                            } else {

                                // Create error message
                                var response = {
                                    status: 'error',
                                    code: 725,
                                    message: 'This contest is not in round 1',
                                    data: {}
                                }

                                callback(null, response);
                            }

                        } else {

                            // Create error message
                            var response = {
                                status: 'error',
                                code: 722,
                                message: 'Not found any contest match with this id',
                                data: {}
                            }

                            callback(null, response);
                        }

                    } else {
                        // Callback with error
                        callback(err, null);
                    }

                });
        } catch (err) {
            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ContentPlayerServices -> listPlayerRound1');
    },

    /**
     * ContentPlayerServices.votePlayerRound1()
     *
     * @param userId
     * @param playerId
     * @param callback
     */
    votePlayerRound1: function (userId, playerId, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ContentPlayerServices -> votePlayerRound1');

        try {

            // Parallel series
            async.parallel(
                [
                    function(callbackFunc){
                        // Find user account
                        UserAccountInfo.findOne({id : userId }).exec(function(err, result){
                            callbackFunc(null, result);
                        })
                    },
                    function(callbackFunc){
                        // Find group info
                        ExpContestPlayer.findOne({id: playerId}).exec(function(err, result){
                            callbackFunc(null, result);
                        })
                    }
                ],
                function(err, results){

                    // Check error
                    if( !err ) {

                        // Check results
                        if ( results && Object.keys(results).length > 0) {

                            // Get account & player
                            var userInfo = results[0];
                            var player = results[1];

                            // Check player
                            if(player && Object.keys(player).length > 0){

                                ExpContestInfo.findOne({id: player.contestId}).exec(function foundContestInfo(err, result) {

                                    // Check error
                                    if (!err) {

                                        // check result
                                        if (result && Object.keys(result).length > 0) {

                                            // Get contest
                                            var contest = result;

                                            // If contest at round 1
                                            if ( contest.status == 1) {

                                                // Check group
                                                if( userInfo.group == player.groupId) {

                                                    // Find vote history
                                                    ExpContestVote.find({contestId : contest.id, round : 1, votedBy : userId}).exec(function(err, result){

                                                        // Check error
                                                        if(!err){

                                                            // Check result
                                                            if( !result || Object.keys(result).length == 0 || result.length == 0) {

                                                                // Update vote
                                                                player.round1Vote = player.round1Vote + 1;
                                                                player.save(function(err) {

                                                                    if (!err) {

                                                                        // Create vote history
                                                                        var contestVote = {
                                                                            contestId : player.contestId,
                                                                            groupId : player.groupId,
                                                                            userId : player.userId,
                                                                            playerId : player.id,
                                                                            votedBy : userId,
                                                                            round : 1,
                                                                            votedAt : new Date()
                                                                        }
                                                                        ExpContestVote.create(contestVote, function(err, result){});

                                                                        // Create success message
                                                                        var response = {
                                                                            status: 'success',
                                                                            message: '',
                                                                            data: player
                                                                        }

                                                                        // Callback with response
                                                                        callback(null, response);

                                                                    } else {
                                                                        callback(err, null);
                                                                    }
                                                                });

                                                            } else {

                                                                // Create error message
                                                                var response = {
                                                                    status: 'error',
                                                                    code: 729,
                                                                    message: 'You have already voted for this contest before',
                                                                    data: {}
                                                                }

                                                                callback(null, response);

                                                            }

                                                        } else {
                                                            callback(err, result)
                                                        }
                                                    })

                                                } else {

                                                    // Create error message
                                                    var response = {
                                                        status: 'error',
                                                        code: 730,
                                                        message: 'You are not same group with this player',
                                                        data: {}
                                                    }

                                                    callback(null, response);
                                                }
                                            } else {

                                                // Create error message
                                                var response = {
                                                    status: 'error',
                                                    code: 725,
                                                    message: 'This contest is not in round 1',
                                                    data: {}
                                                }

                                                callback(null, response);
                                            }
                                        } else {

                                            // Create error message
                                            var response = {
                                                status: 'error',
                                                code: 722,
                                                message: 'Not found any contest match with this id',
                                                data: {}
                                            }

                                            callback(null, response);
                                        }
                                    } else {
                                        // Callback with error
                                        callback(err, null);
                                    }
                                });

                            } else {

                                // Create error message
                                var response = {
                                    status: 'error',
                                    code: 726,
                                    message: 'Not found any contest player match with this id',
                                    data: {}
                                }

                                callback(null, response);
                            }
                        } else {
                            callback(err, null);
                        }
                    } else {
                        callback(err, null);
                    }
                });
        } catch (err) {
            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE | ContentPlayerServices -> votePlayerRound1');

    },

    /**
     * ContentPlayerServices.listPlayerRound2()
     *
     * @param userId
     * @param contestId
     * @param callback
     */
    listPlayerRound2: function (userId, contestId, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ContentPlayerServices -> listPlayerRound2');

        // Get list player round 1
        try {

            // Get contest
            ExpContestInfo.findOne({id: contestId}).exec(function foundContestInfo(err, result) {

                // Check error
                if (!err) {

                    // Check result
                    if (result && Object.keys(result).length > 0) {

                        // Get contest info
                        var contest = result;

                        if( contest.status == 2){

                            ExpContestVote.findOne({contestId: contestId, votedBy: userId, round : 2}).exec(function(err, voted){
                                if(!err){

                                    // Get voted player id
                                    var votedId = voted ? voted.playerId : 0;

                                    // Check member group
                                    ExpContestPlayer.find({where : {contestId : contestId, status : 2}, sort : {round1Vote : 0}}).exec(function(err, result) {

                                        // Check error
                                        if( !err ) {

                                            // Check result
                                            if (result && Object.keys(result).length > 0) {

                                                // Get user id array
                                                var playersArray = [];
                                                var userIdArray = [];
                                                for(var i = 0; i < result.length; i++){
                                                    player = result[i];
                                                    player.username = null;
                                                    player.userImage = null;
                                                    player.groupName = null;
                                                    player.groupImage = null;
                                                    player.votedStatus = player.id == votedId ? 1 : 0;
                                                    playersArray[i] = player;
                                                    userIdArray[i] = player.userId;
                                                }

                                                // Find list user
                                                UserAccountInfo.find({id : userIdArray}).exec(function(err, result){

                                                    if (!err ) {

                                                        // Check result
                                                        if (result && Object.keys(result).length > 0) {

                                                            // Get list user
                                                            var usersArray = [];
                                                            var groupIdArray = []
                                                            for(var i = 0; i < result.length; i++){
                                                                var person = result[i];
                                                                delete person.password;
                                                                usersArray[i] = person;
                                                                groupIdArray[i] = person.group;
                                                            }

                                                            // Find list group
                                                            ExpGroupInfo.find({id : groupIdArray}).exec(function(err, result){

                                                                if (!err ) {

                                                                    // Check result
                                                                    if (result && Object.keys(result).length > 0) {

                                                                        // Get list reuslt
                                                                        var listGroup = result;

                                                                        // Create list result
                                                                        for(var i = 0; i < playersArray.length; i++){
                                                                            for(var j = 0; j < usersArray.length; j++){

                                                                                if(playersArray[i].userId == usersArray[j].id){

                                                                                    playersArray[i].username = usersArray[j].username;
                                                                                    playersArray[i].userImage = usersArray[j].image;

                                                                                    for(var k =0; k < listGroup.length; k++){
                                                                                        if(usersArray[j].group == listGroup[k].id){
                                                                                            playersArray[i].groupName = listGroup[k].name;
                                                                                            playersArray[i].groupImage = listGroup[k].image;
                                                                                            continue;
                                                                                        }
                                                                                    }

                                                                                    continue;
                                                                                }
                                                                            }
                                                                        }

                                                                        // Create success message
                                                                        var response = {
                                                                            status : 'success',
                                                                            message : '',
                                                                            data : playersArray
                                                                        }

                                                                        // Callback with response
                                                                        callback(null, response);

                                                                    } else {

                                                                        // Create success message
                                                                        var response = {
                                                                            status : 'success',
                                                                            message : '',
                                                                            data : []
                                                                        }

                                                                        // Callback with response
                                                                        callback(null, response);
                                                                    }

                                                                } else {

                                                                    // Callback with error
                                                                    callback(err, null);
                                                                }
                                                            })

                                                        } else {

                                                            // Create success message
                                                            var response = {
                                                                status : 'success',
                                                                message : '',
                                                                data : playersArray
                                                            }

                                                            // Callback with response
                                                            callback(null, response);
                                                        }

                                                    } else {

                                                        // Callback with error
                                                        callback(err, null);
                                                    }
                                                })
                                            } else {

                                                // Create success message
                                                var response = {
                                                    status : 'success',
                                                    message : '',
                                                    data : []
                                                }

                                                // Callback with response
                                                callback(null, response);
                                            }
                                        } else {

                                            // Callback with error
                                            callback(err, null);
                                        }
                                    })

                                } else{
                                    // Callback with error
                                    callback(err, null);
                                }
                            })
                        } else {

                            // Create error message
                            var response = {
                                status: 'error',
                                code: 727,
                                message: 'This contest is not in round 2',
                                data: {}
                            }

                            callback(null, response);
                        }

                    } else {

                        // Create error message
                        var response = {
                            status: 'error',
                            code: 722,
                            message: 'Not found any contest match with this id',
                            data: {}
                        }

                        callback(null, response);
                    }

                } else {

                    // Callback with error
                    callback(err, null);
                }

            });
        } catch (err) {
            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ContentPlayerServices -> listPlayerRound2');
    },

    /**
     * ContentPlayerServices.votePlayerRound2()
     *
     * @param userId
     * @param playerId
     * @param callback
     */
    votePlayerRound2: function (userId, playerId, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ContentPlayerServices -> votePlayerRound2');

        try {

            // Get contest player
            ExpContestPlayer.findOne({id: playerId}).exec(function foundContestPlayer(err, player) {
                if (!err && player && Object.keys(player).length > 0) {
                    ExpContestInfo.findOne({id: player.contestId}).exec(function (err, contest){
                        if (!err && contest && Object.keys(contest).length > 0) {

                            // If contest at round 2
                            if ( contest.status == 2 ) {

                                // Check player round 2
                                if( player.status == 2 ){

                                    // Find vote history
                                    ExpContestVote.find({contestId : contest.id, round : 2, votedBy : userId}).exec(function(err, result){

                                        // Check error
                                        if(!err){

                                            // Check result
                                            if( !result || Object.keys(result).length == 0 || result.length == 0) {

                                                // Update vote
                                                player.round2Vote = player.round2Vote + 1;
                                                player.save(function(err) {

                                                    if (!err) {

                                                        // Create vote history
                                                        var contestVote = {
                                                            contestId : player.contestId,
                                                            groupId : player.groupId,
                                                            userId : player.userId,
                                                            playerId : player.id,
                                                            votedBy : userId,
                                                            round : 2,
                                                            votedAt : new Date()
                                                        }
                                                        ExpContestVote.create(contestVote, function(err, result){});

                                                        // Create success message
                                                        var response = {
                                                            status: 'success',
                                                            message: '',
                                                            data: player
                                                        }

                                                        // Callback with response
                                                        callback(null, response);

                                                    } else {
                                                        callback(err, null);
                                                    }
                                                });

                                            } else {

                                                // Create error message
                                                var response = {
                                                    status: 'error',
                                                    code: 729,
                                                    message: 'You have already voted for this contest before',
                                                    data: {}
                                                }

                                                callback(null, response);

                                            }

                                        } else {
                                            callback(err, result)
                                        }
                                    })

                                } else {

                                    // Create error message
                                    var response = {
                                        status: 'error',
                                        code: 728,
                                        message: 'This player was eliminated.',
                                        data: {}
                                    }
                                    callback(null, response);
                                }

                            } else {

                                // Create error message
                                var response = {
                                    status: 'error',
                                    code: 727,
                                    message: 'This contest is not in round 2',
                                    data: {}
                                }
                                callback(null, response);
                            }

                        } else {
                            callback(err, null);
                        }
                    })
                } else {
                    if(!err){
                        // Create error message
                        var response = {
                            status: 'error',
                            code: 726,
                            message: 'Not found any player match with this id',
                            data: {}
                        }
                        callback(null, response);
                    } else {
                        callback(err, null);
                    }
                }
            });
        } catch (err) {
            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE | ContentPlayerServices -> votePlayerRound2');
    },

    /**
     * ContentPlayerServices.listTopWinner()
     *
     * @param contestId
     * @param callback
     */
    listTopWinner: function (userId, contestId, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ContentPlayerServices -> listTopWinner');

        // Get list player round 1
        try {

            // Get contest
            ExpContestInfo.findOne({id: contestId}).exec(function foundContestInfo(err, result) {

                // Check error
                if (!err) {

                    // Check result
                    if (result && Object.keys(result).length > 0) {

                        // Get contest info
                        var contest = result;

                        if( contest.status == 3){

                            // Check member group
                            ExpContestPlayer.find({where : {contestId : contestId, status : 2}, sort : {round2Vote : 0}}).exec(function(err, result) {

                                // Check error
                                if( !err ) {

                                    // Check result
                                    if (result && Object.keys(result).length > 0) {

                                        // Get user id array
                                        var playersArray = [];
                                        var userIdArray = [];
                                        var groupIdArray = [];
                                        for(var i = 0; i < result.length; i++){
                                            player = result[i];
                                            player.username = null;
                                            player.userImage = null;
                                            player.groupName = null;
                                            player.groupImage = null;
                                            playersArray[i] = player;
                                            userIdArray[i] = player.userId;
                                            groupIdArray[i] = player.groupId;
                                        }

                                        // Find list user
                                        UserAccountInfo.find({id : userIdArray}).exec(function(err, result){

                                            if (!err ) {

                                                // Check result
                                                if (result && Object.keys(result).length > 0) {

                                                    // Get list user
                                                    var usersArray = [];
                                                    for(var i = 0; i < result.length; i++){
                                                        var person = result[i];
                                                        delete person.password;
                                                        usersArray[i] = person;
                                                    }

                                                    // Find list group
                                                    ExpGroupInfo.find({id : groupIdArray}).exec(function(err, result){

                                                        if (!err ) {

                                                            // Check result
                                                            if (result && Object.keys(result).length > 0) {

                                                                // Get list reuslt
                                                                var listGroup = result;

                                                                // Create list result
                                                                for(var i = 0; i < playersArray.length; i++){
                                                                    for(var j = 0; j < usersArray.length; j++){

                                                                        if(playersArray[i].userId == usersArray[j].id){

                                                                            playersArray[i].username = usersArray[j].username;
                                                                            playersArray[i].userImage = usersArray[j].image;

                                                                            for(var k =0; k < listGroup.length; k++){
                                                                                if(playersArray[i].groupId == listGroup[k].id){
                                                                                    playersArray[i].groupName = listGroup[k].name;
                                                                                    playersArray[i].groupImage = listGroup[k].image;
                                                                                    continue;
                                                                                }
                                                                            }

                                                                            continue;
                                                                        }
                                                                    }
                                                                }

                                                                // Create success message
                                                                var response = {
                                                                    status : 'success',
                                                                    message : '',
                                                                    data : playersArray
                                                                }

                                                                // Callback with response
                                                                callback(null, response);

                                                            } else {

                                                                // Create success message
                                                                var response = {
                                                                    status : 'success',
                                                                    message : '',
                                                                    data : []
                                                                }

                                                                // Callback with response
                                                                callback(null, response);
                                                            }

                                                        } else {

                                                            // Callback with error
                                                            callback(err, null);
                                                        }
                                                    })

                                                } else {

                                                    // Create success message
                                                    var response = {
                                                        status : 'success',
                                                        message : '',
                                                        data : playersArray
                                                    }

                                                    // Callback with response
                                                    callback(null, response);
                                                }

                                            } else {

                                                // Callback with error
                                                callback(err, null);
                                            }
                                        })
                                    } else {

                                        // Create success message
                                        var response = {
                                            status : 'success',
                                            message : '',
                                            data : []
                                        }

                                        // Callback with response
                                        callback(null, response);
                                    }
                                } else {

                                    // Callback with error
                                    callback(err, null);
                                }
                            })

                            // Mark as read
                            var seenLog = {
                                contestId : contest.id,
                                userId : userId
                            }
                            ExpContestSeen.findOrCreate(seenLog).exec(function(err, log){});

                        } else {

                            // Create error message
                            var response = {
                                status: 'error',
                                code: 720,
                                message: 'This contest have not finished yet',
                                data: {}
                            }

                            callback(null, response);
                        }

                    } else {

                        // Create error message
                        var response = {
                            status: 'error',
                            code: 722,
                            message: 'Not found any contest match with this id',
                            data: {}
                        }

                        callback(null, response);
                    }

                } else {

                    // Callback with error
                    callback(err, null);
                }

            });
        } catch (err) {
            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ContentPlayerServices -> listTopWinner');
    },

    /**
     * ContentPlayerServices.setRound2Players()
     *
     * @param contestId
     * @param callback
     */
    setRound2Players: function (contestId, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ContentPlayerServices -> setRound2Players');

        // Get list player round 1
        try {

            // Check member group
            ExpContestPlayer.find({contestId : contestId}).exec(function(err, result) {

                // Check error
                if( !err ) {

                    // Check result
                    if (result && Object.keys(result).length > 0) {

                        // Get group winner
                        var groupIdArray = [];
                        var groupWinnerArray = [];

                        // Get group winner
                        for(var i = 0; i < result.length; i++){
                            var winner = result[i];
                            if( groupIdArray.indexOf(winner.groupId) < 0 ){
                                groupIdArray[groupIdArray.length] = winner.groupId;
                                for(var j = i + 1; j < result.length; j++){
                                    if(result[j].groupId == winner.groupId && result[j].round1Vote > winner.round1Vote){
                                        winner = result[j];
                                    }
                                }
                                groupWinnerArray[groupWinnerArray.length] = winner.id;
                            }
                        }

                        console.log('groupWinnerArray');
                        console.log(groupWinnerArray);

                        ExpContestPlayer.update({ id : groupWinnerArray},{ status : 2}).exec(function(err, result){
                            if(!err){
                                callback(err, result);
                            } else {
                                sails.log(err.toString());
                                callback(err, null);
                            }
                        });
                    }
                } else {
                    sails.log(err.toString());
                    callback(err, null);
                }
            })

        } catch (err) {
            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ContentPlayerServices -> setRound2Players');
    },

    /**
     * ContentPlayerServices.downPlayerVote()
     *
     * @param userId
     * @param playerId
     * @param callback
     */
    downPlayerVote: function (userId, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ContentPlayerServices -> downPlayerVote');

        try {

            // Find all voted by user
            ExpContestVote.find({votedBy: userId}).exec(function(err, listVotes){
                if(!err && listVotes && Object.keys(listVotes).length > 0){

                    for(var i=0; i<listVotes.length; i++){

                        ExpContestPlayer.findOne({id : listVotes[i].playerId}).exec(function(err, player){
                            if(!err && player && Object.keys(player).length > 0){

                                ExpContestInfo.findOne({id : player.contestId}).exec(function(err, contest){
                                    if(!err && contest && Object.keys(contest).length > 0){

                                        if(contest.status == 1 || contest.status == 2){

                                            for(var j=0; j<listVotes.length; j++){

                                                if(listVotes[j].playerId == player.id
                                                    && listVotes[j].contestId == contest.id){

                                                    if(listVotes[j].round == 1){
                                                        player.round1Vote--;

                                                    } else {
                                                        player.round2Vote--;
                                                    }

                                                    player.save(function(err){
                                                    })
                                                }
                                            }

                                        } else {
                                            sails.log.error(err ? err.toString() : "Just empty data");
                                        }

                                    } else {
                                        sails.log.error(err ? err.toString() : "Just empty data");
                                    }
                                })
                            } else {
                                sails.log.error(err ? err.toString() : "Just empty data");
                            }
                        })
                    }

                    // Callback without error
                    callback(null, null);
                } else{
                    sails.log.error(err ? err.toString() : "Just empty data");
                    callback(err, null);
                }
            })
        } catch (err) {
            sails.log.error(err ? err.toString() : "Just empty data");
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE | ContentPlayerServices -> downPlayerVote');
    },

    /**
     * ContentPlayerServices.deletePlayerAndUserVoted()
     *
     * @param userId
     */
    deletePlayerAndUserVoted: function (userId) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ContentPlayerServices -> deletePlayerAndUserVoted');

        try {

            // Find all player belong to user
            ExpContestPlayer.find({userId: userId}, function(err, listPlayers){
                if(listPlayers && Object.keys(listPlayers).length > 0){

                    // Create contest id array
                    var contestIdArray = []
                    for(var i = 0; i < listPlayers.length; i++){
                        contestIdArray[i] = listPlayers[i].contestId;
                    }

                    // Find all contest in round 0,1,2
                    ExpContestInfo.find({id : contestIdArray, status : [0,1,2]}, function(err, listContest){
                        if(listContest && Object.keys(listContest).length > 0){

                            // Create contest id array string
                            var contestIdString = "";
                            for(var i = 0; i < listContest.length; i++){
                                contestIdString += listContest[i].id + "|";
                            }

                            // Create player id array need destroy
                            var playerIdArray = [];
                            for(var i = 0; i < listPlayers.length; i++){
                                if(contestIdString.indexOf(listPlayers[i].contestId + '|') >= 0){
                                    playerIdArray[playerIdArray.length] = listPlayers[i].id;
                                }
                            }

                            // Destroy contest player
                            if(playerIdArray.length > 0){
                                ExpContestPlayer.destroy({ id : playerIdArray}, function(err){
                                    sails.log(err ? err.toString() : 'No error');
                                    sails.log("Deleted player with id in: ");
                                    sails.log(playerIdArray);
                                })
                            }
                        }
                    })
                }
            });

            // Find all vote belong to user
            ExpContestVote.find({votedBy: userId}, function(err, listVote){
                if(listVote && Object.keys(listVote).length > 0){

                    // Create contest id array
                    var contestIdArray = []
                    for(var i = 0; i < listVote.length; i++){
                        contestIdArray[i] = listVote[i].contestId;
                    }

                    // Find all contest in round 0,1,2
                    ExpContestInfo.find({id : contestIdArray, status : [0,1,2]}, function(err, listContest){
                        if(listContest && Object.keys(listContest).length > 0){

                            // Create contest id array string
                            var contestIdString = "";
                            for(var i = 0; i < listContest.length; i++){
                                contestIdString += listContest[i].id + "|";
                            }

                            // Create vote id array need destroy
                            var voteIdArray = [];
                            for(var i = 0; i < listVote.length; i++){
                                if(contestIdString.indexOf(listVote[i].contestId + '|') >= 0){
                                    voteIdArray[voteIdArray.length] = listVote[i].id;
                                }
                            }

                            // Destroy contest vote
                            if(voteIdArray.length > 0){
                                ExpContestVote.destroy({ id : voteIdArray}, function(err){
                                    sails.log(err ? err.toString() : 'No error');
                                    sails.log("Deleted vote with id in: ");
                                    sails.log(voteIdArray);
                                })
                            }
                        }
                    })
                }
            });

        } catch (err) {
            sails.log.error(err.toString());
        }

        // Log end function
        sails.log.info('=== END SERVICE | ContentPlayerServices -> deletePlayerAndUserVoted');
    }
}