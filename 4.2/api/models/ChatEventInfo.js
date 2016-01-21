/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 5/28/15 12:59 AM
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
        name: {
            columnName: 'name',
            type: 'string'
        },
        actor: {
            columnName: 'actor',
            type: 'integer'
        },
        type: {
            columnName: 'type',
            type: 'string'
        },
        recordId: {
            columnName: 'record_id',
            type: 'integer'
        },
        data: {
            columnName: 'data',
            type: 'string'
        },
        status: {
            columnName: 'status',
            type: 'string'
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
    tableName: 'chat_event_info',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true
};