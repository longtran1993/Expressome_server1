/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 4/18/15 9:31 PM
 *== Created by: DuongNguyen
 *== Project: web005_expresssome
 *
 */

/**
 *  ValidationUtil
 *
 * @description :: Server-side logic for managing UserAccountInfo
 * @help        :: See http://links.sailsjs.org/docs/services
 */

module.exports = {

    /**
     * ` ValidationUtil.create()`
     */
    validate: function (model, inputJson, inputValidate, callback) {

        // Validate data using sails mode validate
        var validate = model.validate(inputJson, function(err){

            // Check error
            if (err) {

                var invalidArr = {};

                // get invalid arrtitues
                var errors = JSON.stringify(err);
                errors = JSON.parse(errors);
                var invalidAttributes = errors.invalidAttributes;

                if( invalidAttributes && inputValidate.length > 0){

                    for(var i= 0; i < inputValidate.length; i ++){

                        var key = inputValidate[i];

                        if(invalidAttributes[key]){
                            invalidArr[key] = invalidAttributes[key];
                        }
                    }
                }

                // Return invalid array
                callback(invalidArr);

            } else {

                // Return invalid array
                callback({});

            }


        });
    },

    multiValidate: function (modelArr, inputJsonArr, inputValidateArr, callback) {

        // Check length and make NodeJS series
        if (modelArr.length == 1) {

            ValidationUtil.validate(modelArr[0], inputJsonArr[0], inputValidateArr[0], callback);

        } else if(modelArr.length == 2) {

            // Parallel series
            async.parallel(
                [
                    function(callbackFunc){
                        ValidationUtil.validate(modelArr[0], inputJsonArr[0], inputValidateArr[0],
                                                                            function(invalidAttributes){
                            callbackFunc(null, invalidAttributes);
                        });
                    },
                    function(callbackFunc){
                        ValidationUtil.validate(modelArr[1], inputJsonArr[1], inputValidateArr[1],
                                                                                    function(invalidAttributes){
                            callbackFunc(null, invalidAttributes);
                        });
                    }
                ],
                function(err, results){

                    var invalidAttributes = results[0];

                    var temp = results[1];
                    var keys = Object.keys(temp);
                    for(var i = 0; i < keys.length; i++){
                        var key = keys[i];
                        invalidAttributes[key] = temp[key];

                    }

                    callback(invalidAttributes);

                });

        }
    },

    validateSetPassword: function(setPasswordInfo, callback){
        if(setPasswordInfo.token == '' || setPasswordInfo.token == null
        || setPasswordInfo.oldPassword == '' || setPasswordInfo.oldPassword == null
        || setPasswordInfo.newPassword == '' || setPasswordInfo.newPassword == null){

            //Create error message
            response = {
              status : "error",
                message : "Parameter null",
                data: []
            };

            // Call back with error message
            callback(null, response);
        } else if(setPasswordInfo.oldPassword.length < 6 || setPasswordInfo.oldPassword.length > 100 ){
            //Create error message
            response = {
                status : "error",
                message : "Old password length is not valid",
                data: []
            };

            // Call back with error message
            callback(null, response);
        } else if(setPasswordInfo.newPassword.length < 6 || setPasswordInfo.newPassword.length > 100 ){
            //Create error message
            response = {
                status : "error",
                message : "New password length is not valid",
                data: []
            };

            // Call back with error message
            callback(null, response);
        } else{
            //Create response message
            response = {
                status : "success",
                message : "",
                data: []
            };

            // Call back with response message
            callback(null, response);
        }

    }

};
