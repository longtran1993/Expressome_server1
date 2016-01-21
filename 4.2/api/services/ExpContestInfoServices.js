/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 5/4/15 8:51 PM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

/**
 *  ExpContestInfoServices
 *
 * @description :: Server-side logic for managing UserAccountInfo
 * @help        :: See http://links.sailsjs.org/docs/services
 */

module.exports = {

    /**
     * ExpContestInfoServices.list()
     *
     * @param userId
     * @param page
     * @param callback
     */
    list: function (userId, page, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ExpContestInfoServices -> list');

        try{

            // Get list data with paginate
            DataCommonServices.paginate(ExpContestInfo, {}, page, 10, function(err, result){

                if( !err ){

                    if(result && Object.keys(result).length > 0 ){

                        // Change list
                        var response = result;
                        var listContest = result.list;
                        var contestIdArray = [];
                        for(var i = 0; i < listContest.length; i++){
                            var contest = listContest[i];
                            contestIdArray[i] = contest.id;
                            contest.amountPlayers = 0;
                            contest.joinedStatus = 0;
                            listContest[i] = contest;
                        }

                        // find list contest player
                        ExpContestPlayer.find({contestId : contestIdArray}).exec(function(err, result){

                            if(!err ){
                                if( result && Object.keys(result).length > 0 ){

                                    // Check result
                                    for(var i = 0; i < listContest.length; i++){

                                        // Check status
                                        var countPlayers = 0;
                                        var joinedStatus = 0;
                                        var contest = listContest[i];

                                        // Check contest players
                                        for(var j = 0; j < result.length; j++){
                                            if(contest.id == result[j].contestId){
                                                countPlayers++;
                                                if(result[j].userId == userId){
                                                    joinedStatus = 1;
                                                }
                                            }
                                        }

                                        contest.amountPlayers = countPlayers;
                                        contest.joinedStatus = joinedStatus;
                                        listContest[i] = contest;
                                    }

                                    response.list = listContest;

                                    // Callback function with error & data
                                    callback(err, response);

                                } else {

                                    // Callback function with error & data
                                    callback(err, response);
                                }
                            } else {
                                // Callback function with error & data
                                callback(err, result);
                            }
                        })

                    } else {
                        // Callback function with error & data
                        callback(err, result);
                    }

                } else {
                    // Callback function with error & data
                    callback(err, result);
                }

            });

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ExpContestInfoServices -> list');
    },

    /**
     * ExpContestInfoServices.listNew()
     *
     * @param userId
     * @param page
     * @param callback
     */
    listNew: function (userId, page, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ExpContestInfoServices -> listNew');

        try{

            // Find contest invite
            UserAccountInfo.findOne({id : userId}).exec(function(err, result){

                // Check error
                if(!err){

                    // Check result
                    if(result && Object.keys(result).length > 0){

                        // Get user info
                        var userInfo = result;

                        // Find contest invite
                        ExpContestInvite.find({where : {groupId : userInfo.group }, sort : {invitedAt: 1 }}).exec(function(err, result){

                            // Check error
                            if(!err){

                                // Get result
                                var contestInvites = result;

                                // Check invite
                                if( contestInvites && Object.keys(contestInvites).length > 0){

                                    // Get contest id array
                                    var contestIdArray = [];
                                    for(var i = 0; i< contestInvites.length; i++){
                                        contestIdArray[i] = contestInvites[i].contestId;
                                    }

                                    // Get list data with paginate
                                    DataCommonServices.paginate(ExpContestInfo, {id : contestIdArray, status : 0 }, page, 10, function(err, result){

                                        if( !err ){

                                            if(result && Object.keys(result).length > 0 ){

                                                // Change list
                                                var response = result;
                                                var listContest = result.list;
                                                var contestIdArray = [];
                                                for(var i = 0; i < listContest.length; i++){
                                                    var contest = listContest[i];
                                                    contestIdArray[i] = contest.id;
                                                    contest.amountPlayers = 0;
                                                    contest.joinedStatus = 0;
                                                    listContest[i] = contest;
                                                }

                                                // find list contest player
                                                ExpContestPlayer.find({contestId : contestIdArray, groupId : userInfo.group}).exec(function(err, result){

                                                    if(!err ){
                                                        if( result && Object.keys(result).length > 0 && result.length > 0){


                                                            // Create list contest result
                                                            var listResult = [];

                                                            // For by invite
                                                            for(var i = 0; i< contestInvites.length; i++){
                                                                for(var j = 0; j < listContest.length; j++){
                                                                    if(contestInvites[i].contestId == listContest[j].id){

                                                                        // Check status
                                                                        var countPlayers = 0;
                                                                        var joinedStatus = 0;
                                                                        var contest = listContest[j];

                                                                        // Check contest players
                                                                        for(var k = 0; k < result.length; k++){
                                                                            if(contest.id == result[k].contestId){
                                                                                countPlayers++;
                                                                                if(result[k].userId == userId){
                                                                                    joinedStatus = 1;
                                                                                    countPlayers--;
                                                                                }
                                                                            }
                                                                        }

                                                                        contest.amountFriends = countPlayers;
                                                                        contest.joinedStatus = joinedStatus;
                                                                        contest.invitedAt = contestInvites[i].invitedAt;
                                                                        contest.invitedBy = contestInvites[i].invitedBy;
                                                                        listResult[listResult.length] = contest;
                                                                    }
                                                                }
                                                            }

                                                            response.list = listResult;

                                                            // Callback function with error & data
                                                            callback(err, response);

                                                        } else {

                                                            // Create list contest result
                                                            var listResult = [];

                                                            // For by invite
                                                            for(var i = 0; i< contestInvites.length; i++) {
                                                                for (var j = 0; j < listContest.length; j++) {
                                                                    if (contestInvites[i].contestId == listContest[j].id) {

                                                                        var contest = listContest[j];

                                                                        contest.amountFriends = 0;
                                                                        contest.joinedStatus = 0;
                                                                        contest.invitedAt = contestInvites[i].invitedAt;
                                                                        contest.invitedBy = contestInvites[i].invitedBy;

                                                                        listResult[listResult.length] = contest;

                                                                    }
                                                                }
                                                            }

                                                            response.list = listResult;

                                                            // Callback function with error & data
                                                            callback(err, response);
                                                        }
                                                    } else {
                                                        // Callback function with error & data
                                                        callback(err, result);
                                                    }
                                                })

                                            } else {
                                                // Callback function with error & data
                                                callback(err, result);
                                            }

                                        } else {
                                            // Callback function with error & data
                                            callback(err, result);
                                        }

                                    });

                                } else {
                                    var data = {
                                        list : [],
                                        paginate : {
                                            totalRecord : 0,
                                            totalPage : 0,
                                            currentPage : 1,
                                            itemsPerPage : 10
                                        }
                                    }
                                    callback(err, data);
                                }

                            } else {
                                callback(err, result);
                            }
                        })
                    } else {
                        callback(err, null);
                    }
                } else {
                    callback(err, reuslt);
                }
            })

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ExpContestInfoServices -> listNew');
    },

    /**
     * ExpContestInfoServices.listOngoing()
     *
     * @param userId
     * @param page
     * @param callback
     */
    listOngoing: function (userId, page, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ExpContestInfoServices -> listOngoing');

        try{
            // Find contest invite
            UserAccountInfo.findOne({id : userId}).exec(function(err, userInfo) {
                if (!err && userInfo && Object.keys(userInfo).length > 0) {
                    ExpContestVote.find({votedBy: userId}).exec(function(err, contestVoteArray){
                        if(!err){

                            // Get contest voted
                            var contestVoted="";
                            if(contestVoteArray){
                                for(var i=0; i< contestVoteArray.length; i++){
                                    contestVoted += contestVoteArray[i].contestId +"-"+ contestVoteArray[i].round + "|";
                                }
                            }

                            // Get list contest player in same group
                            ExpContestPlayer.find({groupId : userInfo.group}).exec(function(err, result){
                                if(!err){

                                    // Check list result
                                    if(result && Object.keys(result).length > 0){

                                        // Get list player
                                        var listPlayer = result;

                                        // Get contest Id array
                                        var contestIdArray = []
                                        for(var i =0 ; i < listPlayer.length; i++){
                                            contestIdArray[i] = listPlayer[i].contestId;
                                        }

                                        // Get list data with paginate
                                        DataCommonServices.paginate(ExpContestInfo, {id : contestIdArray, status : [1,2]}, page, 10, function(err, result){

                                            // Check error
                                            if( !err ){

                                                // Check result
                                                if(result && Object.keys(result).length > 0 ){

                                                    // Change list
                                                    var response = result;
                                                    var listContest = response.list;

                                                    for(var i=0; i < listContest.length; i++){

                                                        // get contest
                                                        var contest = listContest[i];
                                                        contest.amountFriends = 0;
                                                        contest.joinedStatus = 0;
                                                        contest.votedStatus = contestVoted.indexOf(contest.id +"-"+ contest.status + '|') > -1 ? 1 : 0;

                                                        // Count player
                                                        for( var j = 0; j < listPlayer.length; j++){
                                                            if(contest.id == listPlayer[j].contestId){
                                                                contest.amountFriends++;
                                                                if(userId == listPlayer[j].userId){
                                                                    contest.joinedStatus = 1;
                                                                    contest.amountFriends--;
                                                                }
                                                            }
                                                        }
                                                    }

                                                    // Callback with response
                                                    callback(null, response);

                                                } else {
                                                    // Callback function with error & data
                                                    callback(err, result);
                                                }

                                            } else {
                                                // Callback function with error & data
                                                callback(err, result);
                                            }

                                        })

                                    } else {

                                        // Create empty json
                                        var response = {
                                            list : [],
                                            paginate : {
                                                totalRecord : 0,
                                                totalPage : 0,
                                                currentPage : 1,
                                                itemsPerPage : 10
                                            }
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
                    callback(err, null);
                }
            })
        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ExpContestInfoServices -> listOngoing');
    },

    /**
     * ExpContestInfoServices.listDone()
     *
     * @param page
     * @param callback
     */
    listDone: function (userId, page, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ExpContestInfoServices -> listDone');

        try{
            // Find contest invite
            UserAccountInfo.findOne({id : userId}).exec(function(err, userInfo) {
                if (!err && userInfo && Object.keys(userInfo).length > 0) {
                    ExpContestSeen.find({userId : userId}).exec(function(err, contestSeeArray){
                        if(!err){

                            // get contest see id
                            var contestSeeId = '';
                            if(contestSeeArray){
                                for(var i=0; i< contestSeeArray.length; i++){
                                    contestSeeId += contestSeeArray[i].contestId + "|";
                                }
                            }

                            // Get list contest player in same group
                            ExpContestPlayer.find({groupId : userInfo.group}).exec(function(err, listPlayer){
                                if(!err){

                                    // Check list result
                                    if(!listPlayer) {
                                        listPlayer = [];
                                    }

                                    // Get list data with paginate
                                    DataCommonServices.paginate(ExpContestInfo, {where : {status : 3}, sort : {expiredDate: 0}}, page, 10, function(err, result){

                                        // Check error
                                        if( !err ){

                                            // Check result
                                            if(result && Object.keys(result).length > 0 ){

                                                // Change list
                                                var response = result;
                                                var listContest = response.list;

                                                for(var i=0; i < listContest.length; i++){

                                                    // get contest
                                                    var contest = listContest[i];
                                                    contest.amountFriends = 0;
                                                    contest.joinedStatus = 0;
                                                    contest.sawStatus = contestSeeId.indexOf(contest.id + '|') > -1 ? 1 : 0;

                                                    // Count player
                                                    for( var j = 0; j < listPlayer.length; j++){
                                                        if(contest.id == listPlayer[j].contestId){
                                                            contest.amountFriends++;
                                                            if(userId == listPlayer[j].userId){
                                                                contest.joinedStatus = 1;
                                                                contest.amountFriends--;
                                                            }
                                                        }
                                                    }
                                                }

                                                // Callback with response
                                                callback(null, response);

                                            } else {
                                                // Callback function with error & data
                                                callback(err, result);
                                            }

                                        } else {
                                            // Callback function with error & data
                                            callback(err, result);
                                        }

                                    })

                                } else {
                                    callback(err, null);
                                }
                            })

                        } else {
                            callback(err, null);
                        }
                    })
                } else {
                    callback(err, null);
                }
            })
        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ExpContestInfoServices -> listDone');
    },


    /**
     * ExpContestInfoServices.search()
     *
     * @param name
     * @param page
     * @param callback
     */
    search: function (name, page, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ExpContestInfoServices -> search');

        try{

            // Get list data with paginate
            DataCommonServices.paginate(ExpContestInfo,
                {name : {'like' : '%'+ name + '%'}}, page, 10, function(err, result){

                    // Callback function with error & data
                    callback(err, result);

                });

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ExpContestInfoServices -> search');
    },

    /**
     * ExpContestInfoServices.detail()
     *
     * @param userId
     * @param id
     * @param callback
     */
    detail: function (userId, id, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ExpContestInfoServices -> detail');

        try{

            // Find object
            ExpContestInfo.find({id : id}).exec(function(err, result) {

                // Check error
                if ( !err ) {

                    // Check result
                    if ( result && Object.keys(result).length > 0 ) {

                        // Get contest info
                        var contest = result.pop();

                        // Find user
                        UserAccountInfo.findOne({id : contest.owner}).exec(function(err, userInfo){
                            if(!err && userInfo && Object.keys(userInfo).length > 0){

                                // Get user info
                                contest.ownerName = userInfo.username;
                                contest.ownerImage = userInfo.image;

                                // Create response json object
                                var response = {
                                    status : 'success',
                                    message : '',
                                    data : contest
                                }

                                // Callback with message
                                callback(null, response);


                            } else {
                                // Callback with message
                                callback(null, response);
                            }
                        })

                        // Create seen log
                        if(contest.status == 3){
                            var seenLog = {
                                contestId : contest.id,
                                userId : userId
                            }
                            ExpContestSeen.findOrCreate(seenLog).exec(function(err, log){});
                        }
                    } else {

                        // Create response json object
                        var response = {
                            status : 'error',
                            code: 722,
                            message : 'Not found any contest match with this id',
                            data : {}
                        }

                        // Callback with message
                        callback(null, response);

                    }

                } else {

                    // Callback with error
                    callback(err, result);
                }

            });

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ExpContestInfoServices -> detail');
    },

    /**
     * ExpContestInfoServices.create()
     *
     * @param contestInfo
     * @param callback
     */
    create: function (contestInfo, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ExpContestInfoServices -> create');

        try {

            // Set default expired date
            if(!contestInfo.expiredDate || contestInfo.expiredDate == "") {
                contestInfo.expiredDate = DateTimeUtil.tomorrow();
            } else {
                contestInfo.expiredDate = new Date(contestInfo.expiredDate);
                if( DateTimeUtil.compareDate(contestInfo.expiredDate, DateTimeUtil.tomorrow()) <= 0 ){
                    contestInfo.expiredDate = DateTimeUtil.tomorrow();
                }
            }

            // Find user
            UserAccountInfo.findOne({id : contestInfo.owner}).exec(function(err, accountInfo){
                if(!err && accountInfo && Object.keys(accountInfo).length > 0){

                    // Find group info
                    ExpGroupInfo.findOne({id : accountInfo.group}).exec(function(err, groupInfo){
                        if(!err && groupInfo && Object.keys(groupInfo).length > 0){

                            // Assign groupName
                            contestInfo.groupName = groupInfo.name;

                            console.log(contestInfo);

                            // Create new object
                            ExpContestInfo.create( contestInfo, function(err, result){
                                if(!err && result && Object.keys(result).length > 0){

                                    // Create response data
                                    contestInfo = result;
                                    contestInfo.ownerName = accountInfo.username;
                                    contestInfo.ownerImage = accountInfo.image;

                                    // Create response json object
                                    var response = {
                                        status : 'success',
                                        message : '',
                                        data : contestInfo
                                    }

                                    // Callback with message
                                    callback(null, response);

                                } else {
                                    callback(err, null);
                                }
                            })

                        } else {
                            callback(err, null);
                        }
                    })
                } else {
                    callback(err, null);
                }
            });
        } catch(err){
            sails.log.error(err.toString());
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ExpContestInfoServices -> create');
    },

    /**
     * ExpContestInfoServices.update()
     *
     * @param contestInfo
     * @param callback
     */
    update: function (contestInfo, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ExpContestInfoServices -> update');

        try {

            // Check name of group
            ExpContestInfo.find({id : contestInfo.id}).exec(function(err, result){

                // Check error
                if( !err ){

                    // Check result
                    if ( result  && Object.keys(result).length > 0 ) {

                        // Get first result
                        var object = result[0];

                        // Check permission
                        if ( object.owner == contestInfo.owner ) {

                            // Update object
                            object = result.pop();
                            object.name = contestInfo.name;
                            object.description = contestInfo.description;
                            object.updatedAt = new Date();

                            object.save(function(err) {

                                // Get contest info
                                var contest = object;

                                // Find user
                                UserAccountInfo.find({id : contest.owner}).exec(function(err, result){

                                    if(!err){

                                        // Get user info
                                        var userInfo = result.pop();

                                        // Find member info
                                        ExpGroupMember.find({userId : userInfo.id}).exec(function(err, result){
                                            if(!err){

                                                if( result && Object.keys(result).length > 0 && result[0]){

                                                    // Get user info
                                                    var memberInfo = result.pop();

                                                    // Find member info
                                                    ExpGroupInfo.find({id : memberInfo.groupId}).exec(function(err, result){
                                                        if(!err){

                                                            if( result && Object.keys(result).length > 0 && result[0]){

                                                                // Get user info
                                                                var groupInfo = result.pop();

                                                                contest.ownerName = userInfo.username;
                                                                contest.ownerImage = userInfo.image;
                                                                contest.groupName = groupInfo.name;

                                                                // Create response json object
                                                                var response = {
                                                                    status : 'success',
                                                                    message : '',
                                                                    data : contest
                                                                }

                                                                // Callback with message
                                                                callback(null, response);

                                                            } else {

                                                                contest.ownerName = userInfo.username;
                                                                contest.ownerImage = userInfo.image;
                                                                contest.groupName = null;

                                                                // Create response json object
                                                                var response = {
                                                                    status : 'success',
                                                                    message : '',
                                                                    data : contest
                                                                }

                                                                // Callback with message
                                                                callback(null, response);
                                                            }

                                                        } else {
                                                            // Callback with message
                                                            callback(null, response);
                                                        }
                                                    })
                                                } else {

                                                    contest.ownerName = userInfo.username;
                                                    contest.ownerImage = userInfo.image;
                                                    contest.groupName = null;

                                                    // Create response json object
                                                    var response = {
                                                        status : 'success',
                                                        message : '',
                                                        data : contest
                                                    }

                                                    // Callback with message
                                                    callback(null, response);
                                                }
                                            } else {
                                                // Callback with message
                                                callback(null, response);
                                            }
                                        })


                                    } else {
                                        // Callback with message
                                        callback(null, response);
                                    }
                                })

                            });

                        } else {

                            // Create success message
                            var response = {
                                status : 'error',
                                code : 723,
                                message : 'You are not owner of this contest',
                                data : {}
                            }

                            callback(null, response);

                        }

                    } else {

                        // Create success message
                        var response = {
                            status : 'error',
                            code : 722,
                            message : 'Not found any group match with this id',
                            data : {}
                        }

                        callback(null, response);
                    }

                } else {

                    // Callback with error
                    callback(err, null);
                }
            })

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ExpContestInfoServices -> update');
    },

    /**
     * ExpContestInfoServices.update()
     *
     * @param contestInfo
     * @param callback
     */
    remove: function (contestInfo, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ExpContestInfoServices -> remove');

        try {

            // Check name of group
            ExpContestInfo.find({id : contestInfo.id}).exec(function(err, result){

                // Check error
                if( !err ){

                    // Check result
                    if ( result && Object.keys(result).length > 0 ) {

                        // Get first result
                        var object = result[0];

                        // Check permission
                        if ( object.owner == contestInfo.owner ) {

                            // Update object
                            object = result.pop();

                            object.destroy(function(err) {

                                // Create success message
                                var response = {
                                    status : 'success',
                                    message : '',
                                    data : {}
                                }

                                callback(null, response);

                            });

                        } else {

                            // Create success message
                            var response = {
                                status : 'error',
                                code : 723,
                                message : 'You are not owner of this contest',
                                data : {}
                            }

                            callback(null, response);

                        }

                    } else {

                        // Create success message
                        var response = {
                            status : 'error',
                            code : 722,
                            message : 'Not found any contest match with this id',
                            data : {}
                        }

                        callback(null, response);
                    }

                } else {

                    // Callback with error
                    callback(err, null);
                }
            })

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ExpContestInfoServices -> remove');
    },

    /**
     * ExpContestInfoServices.inviteGroup()
     *
     * @param userId
     * @param contestId
     * @param groupIdArray
     * @param callback
     */
    inviteGroup: function (userInfo, contestId, groupIdArray, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ExpContestInfoServices -> inviteGroup');

        try {

            // Check contest
            ExpContestInfo.findOne({id : contestId}).exec(function(err, result) {

                // Check error
                if( !err ){

                    // Check result
                    if ( result && Object.keys(result).length > 0  ) {

                        // Get contestInfo
                        var contestInfo = result;

                        // Processing group id array
                        groupIdArray = groupIdArray.split(',');
                        for(var i = 0; i< groupIdArray.length; i++){
                            if( !isNaN(parseInt(groupIdArray[i].trim() ) )){
                                groupIdArray[i] = parseInt(groupIdArray[i].trim());
                            } else {
                                groupIdArray[i] = 0;
                            }
                        }

                        // Check group
                        ExpGroupInfo.find({id : groupIdArray}).exec(function(err, result) {

                            // Check error
                            if( !err ){

                                // Check result
                                if ( result && Object.keys(result).length > 0  ) {

                                    // Invite each group
                                    var groupIdArray = "";
                                    var data;
                                    for(var i = 0; i< result.length; i++){

                                        // Get group info
                                        var groupInfo = result[i];

                                        // Check duplicate
                                        if(groupIdArray.indexOf(groupInfo.id) < 0 ){
                                            // Create contest invite
                                            var contestInvite = {
                                                contestId : contestId,
                                                groupId : groupInfo.id,
                                                invitedBy : userInfo.id
                                            }

                                            // Save into database
                                            ExpContestInvite.findOrCreate(contestInvite).exec(function(err, result){

                                                if(!err){
                                                    if(result && Object.keys(result).length > 0){

                                                        result.invitedAt = new Date();
                                                        result.save();
                                                    }
                                                } else {
                                                    // Log error
                                                    sails.log.error(err.toString());
                                                }
                                            })

                                            data  = {
                                                userId : userInfo.id,
                                                username : userInfo.username,
                                                userImage : userInfo.image,
                                                userGroup : userInfo.group,
                                                contestId : contestInfo.id,
                                                contestName : contestInfo.name,
                                                contestImage : contestInfo.image,
                                                contestOwner : contestInfo.owner,
                                                groupId : groupInfo.id,
                                                groupName : groupInfo.name,
                                                groupImage : groupInfo.image
                                            }

                                            // Send notification
                                            ChatEventServices.newEvent('invite_join_contest', data, function(err, result){
                                                sails.log(err ? err.toString() : 'No error');
                                            })
                                        }
                                    }

                                    // Create success message
                                    var response = {
                                        status : 'success',
                                        message : '',
                                        data : {}
                                    }

                                    callback(null, response);


                                } else {

                                    // Create success message
                                    var response = {
                                        status : 'error',
                                        code : 712,
                                        message : 'Not found any group match with this id',
                                        data : {}
                                    }

                                    callback(null, response);
                                }

                            } else {

                                // Callback with error
                                callback(err, null);
                            }
                        })

                    } else {

                        // Create response json object
                        var response = {
                            status : 'error',
                            code: 722,
                            message : 'Not found any contest match with this id',
                            data : {}
                        }

                        callback(null, response);
                    }

                } else {

                    // Callback with error
                    callback(err, null);
                }
            })

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ExpContestInfoServices -> inviteGroup');
    },

    /**
     * ExpContestInfoServices.addPlayer()
     *
     * @param contestPlayer
     * @param callback
     */
    addPlayer: function (contestPlayer, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ExpContestInfoServices -> addPlayer');

        try {

            // Check name of group
            ExpContestInfo.findOne({id : contestPlayer.contestId}).exec(function(err, result) {

                // Check error
                if( !err ){

                    // Check result
                    if ( result && Object.keys(result).length > 0  ) {

                        // Check expried date
                        var contestInfo = result;
                        contestInfo.expiredDate = new Date(contestInfo.expiredDate);
                        if( DateTimeUtil.compareDate(contestInfo.expiredDate, new Date()) >= 0 && contestInfo.status == 0 ){

                            // Check member group
                            UserAccountInfo.findOne({id : contestPlayer.userId}).exec(function(err, result){

                                // Check error
                                if( !err ) {

                                    // Check result
                                    if (result && Object.keys(result).length > 0) {

                                        // Get user info
                                        var userInfo = result;
                                        contestPlayer.groupId = userInfo.group;

                                        // Find invite
                                        ExpContestInvite.findOne({contestId : contestPlayer.contestId,
                                                        groupId : contestPlayer.groupId}).exec(function(err, result){
                                            if(!err){
                                                if(result && Object.keys(result).length > 0){

                                                    // Create new object
                                                    ExpContestPlayer.findOrCreate( contestPlayer, function(err, result){

                                                        // Check error
                                                        if ( !err ) {

                                                            // Check result
                                                            if ( result && Object.keys(result).length > 0) {

                                                                // Create success message
                                                                var response = {
                                                                    status : 'success',
                                                                    message : '',
                                                                    data : result
                                                                }

                                                                var data = {
                                                                    userId : userInfo.id,
                                                                    username : userInfo.username,
                                                                    userImage : userInfo.image,
                                                                    contestId : contestInfo.id,
                                                                    contestName : contestInfo.name,
                                                                    contestImage : contestInfo.image,
                                                                    contestOwner : contestInfo.owner,
                                                                    groupId : userInfo.group
                                                                }

                                                                // Send notification
                                                                ChatEventServices.newEvent('join_contest', data, function(err, result){
                                                                    sails.log(err ? err.toString() : 'No error');
                                                                })

                                                                callback(null, response);

                                                            } else {

                                                                // Create error response
                                                                callback(err, null);

                                                            }

                                                        } else {

                                                            // Callback with error
                                                            callback(err, null);
                                                        }

                                                    });

                                                } else {
                                                    // Create success message
                                                    var response = {
                                                        status : 'error',
                                                        code : 743,
                                                        message : 'Your group has not been invited yet.',
                                                        data : {}
                                                    }
                                                    callback(null, response);
                                                }
                                            } else {
                                                callback(err, null);
                                            }
                                        })
                                    } else {

                                        // Create success message
                                        var response = {
                                            status : 'error',
                                            code : 501,
                                            message : 'Internal server error.',
                                            data : {}
                                        }
                                        callback(null, response);
                                    }

                                } else {
                                    callback(err, null);
                                }
                            })
                        } else {

                            // Create success message
                            var response = {
                                status : 'error',
                                code : 724,
                                message : 'This contest has expired',
                                data : {}
                            }
                            callback(null, response);
                        }

                    } else {

                        // Create success message
                        var response = {
                            status : 'error',
                            code : 722,
                            message : 'Not found any contest match with this id',
                            data : {}
                        }
                        callback(null, response);
                    }

                } else {
                    callback(err, null);
                }
            })
        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ExpContestInfoServices -> addPlayer');
    },

    /**
     * ExpContestInfoServices.addMember()
     *
     * @param contestInfo
     * @param callback
     */
    removeMember: function (groupMember, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ExpContestInfoServices -> removeMember');

        try {

            // Check member group
            ExpGroupMember.find(groupMember).exec(function(err, result){

                // Check error
                if( !err ) {

                    // Check result
                    if (result && Object.keys(result).length > 0) {

                        var object = result.pop();

                        // Destroy object
                        object.destroy(function(err){

                            if (!err ) {

                                // Create success message
                                var response = {
                                    status : 'success',
                                    message : '',
                                    data : {}
                                }

                                // Callback with response
                                callback(null, response);

                            } else {

                                // Callback with error
                                callback(err, null);
                            }
                        })

                    } else {

                        // Create error message
                        var response = {
                            status : 'error',
                            code : 713,
                            message : 'You did not join this group.',
                            data : {}
                        }

                        callback(null, response);
                    }

                } else {

                    // Callback with error
                    callback(err, null);
                }
            })

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ExpContestInfoServices -> removeMember');
    },

    /**
     * ExpContestInfoServices.listPlayers()
     *
     * @param contestId
     * @param callback
     */
    listPlayers: function (contestId, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ExpContestInfoServices -> listPlayers');

        try {

            // Check member group
            ExpContestPlayer.find({contestId : contestId}).exec(function(err, result) {

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

                        ExpContestInfo.find({id : contestId}).exec(function(err, result) {

                            // Check error
                            if (!err) {

                                // Check result
                                if (result && Object.keys(result).length > 0) {

                                    // Create success message
                                    var response = {
                                        status : 'success',
                                        message : '',
                                        data : []
                                    }

                                    // Callback with response
                                    callback(null, response);

                                } else {

                                    // Create error message
                                    var response = {
                                        status : 'error',
                                        code : 722,
                                        message : 'Not found any contest match with this id',
                                        data : {}
                                    }

                                    callback(null, response);

                                }
                            } else {
                                // Callback with error
                                callback(err, null);
                            }
                        })
                    }
                } else {

                    // Callback with error
                    callback(err, null);
                }
            })

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ExpContestInfoServices -> listPlayers');
    }

};
