/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 7/11/15 12:58 PM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */


module.exports = {

    resetBadge : function(req, res){

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | NotificationController -> resetBadge');

        try {

            // Get auth info from session
            var authInfo = res.locals.auth;
            var deviceInfo = authInfo.deviceInfo;

            // Get page param
            var notifyType = req.param('notifyType', 'test_apns');
            var deviceNotify = {
                notifyType :notifyType
            };

            // Validation page integer
            ValidationUtil.validate(ValidationModel, deviceNotify, ['notifyType'], function(invalidAttributes) {

                // Check validation
                if ( !invalidAttributes || Object.keys(invalidAttributes).length == 0) {

                    NotificationServices.resetBadge(deviceInfo, notifyType, function(err, result){

                            // Check error
                            if( !err ){

                                res.json(result);

                            } else {
                                // Create response json object
                                var response = {
                                    status : 'error',
                                    code: 501,
                                    message : 'Internal server error',
                                    data : err.toString()
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
        sails.log.info('== END CONTROLLER   | NotificationController -> resetBadge');
    }
};
