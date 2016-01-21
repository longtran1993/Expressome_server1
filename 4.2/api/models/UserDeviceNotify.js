/**
 * UserAccountInfo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        id: {
            columnName: 'id',
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        deviceId: {
            columnName: 'device_id',
            type: 'integer'
        },
        notifyType: {
            columnName: 'notify_type',
            type: 'string'
        },
        notifyMessage: {
            columnName: 'notify_message',
            type: 'string'
        },
        notifyData: {
            columnName: 'notify_data',
            type: 'string'
        },
        isRead : {
            columnName: 'is_read',
            type: 'integer'
        },
        pushedAt: {
            columnName: 'pushed_at',
            type: 'datetime',
            defaultsTo: function () {
                return new Date();
            }
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
        }
    },

    tableName: 'user_device_notify',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true
};

