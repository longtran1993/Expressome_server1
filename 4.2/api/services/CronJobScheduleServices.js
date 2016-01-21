/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 6/14/15 4:18 PM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

var CronJob = require('cron').CronJob;

var cron = new CronJob('0 * * * * *', function() {
    sails.log("BEGIN | CRON JOB SCHEDULE");

    // Processing contest information
    ExpContestInfo.find({expiredDate: { '<': new Date() }, status : { '<' : 3 } }).exec(function(err, listContest){

        if(!err){
            if(listContest && Object.keys(listContest).length > 0){
                for(var i =0; i < listContest.length; i++){

                    var contest = listContest[i];

                    if(contest.status == 0){

                        contest.expiredDate = DateTimeUtil.nextHalfDay(new Date(contest.expiredDate));
                        contest.status = 1;
                        contest.save();

                        // Create event
                        var data = {
                            contestId : contest.id,
                            contestName : contest.name,
                            contestImage : contest.image,
                            contestOwner : contest.owner,
                            groupName : contest.groupName
                        }

                        // Send notification
                        ChatEventServices.newEvent('contest_start_round1', data, function(err, result){
                            sails.log(err ? err.toString() : 'No error');
                        })


                    } else if(contest.status == 1){

                        contest.expiredDate = DateTimeUtil.nextHalfDay(new Date(contest.expiredDate));
                        contest.status = 2;
                        contest.save();

                        // Set player round 2
                        ExpContestPlayerServices.setRound2Players(contest.id, function(err, result){
                            // Create event
                            var data = {
                                contestId : contest.id,
                                contestName : contest.name,
                                contestImage : contest.image,
                                contestOwner : contest.owner,
                                groupName : contest.groupName
                            }

                            // Send notification
                            ChatEventServices.newEvent('contest_start_round2', data, function(err, result){
                                sails.log(err ? err.toString() : 'No error');
                            })
                        });

                    } else if(contest.status == 2){
                        contest.status = 3;
                        contest.save();

                        // Create event
                        var data = {
                            contestId : contest.id,
                            contestName : contest.name,
                            contestImage : contest.image,
                            contestOwner : contest.owner,
                            groupName : contest.groupName
                        }

                        // Send notification
                        ChatEventServices.newEvent('contest_has_finished', data, function(err, result){
                            sails.log(err ? err.toString() : 'No error');
                        })
                    }
                }
            }
        } else {
            sails.log(err.toString());
        }
    })

    sails.log("END   | CRON JOB SCHEDULE");
}, null, true, 'America/Los_Angeles');

/**
 * Let's export everything
 */
module.exports = {
    cron: cron
}
