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
        originalName: {
            columnName: 'original_name',
            type: 'string'
        },
        saveName: {
            columnName: 'save_name',
            type: 'string'
        },
        imageType: {
            columnName: 'image_type',
            type: 'string'
        },
        mineType: {
            columnName: 'mine_type',
            type: 'string'
        },
        entityName: {
            columnName: 'table_name',
            type: 'string',
            required : true,
            in : ['contest-cover', 'group-cover', 'player-image', 'user-avatar']
        },
        recordId: {
            columnName: 'record_id',
            type: 'integer',
            integer: true,
            required : true
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
    tableName: 'exp_image_upload',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true
};

