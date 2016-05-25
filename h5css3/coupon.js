function track_t(t1,t2,t3,extent) {
    var dataStr = "http://track.biyao.com/by.gif?";
    var uuid = "uu=" + encodeURI("&");
    var uid = "u=" + encodeURI("&");
    var token = "tk=" + encodeURI("&");
    var lurl = document.URL;
    if(lurl.indexOf('#')>0){
    	lurl = lurl.substring(0,lurl.indexOf('#'));
    }
    var url = "pg=&";
    var appName = "";
    var platform="";
    var ua = navigator.userAgent.toLowerCase();
    var systemVersion ="";
    var deviceType="";
	var isiOS = navigator.userAgent.match('iPad')||navigator.userAgent.match('iPhone')||navigator.userAgent.match('iPod'),isAndroid=navigator.userAgent.match('Android'),isDesktop = !isiOS&&!isAndroid;
	if(navigator.userAgent.match('iPad')){deviceType+='iPad';var index = ua.indexOf('version');systemVersion +='ios'+parseFloat(ua.slice(index+8));}
	else if(navigator.userAgent.match('iPhone')){deviceType+='iPhone';var index = ua.indexOf('version');systemVersion+='ios'+parseFloat(ua.slice(index+8));}
	else if(navigator.userAgent.match('iPod')){deviceType+='iPod';}
	else if(navigator.userAgent.match('Android')){deviceType+='Android';var index = ua.indexOf('android');systemVersion+='android'+parseFloat(ua.slice(index+8));}
    //appName = encodeURI(appName);
	platform="pf="+encodeURI('mweb');
	systemVersion ="sv="+encodeURI(systemVersion);
	deviceType="dt="+encodeURI(deviceType);
    var referer = "rf=&";
    var it="it=baiduwm";
    var f = "f=baiduwm";
    extent= encodeURI(extent);
    dataStr = dataStr + "r=" + Math.random() + "&t1="+t1+"&t2="+t2+"&t3="+t3+"&" + uuid + uid + token + "si=&" + url + "an=biyao&ppf=mobile&av=&"+platform+"&"+deviceType+"&"+systemVersion+"&ep=&" + referer + "tm=&ex="+extent+"&"+it+"&"+f;

	var cc=new Image();
	cc.src=dataStr;
	document.body.appendChild(cc);
}
track_t('14','','','');