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
        username: {
            columnName: 'username',
            type: 'string'
        },
        image: {
            columnName: 'image',
            type: 'string'
        },
        password: {
            columnName: 'password',
            type: 'string'
        },
        email: {
            columnName: 'email',
            type: 'email'
        },
        role: {
            columnName: 'role',
            type: 'string',
            defaultsTo : 'user'
        },
        registered: {
            columnName: 'registered',
            type: 'datetime',
            defaultsTo: function () {
                return new Date();
            }
        },
        status: {
            columnName: 'status',
            type: 'string'
        },
        group: {
            columnName: 'group',
            type: 'integer'
        },
        joinedAt: {
            columnName: 'joined_at',
            type: 'datetime'
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

    tableName: 'user_account_info',
    schema: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,

    // Lifecycle Callbacks
    beforeCreate: function (values, cb) {

        // Encrypt password
        CryptUtil.encryptPassword(values.password, function(err, result){

            // Check error
            if ( !err ) {

                // Assign encrypted password into password field and run callback function with out any error
                values.password = result;
                cb();

            } else {
                // Run callback function with error
                cb(err);
            }
        })
    },

    // Override the default toJSON method
    toJSON: function() {
        var obj = this.toObject();
        delete obj.password;
        return obj;
    },

    //model validation messages definitions
    validationMessages: { //hand for i18n & l10n
        username: {
            required: 'Username is required',
            minLength: 'Username must have length grater than or equal 5',
            maxLength: 'Username must have length less than or equal 150'
        },
        email: {
            required: 'Email is required',
            email: 'Provide valid email address',
            unique: 'Email address is already taken'
        },
        password: {
            required: 'Password is required',
            minLength: 'Password must have length grater than or equal 5',
            maxLength: 'Password must have length less than or equal 150'
        }
    }
};

