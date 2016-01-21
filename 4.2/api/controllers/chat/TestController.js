/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 7/4/15 1:10 PM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */


module.exports = {

    notify : function(req, res){

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | MessageController -> notify');

        try {

            NotificationServices.testNotification();

            res.json({ok : "Message have sent."});

        } catch(err) {

            // Log error
            sails.log.error(err.toString());

            // Create response json object
            var response = {
                status : 'error',
                code: 501,
                message : '',
                data : err.toString()
            }

            // Response json with error message
            res.json(response);
        }

        // Log end function
        sails.log.info('== END CONTROLLER   | MessageController -> notify');
    }
};
