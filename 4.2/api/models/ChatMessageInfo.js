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
        roomId: {
            columnName: 'room_id',
            type: 'integer'
        },
        memberId: {
            columnName: 'member_id',
            type: 'integer'
        },
        type: {
            columnName: 'type',
            type: 'string'
        },
        data: {
            columnName: 'data',
            type: 'string'
        },
        message: {
            columnName: 'message',
            type: 'string'
        },
        sentAt: {
            columnName: 'sent_at',
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
    tableName: 'chat_message_info',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true

};
