///*
// *=============================================================================
// *== COPYRIGHT HYPERTECH ENTERPRISE SOLUTIONS. ALL RIGHT RESERVED.           ==
// *== HYPERTECH PROPRIETARY/CONFIDENTIAL. USE THIS SUBJECT TO LICENSE TERMS.  ==
// *==                                                                         ==
// *== VISIT HTTP://HYPERTECH.COM.VN FOR MORE INFORMATION                      ==
// *=============================================================================
// *
// *== File Name:
// *== Created at: 6/11/15 3:55 AM
// *== Created by: DuongNguyen
// *== Project: 01_ExpressSome
// *
// */
//
///**
// * Connection
// */
//global.MyIO.sockets.on('connection', function (socket) {
//
//    // Log begin event
//    sails.log.info('== BEGIN EVENT | NormalSocketServices -> Socket Connect');
//
//    // Get user info
//    var connectInfo = null;
//
//
//    // Check auth token
//    var queryParams = socket.handshake.query;
//    if(queryParams && queryParams.authToken){
//
//        // Check auth token
//        NormalSocketServices.handshake(socket.id, queryParams.authToken, function(result){
//
//            if(result){
//
//                // Auto join room
//                connectInfo = result;
//                NormalSocketServices.autoJoinRoom(socket, connectInfo.id, connectInfo.userId)
//
//            } else {
//                // Auto disconnect socket
//                socket.disconnect();
//            }
//        })
//
//
//    } else {
//        // Auto disconnect socket
//        socket.disconnect();
//    }
//
//
//    // Log begin event
//    sails.log.info('== END EVENT   | NormalSocketServices -> Socket Connect');
//
//    socket.on('disconnect', function () {
//
//        console.log('DISCONNECT' + socket.id);
//
//    });
//
//    socket.on('group-chat-message', function (data) {
//
//        // Log begin event
//        sails.log.info('== BEGIN EVENT | NormalSocketServices -> group-chat-message');
//
//        NormalSocketServices.newMessage('group-chat-message', data, connectInfo.userId);
//
//        // Log begin event
//        sails.log.info('== END EVENT   | NormalSocketServices -> group-chat-message');
//
//    });
//
//    socket.emit('hello', {socketId : socket.id});
//
//
//});
//
///**
// * Let's export everything
// */
//module.exports = {
//    socket: global.MyIO.sockets
//}
