/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 5/4/15 8:45 PM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */


module.exports = {

    /**
     * ContestInfoController.list()
     *
     * @param req
     * @param res
     */
    list: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestInfoController -> list');

        try {

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var page = req.param('page', 1);

            // Get list object
            ExpContestInfoServices.list(userId, page, function(err, result) {

                // Check error
                if ( !err ) {

                    // Check result
                    if (result && Object.keys(result).length > 0 ) {

                        // Add current time
                        result.currentTime = new Date();

                        // Create response json object
                        var response = {
                            status : 'success',
                            message : '',
                            data : result
                        }

                        // Response json with success message
                        res.json(response);

                    } else {

                        // Create response json object
                        var response = {
                            status: 'error',
                            code: 501,
                            message: 'Internal server error',
                            data: {}
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

                    // Response json with exception message
                    res.json(response);
                }
            });

        } catch(err) {

            // Log error
            sails.log.error(err.toString());

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
        sails.log.info('== END CONTROLLER   | ContestInfoController -> list');
    },

    /**
     * ContestInfoController.listNew()
     *
     * @param req
     * @param res
     */
    listNew: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestInfoController -> listNew');

        try {

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var page = req.param('page', 1);
            var pageInfo = {
                'page':page
            };
            // Validation page integer
            ValidationUtil.validate(ValidationModel,
                pageInfo, ['page'], function(invalidAttributes) {
                    // Check validation
                    if (invalidAttributes && Object.keys(invalidAttributes).length > 0) {
                        page = 1;
                    }
                });

            // Get list object
            ExpContestInfoServices.listNew(userId, page, function(err, result) {

                // Check error
                if ( !err ) {

                    // Check result
                    if (result && Object.keys(result).length > 0 ) {

                        // Add current time
                        result.currentTime = new Date();

                        // Create response json object
                        var response = {
                            status : 'success',
                            message : '',
                            data : result
                        }

                        // Response json with success message
                        res.json(response);

                    } else {

                        // Create response json object
                        var response = {
                            status: 'error',
                            code: 501,
                            message: 'Internal server error',
                            data: {}
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

                    // Response json with exception message
                    res.json(response);
                }
            });

        } catch(err) {

            // Log error
            sails.log.error(err.toString());

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
        sails.log.info('== END CONTROLLER   | ContestInfoController -> listNew');
    },

    /**
     * ContestInfoController.listOngoing()
     *
     * @param req
     * @param res
     */
    listOngoing: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestInfoController -> listOngoing');

        try {

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var page = req.param('page', 1);
            var pageInfo = {
                'page':page
            };
            // Validation page integer
            ValidationUtil.validate(ValidationModel,
                pageInfo, ['page'], function(invalidAttributes) {
                    // Check validation
                    if (invalidAttributes && Object.keys(invalidAttributes).length > 0) {
                        page = 1;
                    }
                });

            // Get list object
            ExpContestInfoServices.listOngoing(userId, page, function(err, result) {

                // Check error
                if ( !err ) {

                    // Check result
                    if (result && Object.keys(result).length > 0 ) {

                        // Add current time
                        result.currentTime = new Date();

                        // Create response json object
                        var response = {
                            status : 'success',
                            message : '',
                            data : result
                        }

                        // Response json with success message
                        res.json(response);

                    } else {

                        // Create response json object
                        var response = {
                            status: 'error',
                            code: 501,
                            message: 'Internal server error',
                            data: {}
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

                    // Response json with exception message
                    res.json(response);
                }
            });

        } catch(err) {

            // Log error
            sails.log.error(err.toString());

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
        sails.log.info('== END CONTROLLER   | ContestInfoController -> listOngoing');
    },

    /**
     * ContestInfoController.listDone()
     *
     * @param req
     * @param res
     */
    listDone: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestInfoController -> listDone');

        try {

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var page = req.param('page', 1);
            var pageInfo = {
                'page':page
            };

            // Validation page integer
            ValidationUtil.validate(ValidationModel,
                pageInfo, ['page'], function(invalidAttributes) {
                    // Check validation
                    if (invalidAttributes && Object.keys(invalidAttributes).length > 0) {
                        page = 1;
                    }
                });

            // Get list object
            ExpContestInfoServices.listDone(userId, page, function(err, result) {

                // Check error
                if ( !err ) {

                    // Check result
                    if (result && Object.keys(result).length > 0 ) {

                        // Add current time
                        result.currentTime = new Date();

                        // Create response json object
                        var response = {
                            status : 'success',
                            message : '',
                            data : result
                        }

                        // Response json with success message
                        res.json(response);

                    } else {

                        // Create response json object
                        var response = {
                            status: 'error',
                            code: 501,
                            message: 'Internal server error',
                            data: {}
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

                    // Response json with exception message
                    res.json(response);
                }
            });

        } catch(err) {

            // Log error
            sails.log.error(err.toString());

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
        sails.log.info('== END CONTROLLER   | ContestInfoController -> listDone');
    },

    /**
     * ContestInfoController.search()
     *
     * @param req
     * @param res
     */
    search : function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestInfoController -> search');

        try {

            // Get page param
            var page = req.param('page', 1);
            var name = req.param('name', '');

            // Get list object
            ExpContestInfoServices.search(name, page, function(err, result) {

                // Check error
                if ( !err ) {

                    // Check result
                    if ( result && Object.keys(result).length > 0 ) {

                        // Create response json object
                        var response = {
                            status : 'success',
                            message : '',
                            data : result
                        }

                        // Response json with success message
                        res.json(response);

                    } else {

                        // Create response json object
                        var response = {
                            status : 'error',
                            code: 501,
                            message : '',
                            data : {}
                        }

                        // Response json with exception message
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

                    // Response json with exception message
                    res.json(response);
                }
            });

        } catch(err) {

            // Log error
            sails.log.error(err.toString());

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
        sails.log.info('== END CONTROLLER   | ContestInfoController -> search');
    },

    /**
     * ContestInfoController.detail()
     *
     * @param req
     * @param res
     */
    detail : function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestInfoController -> detail');

        try {

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var id = req.param('id', 0);

            // Check input
            if ( id > 0 ) {

                // Get list object
                ExpContestInfoServices.detail(userId, id, function(err, result) {

                    // Check error
                    if ( !err ) {

                        // Check result
                        if ( result && Object.keys(result).length > 0 ) {

                            // Response json with success message
                            res.json(result);

                        } else {

                            // Create response json object
                            var response = {
                                status : 'error',
                                code: 501,
                                message : 'Internal server error.',
                                data : {}
                            }

                            // Response json with exception message
                            res.json(response);

                        }
                    } else {

                        // Create response json object
                        var response = {
                            status : 'error',
                            code: 501,
                            message : 'Internal server error.',
                            data : err.toString()
                        }

                        // Response json with exception message
                        res.json(response);
                    }
                });

            } else {

                // Create response json object
                var response = {
                    status : 'error',
                    code: 502,
                    message : 'The input param is incorrect. Please correct them and try again.',
                    data : {
                        id : [
                            {
                                rule: "integer",
                                "message": "`undefined` should be a integer (instead of \"null\", which is a object)"
                            },
                            {
                                "rule": "required",
                                "message": "\"required\" validation rule failed for input: null"
                            }
                        ]
                    }
                }

                // Response json with invalid message
                res.json(response);

            }

        } catch(err) {

            // Log error
            sails.log.error(err.toString());

            // Create response json object
            var response = {
                status : 'error',
                code: 501,
                message : 'Internal server error.',
                data : err.toString()
            }

            // Response json with exception message
            res.json(response);
        }

        // Log end function
        sails.log.info('== END CONTROLLER   | ContestInfoController -> detail');
    },

    /**
     * ContestInfoController.create()
     *
     * @param req
     * @param res
     */
    create: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestInfoController -> create');

        try {

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var name = req.param('name');
            var description = req.param('description');
            var expiredDate = req.param('expiredDate');

            console.log(name);
            console.log(description);

            // Create user account info object
            var contestInfo = {
                name : name,
                owner : userId,
                description : description,
                expiredDate : expiredDate
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, contestInfo,
                            ['name', 'description', 'expiredDate'], function(invalidAttributes) {

                // Check validation
                if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {


                    // Implement business here
                    ExpContestInfoServices.create(contestInfo, function(err, result){

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

                } else {

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

        } catch(err) {

            // Log error
            sails.log.error(err.toString());

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

        // Log end function
        sails.log.info('== END CONTROLLER   | ContestInfoController -> create');
    },

    /**
     * ContestInfoController.update()
     *
     * @param req
     * @param res
     */
    update: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestInfoController -> update');

        try {

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var id = req.param('id');
            var name = req.param('name');
            var description = req.param('description');
            var expiredDate = req.param('expiredDate');

            // Create user account info object
            var contestInfo = {
                id : id,
                name : name,
                owner : userId,
                description : description,
                expiredDate : expiredDate
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, contestInfo,
                                    ['id', 'name', 'description', 'expiredDate'], function(invalidAttributes) {

                // Check validation
                if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {


                    // Implement business here
                    ExpContestInfoServices.update(contestInfo, function(err, result){

                        // Check error
                        if (!err) {

                            // Check result
                            if ( result  && Object.keys(result).length > 0 ) {

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

                } else {

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

        } catch(err) {

            // Log error
            sails.log.error(err.toString());

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

        // Log end function
        sails.log.info('== END CONTROLLER   | ContestInfoController -> update');
    },

    /**
     * ContestInfoController.remove()
     *
     * @param req
     * @param res
     */
    remove: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestInfoController -> remove');

        try {

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var id = req.param('id');

            // Create user account info object
            var contestInfo = {
                id : id,
                owner : userId
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, contestInfo, ['id'], function(invalidAttributes) {

                // Check validation
                if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {


                    // Implement business here
                    ExpContestInfoServices.remove(contestInfo, function(err, result){

                        // Check error
                        if (!err) {

                            // Check result
                            if ( result  && Object.keys(result).length > 0 ) {

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

                } else {

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

        } catch(err) {

            // Log error
            sails.log.error(err.toString());

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

        // Log end function
        sails.log.info('== END CONTROLLER   | ContestInfoController -> remove');
    },

    /**
     * ContestInfoController.invite()
     *
     * @param req
     * @param res
     */
    invite: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestInfoController -> invite');

        try {

            // Get login user
            var userInfo = res.locals.auth. userProfile;

            // Get page param
            var  contestId = req.param('contestId');
            var  groupIdArray = req.param('groupIdArray');

            // Create user account info object
            var contestInvite = {
                contestId : contestId,
                groupIdArray : groupIdArray
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, contestInvite, ['contestId', 'groupIdArray'], function(invalidAttributes) {

                // Check validation
                if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {

                    // Invite group into contest
                    ExpContestInfoServices.inviteGroup(userInfo, contestId, groupIdArray, function(err, result){

                        // Check error
                        if (!err) {

                            // Check result
                            if ( result  && Object.keys(result).length > 0 ) {

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
                    })

                } else {

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

        } catch(err) {

            // Log error
            sails.log.error(err.toString());

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

        // Log end function
        sails.log.info('== END CONTROLLER   | ContestInfoController -> invite');
    },

    /**
     * ContestInfoController.join()
     *
     * @param req
     * @param res
     */
    join: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestInfoController -> join');

        try {

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var  contestId = req.param('contestId');

            // Create user account info object
            var contestPlayer = {
                userId : userId,
                contestId : contestId
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, contestPlayer, ['userId', 'contestId'], function(invalidAttributes) {

                // Check validation
                if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {


                    // Implement business here
                    ExpContestInfoServices.addPlayer(contestPlayer, function(err, result){

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

                } else {

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

        } catch(err) {

            // Log error
            sails.log.error(err.toString());

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

        // Log end function
        sails.log.info('== END CONTROLLER   | ContestInfoController -> join');
    },

    /**
     * ContestInfoController.join()
     *
     * @param req
     * @param res
     */
    leave: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestInfoController -> leave');

        try {

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var  groupId = req.param('groupId');

            // Create user account info object
            var groupMember = {
                userId : userId,
                groupId : groupId
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, groupMember, ['userId', 'groupId'], function(invalidAttributes) {

                // Check validation
                if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {


                    // Implement business here
                    ExpContestInfoServices.removeMember(groupMember, function(err, result){

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

                } else {

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

        } catch(err) {

            // Log error
            sails.log.error(err.toString());

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

        // Log end function
        sails.log.info('== END CONTROLLER   | ContestInfoController -> leave');
    },

    /**
     * ContestInfoController.players()
     *
     * @param req
     * @param res
     */
    players: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestInfoController -> players');

        try {

            // Get page param
            var  contestId = req.param('contestId');

            // Create user account info object
            var contestPlayer = {
                contestId : contestId
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, contestPlayer, ['contestId'], function(invalidAttributes) {

                // Check validation
                if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {


                    // Implement business here
                    ExpContestInfoServices.listPlayers(contestId, function(err, result){

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

                } else {

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

        } catch(err) {

            // Log error
            sails.log.error(err.toString());

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

        // Log end function
        sails.log.info('== END CONTROLLER   | ContestInfoController -> players');
    }

};
