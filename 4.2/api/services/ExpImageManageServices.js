/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 4/14/15 1:06 AM
 *== Created by: DuongNguyen
 *== Project: web005_express_some
 *
 */

/**
 *  ExpImageManageServices
 *
 * @description :: Server-side logic for managing UserAccountInfo
 * @help        :: See http://links.sailsjs.org/docs/services
 */

module.exports = {

    /**
     * ExpImageManageServices.upload()
     *
     * @param file
     * @param imageUpload
     * @param callback
     */
    upload: function (file, imageUpload, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ExpImageManageServices -> upload');

        try {

            // switch for right model
            var entity = UserAccountInfo;
            switch (imageUpload.entityName) {
                case 'user-avatar' :
                    entity = UserAccountInfo;
                    break;
                case 'group-cover' :
                    entity = ExpGroupInfo;
                    break;
                case 'contest-cover' :
                    entity= ExpContestInfo;
                    break;
                case 'player-image' :
                    entity = ExpContestPlayer;
                    break;
            }

            entity.find({id: imageUpload.recordId}).exec(function (err, result) {

                // Check error
                if (!err) {

                    // Check result
                    if ( result && Object.keys(result).length > 0) {

                        // Check permission
                        var permission;
                        var dataObj = result.pop();
                        switch (imageUpload.entityName) {
                            case 'user-avatar' :
                                permission = dataObj.id;
                                break;
                            case 'group-cover' :
                                permission = dataObj.admin;
                                break;
                            case 'contest-cover' :
                                permission= dataObj.owner;
                                break;
                            case 'player-image' :
                                permission = dataObj.userId;
                                break;
                        }

                        // Check permission
                        if (imageUpload.userId == permission){
                            if(imageUpload.entityName != 'player-image'){

                                // Create upload log
                                ExpImageUpload.create(imageUpload, function (err, result) {

                                    // Check error
                                    if (!err) {

                                        // Check result
                                        if (result && Object.keys(result).length > 0) {

                                            // Save image
                                            file.upload({
                                                dirname: sails.config.appPath + '/storage/images/' + imageUpload.entityName,
                                                saveAs: function (file, cb) {
                                                    var newName = file.filename;
                                                    newName = result.id + newName.substring(newName.lastIndexOf('.'));
                                                    return cb(null, newName);
                                                }
                                            }, function whenDone(err, fileInfo) {

                                                if (!err && result) {

                                                    if (fileInfo.length > 0) {

                                                        // Get file info
                                                        fileInfo = fileInfo[0];

                                                        // Get original name
                                                        var originalName = fileInfo.filename;
                                                        var imageType = originalName.substring(originalName.lastIndexOf('.') + 1);
                                                        var saveName = result.id + '.' + imageType;

                                                        // Update object
                                                        result.originalName = originalName;
                                                        result.mineType = fileInfo.type;
                                                        result.imageType = imageType;
                                                        result.saveName = saveName;

                                                        // Save into database
                                                        result.save(function (err) {

                                                            // Update data object
                                                            var imageLink = '/api/imagemanage/download?entityName=' + imageUpload.entityName + '&recordId=' + dataObj.id + '&fileName=' + saveName;
                                                            dataObj.image = imageLink;

                                                            //// Change status for contest player
                                                            //if( imageUpload.entityName == 'player-image'){
                                                            //    dataObj.status = 1;
                                                            //}

                                                            // Save data object
                                                            dataObj.save(function(err, result) {

                                                                if (!err) {

                                                                    // Create response message
                                                                    var response = {
                                                                        status: 'success',
                                                                        message: 'Upload successfully.',
                                                                        data: result
                                                                    }

                                                                    // Callback
                                                                    callback(err, response);

                                                                } else {
                                                                    callback(err, result);
                                                                }

                                                            })
                                                        });
                                                    } else {
                                                        // Create response json object
                                                        var response = {
                                                            status: 'error',
                                                            code: 1001,
                                                            message: 'No file uploaded.',
                                                            data: {}
                                                        }
                                                        // Response json with exception message
                                                        callback(err, response);
                                                    }

                                                } else {
                                                    // Callback with error
                                                    callback(err, null);
                                                }
                                            });
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
                                ExpContestInfo.findOne({id : dataObj.contestId }).exec(function(err, contestInfo){
                                    if(!err){
                                        if(contestInfo.status == 0){
                                            // Create upload log
                                            ExpImageUpload.create(imageUpload, function (err, result) {

                                                // Check error
                                                if (!err) {

                                                    // Check result
                                                    if (result && Object.keys(result).length > 0) {

                                                        // Save image
                                                        file.upload({
                                                            dirname: sails.config.appPath + '/storage/images/' + imageUpload.entityName,
                                                            saveAs: function (file, cb) {
                                                                var newName = file.filename;
                                                                newName = result.id + newName.substring(newName.lastIndexOf('.'));
                                                                return cb(null, newName);
                                                            }
                                                        }, function whenDone(err, fileInfo) {

                                                            if (!err && result) {

                                                                if (fileInfo.length > 0) {

                                                                    // Get file info
                                                                    fileInfo = fileInfo[0];

                                                                    // Get original name
                                                                    var originalName = fileInfo.filename;
                                                                    var imageType = originalName.substring(originalName.lastIndexOf('.') + 1);
                                                                    var saveName = result.id + '.' + imageType;

                                                                    // Update object
                                                                    result.originalName = originalName;
                                                                    result.mineType = fileInfo.type;
                                                                    result.imageType = imageType;
                                                                    result.saveName = saveName;

                                                                    // Save into database
                                                                    result.save(function (err) {

                                                                        // Update data object
                                                                        var imageLink = '/api/imagemanage/download?entityName=' + imageUpload.entityName + '&recordId=' + dataObj.id + '&fileName=' + saveName;
                                                                        dataObj.image = imageLink;
                                                                        dataObj.status = 1;

                                                                        // Save data object
                                                                        dataObj.save(function(err, result) {

                                                                            if (!err) {

                                                                                // Create response message
                                                                                var response = {
                                                                                    status: 'success',
                                                                                    message: 'Upload successfully.',
                                                                                    data: result
                                                                                }

                                                                                // Callback
                                                                                callback(err, response);

                                                                            } else {
                                                                                callback(err, result);
                                                                            }

                                                                        })
                                                                    });
                                                                } else {
                                                                    // Create response json object
                                                                    var response = {
                                                                        status: 'error',
                                                                        code: 1001,
                                                                        message: 'No file uploaded.',
                                                                        data: {}
                                                                    }
                                                                    // Response json with exception message
                                                                    callback(err, response);
                                                                }

                                                            } else {
                                                                // Callback with error
                                                                callback(err, null);
                                                            }
                                                        });
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
                                            // Create response json object
                                            var response = {
                                                status: 'error',
                                                code: 742,
                                                message: 'The contest has started.',
                                                data: {}
                                            }
                                            // Callback with json
                                            callback(err, response);
                                        }
                                    } else {
                                        callback(err, result);
                                    }
                                })
                            }
                        } else {
                            // Create response json object
                            var response = {
                                status: 'error',
                                code: 741,
                                message: 'You don\'t have permission to update image for this entity.',
                                data: {}
                            }
                            // Callback with json
                            callback(err, response);
                        }

                    } else {

                        // Create response json object
                        var response = {
                            status: 'error',
                            code: 704,
                            message: 'Not found any object match with id.',
                            data: {}
                        }

                        // Callback with json
                        callback(err, response);
                    }
                } else {
                    callback(err, result);
                }
            })

        } catch (err) {

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ExpImageManageServices -> upload');
    },

    /**
     * ExpImageManageServices.update()
     *
     * @param groupInfo
     * @param callback
     */
    download: function (imageInfo, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | ExpImageManageServices -> download');

        try {

            // Check name of group
            ExpImageUpload.find(
                {entityName: imageInfo.entityName, recordId: imageInfo.recordId}).exec(function (err, result) {

                    // Check error
                    if (!err) {

                        // Check result
                        if (result && Object.keys(result).length > 0) {

                            // Callback
                            callback(err, result.pop());

                        } else {

                            // Callback
                            callback(err, null);
                        }

                    } else {

                        // Callback with error
                        callback(err, null);
                    }
                })

        } catch (err) {

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | ExpImageManageServices -> download');
    }

};