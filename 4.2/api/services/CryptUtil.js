/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 5/3/15 12:10 AM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

// Using BCrypt library
var bcrypt = require('bcrypt');

/**
 *  CryptUtil
 *
 * @description :: Server-side logic for managing UserAccountInfo
 * @help        :: See http://links.sailsjs.org/docs/services
 */

module.exports = {


    /**
     * CryptUtil.encryptPassword()
     *
     * @param password
     * @param callback
     */
    encryptPassword: function (password, callback) {

        // Encrypt password
        bcrypt.hash(password, 10, function(err, hash) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, hash);
            }
        });
    },

    /**
     * CryptUtil.checkPassword()
     *
     * @param password
     * @param hash
     * @param callback
     */
    checkPassword: function (password, hash, callback) {

        // Compare password
        bcrypt.compare(password, hash, function(err, result) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

};