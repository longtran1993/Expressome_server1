/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 7/29/15 3:07 AM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */


module.exports = {

    /**
     * Send feedback email
     *
     * @param req
     * @param res
     */
    sent : function(req, res){

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | FeedbackController -> sent');

        try {

            // Get auth info from session
            var authInfo = res.locals.auth;

            // Get page param
            var content = req.param('content');
            var feedback = {
                from : authInfo.userProfile.email,
                content : content
            };

            // Validation page integer
            ValidationUtil.validate(ValidationModel, feedback, ['content'], function(invalidAttributes) {

                // Check validation
                if ( !invalidAttributes || Object.keys(invalidAttributes).length == 0) {

                    MailerUtil.sendFeedbackEmail(feedback, function(err, result){

                        if(!err){

                            // Create response json object
                            var response = {
                                status : 'success',
                                message : 'Your message is being sent to support team.',
                                data : result
                            }

                            // Response json with invalid message
                            res.json(response);

                        } else {

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
        sails.log.info('== END CONTROLLER   | FeedbackController -> sent');
    }
};
