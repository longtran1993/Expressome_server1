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
        deviceId: {
            columnName: 'device_id',
            type: 'integer'
        },
        token: {
            columnName: 'token',
            type: 'string'
        },
        status: {
            columnName: 'status',
            type: 'string'
        },
        lastRequest: {
            columnName: 'last_request',
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

    tableName: 'user_auth_token',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true
};

