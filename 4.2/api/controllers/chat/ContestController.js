/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 7/16/15 12:48 AM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

module.exports = {

    /**
     * Join into contest chat
     *
     * @param req
     * @param res
     */
    join : function(req, res){

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestController -> join');

        try {

            // Check request type is socket or not
            if( req.isSocket ) {

                // Get input
                var contestId = req.param('contestId');

                // Declare auth object
                var roomInfo = {
                    contestId : contestId
                }

                console.log(contestId);

                // Validate parameters & cast value
                ValidationUtil.validate(ValidationModel, roomInfo, ["contestId"], function(invalidAttributes) {

                    // Check validation
                    if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {

                        // Join socket
                        ChatRoomServices.joinContestChat(req.socket, contestId, function(err, result){

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
        sails.log.info('== END CONTROLLER   | ContestController -> join');

    },

    message : function(req, res){

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestController -> message');

        try {

            // Check request type is socket or not
            if( req.isSocket ){

                // Get input
                var contestId = req.param('contestId');
                var message = req.param('message');

                // Declare auth object
                var messageObj = {
                    contestId : contestId,
                    message : message
                }

                // Validate parameters & cast value
                ValidationUtil.validate(ValidationModel, messageObj, ["contestId", "message"], function(invalidAttributes) {

                    // Check validation
                    if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {

                        // Join socket
                        ChatMessageServices.contestChatMessage(req.socket, contestId, message, function(err, result){

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
        sails.log.info('== END CONTROLLER   | ContestController -> message');

    },

    leave : function(req, res){

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ContestController -> leave');

        try {

            // Check request type is socket or not
            if( req.isSocket ){

                // Get input
                var contestId = req.param('contestId');

                // Declare auth object
                var messageObj = {
                    contestId : contestId
                }

                // Validate parameters & cast value
                ValidationUtil.validate(ValidationModel, messageObj, ["contestId"], function(invalidAttributes) {

                    // Check validation
                    if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {

                        //// Join socket
                        //ChatMessageServices.groupPageMessage(req.socket, messageObj.message, function(err, result){
                        //
                        //    if( !err ){
                        //
                        //        // Response json with message
                        //        res.json(result);
                        //
                        //    } else {
                        //
                        //        // Create response json object
                        //        var response = {
                        //            status : 'error',
                        //            code: 501,
                        //            message : '',
                        //            data : err.toString()
                        //        }
                        //
                        //        // Response json with error message
                        //        res.json(response);
                        //    }
                        //})

                        var roomName = 'contestchat_' + contestId;

                        sails.sockets.leave( socket, roomName );


                        // Create response json object
                        var response = {
                            status : 'success',
                            code: 200,
                            message : 'Good bye.',
                            data : {}
                        }

                        // Response json with invalid message
                        res.json(response);


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
        sails.log.info('== END CONTROLLER   | ContestController -> leave');

    }

};
