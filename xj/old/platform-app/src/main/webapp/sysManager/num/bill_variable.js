/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _billVariable = {
    	ns : "_billVariable",
    	dataPar:{
    		maintainData:[],
    		billId:$.xljUtils.getUrlParam('id')?$.xljUtils.getUrlParam('id'):null
    	},
    	/**
    	 * 加载页面数据
    	 */
    	loadPageData:function(){
    		var my = this;
    		if(my.dataPar.billId!=null){
	    		jQuery("#list").jqGrid({
	    	        url: hostUrl+'sys/num/formVariable/page',
	    	        ajaxGridOptions: { contentType: 'application/json' },
	    	        mtype : "POST",  
	    	        contentType : "application/json",  
	    	        datatype : "json",
	    	        postData:{code:"",name:"",billId:my.dataPar.billId},
	    	        autowidth:true,
	    	        multiselect:true,
	    	        multiboxonly:true,
	    	        autowidth:true,
	    	        rownumbers:true,
	    	        jsonReader : {
	    	            repeatitems : false  
	    	        },
	    	        colModel : [
	    	            {name : 'id',label : 'id',hidden:true,align : "center"},
	    	            {name : 'dataType',label : 'dataType',hidden:true,align : "center"},
	    	            {name : 'billId',label : 'billId',hidden:true,align : "center"},
	    	            {name : 'code',label : '编号',align : "center",editable:true},
	    	            {name : 'name',label : '名称',align : "center",editable:true},
	    	            {name : 'sort',label : '序号',hidden:true,align : "center"},
	    	        ],
	    	        rowNum : 20,//一页显示多少条
	    	        rowList : [ 20,50,100,200],//可供用户选择一页显示多少条
	    	        pager : '#pager',//表格页脚的占位符(一般是div)的id
	    	        viewrecords : true,
	    	        ondblClickRow:function(rowid){
	    	        	$('#list').jqGrid('editRow',rowid, true);
	    	        	$('#cancelAdd').show();
	    	        },
	    	        gridComplete: function () {
	                	$.xljUtils.addGridScroll();
	                	$(".ui-jqgrid-bdiv").getNiceScroll().resize();
	    	        },
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
    		}else{
    			pop_tip_open("red","参数传输出错！");
    		}
    	},
    	/**
    	 * 新增的时候 自动的生成表单id
    	 */
    	getUUID:function (){
    		var my = this;
    		$.ajax({
    			type:'get',
    			url:hostUrl+'/generator/getGuuid?time='+Math.random(),
    			async:false,
    			success: function(data) {
    				my.dataPar.uuid = data.result;
    			},
	       	    error: function(XMLHttpRequest, textStatus, errorThrown) {
	    		   pop_tip_open("red","服务异常,请联系管理员！");
	            }
    		});
    	},
    	/**
    	 * 添加数据
    	 */
    	addData:function(){
			this.getUUID();
			$("#list").addRowData(this.dataPar.uuid, {"id":this.dataPar.uuid,"code":"","billId":this.dataPar.billId,"name":"","dataType":1}, "last"); 
			$('#list').jqGrid('editRow', this.dataPar.uuid, true);
    		//隐藏button
    		$('#cancelAdd').show();
    	},
    	/**
    	 * 取消新增操作
    	 */
    	cancelAddData:function(){
    		$('#list').jqGrid().trigger("reloadGrid");
    		$('#cancelAdd').hide();
    	},
    	/**
    	 * 修改数据
    	 */
    	editData:function(){
    		var ids=$('#list').jqGrid('getGridParam','selarrrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要修改的表单变量行");
    			return;
    		}
    		if(ids.length>1){
    			pop_tip_open("blue","请选择一行！");
    			return;
    		}
    		var rowData = $('#list').jqGrid('getRowData',ids);
    		rowData.dataType = 3;
    		$("#list").jqGrid('setRowData', ids, rowData);
			$('#list').jqGrid('editRow', ids, true);
			//展示button
		    $('#cancelAdd').show();
    	},
    	/**
    	 * 删除数据
    	 */
    	deleteData:function(){
    		var ids=$('#list').jqGrid('getGridParam','selarrrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要删除表单变量的行！");
    			return;
    		}
    		
    		//添加删除数据
			var rowData = $('#list').jqGrid('getRowData',ids);
			rowData.dataType = 2;
			this.dataPar.maintainData[this.dataPar.maintainData.length] = rowData;
			$("#list").jqGrid("delRowData", ids);//删除
    	},
    	/**
    	 * 装载过滤查询的条件
    	 */
    	searchDate:function(){
    		var corname=$("#corname").val();
    	 	jQuery("#list").jqGrid("setGridParam",{postData:{code:corname,name:corname,billId:this.dataPar.billId}}).trigger("reloadGrid");
    	 	//隐藏button
    		$('#cancelAdd').hide();
    	},
    	//数组匹配id
    	unique:function (n,arr){
    	    for(var i=0;i<arr.length;i++){
    	        if(n==arr[i].id){
    	            return true;
    	        }
    	    }
    	    return false;
    	},
    	/**
    	 * 保存表单变量类型事件
    	 */
    	saveData:function(){
    		var my = this;
    		var rowData=null;
    		//映射后台保存方法
    		var url=hostUrl+"sys/num/formVariable/saveAllFormVariable";
    		//请求方式
    		var type = 'POST';
    		
    		//从表数据
			var obj = $("#list").jqGrid("getRowData");//不要直接使用var arr = arr1，这样arr只是arr1的一个引用，两者的修改会互相影响  
		    var arr = obj.concat(my.dataPar.maintainData);  //复制，var arr = arr1.slice(0)  
		    var lastArr = [];
		    for(var i = 0;i<arr.length;i++){
		    	arr[i].sort = i+1;
		    	arr[i].delflag=0;
		    	var code=$('#'+arr[i].id+'_code').val()==undefined?arr[i].code:$('#'+arr[i].id+'_code').val();
		    	var name=$('#'+arr[i].id+'_name').val()==undefined?arr[i].name:$('#'+arr[i].id+'_name').val();
		    	arr[i].code = code;
		    	arr[i].name = name;
		    	if(arr[i].dataType==""){
		    		arr[i].dataType=3
		    	}else if(arr[i].dataType=="1"){
		    		arr[i].dataType=1
		    	}else if(arr[i].dataType=="3"){
		    		arr[i].dataType=3
		    	}else if(arr[i].dataType=="2"){
		    		arr[i].dataType=2
		    	}
		        if(! my.unique(arr[i].id,lastArr)){
		            lastArr.push(arr[i]);
		        }
		    }
    		for(var i = 0;i<lastArr.length;i++){
		    	if(""==lastArr[i].code||null==lastArr[i].code){
		    		pop_tip_open("blue",'编号不能为空！');
		    		return;
		    	}else{
		    		lastArr[i].code = lastArr[i].code.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]});
		    	}
		    	if(""==lastArr[i].name||null==lastArr[i].name){
		    		pop_tip_open("blue",'名称不能为空！');
		    		return;
		    	}else{
		    		lastArr[i].name = lastArr[i].name.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]});
		    	}
    		}
    	    $.ajax({
    	       url:url,
    	       data:JSON.stringify(lastArr),
    	       type:type,
    	       contentType:'application/json',
    	       dataType:'JSON',
    	       success:function (resultData ) {
	               if(resultData.success) {
                	   if(my.dataPar.lastSel){
                		   my.dataPar.lastSel = null;
                	   }
                	   if(my.dataPar.uuid){
                		   my.dataPar.uuid = null;
                	   }
                	   $('#list').jqGrid().trigger("reloadGrid");
                	   //隐藏button
               		   $('#cancelAdd').hide();
               		   pop_tip_open("green",'表单变量保存成功！');
	               }else {
	                   pop_tip_open("red",'数据保存失败！');
	               }
    	       },
	       	  error: function(XMLHttpRequest, textStatus, errorThrown) {
	    		  pop_tip_open("red","服务异常,请联系管理员！");
	          }
    	   });
    	},
    	/**
    	 * 模糊查询支持回车事件
    	 */
    	bindSearchDate:function(){
    		var my = this;
    		$("#corname").keyup(function(event){
    			if(event.keyCode ==13){
    				my.searchDate();
    			}
    		});
    		//隐藏button
    		$('#cancelAdd').hide();
    		//关闭事件
    		//关闭按钮绑定事件
    		$('#_close').on('click',function(){
    			my.to_list();
    		});
    	},
    	/**
    	 * 关闭事件
    	 */
    	to_list:function(){//关闭
			//调用父页面初始化方法
			window.opener.location="javascript:_billList.reloadGrid();";
			//本窗口制null
			window.opener=null;
			//关闭窗口
			window.close();
    	},
    	/**
    	 * 页面初始化
    	 */
    	pageInit:function(){
    		//支持回车事件
    		this.bindSearchDate();
    		//初始化数据
    		this.loadPageData();
    		//页面加载完毕后更改grid宽高
    	    $.xljUtils.resizeNestedGrid();
    	}
    };
    $(_billVariable.pageInit());
    window[_billVariable.ns] = _billVariable;
})(window,document);