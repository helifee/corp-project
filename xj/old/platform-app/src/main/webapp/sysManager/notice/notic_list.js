/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _noticList = {
    	ns : "_noticList",
    	dataPar:{
    		rowData:null,
    		rowDataBefore:null
    	},
    	/**
         * tab页切换事件
         */
        eventTab: function() { //tab页绑定事件
        	$('#content-div').load("mailServer_list.html");
            $(".con-tit .approve-btn").on("click",function(){
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                var index = $(this).index();
                var btnName = $(this).attr("name");
                $('#content-div').empty();
                if(index==0){
                	$('#content-div').load("mailServer_list.html");
                }else{
                	$('#content-div').load("phoneServer_list.html");
                }
            });
        },
        /**
         * 初始化页面
         */
        pageInit: function() { // 页面初始化JS
        	//页面切换事件
        	this.eventTab();
        }
    };
    $(_noticList.pageInit());
    window[_noticList.ns] = _noticList;
})(window,document);