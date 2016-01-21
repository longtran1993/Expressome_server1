var DEBUG =true;

var SocketHandler = function(socket){

    this.socket = socket || {};

    this.eventNames ={
        validated: 'validated',
        all : 'ALL-CATU'
    }
}


SocketHandler.prototype.addEventListeners = function(opts){

    //default events
    this.socket.on('connect', this.onConnect);
    this.socket.on('connect_error', this.onConnectError);
//    this.socket.on('connect_timeout', this.onConnectTimeout);
//    this.socket.on('reconnect', this.onReconnect);
//    this.socket.on('reconnecting', this.onReconnecting);
//    this.socket.on('reconnect_error', this.onReconnectError);
//    this.socket.on('reconnect_failed', this.onReconnectFailed);


    this.socket.on(this.eventNames.validated, this.onValidated);
}



SocketHandler.prototype.onValidated = function(data){

    return true;
}

SocketHandler.prototype.onConnect = function(){
    if(DEBUG){
        console.log('Connect to websocket server!');
    }
}

SocketHandler.prototype.onConnectError = function(data){
    var event = new Event('connection_error', data);
    document.dispatchEvent(event);

    if(DEBUG){

        console.log('Connection error');
    }
}