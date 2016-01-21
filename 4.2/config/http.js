/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html
 */

module.exports.http = {

    /****************************************************************************
     *                                                                           *
     * Express middleware to use for every Sails request. To add custom          *
     * middleware to the mix, add a function to the middleware config object and *
     * add its key to the "order" array. The $custom key is reserved for         *
     * backwards-compatibility with Sails v0.9.x apps that use the               *
     * `customMiddleware` config option.                                         *
     *                                                                           *
     ****************************************************************************/

    middleware: {

        /***************************************************************************
         *                                                                          *
         * The order in which middleware should be run for HTTP request. (the Sails *
         * router is invoked by the "router" middleware below.)                     *
         *                                                                          *
         ***************************************************************************/

        order: [
            'startRequestTimer',
            'cookieParser',
            'session',
            'myRequestLogger',
            'bodyParser',
            'handleBodyParserError',
            'compress',
            'methodOverride',
            'poweredBy',
            '$custom',
            'router',
            'www',
            'favicon',
            '404',
            '500'
        ],

        /****************************************************************************
         *                                                                           *
         * Example custom middleware; logs each request to the console.              *
         *                                                                           *
         ****************************************************************************/

        myRequestLogger: function (req, res, next) {

            // Log begin request
            sails.log.info('==================================================================================');
            sails.log.info('= BEGIN REQUEST | ' + req.ip + ' - ' + req.originalUrl + ' - '  + req.get('content-type'));

            //// Create client request log
            //ClientRequestLogServices.create(req, function (err, result) {
            //
            //    // Check error
            //    if (!err) {
            //
            //        res.locals.log = result;
            //
            //        return next();
            //
            //    } else {
            //
            //        // Create response json object
            //        var response = {
            //            status : 'exception',
            //            message : err.toString(),
            //            data : []
            //        }
            //
            //        // Response json with error message
            //        res.json(response);
            //    }
            //
            //});

            return next();

            res.on('finish', function(data) {

                // Update request log
                //ClientRequestLogServices.update(res, res.locals.log);
                //
                // Log end request
                sails.log.info('= END REQUEST   | ' + req.ip + ' - ' + req.originalUrl + ' - '  + req.get('content-type'));
                sails.log.info('==================================================================================');

            });
        }


        /***************************************************************************
         *                                                                          *
         * The body parser that will handle incoming multipart HTTP requests. By    *
         * default as of v0.10, Sails uses                                          *
         * [skipper](http://github.com/balderdashy/skipper). See                    *
         * http://www.senchalabs.org/connect/multipart.html for other options.      *
         *                                                                          *
         ***************************************************************************/

        // bodyParser: require('skipper')

    }

    /***************************************************************************
     *                                                                          *
     * The number of seconds to cache flat files on disk being served by        *
     * Express static middleware (by default, these files are in `.tmp/public`) *
     *                                                                          *
     * The HTTP static cache is only active in a 'production' environment,      *
     * since that's the only time Express will cache flat-files.                *
     *                                                                          *
     ***************************************************************************/

    // cache: 31557600000
};
