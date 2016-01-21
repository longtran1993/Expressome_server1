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
        userId: {
            columnName: 'user_id',
            type: 'integer'
        },
        deviceType: {
            columnName: 'device_type',
            type: 'string',
            defaultsTo : 'iOS'
        },
        deviceName: {
            columnName: 'device_name',
            type: 'string'
        },
        udid: {
            columnName: 'udid',
            type: 'string'
        },
        machineCode: {
            columnName: 'machine_code',
            type: 'string'
        },
        badge: {
            columnName: 'badge',
            type: 'integer'
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

    tableName: 'user_device_info',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true
};

