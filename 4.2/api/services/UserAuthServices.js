/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 4/16/15 1:56 AM
 *== Created by: DuongNguyen
 *== Project: web005_expresssome
 *
 */

/**
 *  UserAccountInfoServices
 *
 * @description :: Server-side logic for managing UserAccountInfo
 * @help        :: See http://links.sailsjs.org/docs/services
 */

module.exports = {

    /**
     * UserAuthService.registry()
     *
     * @param userAccountInfo
     * @param userDeviceInfo
     * @param callback
     */
    registry: function (userAccountInfo, userDeviceInfo, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | UserAuthService -> registry');

        try {

            // Check username
            UserAccountInfo.find({ email : userAccountInfo.email }).exec(function(err, result) {

                // Check error
                if (!err) {

                    // Check result
                    if (result && Object.keys(result).length > 0) {

                        // Create error response message
                        var response = {
                            status: 'error',
                            code: 702,
                            message: 'Email has existed. Please chose other email and try again.',
                            data: {}
                        }

                        // Callback with response message
                        callback(null, response);

                    } else {

                        // Check username
                        UserAccountInfo.find({ username : userAccountInfo.username }).exec(function(err, result){

                            // Check error
                            if (!err) {

                                // Check result
                                if (result && Object.keys(result).length > 0 ) {

                                    // Create error response message
                                    var response = {
                                        status : 'error',
                                        code: 701,
                                        message: 'Username has existed. Please chose other username and try again.',
                                        data: {}
                                    }

                                    // Callback with response message
                                    callback(null, response);

                                } else {

                                    // Create new user account
                                    UserAccountInfo.create(userAccountInfo, function(err, result){

                                        // Check error
                                        if (!err) {

                                            // Assign result to data json
                                            var userProfile = result;
                                            delete userProfile.password;
                                            var data = {
                                                userProfile : userProfile
                                            }

                                            // Create new user device
                                            UserDeviceInfo.update({machineCode : userDeviceInfo.machineCode}, {machineCode : null}, function(err, result){

                                                // Check error
                                                if (!err) {

                                                    // Assign user id into user device info
                                                    userDeviceInfo.userId = userProfile.id;

                                                    // Create new user device
                                                    UserDeviceInfo.create(userDeviceInfo, function(err, result){

                                                        // Check error
                                                        if (!err) {

                                                            // Create random token string
                                                            var strRandom = StringUtil.random(64);

                                                            // Assign user device into result
                                                            data.deviceInfo = result;

                                                            // Create uer auth token
                                                            var userAuthToken = {
                                                                userId : data.userProfile.id,
                                                                deviceId : data.deviceInfo.id,
                                                                token : strRandom,
                                                                status : 'normal'
                                                            }

                                                            // Create new user auth token
                                                            UserAuthToken.create(userAuthToken, function(err, result){

                                                                // Check error
                                                                if (!err) {

                                                                    // Push token into dat
                                                                    data.authToken = result;

                                                                    // Create response message
                                                                    var response = {
                                                                        status : 'success',
                                                                        message : 'Your account is created successfully.',
                                                                        data : data
                                                                    }

                                                                    // Callback function with result
                                                                    callback(err, response);

                                                                } else {
                                                                    callback(err, null);
                                                                }

                                                            })

                                                        } else {
                                                            callback(err, null);
                                                        }
                                                    })

                                                } else {
                                                    callback(err, null);
                                                }
                                            })
                                        } else {
                                            callback(err, null);
                                        }
                                    })
                                }
                            } else {
                                callback(err, null);
                            }
                        });
                    }
                } else {
                    callback(err, null);
                }
            })

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | UserAuthService -> registry');
    },

    /**
     * UserAuthService.login()
     *
     * @param userAccountInfo
     * @param userDeviceInfo
     * @param callback
     */
    login: function (userAccountInfo, userDeviceInfo, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | UserAuthService -> login');

        try {

            // Check username
            UserAccountInfo.findOne({ username : userAccountInfo.username }).exec(function(err, userInfo){

                // Check error
                if (!err) {

                    // Check result
                    if ( userInfo && Object.keys(userInfo).length > 0 ) {

                        // Get first result
                        var inputPassword = userAccountInfo.password;

                        // Check password
                        CryptUtil.checkPassword(inputPassword, userInfo.password, function(err, result){

                            // Check error
                            if( !err ){

                                // Check result
                                if ( result ) {

                                    // Assign result to data json
                                    delete userInfo.password;
                                    var data = {
                                        userProfile : userInfo
                                    }

                                    // Logout others devices
                                    UserAuthServices.logout(userInfo.id, function(err, result){
                                        if(!err){

                                            // Add userId for userDeviceInfo
                                            userDeviceInfo.userId = data.userProfile.id;

                                            // Create new device info
                                            UserDeviceInfo.create(userDeviceInfo, function(err, deviceInfo){
                                                if(!err && result){

                                                    // Assign user device into result
                                                    data.deviceInfo = deviceInfo;

                                                    // Create random token string
                                                    var strRandom = StringUtil.random(64);

                                                    // Create uer auth token
                                                    var userAuthToken = {
                                                        userId : data.userProfile.id,
                                                        deviceId : data.deviceInfo.id,
                                                        token : strRandom,
                                                        status : 'normal'
                                                    }

                                                    // Create new user auth token
                                                    UserAuthToken.create(userAuthToken, function(err, result){

                                                        // Check error
                                                        if (!err) {

                                                            // Push token into dat
                                                            data.authToken = result;

                                                            // Create response message
                                                            var response = {
                                                                status : 'success',
                                                                message : 'Login successfully.',
                                                                data : data
                                                            }

                                                            // Callback function with result
                                                            callback(err, response);

                                                        } else {
                                                            callback(err, null);
                                                        }

                                                    })

                                                }
                                            })

                                        } else {
                                            callback(err, result)
                                        }
                                    })
                                } else {

                                    // Create error response message
                                    var response = {
                                        status : 'error',
                                        code: 703,
                                        message: 'Username or password is incorrect.',
                                        data: {}
                                    }

                                    // Callback with response message
                                    callback(null, response);
                                }

                            } else {

                                // Callback with error
                                callback(err, null);
                            }
                        })
                    } else {

                        // Create error response message
                        var response = {
                            status : 'error',
                            code: 703,
                            message: 'Username or password is incorrect.',
                            data: {}
                        }

                        // Callback with response message
                        callback(null, response);

                    }
                } else {

                    // Callback with error
                    callback(err, null);
                }
            });

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | UserAuthService -> login');
    },

    /**
     * UserAuthService.loginByEmail()
     *
     * @param userAccountInfo
     * @param userDeviceInfo
     * @param callback
     */
    loginByEmail: function (userAccountInfo, userDeviceInfo, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | UserAuthService -> loginByEmail');

        try {

            // Check username
            UserAccountInfo.findOne({ email : userAccountInfo.email }).exec(function(err, userInfo){

                // Check error
                if (!err) {

                    // Check result
                    if ( userInfo && Object.keys(userInfo).length > 0 ) {

                        // Get first result
                        var inputPassword = userAccountInfo.password;

                        // Check password
                        CryptUtil.checkPassword(inputPassword, userInfo.password, function(err, result){

                            // Check error
                            if( !err ){

                                // Check result
                                if ( result ) {

                                    // Assign result to data json
                                    delete userInfo.password;
                                    var data = {
                                        userProfile : userInfo
                                    }

                                    // Logout others devices
                                    UserAuthServices.logout(userInfo.id, function(err, result){
                                        if(!err){

                                            // Add userId for userDeviceInfo
                                            userDeviceInfo.userId = data.userProfile.id;

                                            // Create new device info
                                            UserDeviceInfo.create(userDeviceInfo, function(err, deviceInfo){
                                                if(!err && result){

                                                    // Assign user device into result
                                                    data.deviceInfo = deviceInfo;

                                                    // Create random token string
                                                    var strRandom = StringUtil.random(64);

                                                    // Create uer auth token
                                                    var userAuthToken = {
                                                        userId : data.userProfile.id,
                                                        deviceId : data.deviceInfo.id,
                                                        token : strRandom,
                                                        status : 'normal'
                                                    }

                                                    // Create new user auth token
                                                    UserAuthToken.create(userAuthToken, function(err, result){

                                                        // Check error
                                                        if (!err) {

                                                            // Push token into dat
                                                            data.authToken = result;

                                                            // Create response message
                                                            var response = {
                                                                status : 'success',
                                                                message : 'Login successfully.',
                                                                data : data
                                                            }

                                                            // Callback function with result
                                                            callback(err, response);

                                                        } else {
                                                            callback(err, null);
                                                        }

                                                    })

                                                }
                                            })

                                        } else {
                                            callback(err, result)
                                        }
                                    })
                                } else {

                                    // Create error response message
                                    var response = {
                                        status : 'error',
                                        code: 703,
                                        message: 'Username or password is incorrect.',
                                        data: {}
                                    }

                                    // Callback with response message
                                    callback(null, response);
                                }

                            } else {

                                // Callback with error
                                callback(err, null);
                            }
                        })
                    } else {

                        // Create error response message
                        var response = {
                            status : 'error',
                            code: 703,
                            message: 'Username or password is incorrect.',
                            data: {}
                        }

                        // Callback with response message
                        callback(null, response);

                    }
                } else {

                    // Callback with error
                    callback(err, null);
                }
            });

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | UserAuthService -> loginByEmail');
    },

    /**
     * UserAuthService.checkAuthToken()
     *
     * @param authToken
     * @param callback
     */
    checkAuthToken: function (authToken, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | UserAuthService -> checkAuthToken');

        try {

            // Find token
            UserAuthToken.findOne({ token : authToken, status : 'normal' }).exec(function(err, userAuthToken){

                // Check error
                if (!err) {

                    // Check result
                    if ( userAuthToken && Object.keys(userAuthToken).length > 0 ) {

                        // Parallel series
                        async.parallel(
                            [
                                function(callbackFunc){
                                    // Find user account
                                    UserAccountInfo.find({id : userAuthToken.userId }).exec(function(err, result){
                                        //console.log(result);
                                        callbackFunc(null, result);
                                    })
                                },
                                function(callbackFunc){
                                    // Find user account
                                    UserDeviceInfo.find({id : userAuthToken.deviceId }).exec(function(err, result){
                                        callbackFunc(null, result);
                                    })
                                }
                            ],
                            function(err, results){

                                // Check error
                                if( !err ) {

                                    // Check results
                                    if ( results && Object.keys(results).length > 0 ) {

                                        //console.log(results);

                                        var userAccountInfo = results[0] ? results[0][0] : {};
                                        delete userAccountInfo.password;

                                        var userDeviceIfo = results[1] ? results[1][0] : {};

                                        // Auth info
                                        var auth = {
                                            userProfile : userAccountInfo,
                                            deviceInfo : userDeviceIfo,
                                            authToken : userAuthToken
                                        }

                                        // Callback with user account info
                                        callback(null, auth);

                                    } else {

                                        // Callback with error
                                        callback(err, null);

                                    }
                                } else {

                                    // Callback with error
                                    callback(err, null);
                                }

                            });
                    } else {

                        // Callback with nothing
                        callback(null, null);

                    }
                } else {

                    // Callback with error
                    callback(err, null);
                }
            });

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | UserAuthService -> checkAuthToken');
    },

    /**
     * UserAuthService.setMachineCode()
     *
     * @param userDeviceInfo
     * @param callback
     */
    setMachineCode: function (userDeviceInfo, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | UserAuthService -> checkAuthToken');

        try {

            // Find token
            UserDeviceInfo.find({ id : userDeviceInfo.id }).exec(function(err, result){

                // Check error
                if (!err) {

                    // Check result
                    if ( result && result.length > 0 ) {

                        // Check permission
                        var object = result[0];
                        if( parseInt(object.userId) == userDeviceInfo.userId ){

                            // Update object
                            object = result.pop();
                            object.machineCode = userDeviceInfo.machineCode;
                            object.updatedAt = new Date();

                            // Create new user device
                            UserDeviceInfo.update({machineCode : userDeviceInfo.machineCode}, {machineCode : null}, function(err, result){

                                // Check error
                                if (!err) {

                                    // Save object
                                    object.save(function(err){

                                        // Check error
                                        if( !err ) {

                                            // Create error message
                                            var response = {
                                                status : 'success',
                                                message : 'Set machine code successfully.',
                                                data : object
                                            }

                                            // Callback with error response message
                                            callback(null, response);

                                        } else {

                                            // Callback with error
                                            callback(err, null);
                                        }
                                    })

                                } else {
                                    callback(err, null);
                                }
                            })
                        } else {

                            // Create error message
                            var response = {
                                status : 'error',
                                code : 705,
                                message : 'You do not have permission to update this device information.',
                                data : {}
                            }

                            // Callback with error response message
                            callback(null, response);

                        }

                    } else {

                        // Create error message
                        var response = {
                            status : 'error',
                            code : 704,
                            message : 'Not found any object match with id.',
                            data : {}
                        }

                        // Callback with error response message
                        callback(null, response);

                    }
                } else {

                    // Callback with error
                    callback(err, null);
                }
            });

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | UserAuthService -> checkAuthToken');
    },

    /**
     * UserAuthService.logout()
     *
     * @param authTokenId
     * @param deviceInfoId
     * @param callback
     */
    logout: function (userId, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | UserAuthService -> logout');

        try {

            // Parallel series
            async.parallel(
                [
                    function(callbackFunc){
                        // Find user account
                        UserAuthToken.destroy({userId : userId }).exec(function(err){
                            callbackFunc(err, {});
                        })
                    },
                    function(callbackFunc){
                        // Find user account
                        UserDeviceInfo.destroy({userId : userId }).exec(function(err){
                            callbackFunc(err, {});
                        })
                    }
                ],
                function(err, results){

                    // Check error
                    if( !err ) {

                        // Check results
                        if ( results && results.length > 0 ) {


                            // Create success response message
                            var response = {
                                status : 'success',
                                message : 'Logout successfully.',
                                data : {}
                            }

                            // Callback with user account info
                            callback(null, response);

                        } else {

                            // Callback with error
                            callback(err, null);

                        }
                    } else {

                        // Callback with error
                        callback(err, null);
                    }

                });

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | UserAuthService -> logout');
    },

    /**
     * UserAuthService.changePassword()
     *
     * @param passwordInfo
     * @param callback
     */
    changePassword : function (accountInfo, callback){

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | UserAccountInfoServices -> changePassword');

        try{
            // Change function
            UserAccountInfo.find( {id: accountInfo.userId} ).exec(function (err, result) {

                // Check error
                if (!err) {

                    // Check result
                    if(result && Object.keys(result).length > 0 ) {

                        //Update user object
                        var object = result[0];

                        // Check old password
                        CryptUtil.checkPassword(accountInfo.oldPassword, object.password, function(err, result){

                            // Check error
                            if ( !err) {

                                // Check result
                                if ( result ) {

                                    // Encrypt password
                                    CryptUtil.encryptPassword(accountInfo.newPassword, function(err, result){

                                        // Check error
                                        if ( !err ) {

                                            // Assign encrypted password into password.
                                            object.password = result;

                                            // Save object
                                            object.save(function (err, result) {

                                                // Check error
                                                if (!err) {

                                                    // Create response message
                                                    var response = {
                                                        status: 'success',
                                                        message: 'Your password was updated successfully!',
                                                        data: {}
                                                    }

                                                    // Callback function with result
                                                    callback(null, response);

                                                } else {

                                                    // Callback with error
                                                    callback(err, null);
                                                }
                                            });

                                        } else {
                                            // Callback with error
                                            callback(err, null);
                                        }
                                    })
                                } else {

                                    // Create error response : incorrect old password
                                    var response = {
                                        status : "error",
                                        code : 707,
                                        message : "Your old password is incorrect!",
                                        data : {}
                                    };

                                    // Callback function with error
                                    callback(null, response);
                                }
                            } else {

                                // Callback function with error
                                callback(err, null);
                            }
                        });
                    }
                } else {
                    // Create error message
                    var response = {
                        status : 'error',
                        code : 704,
                        message : 'Not found any object match with id',
                        data : {}
                    }

                    // Callback with error response message
                    callback(null, response);
                }
            });

        }catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        sails.log.info('=== END SERVICE | UserAccountInfoServices -> changePassword');

    },

    /**
     * UserAuthService.resetPassword()
     * @param passwordInfo
     * @param callback
     */
    resetPassword : function (email, callback){

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | UserAccountInfoServices -> resetPassword');

        try {

            // Change function
            UserAccountInfo.find({email : email}).exec(function (err, result) {

                // Check error
                if (!err) {

                    // Check result
                    if (result && Object.keys(result).length > 0) {

                        // Get user account info
                        var userAccountInfo = result[0];

                        // Create token

                        // Create action log
                        var userActionLog = {
                            userId : userAccountInfo.id,
                            actionName : 'reset_password',
                            actionStatus : 'new',
                            token : StringUtil.random(12)
                        }

                        // Save into database
                        UserActionLog.create(userActionLog, function(err, result){

                            // Check error
                            if ( !err ) {

                                // Check result
                                if ( result && Object.keys(result).length > 0 ){

                                    // Sending out email with token
                                    MailerUtil.sendResetPasswordEmail(
                                                userAccountInfo, userActionLog.token, function(err, result){

                                        // Check error
                                        if( !err) {

                                            // Create response message
                                            var response = {
                                                status : 'success',
                                                message : '',
                                                data : {}
                                            }

                                            // Callback with success message
                                            callback(null, response);

                                        } else {

                                            // Callback with error
                                            callback(err, null);
                                        }
                                    })

                                } else {

                                    // Create response message
                                    var response = {
                                        status : 'error',
                                        code : 501,
                                        message : 'Internal server error.',
                                        data : {}
                                    }

                                    // Callback with success message
                                    callback(null, response);
                                }

                            } else {

                                // Callback with error
                                callback(err, null);
                            }

                        });

                    } else {

                        // Create error message
                        var response = {
                            status: 'error',
                            code: 708,
                            message: 'Sorry! This email has not existed. Please, try another.',
                            data: {}
                        }

                        // Callback with error response message
                        callback( null, response);
                    }
                }else {

                    // Callback with error
                    callback(err, null);
                }
            });

        }catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        sails.log.info('=== END SERVICE | UserAccountInfoServices -> resetPassword');
    },


    /**
     * UserAuthService.resetPasswordByUsername()
     * @param passwordInfo
     * @param callback
     */
    resetPasswordByUsername : function (username, callback){

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | UserAccountInfoServices -> resetPasswordByUsername');

        try {

            // Change function
            UserAccountInfo.find({username : username}).exec(function (err, result) {

                // Check error
                if (!err) {

                    // Check result
                    if (result && Object.keys(result).length > 0) {

                        // Get user account info
                        var userAccountInfo = result[0];

                        // Create token

                        // Create action log
                        var userActionLog = {
                            userId : userAccountInfo.id,
                            actionName : 'reset_password',
                            actionStatus : 'new',
                            token : StringUtil.random(12)
                        }

                        // Save into database
                        UserActionLog.create(userActionLog, function(err, result){

                            // Check error
                            if ( !err ) {

                                // Check result
                                if ( result && Object.keys(result).length > 0 ){

                                    // Sending out email with token
                                    MailerUtil.sendResetPasswordEmail(
                                                userAccountInfo, userActionLog.token, function(err, result){

                                        // Check error
                                        if( !err) {

                                            // Create response message
                                            var response = {
                                                status : 'success',
                                                message : '',
                                                data : {}
                                            }

                                            // Callback with success message
                                            callback(null, response);

                                        } else {

                                            // Callback with error
                                            callback(err, null);
                                        }
                                    })

                                } else {

                                    // Create response message
                                    var response = {
                                        status : 'error',
                                        code : 501,
                                        message : 'Internal server error.',
                                        data : {}
                                    }

                                    // Callback with success message
                                    callback(null, response);
                                }

                            } else {

                                // Callback with error
                                callback(err, null);
                            }

                        });

                    } else {

                        // Create error message
                        var response = {
                            status: 'error',
                            code: 708,
                            message: 'Sorry! This username has not existed. Please, try another.',
                            data: {}
                        }

                        // Callback with error response message
                        callback( null, response);
                    }
                }else {

                    // Callback with error
                    callback(err, null);
                }
            });

        }catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        sails.log.info('=== END SERVICE | UserAccountInfoServices -> resetPasswordByUsername');
    },

    /**
     * UserAuthService.setPassword()
     *
     * @param token
     * @param password
     * @param callback
     */
    setPassword : function (token, password, callback) {
        // Log begin function
        sails.log.info('=== BEGIN SERVICE | UserAccountInfoServices -> setPassword');

        try{

            // Find action log
            UserActionLog.find({token : token, actionStatus : 'new'}).exec(function (err, result) {

                // Check error
                if (!err) {

                    // Check result
                    if ( result && Object.keys(result).length > 0 ) {

                        // Get action log
                        var actionLog = result[0];

                        // Check token expired date
                        // TODO

                        // Find user account into
                        UserAccountInfo.find({id: actionLog.userId}, function(err, result) {

                            // Check error
                            if ( !err ) {

                                // Check result
                                if( result && Object.keys(result).length > 0 ) {

                                    // Set info
                                    var userAccountInfo = result.pop();

                                    // Encrypt password
                                    CryptUtil.encryptPassword(password, function(err, result) {

                                        // Check error
                                        if ( !err ) {

                                            // Set info
                                            var oldPassword = userAccountInfo.password;
                                            userAccountInfo.password = result;
                                            userAccountInfo.updatedAt = new Date();

                                            // Update user account
                                            userAccountInfo.save(function(err) {

                                                // Check error
                                                if ( !err ) {

                                                    // Change action log status
                                                    actionLog.actionStatus = "done";
                                                    actionLog.oldData = oldPassword;
                                                    actionLog.newData = userAccountInfo.password;

                                                    // Change action log
                                                    actionLog.save(function(err){

                                                        // Check error
                                                        if ( !err ) {

                                                            // Create response message
                                                            var response = {
                                                                status : 'success',
                                                                message : '',
                                                                data : {}
                                                            }

                                                            // Send email
                                                            MailerUtil.sendSetPasswordEmail(
                                                                            userAccountInfo, function(err, result){});

                                                            // Callback with success message
                                                            callback(null, response);

                                                        } else {
                                                            // Callback with error message
                                                            callback(err, null);
                                                        }
                                                    })
                                                } else {

                                                    // Callback with error message
                                                    callback(err, null);

                                                }
                                            })

                                        } else {
                                            // Callback with error
                                            callback(err, null);
                                        }
                                    })

                                } else {

                                    // Callback with error message
                                    callback(err, null);
                                }

                            } else {

                                // Callback with error message
                                callback(err, null);
                            }
                        })

                    } else {

                        // Create error message
                        var response = {
                            status: 'error',
                            code: 709,
                            message: 'The token is not existed or is expired.',
                            data: {}
                        }

                        // Callback with error response message
                        callback(null, response);
                    }
                }else {
                    // Callback with error
                    callback(err, null);
                }
            });

        }catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        sails.log.info('=== END SERVICE | UserAccountInfoServices -> setPassword');
    },

    /**
     * UserAuthService.updateProfile()
     *
     * @param userAccountInfo
     * @param callback
     */
    updateProfile: function (userAccountInfo, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | UserAuthService -> updateProfile');

        try {

            // Find token
            UserAccountInfo.find({ id : userAccountInfo.id }).exec(function(err, result){

                // Check error
                if (!err) {

                    // Check result
                    if ( result && Object.keys(result).length > 0 ) {

                        // Get object
                        var object = result.pop();

                        // Update database
                        object.save(function(err){

                            // Check error
                            if( !err ) {

                                // Delete password
                                delete object.password;

                                /// Create response message
                                var response = {
                                    status : 'success',
                                    message : '',
                                    data : object
                                }

                                // Callback with success message
                                callback(null, response);

                            } else {

                                // Callback with error response message
                                callback(err, null);
                            }
                        })

                    } else {
                        var response = {
                            status : 'error',
                            code : 404,
                            message : 'Not found any object match with id',
                            data : {}
                        }

                        // Callback with error response message
                        callback(null, response);

                    }
                } else {

                    // Callback with error
                    callback(err, null);
                }
            });

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | UserAuthService -> updateProfile');
    }

};
