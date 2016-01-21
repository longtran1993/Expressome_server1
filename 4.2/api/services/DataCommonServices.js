/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 4/14/15 2:06 AM
 *== Created by: DuongNguyen
 *== Project: web005_express_some
 *
 */

/**
 *  DataCommonService
 *
 * @description :: Data common services
 * @help        :: See http://links.sailsjs.org/docs/services
 */

module.exports = {


    /**
     * ` DataCommonService.paginate()`
     */
    paginate: function (model, options, page, limit, callback) {

        try {

            // Parallel series
            async.parallel(
                [
                    function(callbackFunc){

                        // Query list object
                        model.find(options).paginate({page: page, limit: limit}).exec(function(err, result){

                            // Callback function with list object
                            callbackFunc(err, result);
                        });
                    },
                    function(callbackFunc){

                        // Count total item
                        model.count(options).exec(function(err, result){

                            // Check error
                            if ( !err) {

                                // Create paginate information
                                var paginate = {
                                    totalRecord : result,
                                    totalPage : Math.ceil(result / limit),
                                    currentPage : page,
                                    itemsPerPage : limit
                                }

                                // Callback function with paginate information
                                callbackFunc(err, paginate);

                            } else {

                                // Callback function with error
                                callbackFunc(err, null);

                            }
                        });
                    }
                ],
                function(err, results){

                    // Check error
                    if (!err && results && results.length == 2) {

                        // Create data json
                        var data = {
                            list : results[0],
                            paginate : results[1]
                        }

                        // Callback function with result data
                        callback(err, data);

                    } else {

                        // Callback function with error
                        callback(err, null);

                    }
                });

        } catch (err) {

            callback(err, null);
        }
    }
};
