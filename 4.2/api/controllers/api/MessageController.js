/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 6/28/15 11:16 PM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

module.exports = {

    grouppage : function(req, res){

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | MessageController -> grouppage');

        try {

            // Get auth info from session
            var authInfo = res.locals.auth;

            // Get page param
            var page = req.param('page', 1);
            var pageInfo = {
                'page':page
            };

            // Validation page integer
            ValidationUtil.validate(ValidationModel, pageInfo, ['page'], function(invalidAttributes) {

                // Check validation
                if ( !invalidAttributes || Object.keys(invalidAttributes).length == 0) {

                    ChatMessageServices.groupPageAllMessage(authInfo.userProfile.group, authInfo.userProfile.joinedAt, page, function(err, result){

                        // Check error
                        if( !err && result && Object.keys(result).length > 0){

                            res.json(result);

                        } else {
                            // Create response json object
                            var response = {
                                status : 'error',
                                code: 501,
                                message : 'Internal server error',
                                data : err ? err.toString() : {}
                            }
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
        sails.log.info('== END CONTROLLER   | MessageController -> grouppage');
    },

    contestchat : function(req, res){

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | MessageController -> contestchat');

        try {

            // Get auth info from session
            var authInfo = res.locals.auth;

            // Get page param
            var page = req.param('page', 1);
            var contestId = req.param('contestId');
            var pageInfo = {
                'page':page,
                contestId : contestId
            };

            // Validation page integer
            ValidationUtil.validate(ValidationModel, pageInfo, ['contestId', 'page'], function(invalidAttributes) {

                // Check validation
                if ( !invalidAttributes || Object.keys(invalidAttributes).length == 0) {

                    ChatMessageServices.contestChatAllMessage(contestId, authInfo.userProfile.id,page, function(err, result){

                        // Check error
                        if( !err && result && Object.keys(result).length > 0){

                            res.json(result);

                        } else {
                            // Create response json object
                            var response = {
                                status : 'error',
                                code: 501,
                                message : 'Internal server error',
                                data : err ? err.toString() : {}
                            }
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
        sails.log.info('== END CONTROLLER   | MessageController -> contestchat');
    }
};
