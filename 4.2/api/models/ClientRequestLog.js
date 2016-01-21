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
        ipAddress: {
            columnName: 'ip_address',
            type: 'string'
        },
        requestUri: {
            columnName: 'request_uri',
            type: 'string'
        },
        status: {
            columnName: 'status',
            type: 'string'
        },
        headers: {
            columnName: 'headers',
            type: 'text'
        },
        inputParameters: {
            columnName: 'input_parameters',
            type: 'text'
        },
        urlParameters: {
            columnName: 'url_parameters',
            type: 'text'
        },
        response: {
            columnName: 'response',
            type: 'text'
        },
        exception: {
            columnName: 'exception',
            type: 'text'
        },
        requestAt: {
            columnName: 'request_at',
            type: 'datetime',
            defaultsTo: function () {
                return new Date();
            }
        },
        responseAt: {
            columnName: 'response_at',
            type: 'datetime'
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
    tableName: 'client_request_log',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true
};

