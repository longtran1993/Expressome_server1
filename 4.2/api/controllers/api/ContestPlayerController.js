/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 6/7/15 2:33 PM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

module.exports = {

    /**
     * ContestPlayerController.listPlayerRound1()
     */
    listPlayerRound1: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestPlayerController -> listPlayerRound1');

        // Get list player round 1
        try{

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;
            var groupId = auth.userProfile.group;

            // Get page param
            var contestId = req.param('contestId');

            // Create user account info object
            var contestPlayer = {
                contestId : contestId
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, contestPlayer, ['contestId'], function(invalidAttributes) {

                // Check validation
                if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {

                    // Implement business here
                    ExpContestPlayerServices.listPlayerRound1(userId, groupId, contestId, function(err, result){

                        // Check error
                        if (!err) {

                            // Check result
                            if ( result && Object.keys(result).length > 0 ) {

                                // Response json with message
                                res.json(result);

                            } else {

                                // Create response json object
                                var response = {
                                    status : 'error',
                                    code: 501,
                                    message : '',
                                    data : {}
                                }

                                // Response json with error message
                                res.json(response);

                            }
                        } else {

                            // Create response json object
                            var response = {
                                status : 'error',
                                code: 501,
                                message : '',
                                data : err.toString()
                            }

                            // Response json with error message
                            res.json(response);
                        }

                    });

                }else{
                    // Create response json object
                    var response = {
                        status : 'error',
                        code: 502,
                        message : 'The input param is incorrect. Please correct them and try again.',
                        data : invalidAttributes
                    }

                    // Response json with invalid message
                    res.json(response);
                }

            });

        }catch(err){

            // Create response json object
            var response = {
                status : 'error',
                code: 501,
                message : '',
                data : err.toString()
            }

            // Response json with exception message
            res.json(response);
        }

        // Log end function
        sails.log.info('== END CONTROLLER | ContestPlayerController -> listPlayerRound1');

    },

    /**
     * ContestPlayerController.voteRound1()
     *
     * @param contestId
     * @param callback
     */
    voteRound1: function (req, res){
        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestPlayerController -> voteRound1');

        // Vote player round 1
        try {

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var playerId = req.param('playerId');

            // Create user account info object
            var contestPlayer = {
                playerId : playerId
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, contestPlayer, ['playerId'], function checkContestPlayerIdValid(invalidAttributes) {

                // Check validation
                if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {

                    // Implement business here
                    ExpContestPlayerServices.votePlayerRound1(userId, playerId, function(err, result){

                        // Check error
                        if (!err) {

                            // Check result
                            if ( result && Object.keys(result).length > 0 ) {

                                // Response json with message
                                res.json(result);

                            } else {

                                // Create response json object
                                var response = {
                                    status : 'error',
                                    code: 501,
                                    message : '',
                                    data : {}
                                }

                                // Response json with error message
                                res.json(response);

                            }
                        } else {

                            // Create response json object
                            var response = {
                                status : 'error',
                                code: 501,
                                message : '',
                                data : err.toString()
                            }

                            // Response json with error message
                            res.json(response);
                        }

                    });

                }else{
                    // Create response json object
                    var response = {
                        status : 'error',
                        code: 502,
                        message : 'The input param is incorrect. Please correct them and try again.',
                        data : invalidAttributes
                    }

                    // Response json with invalid message
                    res.json(response);
                }

            });

        }catch(err){

            // Create response json object
            var response = {
                status : 'error',
                code: 501,
                message : '',
                data : err.toString()
            }

            // Response json with exception message
            res.json(response);
        }

        // Log end function
        sails.log.info('== END CONTROLLER | ContestPlayerController -> voteRound1');
    },

    /**
     * ContestPlayerController.listPlayerRound2()
     */
    listPlayerRound2: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestPlayerController -> listPlayerRound2');

        // Get list player round 1
        try{

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var contestId = req.param('contestId');

            // Create user account info object
            var contestPlayer = {
                contestId : contestId
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, contestPlayer, ['contestId'], function(invalidAttributes) {

                // Check validation
                if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {

                    // Implement business here
                    ExpContestPlayerServices.listPlayerRound2(userId, contestId, function(err, result){

                        // Check error
                        if (!err) {

                            // Check result
                            if ( result && Object.keys(result).length > 0 ) {

                                // Response json with message
                                res.json(result);

                            } else {

                                // Create response json object
                                var response = {
                                    status : 'error',
                                    code: 501,
                                    message : '',
                                    data : {}
                                }

                                // Response json with error message
                                res.json(response);

                            }
                        } else {

                            // Create response json object
                            var response = {
                                status : 'error',
                                code: 501,
                                message : '',
                                data : err.toString()
                            }

                            // Response json with error message
                            res.json(response);
                        }

                    });

                }else{
                    // Create response json object
                    var response = {
                        status : 'error',
                        code: 502,
                        message : 'The input param is incorrect. Please correct them and try again.',
                        data : invalidAttributes
                    }

                    // Response json with invalid message
                    res.json(response);
                }

            });

        }catch(err){

            // Create response json object
            var response = {
                status : 'error',
                code: 501,
                message : '',
                data : err.toString()
            }

            // Response json with exception message
            res.json(response);
        }

        // Log end function
        sails.log.info('== END CONTROLLER | ContestPlayerController -> listPlayerRound2');

    },

    /**
     * ContestPlayerController.voteRound2()
     *
     * @param contestId
     * @param callback
     */
    voteRound2: function (req, res){
        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestPlayerController -> voteRound2');

        // Vote player round 1
        try {

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var playerId = req.param('playerId');

            // Create user account info object
            var contestPlayer = {
                playerId : playerId
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, contestPlayer, ['playerId'], function checkContestPlayerIdValid(invalidAttributes) {

                // Check validation
                if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {

                    // Implement business here
                    ExpContestPlayerServices.votePlayerRound2(userId, playerId, function(err, result){

                        // Check error
                        if (!err) {

                            // Check result
                            if ( result && Object.keys(result).length > 0 ) {

                                // Response json with message
                                res.json(result);

                            } else {

                                // Create response json object
                                var response = {
                                    status : 'error',
                                    code: 501,
                                    message : '',
                                    data : {}
                                }

                                // Response json with error message
                                res.json(response);

                            }
                        } else {

                            // Create response json object
                            var response = {
                                status : 'error',
                                code: 501,
                                message : '',
                                data : err.toString()
                            }

                            // Response json with error message
                            res.json(response);
                        }

                    });

                }else{
                    // Create response json object
                    var response = {
                        status : 'error',
                        code: 502,
                        message : 'The input param is incorrect. Please correct them and try again.',
                        data : invalidAttributes
                    }

                    // Response json with invalid message
                    res.json(response);
                }

            });

        }catch(err){

            // Create response json object
            var response = {
                status : 'error',
                code: 501,
                message : '',
                data : err.toString()
            }

            // Response json with exception message
            res.json(response);
        }

        // Log end function
        sails.log.info('== END CONTROLLER | ContestPlayerController -> voteRound2');
    },

    /**
     * ContestPlayerController.getTopPlayerOfContest()
     *
     * @param req
     * @param res
     */
    getTopWinner : function (req, res){
        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestPlayerController -> getTopPlayerOfContest');

        // Get top player of contest
        try{

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var contestId = req.param('contestId');

            // Create user account info object
            var contestPlayer = {
                contestId : contestId
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, contestPlayer, ['contestId'], function(invalidAttributes) {

                // Check validation
                if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {

                    // Implement business here
                    ExpContestPlayerServices.listTopWinner(userId, contestId, function(err, result){

                        // Check error
                        if (!err) {

                            // Check result
                            if ( result && Object.keys(result).length > 0 ) {

                                // Response json with message
                                res.json(result);

                            } else {

                                // Create response json object
                                var response = {
                                    status : 'error',
                                    code: 501,
                                    message : '',
                                    data : {}
                                }

                                // Response json with error message
                                res.json(response);

                            }
                        } else {

                            // Create response json object
                            var response = {
                                status : 'error',
                                code: 501,
                                message : '',
                                data : err.toString()
                            }

                            // Response json with error message
                            res.json(response);
                        }

                    });

                }else{
                    // Create response json object
                    var response = {
                        status : 'error',
                        code: 502,
                        message : 'The input param is incorrect. Please correct them and try again.',
                        data : invalidAttributes
                    }

                    // Response json with invalid message
                    res.json(response);
                }

            });

        }catch(err){

            // Create response json object
            var response = {
                status : 'error',
                code: 501,
                message : '',
                data : err.toString()
            }

            // Response json with exception message
            res.json(response);
        }

        // Log end function
        sails.log.info('== END CONTROLLER | ContestPlayerController -> voteRound1');

    }

}