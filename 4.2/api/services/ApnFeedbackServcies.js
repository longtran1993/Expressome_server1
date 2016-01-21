/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 7/17/15 1:34 AM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

//
var apn = require('apn');

// Check device
var options = {
    "interval": 10
};

var feedback = new apn.Feedback(options);
feedback.on("feedback", function(devices) {
    console.log("------ BEGIN: APNS Feedback -----------");
    devices.forEach(function(item) {
        // Do something with item.device and item.time;
        var machineCode = item.device.toString("hex");
        console.log("Device: " + machineCode + " has been unreachable, since: " + item.time);

        // Remove token
        UserDeviceInfo.destroy({machineCode : machineCode}, function(err){});
    });
    console.log("------ END  : APNS Feedback -----------");
});
feedback.on("feedbackError", console.error);

/**
* Let's export everything
*/
module.exports = {
    apn: apn
}
