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
        contestId: {
            columnName: 'contest_id',
            type: 'integer'
        },
        playerId: {
            columnName: 'player_id',
            type: 'integer'
        },
        userId: {
            columnName: 'user_id',
            type: 'integer'
        },
        groupId: {
            columnName: 'group_id',
            type: 'integer'
        },
        votedBy: {
            columnName: 'voted_by',
            type: 'integer'
        },
        votedAt: {
            columnName: 'voted_at',
            type: 'datetime',
            defaultsTo: function () {
                return new Date();
            }
        },
        round: {
            columnName: 'round',
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
    tableName: 'exp_contest_vote',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true
};

