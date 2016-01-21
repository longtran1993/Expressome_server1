/**
 * Created by Luongtn on 6/19/2015.
 */

module.exports = {
    /**
     * GroupInfoController.create()
     *
     * @param req
     * @param res
     */
    create: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | (CMS)GroupInfoController -> create');

        try {

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var name = req.param('name');
            var description = req.param('description');

            // Create user account info object
            var groupInfo = {
                name : name,
                admin : userId,
                description : description
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, groupInfo, ['name', 'description'], function(invalidAttributes) {

                // Check validation
                if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {


                    // Implement business here
                    CmsExpGroupInfoServices.create(groupInfo, function(err, result){

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
        sails.log.info('== END CONTROLLER   | (CMS)GroupInfoController -> create');
    },

    /**
     * GroupInfoController.detail()
     *
     * @param req
     * @param res
     */
    detail : function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | (CMS)GroupInfoController -> detail');

        try {

            // Get page param
            var id = req.param('id', 0);

            // Check input
            if ( id > 0 ) {

                // Get list object
                CmsExpGroupInfoServices.detail(id, function(err, result) {

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
        sails.log.info('== END CONTROLLER   | (CMS)GroupInfoController -> detail');
    },

    /**
     * GroupInfoController.members()
     *
     * @param req
     * @param res
     */
    members: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | (CMS)GroupInfoController -> members');

        try {

            // Get page param
            var  groupId = req.param('groupId');

            // Create user account info object
            var groupMember = {
                groupId : groupId
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, groupMember, ['groupId'], function(invalidAttributes) {

                // Check validation
                if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {

                    // Implement business here
                    CmsExpGroupInfoServices.listMembers(groupId, function(err, result){

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
        sails.log.info('== END CONTROLLER   | (CMS)GroupInfoController -> leave');
    },

    /**
     * GroupInfoController.update()
     *
     * @param req
     * @param res
     */
    update: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | GroupInfoController -> update');

        try {

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var id = req.param('id');
            var name = req.param('name');
            var description = req.param('description');

            // Create user account info object
            var groupInfo = {
                id : id,
                name : name,
                admin : userId,
                description : description
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, groupInfo,
                ['id', 'name', 'description'], function(invalidAttributes) {

                    // Check validation
                    if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {


                        // Implement business here
                        CmsExpGroupInfoServices.update(groupInfo, function(err, result){

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
        sails.log.info('== END CONTROLLER   | GroupInfoController -> update');
    },

    /**
     * GroupInfoController.close()
     *
     * @param req
     * @param res
     */
    close: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | (CMS)GroupInfoController -> close');

        try {

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var id = req.param('id');

            // Create user account info object
            var groupInfo = {
                id : id,
                admin : userId
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, groupInfo, ['id'], function(invalidAttributes) {

                // Check validation
                if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {


                    // Implement business here
                    CmsExpGroupInfoServices.remove(groupInfo, function(err, result){

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
        sails.log.info('== END CONTROLLER   | (CMS)GroupInfoController -> close');
    },

    /**
     * GroupInfoController.list()
     *
     * @param req
     * @param res
     */
    list: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | (CMS)GroupInfoController -> list');

        try {

            // Get page param
            var page = req.param('page', 1);

            // Get list object
            CmsExpGroupInfoServices.list(page, function(err, result) {

                // Check error
                if ( !err ) {

                    // Check result
                    if (result && Object.keys(result).length > 0 ) {

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
        sails.log.info('== END CONTROLLER   | (CMS)GroupInfoController -> list');
    },

    /**
     * GroupInfoController.join()
     *
     * @param req
     * @param res
     */
    addMembers: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | (CMS)GroupInfoController -> join');

        try {

            // Get login user
            var auth = res.locals.auth;

            // Get page param
            var  groupId = req.param('groupId');
            var  userId = req.param('userId');

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
                    CmsExpGroupInfoServices.addMember(groupMember, function(err, result){

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
        sails.log.info('== END CONTROLLER   | (CMS)GroupInfoController -> join');
    },

    /**
     * GroupInfoController.join()
     *
     * @param req
     * @param res
     */
    removeMembers: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | GroupInfoController -> removeMembers');

        try {

            // Get login user
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var  groupId = req.param('groupId');
            var  userId = req.param('userId');

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
                    CmsExpGroupInfoServices.removeMember(groupMember, function(err, result){

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
        sails.log.info('== END CONTROLLER   | (CMS)GroupInfoController -> removeBanners');
    }




}