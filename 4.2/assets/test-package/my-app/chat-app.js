/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 6/11/15 2:47 AM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

$(function(){

    /**
     * Connect button click event
     *
     */
    var socket = null;
    $('#btnConnect').click(function () {

        // Get info
         var socketHost = $('#socketHost').val();
         var authToken = $('#authToken').val();

        // Try to connect with server
        console.log('Try to connect to ' + socketHost + ' with token ' + authToken);
        socket = io.connect(socketHost, {query : "authToken=" + authToken });
        //var socket = io.connect(remoteAddress);

        socket.on('connect', function() {
            console.log('Socket is connected.');
        });
        socket.on('connect_failed', function(){
            console.log('Socket is connect_failed.');
        });
        socket.on('error', function(data){
            console.log('Socket is error.');
        });
        socket.on('disconnect', function() {
            console.log('Socket is disconnected.');
        });

        socket.on('message', function(data) {
            console.log('Socket have new message.');
            console.log(data);
            var obj = data;

            var messageBox =    '<div class="message-box">' +
                '   <div class="message-content">'+obj.message+'</div>' +
                '   <div class="message-info">' +
                '       <span><strong>'+obj.user.username+'</strong></span>' +
                '       <span>'+obj.sent+'</span>' +
                '       <span class="pull-right"><strong>'+obj.room.roomName+'</strong></span>' +
                '   </div>' +
                '</div>';

            var html = $("#messageDisplayBox").html();
            $("#messageDisplayBox").html(messageBox + html);
        });
        socket.on('event', function(data) {
            console.log('Socket have new event.');
            console.log(data);
        });
        socket.on('hello', function(data) {
            console.log('Socket have new hello.');
            console.log(data);
        });

    })

    $('#sendMessage').click(function(){

        var message = $('#message').val();
        var data = {groupId : 119, message : message}

        console.log('Try to emit message');

        socket.emit('group-chat-message', data);

        console.log('End function');
    })
})
