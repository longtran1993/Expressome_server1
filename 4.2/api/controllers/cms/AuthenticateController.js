/**
 * Created by Luongtn on 6/19/2015.
 */

module.exports = {

    /**
     * AuthenticateController.login()
     */
    login: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | (CMS)AuthenticateController -> login');

        try {

            // Get page param
            var username = req.param('username');
            var password = req.param('password');
            var deviceType = req.param('deviceType');
            var deviceName = req.param('deviceName');
            var udid = req.param('udid');
            // Trim whitespace
            udid = udid ? udid.trim() : udid;
            var machineCode = req.param('machineCode');

            // Create user account info object
            var userAccountInfo = {
                username : username,
                password : password
            }

            // Create user device info object
            var userDeviceInfo = {
                deviceType : deviceType,
                deviceName : deviceName,
                udid : udid,
                machineCode : machineCode
            }

            // Validate parameters & cast value
            ValidationUtil.multiValidate([ValidationModel, ValidationModel], [userAccountInfo, userDeviceInfo],
                [['username', 'password'], ['deviceType', 'deviceName', 'udid']],
                function(invalidAttributes) {

                    // Check validation
                    if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {


                        // Implement business here
                        CmsAuthenticateServices.login(userAccountInfo, userDeviceInfo, function(err, result){

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
        sails.log.info('== END CONTROLLER   | (CMS)AuthenticateController -> login');
    },

    /**
     * AuthenticateController.logout()
     *
     * @param req
     * @param res
     */
    logout: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | (CMS)AuthenticateController -> logout');

        try {

            // Get auth info from session
            var authInfo = res.locals.auth;
            //console.log(authInfo);
            var userAuthId = authInfo.authToken.id;
            var userDeviceId = authInfo.deviceInfo.id;

            // Implement business here
            CmsAuthenticateServices.logout(userAuthId, userDeviceId, function(err, result){

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
        sails.log.info('== END CONTROLLER   | (CMS)AuthenticateController -> logout');
    },

    /**
     * AuthenticateController.resetPassword()
     *
     * @param req
     * @param res
     */
    resetPassword: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | (CMS)AuthenticateController -> resetPassword');

        try {

            // Get page param
            var email = req.param('email');

            // Create password info object
            var accountInfo = {
                email: email
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, accountInfo, ['email'], function(invalidAttributes) {

                // Check validation
                if (!invalidAttributes || Object.keys(invalidAttributes).length == 0) {

                    // Call service to change password
                    CmsAuthenticateServices.resetPassword(email, function (err, result) {

                        // Check error
                        if (!err) {

                            // Check result
                            if ( result && Object.keys(result).length > 0 ) {

                                // Response json with message
                                res.json(result);

                            } else {

                                // Create response json object
                                var response = {
                                    status: 'error',
                                    code: 501,
                                    message: '',
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

            })

        } catch (err) {

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
        sails.log.info('== END CONTROLLER | (CMS)AuthenticateController -> resetPassword');
    },

    /**
     * AuthenticateController.setPassword()
     *
     * @param req
     * @param res
     */
    setPassword: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | (CMS)AuthenticateController -> setPassword');

        try {

            // Get page param
            var token = req.param('token');
            var newPassword = req.param('newPassword');
            var confirmPassword = req.param('confirmPassword');

            // Create password info object
            var inputObject = {
                token: token,
                newPassword: newPassword,
                confirmPassword: confirmPassword
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel,
                inputObject, ['token', 'newPassword', 'confirmPassword'], function(invalidAttributes) {

                    // Check validation
                    if (!invalidAttributes || Object.keys(invalidAttributes).length == 0) {

                        // Check new password && confirm password
                        if( newPassword === confirmPassword ) {

                            // Call service to set new password
                            CmsAuthenticateServices.setPassword(token, newPassword, function (err, result) {

                                // Check error
                                if (!err) {

                                    // Check result
                                    if ( result && Object.keys(result).length > 0 ) {

                                        // Response json with message
                                        res.json(result);

                                    } else {

                                        // Create response json object
                                        var response = {
                                            status: 'error',
                                            code: 501,
                                            message: '',
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
                        } else {

                            // Create error message : confirm password not match
                            var response = {
                                status: 'error',
                                code: 706,
                                message: "The confirm password does not match with new password.",
                                data: {}
                            }

                            // Response json with error message
                            res.json(response);
                        }

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

                })

        } catch (err) {

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
        sails.log.info('== END CONTROLLER | (CMS)AuthenticateController -> setPassword');
    },

    /**
     * AuthenticateController.updateProfile()
     *
     * @param req
     * @param res
     */
    updateProfile: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | (CMS)AuthenticateController -> updateProfile');

        try {
            // Get user id
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param

            // Create user account info object
            var userAccountInfo = {
                id: userId
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel,
                userAccountInfo, ['username','password'], function(invalidAttributes) {

                    // Check validation
                    if (!invalidAttributes || Object.keys(invalidAttributes).length == 0) {

                        // Call service to set new password
                        CmsAuthenticateServices.updateProfile(userAccountInfo, function (err, result) {

                            // Check error
                            if (!err) {

                                // Check result
                                if ( result && Object.keys(result).length > 0 ) {

                                    // Response json with message
                                    res.json(result);

                                } else {

                                    // Create response json object
                                    var response = {
                                        status: 'error',
                                        code: 501,
                                        message: '',
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

                })

        } catch (err) {

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
        sails.log.info('== END CONTROLLER   | (CMS)AuthenticateController -> updateProfile');
    }
}