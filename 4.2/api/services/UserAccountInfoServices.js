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
 *  UserAccountInfoServices
 *
 * @description :: Server-side logic for managing UserAccountInfo
 * @help        :: See http://links.sailsjs.org/docs/services
 */

module.exports = {


    /**
     * ` UserAccountInfoServices.list()`
     */
    list: function (page, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | UserAccountInfoServices -> list');

        try{

            // Get list data with paginate
            DataCommonServices.paginate(UserAccountInfo, {}, page, 10, function(err, result){

                // Callback function with error & data
                callback(err, result);

            });

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | UserAccountInfoServices -> list');
    },


    /**
     * ` UserAccountInfoServices.create()`
     */
    create: function (userAccountInfo, callback) {

        return {};
    },


    /**
     * ` UserAccountInfoServices.updateProfile()`
     */
    updateProfile: function (userAccountInfo, callback) {
        // Log begin function
        sails.log.info('=== BEGIN SERVICE | UserAccountInfoServices -> updateProfile');

        try{
            // Update function
            UserAccountInfo.find({where: {id:userAccountInfo.userId}}).exec(function (err, result) {
                // Check error
                if (!err) {

                    // Check result
                    if(result && result.length >0) {

                        //Update user object
                        var object = result[0];

                        // Assign new value
                        if(userAccountInfo.lastName != null) {
                            object.lastName = userAccountInfo.lastName;
                        }
                        if(userAccountInfo.firstName != null) {
                            object.firstName = userAccountInfo.firstName;
                        }
                        if(userAccountInfo.midName != null) {
                            object.midName = userAccountInfo.midName;
                        }
                        if(userAccountInfo.dateOfBirth != null) {
                            object.dateOfBirth = userAccountInfo.dateOfBirth;
                        }
                        if(userAccountInfo.cellPhone != null) {
                            object.cellPhone = userAccountInfo.cellPhone;
                        }
                        if(userAccountInfo.homePhone != null) {
                            object.homePhone = userAccountInfo.homePhone;
                        }
                        if(userAccountInfo.workPhone != null) {
                            object.workPhone = userAccountInfo.workPhone;
                        }
                        if(userAccountInfo.zipCode != null) {
                            object.zipCode = userAccountInfo.zipCode;
                        }
                        if(userAccountInfo.address != null) {
                            object.address = userAccountInfo.address;
                        }
                        if(userAccountInfo.city != null) {
                            object.city = userAccountInfo.city;
                        }
                        if(userAccountInfo.country != null) {
                            object.country = userAccountInfo.country;
                        }

                        // Save object
                        object.save(function(err, result) {
                            // Check error
                            if( !err ) {
                                // Create response message
                                var response = {
                                    status: 'success',
                                    message: 'Your profile was updated successfully!',
                                    data: result
                                }

                                // Callback function with result
                                callback(null, response);
                            }else{
                                // Callback with error
                                callback(err, null);
                            }
                        });
                    }
                }else{
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

        sails.log.info('=== END SERVICE | UserAccountInfoServices -> updateProfile');
    },


    /**
     * ` UserAccountInfoServices.remove()`
     */
    remove: function () {
        return {};
    },


    /**
     * ` UserAccountInfoServices.lock()`
     */
    lock: function () {

        return {};
    },


    /**
     * ` UserAccountInfoServices.unlock()`
     */
    unlock: function () {

        return {};
    }
};