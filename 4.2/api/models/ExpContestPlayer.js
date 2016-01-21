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
        userId: {
            columnName: 'user_id',
            type: 'integer'
        },
        groupId: {
            columnName: 'group_id',
            type: 'integer'
        },
        contestId: {
            columnName: 'contest_id',
            type: 'integer'
        },
        image: {
            columnName: 'image',
            type: 'string'
        },
        joinedAt: {
            columnName: 'joined_at',
            type: 'datetime',
            defaultsTo: function () {
                return new Date();
            }
        },
        status: {
            columnName: 'status',
            type: 'integer'
        },
        round1Vote: {
            columnName: 'round1_vote',
            type: 'integer'
        },
        round2Vote: {
            columnName: 'round2_vote',
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
    tableName: 'exp_contest_player',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true
};

