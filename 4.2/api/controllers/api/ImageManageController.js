/**
 * ImageManageController
 *
 * @description :: Server-side logic for managing Imagemanages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fileSystem = require('fs');

module.exports = {


    //test : function(req, res){
    //    // Log begin function
    //    sails.log.info('== BEGIN CONTROLLER | ImageManageController -> upload');
    //
    //    req.file('image').upload({
    //        dirname: require('path').resolve(sails.config.appPath, '/storage/images')
    //    },function (err, uploadedFiles) {
    //        if (err) return res.negotiate(err);
    //
    //        return res.json({
    //            message: uploadedFiles.length + ' file(s) uploaded successfully!',
    //            files: uploadedFiles,
    //            body : req.body,
    //            params : req.allParams()
    //        });
    //    });
    //
    //    // Log begin function
    //    sails.log.info('== END   CONTROLLER | ImageManageController -> upload');
    //},

    /**
     * ImageManageController.upload()
     *
     * @param req
     * @param res
     */
    upload: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ImageManageController -> upload');

        try {

            // Get page param
            var entityName = req.param('entityName');
            var recordId = req.param('recordId');

            // Create user image upload object
            var auth = res.locals.auth;
            var imageUpload = {
                entityName: entityName,
                recordId: recordId,
                userId: auth.userProfile.id
            }

            console.log(req.headers);
            console.log(req.body);
            console.log(req.file('image'));
            console.log(req.allParams());

            // Validate parameters & cast value
            ValidationUtil.validate(ExpImageUpload, imageUpload,
                ['entityName', 'recordId'], function (invalidAttributes) {

                    // Check validation
                    if (!invalidAttributes || Object.keys(invalidAttributes).length == 0) {


                        ExpImageManageServices.upload(req.file('image'), imageUpload, function (err, result) {

                            // Check error
                            if (!err) {

                                // Check result
                                if (result && Object.keys(result).length > 0) {

                                    // Callback with result
                                    res.json(result);

                                } else {

                                    // Create response json object
                                    var response = {
                                        status: 'error',
                                        code: 501,
                                        message: 'Internal server error',
                                        data: {}
                                    }

                                    // Response json with error message
                                    res.json(response);
                                }
                            } else {

                                // Log error
                                sails.log.info(err.toString());

                                // Create response json object
                                var response = {
                                    status: 'error',
                                    code: 501,
                                    message: 'Internal server error',
                                    data: err.toString()
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

                });

        } catch (err) {

            // Log error
            sails.log.info(err.toString());

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
        sails.log.info('== END CONTROLLER   | ImageManageController -> upload');

    },


    /**
     * `ImageManageController.download()`
     */
    download: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | ImageManageController -> download');

        try {

            // Get page param
            var entityName = req.param('entityName');
            var recordId = req.param('recordId');

            // Create user image upload object
            var imageUpload = {
                entityName: entityName,
                recordId: recordId
            }


            // Validate parameters & cast value
            ValidationUtil.validate(ExpImageUpload, imageUpload,
                ['entityName', 'recordId'], function (invalidAttributes) {

                    // Check validation
                    if (!invalidAttributes || Object.keys(invalidAttributes).length == 0) {

                        // Implement business here
                        ExpImageManageServices.download(imageUpload, function(err, result) {

                            // Check error
                            if (!err) {

                                // Check result
                                if ( result && Object.keys(result).length > 0 && result.entityName && result.saveName) {

                                    var path = sails.config.appPath +  '/storage/images/'
                                        + result.entityName + '/' + result.saveName;
                                    var stat = fileSystem.statSync(path);
                                    res.writeHead(200, {
                                        'Content-Type': result.mineType,
                                        'Content-Length': stat.size
                                    });

                                    var readStream = fileSystem.createReadStream(path);
                                    readStream.pipe(res);

                                } else {

                                    var path = sails.config.appPath +  '/storage/images/no-image-availiable.jpg';
                                    var stat = fileSystem.statSync(path);
                                    res.writeHead(200, {
                                        'Content-Type': 'image/jpg',
                                        'Content-Length': stat.size
                                    });

                                    var readStream = fileSystem.createReadStream(path);
                                    readStream.pipe(res);

                                }
                            } else {

                                var path = sails.config.appPath +  '/storage/images/no-image-availiable.jpg';
                                var stat = fileSystem.statSync(path);
                                res.writeHead(200, {
                                    'Content-Type': 'image/jpg',
                                    'Content-Length': stat.size
                                });

                                var readStream = fileSystem.createReadStream(path);
                                readStream.pipe(res);
                            }

                        });

                    } else {

                        var path = sails.config.appPath +  '/storage/images/no-image-availiable.jpg';
                        var stat = fileSystem.statSync(path);
                        res.writeHead(200, {
                            'Content-Type': 'image/jpg',
                            'Content-Length': stat.size
                        });

                        var readStream = fileSystem.createReadStream(path);
                        readStream.pipe(res);

                    }

                });

        } catch (err) {

            var path = sails.config.appPath +  '/storage/images/no-image-availiable.jpg';
            var stat = fileSystem.statSync(path);
            res.writeHead(200, {
                'Content-Type': 'image/jpg',
                'Content-Length': stat.size
            });

            var readStream = fileSystem.createReadStream(path);
            readStream.pipe(res);
        }
    }
};

