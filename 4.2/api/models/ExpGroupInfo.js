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
        image: {
            columnName: 'image',
            type: 'string'
        },
        description: {
            columnName: 'description',
            type: 'string'
        },
        admin: {
            columnName: 'admin',
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
    tableName: 'exp_group_info',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true
};

