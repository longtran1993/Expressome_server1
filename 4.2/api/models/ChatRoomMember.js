/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 5/28/15 1:03 AM
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
        userId: {
            columnName: 'user_id',
            type: 'integer'
        },
        deviceId: {
            columnName: 'device_id',
            type: 'integer'
        },
        socketId: {
            columnName: 'socket_id',
            type: 'integer'
        },
        roomId: {
            columnName: 'room_id',
            type: 'integer'
        },
        status: {
            columnName: 'status',
            type: 'string'
        },
        joinedAt: {
            columnName: 'joined_at',
            type: 'datetime',
            defaultsTo: function () {
                return new Date();
            }
        },
        leftAt: {
            columnName: 'left_at',
            type: 'datetime',
            defaultsTo : null
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
    tableName: 'chat_room_member',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true
};
