/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 4/14/15 3:17 AM
 *== Created by: DuongNguyen
 *== Project: web005_express_some
 *
 */

/**
 *  ClientRequestLogServices
 *
 * @description :: Server-side logic for managing UserAccountInfo
 * @help        :: See http://links.sailsjs.org/docs/services
 */

module.exports = {


    /**
     * ` ClientRequestLogServices.create()`
     */
    create: function (req, callback) {

        try {

            // Create request information object
            var requestLog = {
                ipAddress : req.ip,
                requestUri : req.originalUrl,
                status : '',
                headers : JSON.stringify(req.headers),
                inputParameters : JSON.stringify(req.body),
                urlParameters : JSON.stringify(req.query),
                response : '',
                exception : ''
            }

            // Save object into database
            ClientRequestLog.create(requestLog, function(err, result){

                // Callback function with result
                callback(err, result);
            })

        } catch(err) {

            callback(err, null);
        }
    },


    /**
     * ` ClientRequestLogServices.update()`
     */
    update: function (res, requestLog) {

        try {

            // Create request information object
            requestLog.status = res.statusCode,
            requestLog.response = JSON.stringify(res.body);
            requestLog.responseAt = new Date();
            requestLog.updatedAt = new Date();

            // Save object into database
            requestLog.save(function(err){

                // Check error
                if (err){
                    console.log(err.toString());
                }

            })

        } catch(err) {

            console.log(err.toString());
        }
    }

};
