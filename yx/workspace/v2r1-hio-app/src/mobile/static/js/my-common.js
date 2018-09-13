
let myhostFn = {
    host:window.location.host,
    getMyHost(){
        let myHost = "http://192.168.3.52:9999/platform-app/";
        if(this.host=="192.168.3.157"){
            myHost = 'http://192.168.3.157:9999/platform-app/';
        }
        return myHost;

    }
}
let myGlobalHost = myhostFn.getMyHost();
