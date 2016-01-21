/**
* UserActionLog.js
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
          autoIncrement: true,
          integer : true
      },
      userId: {
          columnName: 'user_id',
          type: 'integer'
      },
      actionName: {
          columnName: 'action_name',
          type: 'string'
      },
      actionStatus: {
          columnName: 'action_status',
          type: 'string'
      },
      token: {
          columnName: 'token',
          type: 'string'
      },
      oldData: {
          columnName: 'old_data',
          type: 'string'
      },
      newData: {
          columnName: 'new_data',
          type: 'string'
      },
      requestedAt: {
          columnName: 'requested_at',
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
    tableName: 'user_action_log',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true

};

