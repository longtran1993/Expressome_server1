/**
 * Created by Luongtn on 6/19/2015.
 */

module.exports = {

    /**
     * CmsAuthenticateServices.login()
     *
     * @param userAccountInfo
     * @param userDeviceInfo
     * @param callback
     */
    login: function (userAccountInfo, userDeviceInfo, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | CmsAuthenticateServices -> login');

        try {

            // Check username
            UserAccountInfo.find({ username : userAccountInfo.username }).exec(function(err, result){

                // Check error
                if (!err) {

                    // Check result
                    if ( result && Object.keys(result).length > 0 ) {

                        // Get first result
                        var inputPassword = userAccountInfo.password;
                        userAccountInfo = result[0];

                        // Check password
                        CryptUtil.checkPassword(inputPassword, userAccountInfo.password, function(err, result){

                            // Check error
                            if( !err ){

                                // Check result
                                if ( result ) {

                                    // Assign result to data json
                                    delete userAccountInfo.password;
                                    var data = {
                                        userProfile : userAccountInfo
                                    }

                                    // Check device info
                                    UserDeviceInfo.find({udid : userDeviceInfo.udid }).exec(function(err, result){

                                        // Check error
                                        if( !err ) {

                                            // Check device info
                                            if ( result && Object.keys(result).length > 0 ) { // In case device is existed.

                                                // Update device userId
                                                userDeviceInfo = result.pop();
                                                userDeviceInfo.userId = data.userProfile.id;
                                                userDeviceInfo.updatedAt = new Date();

                                                // Save object into database
                                                userDeviceInfo.save(function (err){

                                                    // Check error
                                                    if ( !err ) {

                                                        // Assign user device into result
                                                        data.deviceInfo = userDeviceInfo;

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

                                                    } else {

                                                        // Callback with error
                                                        callback(err, null);

                                                    }

                                                })

                                            } else { // In case create new device info

                                                // Add userId for userDeviceInfo
                                                userDeviceInfo.userId = data.userProfile.id;

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
                                                                    message : 'Login successfully.',
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
        sails.log.info('=== END SERVICE   | CmsAuthenticateServices -> login');
    },

    /**
     * CmsAuthenticateServices.logout()
     *
     * @param authTokenId
     * @param deviceInfoId
     * @param callback
     */
    logout: function (authTokenId, deviceInfoId, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | CmsAuthenticateServices -> logout');

        try {


            // Parallel series
            async.parallel(
                [
                    function(callbackFunc){
                        // Find user account
                        UserAuthToken.destroy({id : authTokenId }).exec(function(err){
                            callbackFunc(err, {});
                        })
                    },
                    function(callbackFunc){
                        // Find user account
                        UserDeviceInfo.destroy({id : deviceInfoId }).exec(function(err){
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
        sails.log.info('=== END SERVICE   | CmsAuthenticateServices -> logout');
    },

    /**
     * CmsAuthenticateServices.resetPassword()
     * @param passwordInfo
     * @param callback
     */
    resetPassword : function (email, callback){

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | CmsAuthenticateServices -> resetPassword');

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
                            message: 'This email is not existed. Please using API registry to create new account.',
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

        sails.log.info('=== END SERVICE | CmsAuthenticateServices -> resetPassword');
    },

    /**
     * CmsAuthenticateServices.setPassword()
     *
     * @param token
     * @param password
     * @param callback
     */
    setPassword : function (token, password, callback) {
        // Log begin function
        sails.log.info('=== BEGIN SERVICE | CmsAuthenticateServices -> setPassword');

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

        sails.log.info('=== END SERVICE | CmsAuthenticateServices -> setPassword');
    },

    /**
     * CmsAuthenticateServices.updateProfile()
     *
     * @param userAccountInfo
     * @param callback
     */
    updateProfile: function (userAccountInfo, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | CmsAuthenticateServices -> updateProfile');

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
        sails.log.info('=== END SERVICE   | CmsAuthenticateServices -> updateProfile');
    }
}