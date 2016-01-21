/**
 * Created by Luongtn on 6/19/2015.
 */
module.exports={

    /**
     * CmsExpGroupInfoServices.create()
     *
     * @param groupInfo
     * @param callback
     */
    create: function (groupInfo, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | CmsExpGroupInfoServices -> create');

        try {

            // Find user account
            UserAccountInfo.findOne({id : groupInfo.admin}).exec(function(err, result){

                // Check error
                if(!err){

                    // Check result
                    if(result && Object.keys(result).length > 0){

                        // Get user account info
                        var userInfo = result;

                        // Check group
                        if( !userInfo.group ){

                            // Create new object
                            ExpGroupInfo.create( groupInfo, function(err, result){

                                // Check error
                                if ( !err ) {

                                    // Check result
                                    if ( result && Object.keys(result).length > 0) {

                                        // Update user group
                                        var groupInfo = result;
                                        userInfo.group = groupInfo.id;
                                        userInfo.joinedAt = new Date();

                                        // Save to database
                                        userInfo.save(function(err){

                                            // Check error
                                            if(!err){

                                                // Create group member
                                                var groupMember = {
                                                    userId : groupInfo.admin,
                                                    groupId : groupInfo.id
                                                }

                                                // Create new object
                                                ExpGroupMember.create( groupMember, function(err, result){

                                                });

                                                // Create success message
                                                var response = {
                                                    status : 'success',
                                                    message : '',
                                                    data : groupInfo
                                                }
                                                callback(null, response);

                                            } else {
                                                callback(err, result);
                                            }
                                        })

                                    } else {
                                        callback(err, null);
                                    }
                                } else {
                                    callback(err, null);
                                }
                            });

                        } else {

                            // Create success message
                            var response = {
                                status : 'error',
                                code : 717,
                                message : 'You are joining in other group.',
                                data : {}
                            }

                            callback(null, response);
                        }

                    } else {
                        callback(err, result);
                    }
                } else {
                    callback(err, result);
                }
            })

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | CmsExpGroupInfoServices -> create');
    },

    /**
     * CmsExpGroupInfoServices.detail()
     *
     * @param id
     * @param callback
     */
    detail: function (id, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | CmsExpGroupInfoServices -> detail');

        try{

            // Find object
            ExpGroupInfo.find({id : id}).exec(function(err, result) {

                // Check error
                if ( !err ) {

                    // Check result
                    if ( result && Object.keys(result).length > 0 ) {

                        // Create response json object
                        var response = {
                            status : 'success',
                            message : '',
                            data : result[0]
                        }

                        // Callback with message
                        callback(null, response);

                    } else {

                        // Create response json object
                        var response = {
                            status : 'error',
                            code: 712,
                            message : 'Not found any group match with this id.',
                            data : {}
                        }

                        // Callback with message
                        callback(null, response);

                    }

                } else {

                    // Callback with error
                    callback(err, result);
                }

            });

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | CmsExpGroupInfoServices -> detail');
    },

    /**
     * CmsExpGroupInfoServices.listMember()
     *
     * @param groupId
     * @param callback
     */
    listMembers: function (groupId, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | CmsExpGroupInfoServices -> listMembers');

        try {

            ExpGroupInfo.findOne({id : groupId}).exec(function(err, result){

                // Check error
                if(!err){

                    // Check result
                    if(result && Object.keys(result).length > 0){

                        // Find user
                        UserAccountInfo.find({group : groupId}).exec(function(err, result){

                            // Check error
                            if(!err){

                                // Check result
                                if(result && Object.keys(result).length > 0){


                                    // Create list array
                                    var userArray = [];
                                    for(var i=0; i< result.length; i++){
                                        userArray[i] = result[i];
                                        delete userArray[i].password;
                                    }

                                    // Create response
                                    var response = {
                                        status : 'success',
                                        message : '',
                                        data : userArray
                                    }

                                    // Callback with message
                                    callback(null, response);

                                } else {

                                    // Create list array
                                    var userArray = [];

                                    // Create response
                                    var response = {
                                        status : 'success',
                                        message : '',
                                        data : userArray
                                    }

                                    // Callback with message
                                    callback(null, response);
                                }
                            } else {
                                callback(err, result);
                            }
                        })

                    } else {

                        // Create response json object
                        var response = {
                            status : 'error',
                            code: 712,
                            message : 'Not found any group match with this id.',
                            data : {}
                        }

                        // Callback with message
                        callback(null, response);
                    }

                } else {
                    callback(err, result);
                }

            })

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | CmsExpGroupInfoServices -> listMembers');
    },

    /**
     * CmsExpGroupInfoServices.update()
     *
     * @param groupInfo
     * @param callback
     */
    update: function (groupInfo, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | CmsExpGroupInfoServices -> update');

        try {

            // Check name of group
            ExpGroupInfo.find({id : groupInfo.id}).exec(function(err, result){

                // Check error
                if( !err ){

                    // Check result
                    if ( result  && Object.keys(result).length > 0 ) {

                        // Get first result
                        var object = result[0];

                        // Check permission
                        if ( object.admin == groupInfo.admin ) {

                            // Update object
                            object = result.pop();
                            object.name = groupInfo.name;
                            object.description = groupInfo.description;
                            object.updatedAt = new Date();

                            object.save(function(err) {

                                // Create success message
                                var response = {
                                    status : 'success',
                                    message : '',
                                    data : object
                                }

                                callback(null, response);

                            });

                        } else {

                            // Create success message
                            var response = {
                                status : 'error',
                                code : 714,
                                message : 'You are not admin of this group.',
                                data : {}
                            }

                            callback(null, response);

                        }

                    } else {

                        // Create success message
                        var response = {
                            status : 'error',
                            code : 712,
                            message : 'Not found any group match with this id',
                            data : {}
                        }

                        callback(null, response);
                    }

                } else {

                    // Callback with error
                    callback(err, null);
                }
            })

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | CmsExpGroupInfoServices -> update');
    },

    /**
     * ExpGroupInfoServices.update()
     *
     * @param groupInfo
     * @param callback
     */
    remove: function (groupInfo, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | CmsExpGroupInfoServices -> remove');

        try {

            // Check name of group
            ExpGroupInfo.find({id : groupInfo.id}).exec(function(err, result){

                // Check error
                if( !err ){

                    // Check result
                    if ( result && Object.keys(result).length > 0 ) {

                        // Get first result
                        var object = result[0];

                        // Check permission
                        if ( object.admin == groupInfo.admin ) {

                            // Update object
                            object = result.pop();

                            object.destroy(function(err) {

                                // Create success message
                                var response = {
                                    status : 'success',
                                    message : '',
                                    data : {}
                                }

                                callback(null, response);

                            });

                        } else {

                            // Create success message
                            var response = {
                                status : 'error',
                                code : 714,
                                message : 'You are not admin of this group.',
                                data : {}
                            }

                            callback(null, response);

                        }

                    } else {

                        // Create success message
                        var response = {
                            status : 'error',
                            code : 712,
                            message : 'Not found any group match with this id',
                            data : {}
                        }

                        callback(null, response);
                    }

                } else {

                    // Callback with error
                    callback(err, null);
                }
            })

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | CmsExpGroupInfoServices -> remove');
    },

    /**
     * CmsExpGroupInfoServices.list()
     *
     * @param page
     * @param callback
     */
    list: function (page, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | CmsExpGroupInfoServices -> list');

        try{

            // Get list data with paginate
            DataCommonServices.paginate(ExpGroupInfo, {}, page, 10, function(err, result){

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
        sails.log.info('=== END SERVICE   | CmsExpGroupInfoServices -> list');
    },

    /**
     * CmsExpGroupInfoServices.addMember()
     *
     * @param groupInfo
     * @param callback
     */
    addMember: function (groupMember, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | CmsExpGroupInfoServices -> addMember');

        try {

            // Find group info
            ExpGroupInfo.findOne({id : groupMember.groupId}).exec(function(err, result){

                // Check error
                if(!err){

                    // Check result
                    if(result && Object.keys(result).length > 0){

                        // Get group info data
                        var groupInfo = result;

                        // Find user account info
                        UserAccountInfo.findOne({id : groupMember.userId}).exec(function(err, result){

                            // Check error
                            if(!err){

                                // Check result
                                if(result && Object.keys(result).length > 0){

                                    // Get group info data
                                    var userAccount = result;

                                    // Check user group
                                    if( !userAccount.group){

                                        // Count group member
                                        UserAccountInfo.count({group : groupMember.groupId}).exec(function(err, result){

                                            // Check error
                                            if(!err){

                                                if( result < 50 ){

                                                    // Update user group
                                                    userAccount.group = parseInt(groupMember.groupId);
                                                    userAccount.joinedAt = new Date();

                                                    // Save into database
                                                    userAccount.save(function(err){

                                                        // Check error
                                                        if( !err ){

                                                            // Create success message
                                                            delete userAccount.password;
                                                            var response = {
                                                                status : 'success',
                                                                message : '',
                                                                data : userAccount
                                                            }

                                                            // Parallel series
                                                            async.parallel(
                                                                [
                                                                    function(callbackFunc){
                                                                        ExpGroupMember.create( groupMember, function(err, result){
                                                                            callbackFunc(err, result);
                                                                        });
                                                                    },
                                                                    function(callbackFunc){
                                                                        ChatRoomServices.joinGroupPage(groupMember.groupId, groupMember.userId, function(err, result){
                                                                            callbackFunc(err, result);
                                                                        })
                                                                    },
                                                                    function(callbackFunc){
                                                                        var data = {
                                                                            userId : userAccount.id,
                                                                            username : userAccount.username,
                                                                            userImage : userAccount.image,
                                                                            groupId : groupInfo.id,
                                                                            groupName : groupInfo.name,
                                                                            groupImage : groupInfo.image,
                                                                            joinedAt : new Date()
                                                                        }
                                                                        ChatEventServices.newEvent('join_group', data, function(err, result){
                                                                            callbackFunc(err, result);
                                                                        })
                                                                    },
                                                                    function(callbackFunc){
                                                                        NotificationServices.joinGroupPage(groupMember.groupId, groupMember.userId, function(err, result){
                                                                            callbackFunc(err, result);
                                                                        })
                                                                    }
                                                                ],
                                                                function(err, results){

                                                                    if(err){
                                                                        sails.log(err);
                                                                    }
                                                                });

                                                            // Callback with response
                                                            callback(null, response);

                                                        } else {
                                                            // Callback function with error
                                                            callback(err, null);
                                                        }
                                                    })

                                                } else {

                                                    // Create success message
                                                    var response = {
                                                        status : 'error',
                                                        code : 718,
                                                        message : 'This group have full members.',
                                                        data : {}
                                                    }

                                                    callback(null, response);
                                                }

                                            } else {
                                                // Callback function with error
                                                callback(err, null);
                                            }
                                        })

                                    } else {

                                        // Create success message
                                        var response = {
                                            status : 'error',
                                            code : 717,
                                            message : 'You are joining in other group.',
                                            data : {}
                                        }

                                        callback(null, response);
                                    }

                                } else {

                                    // Create success message
                                    var response = {
                                        status : 'error',
                                        code : 501,
                                        message : 'Internal server error.',
                                        data : {}
                                    }

                                    callback(null, response);
                                }
                            } else {
                                // Callback function with error
                                callback(err, null);
                            }
                        })

                    } else {

                        // Create success message
                        var response = {
                            status : 'error',
                            code : 712,
                            message : 'Not found any group match with this id.',
                            data : {}
                        }

                        callback(null, response);
                    }
                } else {
                    // Callback function with error
                    callback(err, null);
                }
            })

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | CmsExpGroupInfoServices -> addMember');
    },

    /**
     * ExpGroupInfoServices.addMember()
     *
     * @param groupInfo
     * @param callback
     */
    removeMember: function (groupMember, callback) {

        // Log begin function
        sails.log.info('=== BEGIN SERVICE | CmsExpGroupInfoServices -> removeMember');

        try {

            // Find group info
            ExpGroupInfo.findOne({id : groupMember.groupId}).exec(function(err, result){

                // Check error
                if(!err){

                    // Check result
                    if(result && Object.keys(result).length > 0){

                        // Get group info data
                        var groupInfo = result;

                        // Find user account info
                        UserAccountInfo.findOne({id : groupMember.userId}).exec(function(err, result){

                            // Check error
                            if(!err){

                                // Check result
                                if(result && Object.keys(result).length > 0){

                                    // Get group info data
                                    var userAccount = result;

                                    // Check user group
                                    if( userAccount.group || userAccount.group == groupMember.groupId){

                                        // Update user group
                                        userAccount.group = null;
                                        userAccount.joinedAt = null;

                                        // Save into database
                                        userAccount.save(function(err){

                                            // Check error
                                            if( !err ){

                                                // Create success message
                                                delete userAccount.password;
                                                var response = {
                                                    status : 'success',
                                                    message : '',
                                                    data : userAccount
                                                }

                                                // Parallel series
                                                async.parallel(
                                                    [
                                                        function(callbackFunc){
                                                            ExpGroupMember.destroy( groupMember, function(err, result){
                                                                callbackFunc(err, result);
                                                            });
                                                        },
                                                        function(callbackFunc){
                                                            ChatRoomServices.leaveGroupPage(groupMember.groupId, groupMember.userId, function(err, result){
                                                                callbackFunc(err, result);
                                                            })
                                                        },
                                                        function(callbackFunc){
                                                            var data = {
                                                                userId : userAccount.id,
                                                                username : userAccount.username,
                                                                userImage : userAccount.image,
                                                                groupId : groupInfo.id,
                                                                groupName : groupInfo.name,
                                                                groupImage : groupInfo.image,
                                                                leftAt : new Date()
                                                            }
                                                            ChatEventServices.newEvent('leave_group', data, function(err, result){
                                                                callbackFunc(err, result);
                                                            })
                                                        },
                                                        function(callbackFunc){
                                                            NotificationServices.leaveGroupPage(groupMember.groupId, groupMember.userId, function(err, result){
                                                                callbackFunc(err, result);
                                                            })
                                                        }
                                                    ],
                                                    function(err, results){

                                                        if(err){
                                                            sails.log(err);
                                                        }
                                                    });

                                                // Callback with response
                                                callback(null, response);

                                            } else {
                                                // Callback function with error
                                                callback(err, null);
                                            }
                                        })

                                    } else {

                                        // Create error message
                                        var response = {
                                            status : 'error',
                                            code : 713,
                                            message : 'You did not join this group, or this group is not existed.',
                                            data : {}
                                        }

                                        callback(null, response);
                                    }

                                } else {

                                    // Create success message
                                    var response = {
                                        status : 'error',
                                        code : 501,
                                        message : 'Internal server error.',
                                        data : {}
                                    }

                                    callback(null, response);
                                }
                            } else {
                                // Callback function with error
                                callback(err, null);
                            }
                        })

                    } else {

                        // Create success message
                        var response = {
                            status : 'error',
                            code : 712,
                            message : 'Not found any group match with this id.',
                            data : {}
                        }

                        callback(null, response);
                    }
                } else {
                    // Callback function with error
                    callback(err, null);
                }
            })

        } catch(err){

            // Log error
            sails.log.error(err.toString());

            // Callback function with error
            callback(err, null);
        }

        // Log end function
        sails.log.info('=== END SERVICE   | CmsExpGroupInfoServices -> removeMember');
    }

}