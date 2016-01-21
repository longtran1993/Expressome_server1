/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 5/4/15 9:10 PM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

/**
 *  DateTimeUtil
 *
 * @description :: Server-side logic for managing UserAccountInfo
 * @help        :: See http://links.sailsjs.org/docs/services
 */

module.exports = {

    /**
     * DateTimeUtil.nextHalfDay()
     */
    nextHalfDay : function( inputDate ){

        //inputDate.setHours(inputDate.getHours() + 12);
        //inputDate.setHours(inputDate.getHours() + 1);
        inputDate.setMinutes(inputDate.getMinutes() + 30)
        
        return inputDate;
    },

    /**
     *
     */
    tomorrow : function(){
        var tomorrow = new Date();
        //tomorrow.setDate(tomorrow.getDate()+1);
        //tomorrow.setHours(tomorrow.getHours() + 1);
        tomorrow.setMinutes(tomorrow.getMinutes() + 30)
        return tomorrow;
    },


    /**
     * DateTimeUtil.compareDate()
     */
    compareDate: function (date1, date2) {

        //var day1 = date1.getDate();
        //var day2 = date2.getDate();

        if (date1 < date2){
            return -1;
        } else if (date1 == date2){
            return 0;
        } else if (date1 > date2){
            return 1;
        }
    },

    currentTime : function(){

        ValidationModel.query("SELECT NOW() AS now", function(err, result){
            console.log(new Date(result[0].now));
        })
    }

};