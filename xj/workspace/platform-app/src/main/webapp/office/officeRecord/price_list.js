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
    	 * 加载页面数据
    	 */
    	loadPhonePageData:function(){
    		var my = this;
    		jQuery("#pricelist").jqGrid({
    			url: hostUrl+'oa/office/officePrice/page',
    	        ajaxGridOptions: { contentType: 'application/json' },
    	        mtype : "POST",  
    	        contentType : "application/json",  
    	        datatype : "json",
    	        postData:{delflag:"0",stockInfoId:selInfoId},
    	        width:$('#div_phone').width(),
    	        //height:$(window).height() - 80 -105 ,
    	        //autowidth:true,
    	        //multiselect:true,
    	        rownumbers:true,
    	        jsonReader : {
    	            repeatitems : false  
    	        },
    	        colModel : [
    	            {name : 'id',label : 'id',hidden:true,align : "center"},
    	            {name : 'stockName',label : '名称',align : "center"},
//    	            {name : 'name',label : '所属类别',align : "center"},
    	            {name : 'stockSpecifications',label : '规格',align : "center"},
    	            {name : 'stockBrand',label : '品牌',align : "center"},
    	            {name : 'meteringUnit',label : '单位',align : "center"},
    	            {name : 'inPrice',label : '入库单价',align : "center",formatter: "currency", formatoptions: {thousandsSeparator:",",decimalSeparator:"."}},
    	            {name : 'createPersonName',label : '录入者',align : "center"},
                    {name : 'createDate',label : '入库时间',align : "center"}
    	        ],
    	        rowNum : 20,//一页显示多少条
    	        rowList : [ 20,50,100,200],//可供用户选择一页显示多少条
    	        pager : '#pricepager',//表格页脚的占位符(一般是div)的id
    	        ondblClickRow:function(rowid){
    	       // 	window.open("phone_edit.html?id="+rowid);
    	        },
    	        onSelectRow: function (rowid) {
        		    my.dataPar.rowData = $('#pricelist').jqGrid('getRowData',rowid);
                },
    	        onCellSelect: function(){
                	if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
                		//重新选择行时清除上一次选中行的样式
                		$('#pricelist '+'#'+my.dataPar.rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
                	}
                },
                gridComplete: function () {
                	$.xljUtils.resizeNestedGrid(60);
                	$.xljUtils.addGridScroll();
                	$.xljUtils.gridResizeFn();
                	my.dataPar.rowDataBefore = my.dataPar.rowData;
                    if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
                    	//添加回显选中行样式
                    	$('#pricelist').setSelection(my.dataPar.rowDataBefore.id,true);
                    	$('#pricelist '+'#'+my.dataPar.rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                    }
                },
    	        viewrecords : true,
                loadError:function(xhr,status,error){
                	//异常处理
        	    	if(xhr.status==404){
        	    		 pop_tip_open("red","请求url有误！");
        	    		 return;
        	    	}
        	    	if(xhr.status==405){
        	    		pop_tip_open("red","请求方法有误！");
        	    		 return;
        	    	}
        	    	pop_tip_open("red","网络异常,请联系管理员！");
         	    },
         	    loadComplete:function(xhr){
        	    	if(!xhr.success){
        	    		if(xhr.code=="50000"||xhr.code=="50001"||xhr.code=="50003"){
        	    			pop_tip_open("red",xhr.msg);
        	    			return;
        	    		}
        	    		if(xhr.code=="50002"){
        	    			pop_tip_open("blue",xhr.msg);
        	    			return;
        	    		}
        	    		 pop_tip_open("red","查询数据失败！");
        	    	}else{
        	    		//success
        	    	}
         	    }
    	        
    	    });
    	},
    	reloadPhneGrid:function(){
    		$('#pricelist').jqGrid().trigger("reloadGrid");
    	},
    	/**
    	 * 装载过滤短信服务查询的条件
    	 */
    	searchPhoneDate:function(){
    		var corname=$("#phoneCorname").val();
    	 	jQuery("#pricelist").jqGrid("setGridParam",{postData:{code:corname,name:corname,username:corname}}).trigger("reloadGrid");
    	},
    	/**
    	 * 渲染grid数据样式
    	 */
    	addCellAttr:function (rowId, val, rowObject, cm, rdata) {
    	    if(rowObject.isDefault == "1" ){
    	    	return "style='color:blue'";
    	       // return "style='background-color:red'";
    	    }
    	},
    	/**
    	 * 模糊查询支持回车事件
    	 */
    	bindSearchDate:function(){
    		var my = this;
    		$("#phoneCorname").keyup(function(event){
    			if(event.keyCode ==13){
    				my.searchPhoneDate();
    			}
    		});
    		$("#mailCorname").keyup(function(event){
    			if(event.keyCode ==13){
    				my.searchMailDate();
    			}
    		});
    	},
    	/**
         * tab页切换事件
         */
        eventTab: function() { //tab页绑定事件
            $(".con-tit .approve-btn").on("click",function(){
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                var index = $(this).index();
                $(".content-div>div").hide();
                $(".content-div>div").eq(index).show();
                var btnName = $(this).attr("name");
                $.xljUtils.resizeNestedGrid(60);
            });
        },
        /**
         * 初始化页面
         */
        pageInit: function() { // 页面初始化JS
        	//页面切换事件
        	this.eventTab();
        	//回车事件
        	this.bindSearchDate();
        	//加载phone
        	this.loadPhonePageData();
        	//页面加载完毕后更改grid宽高
            $(window).on('resize', function () {
                $.xljUtils.resizeNestedGrid(60);
            });
        }
    };
    $(_noticList.pageInit());
    window[_noticList.ns] = _noticList;
})(window,document);