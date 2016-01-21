/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 6/9/15 8:14 PM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

var apn = require('apn');

module.exports = {

    /**
     * Join group page chat room
     *
     * @param groupId
     * @param data
     */
    pushNotificationToGroup: function (groupId, data) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | NotificationServices -> pushNotificationToGroup');

        try {

            // Find group member
            UserAccountInfo.find({group : groupId }).exec(function(err, groupMembers){
                if(!err && groupMembers && Object.keys(groupMembers).length > 0){

                    // Find userId
                    var userIdArray = [];
                    for(var i=0; i < groupMembers.length; i++){
                        userIdArray[i] = groupMembers[i].id;
                    }

                    // Find device need to notify
                    UserDeviceInfo.find({userId : userIdArray}).exec(function(err, listDevices){
                        if(!err && listDevices && Object.keys(listDevices).length > 0){

                            var devicesPushed = "";
                            for(var i=0; i < listDevices.length; i++){
                                var device = listDevices[i];
                                if(device.machineCode && device.machineCode.length > 60
                                        && devicesPushed.indexOf(device.machineCode) < 0) {

                                    // IOS push
                                    if(device.deviceType.toLowerCase() == 'ios'){

                                        // Push notification
                                        var notifyType = data.type;
                                        var notifyMessage = data.message;
                                        var notifyData = data;
                                        NotificationServices.pushNotification(notifyType, device, notifyMessage, notifyData);

                                        // Log info
                                        devicesPushed = devicesPushed +"|"+ device.machineCode;

                                    } else {

                                        // Google could message
                                    }

                                }
                            }
                        }
                    })
                }
            })
        } catch(err) {
            sails.log(err ? err.toString() : 'No result');
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | NotificationServices -> pushNotificationToGroup');
    },

    /**
     * Join group page chat room
     *
     * @param groupId
     * @param data
     */
    pushNotificationToGroupWithMessage: function (groupId, message, data) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | NotificationServices -> pushNotificationToGroupWithMessage');

        try {

            // Find group member
            UserAccountInfo.find({group : groupId }).exec(function(err, groupMembers){
                if(!err && groupMembers && Object.keys(groupMembers).length > 0){

                    // Find userId
                    var userIdArray = [];
                    for(var i=0; i < groupMembers.length; i++){
                        userIdArray[i] = groupMembers[i].id;
                    }

                    // Find device need to notify
                    UserDeviceInfo.find({userId : userIdArray}).exec(function(err, listDevices){
                        if(!err && listDevices && Object.keys(listDevices).length > 0){

                            var devicesPushed = "";
                            for(var i=0; i < listDevices.length; i++){
                                var device = listDevices[i];
                                if(device.machineCode && device.machineCode.length > 60
                                    && devicesPushed.indexOf(device.machineCode) < 0) {

                                    // IOS push
                                    if(device.deviceType.toLowerCase() == 'ios'){

                                        // Push notification
                                        var notifyType = data.type;
                                        var notifyMessage = message;
                                        var notifyData = data;
                                        NotificationServices.pushNotification(notifyType, device, notifyMessage, notifyData);

                                        // Log info
                                        devicesPushed = devicesPushed +"|"+ device.machineCode;

                                    } else {

                                        // Google could message
                                    }

                                }
                            }
                        }
                    })
                }
            })
        } catch(err) {
            sails.log(err ? err.toString() : 'No result');
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | NotificationServices -> pushNotificationToGroupWithMessage');
    },

    /**
     * Send offline message for group chat page
     *
     * @param groupId
     * @param notifyMessage
     * @param notifyData
     * @param callback
     */
    sendGroupChatMessage: function (groupId, notifyMessage, notifyData, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | NotificationServices -> sendGroupChatMessage');

        try {

            // Parallel series
            async.parallel(
                [
                    function(callbackFunc){
                        // Find room info
                        ChatRoomInfo.findOne({type : 'grouppage', recordId :  groupId}).exec(function(err, result){
                            callbackFunc(null, result);
                        })
                    },
                    function(callbackFunc){
                        // Find group member
                        UserAccountInfo.find({group : groupId }).exec(function(err, result){
                            callbackFunc(null, result);
                        })
                    }
                ],
                function(err, results){

                    // Check error
                    if( !err ) {

                        // Check results
                        if ( results && Object.keys(results).length > 0) {

                            // Get result
                            var roomInfo = results[0] ? results[0] : null;
                            var groupMembers = results[1] ? results[1] : null;

                            if( roomInfo && groupMembers
                                && Object.keys(roomInfo).length > 0
                                && Object.keys(groupMembers).length > 0 ){

                                // Create device id array
                                var userIdArray = [];
                                for(var i = 0; i < groupMembers.length; i++){
                                    userIdArray[i] = groupMembers[i].id;
                                }

                                // Parallel series
                                async.parallel(
                                    [
                                        function(callbackFunc){
                                            // Find room info
                                            UserDeviceInfo.find({userId : userIdArray}).exec(function(err, result){
                                                callbackFunc(null, result);
                                            })
                                        },
                                        function(callbackFunc){
                                            // Find group member
                                            ChatRoomMember.find({roomId : roomInfo.id, status : 'online' }).exec(function(err, result){
                                                callbackFunc(null, result);
                                            })
                                        }
                                    ],
                                    function(err, results){

                                        // Check error
                                        if( !err ) {

                                            // Check results
                                            if ( results && Object.keys(results).length > 0) {

                                                // Get result
                                                var deviceInfoArray = results[0] ? results[0] : null;
                                                var roomMembers = results[1] ? results[1] : null;
                                                var sentTokenArray = [];

                                                if( deviceInfoArray && roomMembers
                                                    && Object.keys(deviceInfoArray).length > 0
                                                    && Object.keys(roomMembers).length > 0 ){

                                                    for(var i=0; i < deviceInfoArray.length; i++){
                                                        var isOnline = false;
                                                        var isSent = false;
                                                        for(var j=0; j < roomMembers.length; j++){
                                                            if(roomMembers[j].deviceId == deviceInfoArray[i].id){
                                                                isOnline = true;
                                                                break;
                                                            }
                                                        }
                                                        for(var j=0; j < sentTokenArray.length; j++){
                                                            if(deviceInfoArray[i].machineCode == sentTokenArray[j]){
                                                                isSent = true;
                                                                break;
                                                            }
                                                        }


                                                        if(!isOnline && !isSent){

                                                            var deviceInfo = deviceInfoArray[i];

                                                            if( deviceInfo.machineCode && deviceInfo.machineCode.length > 60 ){

                                                                if(deviceInfo.deviceType.toLowerCase() == 'ios'){

                                                                    // Push notification
                                                                    var notifyType = 'chat_message';
                                                                    NotificationServices.pushNotification(notifyType, deviceInfo, notifyMessage, notifyData);

                                                                    // Log info
                                                                    sentTokenArray[sentTokenArray.length] = deviceInfo.machineCode;

                                                                } else {

                                                                    // Google could message
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            sails.log(err ? err.toString() : 'No result');
                                        }
                                    });
                            }
                        }
                    } else {
                        sails.log(err ? err.toString() : 'No result');
                    }
                });
        } catch(err) {
            sails.log(err ? err.toString() : 'No result');
        }

        callback(null, null);

        // Log begin function
        sails.log.info('=== END SERVICE   | NotificationServices -> sendGroupChatMessage');
    },

    /**
     * Push notify to device
     *
     * @param notifyType
     * @param deviceInfo
     * @param notifyMessage
     * @param notifyData
     */
    pushNotification : function(notifyType, deviceInfo, notifyMessage, notifyData){

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | NotificationServices -> pushNotification');

        try{

            var device = new apn.Device(deviceInfo.machineCode);

            var note = new apn.Notification({passphrase : '123456'});
            note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
            note.badge = deviceInfo.badge+1;
            note.sound = "ping.aiff";
            note.alert = notifyMessage;
            note.payload = notifyData;

            sails.apnConnection.pushNotification(note, device);
            sails.log("Push notification to : " + deviceInfo.machineCode + ' with badge : ' + (deviceInfo.badge+1));

            // Update device info badge
            deviceInfo.badge = deviceInfo.badge+1;
            deviceInfo.save(function(err){});

            // Save notify history
            deviceNotify = {
                deviceId : deviceInfo.id,
                notifyType : notifyType,
                notifyMessage : notifyMessage,
                notifyData : JSON.stringify(notifyData)
            }
            UserDeviceNotify.create(deviceNotify, function(err, result){
                if(!err){
                    sails.log(result);
                } else {
                    sails.log(err ? err.toString() : 'No result');
                }
            });

        } catch(err){
            sails.log(err ? err.toString() : 'No result');
        }

        // Log end function
        sails.log.info('=== END SERVICE   | NotificationServices -> pushNotification');
    },

    /**
     * Reset badge
     *
     * @param deviceId
     * @param notifyType
     * @param callback
     */
    resetBadge : function(deviceInfo, notifyType, callback){

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | NotificationServices -> resetBadge');

        try{

            console.log(deviceInfo);

            notifyType = notifyType.split(',');
            console.log(notifyType);

            // Count notification unread
            UserDeviceNotify.count({deviceId : deviceInfo.id, notifyType : notifyType, isRead : 0}).exec(function(err, count){
                if(!err){

                    deviceInfo.badge = deviceInfo.badge - count;

                    deviceInfo.save(function(err){
                        if(!err){

                            // Create response json object
                            var response = {
                                status : 'success',
                                code : 200,
                                message : '',
                                data : deviceInfo
                            }
                            callback(err, response);

                            // Change to read
                            UserDeviceNotify.update({deviceId : deviceInfo.id, notifyType : notifyType, isRead : 0}, {isRead : 1}, function(){});

                        } else {
                            callback(err, null);
                        }
                    })

                } else {
                    callback(err, null);
                }
            })

        } catch(err){
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | NotificationServices -> resetBadge');
    },

    /**
     * Send test notification
     */
    testNotification: function () {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | NotificationServices -> testNotification');

        try {

            // Get token info
            var deviceTokenString = "";
            UserDeviceInfo.find().exec(function(err, devices){
                if( !err ){
                    if( devices && Object.keys(devices).length > 0 && devices.length > 0 ){
                        for(var j =0; j < devices.length ; j++){

                            var deviceInfo = devices[j];

                            if( deviceInfo.machineCode && deviceInfo.machineCode.length > 60
                                && deviceTokenString.indexOf(deviceInfo.machineCode) < 0 ){

                                if(deviceInfo.deviceType.toLowerCase() == 'ios'){


                                    // Push notify
                                    var notifyType = 'test_apns';
                                    var notifyMessage = 'Hello! This is test message of expresssome.';
                                    var notifyData = {};
                                    NotificationServices.pushNotification(notifyType, deviceInfo, notifyMessage, notifyData);

                                    // Push device token
                                    deviceTokenString = deviceTokenString +"|"+ deviceInfo.machineCode;

                                } else {

                                    // Google could message
                                }
                            }
                        }
                    }
                } else {
                    sails.log(err ? err.toString() : 'No result');
                }
            })


        } catch(err) {
            sails.log(err ? err.toString() : 'No result');
        }

        // Log begin function
        sails.log.info('=== END SERVICE   | NotificationServices -> testNotification');
    }
};
