/**
 * Created by jaumard on 27/02/2015.
 */
module.exports.schedule = {
  /*Every monday at 1am
   "0 1 * * 1"   : function ()
   {
        console.log("cron ok");
   }*/

    "* * * * *" : function(){
        sails.log("BEGIN | SAIL HOOK SCHEDULE");

        console.log('Cron job run ok.');

        sails.log("END   | SAIL HOOK SCHEDULE");
    }
};
