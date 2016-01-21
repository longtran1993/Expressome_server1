/*
 *=============================================================================
 *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
 *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
 *==                                                                         ==
 *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
 *=============================================================================
 *
 *== File Name: 
 *== Created at: 5/28/15 2:09 AM
 *== Created by: DuongNguyen
 *== Project: 01_ExpressSome
 *
 */

// Connect to websocket
var socket = null;
var baseUrl = "http://localhost:1337";

// socketConnectEvent
socketConnectEvent = function(authToken, groupId, instanceMessage){

    //// Join room
    //var data = {
    //    authToken :authToken,
    //    groupId :groupId,
    //    message :instanceMessage
    //}
    //
    //io.socket.get('/chat/grouppage/join', data, function(res){
    //    console.log(res);
    //});
}

$(function(){

    // Join to chat
    $("#btnConnect").click(function(){

        var authToken = $("#authToken").val();
        io.socket.post('/chat/authenticate/join',{authToken: authToken}, function(res){
            console.log("Attempt to join with socket: ");
            console.log(res);
            if(res.status != 'success'){
                alert(res.message);
            } else {
                alert(res.message);
                $("#btnConnect").hide();
            }
        });



    });

    // Send message
    $("#sendMessage").click(function(){

        var message = $("#message").val();

        io.socket.post('/chat/grouppage/message',{message: message}, function(res){
            console.log("Send message: ");
            console.log(res);
            if(res.status != 'success'){
                alert(res.message);
            }
        });

    })

    // One message
    io.socket.on('message',function(obj){

        console.log(obj);

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

    // One message
    io.socket.on('event',function(obj){

        alert('new event');
        console.log(obj);

        //var messageBox =    '<div class="message-box">' +
        //    '   <div class="message-content">'+obj.message+'</div>' +
        //    '   <div class="message-info">' +
        //    '       <span><strong>'+obj.user.username+'</strong></span>' +
        //    '       <span>'+obj.sent+'</span>' +
        //    '       <span class="pull-right"><strong>'+obj.room.roomName+'</strong></span>' +
        //    '   </div>' +
        //    '</div>';
        //
        //var html = $("#messageDisplayBox").html();
        //$("#messageDisplayBox").html(messageBox + html);

    });

})
