/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 5/28/15 2:31 AM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

module.exports = {

    /**
     * Join socket with group chat
     * @param req
     * @param res
     */
    join : function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | GroupPageController -> join');

        try {

            // Check request type is socket or not
            if( req.isSocket ){

                // Get input
                var authToken = req.param('authToken');

                // Declare auth object
                var authObj = {
                    authToken : authToken
                }

                // Validate parameters & cast value
                ValidationUtil.validate(ValidationModel, authObj,
                    ["authToken"], function(invalidAttributes) {

                        // Check validation
                        if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {

                            // Join socket
                            ChatSocketConnectServices.join(req.socket, authObj.authToken, function(err, result){

                                if( !err ){

                                    // Response json with message
                                    res.json(result);

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

            } else {

                // Create response json object
                var response = {
                    status : 'error',
                    code: 731,
                    message : 'Request must be socket.'
                }

                //console.log(response);

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
                message : '',
                data : err.toString()
            }

            // Response json with error message
            res.json(response);
        }

        // Log end function
        sails.log.info('== END CONTROLLER   | GroupPageController -> join');
    },

    /**
     * Send message
     *
     * @param req
     * @param res
     */
    message : function(req, res){

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | GroupPageController -> message');

        try {

            // Check request type is socket or not
            if( req.isSocket ){

                // Get input
                var message = req.param('message');

                // Declare auth object
                var messageObj = {
                    message : message
                }

                // Validate parameters & cast value
                ValidationUtil.validate(ValidationModel, messageObj, ["message"], function(invalidAttributes) {

                    // Check validation
                    if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {

                        // Join socket
                        ChatMessageServices.groupPageMessage(req.socket, messageObj.message, function(err, result){

                            if( !err ){

                                // Response json with message
                                res.json(result);

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

            } else {

                // Create response json object
                var response = {
                    status : 'error',
                    code: 731,
                    message : 'Request must be socket.'
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
                message : '',
                data : err.toString()
            }

            // Response json with error message
            res.json(response);
        }

        // Log end function
        sails.log.info('== END CONTROLLER   | GroupPageController -> message');

    }

};
