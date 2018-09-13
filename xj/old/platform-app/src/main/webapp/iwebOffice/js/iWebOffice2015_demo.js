var userAgent = navigator.userAgent,
    rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
    rFirefox = /(firefox)\/([\w.]+)/,
    rOpera = /(opera).+version\/([\w.]+)/,
    rChrome = /(chrome)\/([\w.]+)/,
    rSafari = /version\/([\w.]+).*(safari)/;
var browser;
var version;
var ua = userAgent.toLowerCase();
function uaMatch(ua) {
    var match = rMsie.exec(ua);
    if (match != null) {
        return { browser : "IE", version : match[2] || "0" };
    }
    var match = rFirefox.exec(ua);
    if (match != null) {
        return { browser : match[1] || "", version : match[2] || "0" };
    }
    var match = rOpera.exec(ua);
    if (match != null) {
        return { browser : match[1] || "", version : match[2] || "0" };
    }
    var match = rChrome.exec(ua);
    if (match != null) {
        return { browser : match[1] || "", version : match[2] || "0" };
    }
    var match = rSafari.exec(ua);
    if (match != null) {
        return { browser : match[2] || "", version : match[1] || "0" };
    }
    if (match != null) {
        return { browser : "", version : "0" };
    }
}
var browserMatch = uaMatch(userAgent.toLowerCase());
if (browserMatch.browser) {
    browser = browserMatch.browser;
    version = browserMatch.version;
}

var str = '';

var copyright=
    "鑫苑仁居（北京）资产管理有限责任公司[专用];V5.0S0xGAAEAAAAAAAAAEAAAAG8BAABwAQAALAAAABJbqVfnjOh+kMLbeWAQeWt+K8bbg0ZDFFs2WYA17FiMTQ28p3++kNj8x2JR7bYMLBRytFiDiaxSKswJmc4XwJ/F4U4wWW3TXhgw87Re8H6ojjquiPe1nKS9H6R1Wz1pu54s7DBVkCNIiupBdFDl5qoMfM77+VKY+9TvClGMTro4929L7G/nvyom7qiqQ0ifXJvqupGJapMLLrcqL/0Fqbr7zAMw2AiSw7D/dM4b2aBW3nDZd5KQgoObouqocN0jk6eeXrO49+8RFAKvzdsz1fo1rS1NE9m89B5h7g5NCwWYrm6h+cHycy83o7vPYnZaNezqhfjRcwxtRHR2SibcpTyskpU/QiiyFSdvaof8CAsrLyHH4kIvr9zx0b7Jemk4+R0hViA8c2jHqTs4MlYpXGtvXeBvEa319iL+V4ybbXx6AP7isuy45FIQkERyt+X5urQIA+6gN+nZx+Tb+bDvO7HNcaZoq2HHPAkl5JGp11kPpEufur+hCLnYPOUr3h1NHw==";
str += '<object id="WebOffice2015" ';


str += ' width="100%"';
str += ' height="100%"';

if ((window.ActiveXObject!=undefined) || (window.ActiveXObject!=null) ||"ActiveXObject" in window)
{
    if(window.navigator.platform == "Win32")
        str += ' CLASSID="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D025"  codebase="iWebOffice2015.cab#version=12.4.0.444"';
    if (window.navigator.platform == "Win64")
        str += ' CLASSID="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D024"  codebase="iWebOffice2015.cab#version=12.4.0.444"';
    str += '>';
    str += '<param name="Copyright" value="' + copyright + '">';
}
else if (browser == "chrome")
{
    str += ' clsid="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D025"';
    str += ' type="application/kg-plugin"';
    str += ' OnCommand="OnCommand"';
    str += ' OnRightClickedWhenAnnotate="OnRightClickedWhenAnnotate"';
    str += ' OnSending="OnSending"';
    str += ' OnSendEnd="OnSendEnd"';
    str += ' OnRecvStart="OnRecvStart"';
    str += ' OnRecving="OnRecving"';
    str += ' OnRecvEnd="OnRecvEnd"';
    str += ' OnFullSizeBefore="OnFullSizeBefore"';
    str += ' OnFullSizeAfter="OnFullSizeAfter"';
    str += ' Copyright="' + copyright + '"';
}
else if (browser == "firefox")
{
    str += ' clsid="CLSID:D89F482C-5045-4DB5-8C53-D2C9EE71D025"';
    str += ' type="application/kg-activex"';
    str += ' OnCommand="OnCommand"';
    str += ' OnReady="OnReady"';
    str += ' OnOLECommand="OnOLECommand"';
    str += ' OnExecuteScripted="OnExecuteScripted"';
    str += ' OnQuit="OnQuit"';
    str += ' OnSendStart="OnSendStart"';
    str += ' OnSending="OnSending"';
    str += ' OnSendEnd="OnSendEnd"';
    str += ' OnRecvStart="OnRecvStart"';
    str += ' OnRecving="OnRecving"';
    str += ' OnRecvEnd="OnRecvEnd"';
    str += ' OnRightClickedWhenAnnotate="OnRightClickedWhenAnnotate"';
    str += ' OnFullSizeBefore="OnFullSizeBefore"';
    str += ' OnFullSizeAfter="OnFullSizeAfter"';
    str += ' Copyright="' + copyright + '"';
    str += '>';
}
str += '</object>';
document.write(str);

//谷歌中加载插件
function OnControlCreated()
{
    if (browser == "chrome")
    {
        KGChromePlugin = document.getElementById('WebOffice2015');
        iWebOffice = KGChromePlugin.obj;
        WebOffice.setObj(iWebOffice);
        Load();
    }
}