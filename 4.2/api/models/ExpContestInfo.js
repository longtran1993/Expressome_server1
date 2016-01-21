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
        name: {
            columnName: 'name',
            type: 'string'
        },
        owner: {
            columnName: 'owner',
            type: 'integer'
        },
        groupName: {
            columnName: 'group_name',
            type: 'string'
        },
        image: {
            columnName: 'image',
            type: 'string'
        },
        description: {
            columnName: 'description',
            type: 'string'
        },
        expiredDate: {
            columnName: 'expired_date',
            type: 'datetime',
            defaultsTo: function () {
                return DateTimeUtil.tomorrow();;
            }
        },
        status: {
            columnName: 'status',
            type: 'integer',
            defaultsTo : 0
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
    tableName: 'exp_contest_info',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true
};

