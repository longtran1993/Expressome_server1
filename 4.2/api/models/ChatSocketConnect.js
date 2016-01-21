/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 5/30/15 3:23 PM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

module.exports = {

    attributes: {
        id: {
            columnName: 'id',
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        socketId: {
            columnName: 'socket_id',
            type: 'string'
        },
        userId: {
            columnName: 'user_id',
            type: 'integer'
        },
        deviceId: {
            columnName: 'device_id',
            type: 'integer'
        },
        connectedAt: {
            columnName: 'connected_at',
            type: 'datetime',
            defaultsTo: function () {
                return new Date();
            }
        },
        disconnectedAt: {
            columnName: 'disconnected_at',
            type: 'datetime'
        },
        recordStatus: {
            columnName: 'record_status',
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
    tableName: 'chat_socket_connect',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true
};
