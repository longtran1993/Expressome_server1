/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function (req, res, next) {

    // By pass url
    var byPassUrl = '/api/authenticate/registry|'
                        +'/api/authenticate/login|'
                        +'/api/authenticate/resetpassword|'
                        +'/api/authenticate/setpassword|'
                        +'/api/imagemanage/download';

    // Get request uri
    if (req.method != 'options' && req.method != 'OPTIONS' && !req.isSocket){

        // Check by pass url
        var uri = req.originalUrl;
        uri = uri && uri.indexOf('?') > 0 ? uri.substring(0, uri.indexOf('?')) : uri;

        if( byPassUrl.indexOf(uri) > -1 || !uri || uri.indexOf('chat/') > -1) {
            return next();
        } else {

            // Get auth-token
            var authToken = req.headers["auth-token"];
            if ( authToken && authToken != '') {

                UserAuthServices.checkAuthToken(authToken, function(err, result){

                    if (!err) {
                        if (result && Object.keys(result).length > 0){
                            res.locals.auth = result;
                            return next();
                        } else {
                            return res.forbidden('Your account maybe has logged on other device.');
                        }
                    } else {
                        // Log error
                        console.log(err ? err.toString() : 'OPP! Some thing worng.');
                        return res.serverError(err ? err.toString() : 'OPP! Some thing worng.');
                    }

                })
            } else {
                return res.forbidden('You are not permitted to perform this action.');
            }
        }

    } else {
        return next();
    }
};
