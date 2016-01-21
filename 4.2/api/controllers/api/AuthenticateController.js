/**
 * AuthenticateController
 *
 * @description :: Server-side logic for managing authenticates
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * AuthenticateController.registry()
     *
     * @param req
     * @param res
     */
    registry: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | AuthenticateController -> registry');

        try {

            // Get page param
            var username = req.param('username');
            // Trim space
            username = username ? username.trim() : username;
            var password = req.param('password');
            var email = req.param('email');
            var deviceType = req.param('deviceType');
            var deviceName = req.param('deviceName');
            var udid = req.param('udid');
            // Trim space
            udid = udid ? udid.trim() : udid;
            var machineCode = req.param('machineCode');

            // Create user account info object
            var userAccountInfo = {
                username : username,
                password : password,
                email : email
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
                     [['username', 'password', 'email'], ['deviceType', 'deviceName', 'udid']], function(invalidAttributes) {

                    // Check validation
                    if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {


                        // Implement business here
                        UserAuthServices.registry(userAccountInfo, userDeviceInfo, function(err, result){

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
        sails.log.info('== END CONTROLLER   | AuthenticateController -> registry');
    },

    /**
     * `AuthenticateController.login()`
     */
    login: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | AuthenticateController -> login');

        try {

            // Get page param
            var username = req.param('username');
            var email = req.param('email');
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
                email : email,
                password : password
            }

            // Create user device info object
            var userDeviceInfo = {
                deviceType : deviceType,
                deviceName : deviceName,
                udid : udid,
                machineCode : machineCode
            }

            console.log("Machine code param in login request: " + machineCode);

            // Login by username
            if(!email){

                // Validate parameters & cast value
                ValidationUtil.multiValidate([ValidationModel, ValidationModel], [userAccountInfo, userDeviceInfo],
                    [['username', 'password'], ['deviceType', 'deviceName', 'udid']],
                    function(invalidAttributes) {

                        // Check validation
                        if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {


                            // Implement business here
                            UserAuthServices.login(userAccountInfo, userDeviceInfo, function(err, result){

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

            } else { // Login by email

                // Validate parameters & cast value
                ValidationUtil.multiValidate([ValidationModel, ValidationModel], [userAccountInfo, userDeviceInfo],
                    [['email', 'password'], ['deviceType', 'deviceName', 'udid']],
                    function(invalidAttributes) {

                        // Check validation
                        if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {


                            // Implement business here
                            UserAuthServices.loginByEmail(userAccountInfo, userDeviceInfo, function(err, result){

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
        sails.log.info('== END CONTROLLER   | AuthenticateController -> login');
    },

    /**
     * AuthenticateController.authInfo()
     *
     * @param req
     * @param res
     */
    authInfo: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | AuthenticateController -> authInfo');

        try {

            // Get auth info from session
            var authInfo = res.locals.auth;

            // Create response message
            var response = {
                status : 'success',
                message : '',
                data : authInfo
            }

            // Response json with success message
            res.json(response);

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
        sails.log.info('== END CONTROLLER   | AuthenticateController -> authInfo');
    },

    /**
     * AuthenticateController.login()
     *
     * @param req
     * @param res
     */
    setMachineCode: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | AuthenticateController -> setMachineCode');

        try {

            // Get user id
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var id = req.param('id');
            var machineCode = req.param('machineCode');

            // Create user device info object
            var userDeviceInfo = {
                id : id,
                userId : userId,
                machineCode : machineCode
            }

            console.log("Machine code param in setMachineCode request: " + machineCode);

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, userDeviceInfo,
                                    ['id', 'machineCode'], function(invalidAttributes) {

                // Check validation
                if( !invalidAttributes || Object.keys(invalidAttributes).length == 0 ) {


                    // Implement business here
                    UserAuthServices.setMachineCode(userDeviceInfo, function(err, result){

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
        sails.log.info('== END CONTROLLER   | AuthenticateController -> setMachineCode');
    },

    /**
     * AuthenticateController.logout()
     *
     * @param req
     * @param res
     */
    logout: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | AuthenticateController -> logout');

        try {

            // Get auth info from session
            var authInfo = res.locals.auth;

            // Implement business here
            UserAuthServices.logout(authInfo.userProfile.id, function(err, result){

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
        sails.log.info('== END CONTROLLER   | AuthenticateController -> logout');
    },

    /**
     * AuthenticateController.changePassword()
     *
     * @param req
     * @param res
     */
    changePassword: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | AuthenticateController -> changePassword');

        try {

            // Get user id
            var auth = res.locals.auth;
            var userId = auth.userProfile.id;

            // Get page param
            var oldPassword = req.param('oldPassword');
            var newPassword = req.param('newPassword');
            var confirmPassword = req.param('confirmPassword');

            // Create password info object
            var accountInfo = {
                userId: userId,
                oldPassword: oldPassword,
                newPassword: newPassword,
                confirmPassword: confirmPassword
            }

            // Validate parameters & cast value
            ValidationUtil.validate(ValidationModel, accountInfo, ['oldPassword', 'newPassword', 'confirmPassword'],
                                                                                        function(invalidAttributes) {

                // Check validation
                if (!invalidAttributes || Object.keys(invalidAttributes).length == 0) {

                    // Check new password && confirm password
                    if( newPassword === confirmPassword ) {

                        // Call service to change password
                        UserAuthServices.changePassword(accountInfo, function (err, result) {

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
        sails.log.info('== END CONTROLLER | AuthenticateController -> changePassword');
    },

    /**
     * AuthenticateController.resetPassword()
     *
     * @param req
     * @param res
     */
    resetPassword: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | AuthenticateController -> resetPassword');

        try {

            // Get page param
            var email = req.param('email');
            var username = req.param('username');

            if(username  && "" != username.trim()){

                // Create password info object
                var accountInfo = {
                    username: username
                }

                // Validate parameters & cast value
                ValidationUtil.validate(ValidationModel, accountInfo, ['username'], function(invalidAttributes) {

                    // Check validation
                    if (!invalidAttributes || Object.keys(invalidAttributes).length == 0) {

                        // Call service to change password
                        UserAuthServices.resetPasswordByUsername(username, function (err, result) {

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

            } else {

                // Create password info object
                var accountInfo = {
                    email: email
                }

                // Validate parameters & cast value
                ValidationUtil.validate(ValidationModel, accountInfo, ['email'], function(invalidAttributes) {

                    // Check validation
                    if (!invalidAttributes || Object.keys(invalidAttributes).length == 0) {

                        // Call service to change password
                        UserAuthServices.resetPassword(email, function (err, result) {

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
            }

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
        sails.log.info('== END CONTROLLER | AuthenticateController -> resetPassword');
    },

    /**
     * AuthenticateController.setPassword()
     *
     * @param req
     * @param res
     */
    setPassword: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | AuthenticateController -> setPassword');

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
                            UserAuthServices.setPassword(token, newPassword, function (err, result) {

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
        sails.log.info('== END CONTROLLER | AuthenticateController -> setPassword');
    },

    /**
     * AuthenticateController.updateProfile()
     *
     * @param req
     * @param res
     */
    updateProfile: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | AuthenticateController -> updateProfile');

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
                        UserAuthServices.updateProfile(userAccountInfo, function (err, result) {

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
        sails.log.info('== END CONTROLLER   | AuthenticateController -> updateProfile');
    }
};

