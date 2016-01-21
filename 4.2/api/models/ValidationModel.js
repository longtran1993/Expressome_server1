/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 4/19/15 11:08 PM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

/**
 * UserAccountInfo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        // User account info validation
        id: {
            columnName: 'id',
            type: 'integer',
            primaryKey: true,
            autoIncrement: true,
            integer : true,
            required : true
        },
        username: {
            columnName: 'username',
            type: 'string',
            required: true,
            minLength: 3,
            maxLength: 150
        },
        password: {
            columnName: 'password',
            type: 'string',
            required: true,
            minLength: 6,
            maxLength: 100
        },
        token: {
            columnName: 'token',
            type: 'string',
            required: true
        },
        oldPassword: {
            columnName: 'password',
            type: 'string',
            required: true,
            minLength: 6,
            maxLength: 100
        },
        newPassword: {
            columnName: 'password',
            type: 'string',
            required: true,
            minLength: 6,
            maxLength: 100
        },
        confirmPassword: {
            columnName: 'password',
            type: 'string',
            required: true,
            minLength: 6,
            maxLength: 100
        },
        email: {
            columnName: 'email',
            type: 'email',
            required: true
        },
        status: {
            columnName: 'status',
            type: 'string'
        },

        // User device info
        userId: {
            columnName: 'user_id',
            type: 'integer'
        },
        deviceType: {
            columnName: 'device_type',
            type: 'string',
            required : true
        },
        deviceName: {
            columnName: 'device_name',
            type: 'string'
        },
        udid: {
            columnName: 'udid',
            type: 'string',
            required : true
        },
        machineCode: {
            columnName: 'machine_code',
            type: 'string',
            required : true
        },

        // Group information
        name: {
            columnName: 'name',
            type: 'string',
            required : true,
            minLength: 1,
            maxLength: 250
        },
        image: {
            columnName: 'image',
            type: 'string'
        },
        description: {
            columnName: 'description',
            type: 'string',
            required : true
        },
        admin: {
            columnName: 'admin',
            type: 'integer',
            required : true,
            integer : true
        },

        // Group member
        userId: {
            columnName: 'user_id',
            type: 'integer',
            required : true
        },
        groupId: {
            columnName: 'group_id',
            type: 'integer',
            required : true
        },
        contestId: {
            columnName: 'contest_id',
            type: 'integer',
            required : true
        },
        playerId: {
            columnName: 'player_id',
            type: 'integer',
            required : true
        },

        // Contest
        groupIdArray : {
            columnName: 'group_id',
            type: 'string',
            required : true
        },


        // Normal information

        recordStatus: {
            columnName: 'record_status',
            type: 'integer',
            defaultsTo: 1
        },
        language: {
            columnName: 'language',
            type: 'string',
            defaultsTo: 'en'
        },
        createdAt: {
            columnName: 'created_at',
            type: 'datetime',
            defaultsTo: function () {
                return new Date();
            }
        },
        updatedAt: {
            columnName: 'updated_at',
            type: 'datetime',
            defaultsTo: function () {
                return new Date();
            }
        },
        expiredDate: {
            columnName: 'expired_date',
            type: 'datetime',
            date : true
        },

        // Contest info list

        page: {
            columnName: 'page',
            type: 'integer',
            integer : true
        },

        entityName: {
            columnName: 'entity_name',
            type: 'string',
            required : true
        },

        recordId: {
            columnName: 'record_id',
            type: 'integer',
            integer : true,
            required : true
        },

        // Chat
        authToken : {
            columnName: 'authToken',
            type: 'String',
            required : true
        },

        // feedback
        to: {
            columnName: 'to',
            type: 'email',
            required: true
        },
        cc: {
            columnName: 'c',
            type: 'email',
            required: true
        },
        subject : {
            columnName: 'subject',
            type: 'String',
            required : true
        },
        content : {
            columnName: 'content',
            type: 'String',
            required : true
        }

    },

    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true
};
