/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 5/3/15 12:59 AM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

// create reusable transporter object using SMTP transport
var sendgrid  = require('sendgrid')("longtran1993", "Agent101");

/**
 *  MailerUtil
 *
 * @description :: Server-side logic for managing UserAccountInfo
 * @help        :: See http://links.sailsjs.org/docs/services
 */
module.exports = {


    /**
     * MailerUtil.sendResetPasswordEmail
     *
     * @param userAccountInfo
     * @param token
     * @param callback
     */
    sendResetPasswordEmail: function (userAccountInfo, token, callback) {

        var emailHtml = "" +
            "<html>" +
            "   <head>" +
            "       <title>[Expressome] - Reset password token for account "+userAccountInfo.username+"</title>" +
            "   </head>" +
            "   <body>" +
            "       <p>Dear "+userAccountInfo.username+".</p>" +
            "       <p>Please use this link to reset your password: <a href='expressome://reset_password?token=" + token + "'>Reset password</a></p>" +
            "       <p>Note: This link will only be available for one hour.</p>" +
            "       <p>If you didn't request to change your password, don't worry! Your password hasn't changed and you can delete this email.</p>" +
            "       <p>Thanks & best regards,</p>" +
            "       <p>Expressome.</p>" +
            "   </body>" +
            "</html>";

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'teamexpressome@bottleneckeffect.com', // sender address
            to: userAccountInfo.email, // list of receivers
            subject: '[Expressome] - Reset password token for account ' + userAccountInfo.username, // Subject line
            text: 'Token: ' + token, // plaintext body
            html: emailHtml // html body
        };

        // Send mail
        sendgrid.send(mailOptions, function(err, json) {
            if(err){
                callback(err, null);
            }else{
                callback(null, json);
            }
        });
    },

    /**
     * MailerUtil.sendSetPasswordEmail
     *
     * @param userAccountInfo
     * @param callback
     */
    sendSetPasswordEmail: function (userAccountInfo, callback) {

        var emailHtml = "" +
            "<html>" +
            "   <head>" +
            "       <title>[Expressome] - New password is updated for account "+userAccountInfo.username+"</title>" +
            "   </head>" +
            "   <body>" +
            "       <p>Dear "+userAccountInfo.username+".</p>" +
            "       <p>Your password has successfully been changed!.</p>" +
            "       <p>If you did not reset your password, please contact Expressome support here.</p>" +
            "       <p>Thanks and best regards,</p>" +
            "       <p>Expressome.</p>" +
            "   </body>" +
            "</html>";

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'teamexpressome@bottleneckeffect.com', // sender address
            to: userAccountInfo.email, // list of receivers
            subject: '[Expressome] - New password has set for account ' + userAccountInfo.username, // Subject line
            text: '[Expressome] - New password has set for account ' + userAccountInfo.username, // plaintext body
            html: emailHtml // html body
        };

        // Send mail
        sendgrid.send(mailOptions, function(err, json) {
            if(err){
                callback(err, null);
            }else{
                callback(null, json);
            }
        });
    },

    /**
     * MailerUtil.sendSetPasswordEmail
     *
     * @param feedback
     * @param callback
     */
    sendFeedbackEmail: function (feedback, callback) {

        console.log(feedback);

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: feedback.from, // sender address
            to: 'teamexpressome@bottleneckeffect.com', // list of receivers
            subject: "[Expressome] - My Experience of Expressome", // Subject line
            text: feedback.content // plaintext body
            //html: emailHtml // html body
        };

        // Send mail
        sendgrid.send(mailOptions, function(err, json) {
            if(err){
                callback(err, null);
            }else{
                callback(null, json);
            }
        });
    }

};