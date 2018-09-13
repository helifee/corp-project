var h = screen.height;
var w = screen.width;
var opts = 'height=' + h + ',width=' + w + ',top=' + (screen.height - h) / 2 + ',left=' + (screen.width - w) / 2 + ',toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no';

var viewGraph = function(fiId) {
    var dt = new Date();
    window.open('Graph!index.do?fiId=' + fiId + '', 'g_' + dt.getTime(), opts);
};

var previous1 = function(wiId) {
    
    $.post('Fi!previous1.do', {
        wiId : wiId
    }, function(data) {
        alert("成功！");
    });
};

var completeWi = function(wiId) {
    
    $.post('Fi!completeWi.do', {
        wiId : wiId
    }, function(data) {
        alert("成功！");
    });
};

function queryFi(start) {
    if (start >= 0) {
        document.getElementsByName('start')[0].value = start;
    }
    $("#frm").submit();
}