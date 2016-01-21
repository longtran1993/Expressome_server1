/**
 * UserAccountController
 *
 * @description :: Server-side logic for managing Useraccounts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


    /**
     * `UserAccountController.list()`
     */
    list: function (req, res) {

        // Log begin function
        sails.log.info('== BEGIN CONTROLLER | UserAccountController -> list');

        try {

            // Get page param
            var page = req.param('page', 1);

            // Validate parameters
            // TODO

            // Get list object
            UserAccountInfoServices.list(page, function(err, result){

                // Check error
                if ( !err ){

                    // Check result
                    if (result) {

                        // Create response json object
                        var response = {
                            status : 'success',
                            message : '',
                            data : result
                        }

                        // Response json with success message
                        res.json(response);

                    } else {

                        // Create response json object
                        var response = {
                            status : 'error',
                            message : 'Not found any record',
                            data : []
                        }

                        // Response json with error message
                        res.json(response);

                    }
                } else {

                    // Create response json object
                    var response = {
                        status : 'exception',
                        message : err.toString(),
                        data : []
                    }

                    // Response json with error message
                    res.json(response);
                }
            });

        } catch(err) {

            // Log error
            sails.log.error(err.toString());

            // Create response json object
            var response = {
                status : 'exception',
                message : err.toString(),
                data : []
            }

            // Response json with error message
            res.json(response);
        }

        // Log end function
        sails.log.info('== END CONTROLLER   | UserAccountController -> list');
    },


    /**
     * `UserAccountController.create()`
     */
    create: function (req, res) {
        return res.json({
            todo: 'create() is not implemented yet!'
        });
    },


    /**
     * `UserAccountController.update()`
     */
    update: function (req, res) {
        return res.json({
            todo: 'update() is not implemented yet!'
        });
    },


    /**
     * `UserAccountController.remove()`
     */
    remove: function (req, res) {
        return res.json({
            todo: 'remove() is not implemented yet!'
        });
    },


    /**
     * `UserAccountController.lock()`
     */
    lock: function (req, res) {
        return res.json({
            todo: 'lock() is not implemented yet!'
        });
    },


    /**
     * `UserAccountController.unlock()`
     */
    unlock: function (req, res) {
        return res.json({
            todo: 'unlock() is not implemented yet!'
        });
    }
};

