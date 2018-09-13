/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _formEdit = {
    	ns : "_formEdit",
    	dataPar:{upId:"",addParentId:"",addParentName:"",flag:false},
    	/**
    	 * 保存方法
    	 */
    	save_form:function(){//保存规则编号类型
    		var my = this;
    		//映射后台保存方法
			var url=hostUrl+"oa/office/officeHouse/save";
			//请求方式
			var type = 'POST';
			var objArr= $("#officeHouseForm").serializeArray();
			var objDto={};
			for(var i in objArr){
				var value = objArr[i].value;
				if(objArr[i].name=='parentNodeId'){
					value = value==""?"0":objArr[i].value;
				}
				objDto[objArr[i].name]=value;
			}
			objDto.delflag=0;
			//验证修改id是否为null
			if(this.dataPar.upId){
				//映射后台修改方法
				url=hostUrl+"oa/office/officeHouse/updateEntity/"+my.dataPar.upId;
				var type = 'PUT';
			}
    	    $.ajax({
    	       url:url,
    	       data:JSON.stringify(objDto),
    	       type:type,
    	       contentType:'application/json',
    	       dataType:'JSON',
    	       success:function (resultData ) {
    	           if(resultData) {
    	               var successFlag = resultData.success;
    	               if(successFlag) {
    	            	   pop_tip_open("green",'数据保存成功！');
    	            	   var selId = objDto.parentNodeId=="0"?objDto.id:objDto.parentNodeId
    	            	   if(my.dataPar.upId){
    	            		   selId = objDto.id;
    	            	   }
    	            	   if(my.dataPar.flag) {	//保存并新增
    	            		   $('#officeHouseForm')[0].reset();
    							window.opener.location="javascript:_tableList.reloadGrid('"+selId+"')";
    							window.location.reload();
    						}else {	//保存并关闭
    							window.opener.location="javascript:_tableList.reloadGrid('"+selId+"')";
					            window.opener=null;
					            window.close();
    						}
    	               }else {
    	            	   pop_tip_open("red",'数据保存失败！');
    	               }
    	           }
    	       },
    	       error: function(XMLHttpRequest, textStatus, errorThrown) {
            		 pop_tip_open("red","服务异常,请联系管理员！");
               }
    	   });
    	},
    	/**
    	 * 关闭window方法
    	 */
    	to_list:function(){//关闭
     	   window.opener.location="javascript:_tableList.reloadGrid()";
           window.opener=null;
           window.close();
    	},
    	/**
    	 * 加载上级元素下拉框
    	 */
    	loadSelect:function(e_val){
    		var my = this;
    		$.ajax({
  	          type:'POST',
  	          url:hostUrl+'oa/office/officeHouse/queryList'+'?time='+Math.random(),
  	          dataType:'json',
  	          contentType:'application/json',
  	          async:false,
  	          data:JSON.stringify('{"delflag":"0","sidx":"sortNumber"}'),
  	          success: function(json) {
  	        	  if(json.success){
  	        		  data=json.result;
  	        		  for (var o in data){
  	        			  if(data[o].parentNodeId!=0){
  	        				  continue;
  	        			  }else{
  	        				  if(my.dataPar.upId==data[o].id){
  	        					continue;
  	        				  }
  	        				  var name = data[o].typeName;
	        				  if(name.length>32){
	        					  name = name.substring(0,32)+"...";
	        				  }
  	        				  if(data[o].id==e_val){
	        						$("#parentNodeId").append("<option selected = 'selected' value='"+data[o].id+"'>"+name+"</option>");
	        				  }else{
	        					  $("#parentNodeId").append("<option value='"+data[o].id+"'>"+name+"</option>");  
	        				  }
	        			  }
  	        		  }
  	        	  }else{
  	        		//pop_tip_open("red","获取上级数据失败！");
  	        	  }
  	          },
  	        error: function(XMLHttpRequest, textStatus, errorThrown) {
         		 pop_tip_open("red","服务异常,请联系管理员！");
             }
  	      });
		  var config = {
	            '.chosen-select': {},
	            '.chosen-select-deselect': {
	                allow_single_deselect: true
	            },
	            '.chosen-select-no-single': {
	                disable_search_threshold: 10
	            },
	            '.chosen-select-no-results': {
	                no_results_text: 'Oops, nothing found!'
	            },
	            '.chosen-select-width': {
	                width: "95%"
	            }
	        }
	        for (var selector in config) {
	            $(selector).chosen(config[selector]);
	        }
    	},
    	/**
    	 * 设置表单id
    	 */
    	setFromId:function(){
    		this.dataPar.upId=$.xljUtils.getUrlParam('id');
    		if(this.dataPar.upId){
    			$('#entryTitle').html("用品分类-修改");
    			   document.title="用品分类-修改";
    			$('#saveAndCloseOfficeHouse').hide();
    			//赋值给页面id元素
    			$("#officeHouseForm").find("input[name='id']").val(this.dataPar.upId);
    		}else{
    			$('#entryTitle').html("用品分类-新增");
    			 document.title="用品分类-新增";
    			//生成uuid并赋值页面id元素
    			this.getUUID();
    			this.dataPar.addParentId=$.xljUtils.getUrlParam('addParentId');
    			this.dataPar.addParentName=$.xljUtils.getUrlParam('addParentName');
    			if(null!=this.dataPar.addParentId&&""!=this.dataPar.addParentId){
    				$("#officeHouseForm").find("input[name='parentNodeId']").val(this.dataPar.addParentId);
    				$("#parentNodeName").val(decodeURI(this.dataPar.addParentName));
    			}
    		}
    	},
    	/**
    	 * 新增的时候 自动的生成表单id
    	 */
    	getUUID:function (){
    		$.ajax({
    			type:'get',
    			url:hostUrl+'/generator/getGuuid'+'?time='+Math.random(),
    			async: false,
    			success: function(data) {
    				$("#officeHouseForm").find("input[name='id']").val(data.result);
    			},
             	 error: function(XMLHttpRequest, textStatus, errorThrown) {
              		 pop_tip_open("red","服务异常,请联系管理员！");
                  }
    		});
    	},
    	/**
    	 * 初始化表单
    	 */
    	initFrom:function(){
    		var my = this;
    		if(this.dataPar.upId){
    			$.ajax({
        	        type:'get',
        	        url:hostUrl+'oa/office/officeHouse/get/'+this.dataPar.upId+'?time='+Math.random(),
        	        success: function(data) {
        	        	var fromData=data.result;
        	        	if(fromData){
        	        		$("input[name='numberCode']").val(fromData.numberCode);
        	        		$("input[name='typeName']").val(fromData.typeName);
        	        		$("input[name='parentNodeId']").val(fromData.parentNodeId);
        	        		
        	        		$("#parentNodeName").val(fromData.typeParentName);
        	        		
        	        		$(":radio[name='state'][value="+fromData.state+"]").attr("checked",true);
							$('input[name="state"]').attr('disabled',true);
        	        		
        	        	}else{
        	        		pop_tip_open("red","获取数据为空！");
        	        	}
    	        	},
    	          	 error: function(XMLHttpRequest, textStatus, errorThrown) {
    	          		 pop_tip_open("red","服务异常,请联系管理员！");
    	              }
        		});
    		}
    	},
    	/**
    	 * 按钮事件绑定
    	 */
    	bind_event:function(){//事件绑定
    		var my = this;
    		$('#_close').on('click',function(){
    			my.to_list();
    		});
    		$('#saveOfficeHouse').on('click',function(){
    			my.dataPar.flag = false;
//    			my.save_form();
    			$('#officeHouseForm').submit();
    		});
    		$('#saveAndCloseOfficeHouse').on('click',function(){
    			my.dataPar.flag = true;
//    			my.save_form();
    			$('#officeHouseForm').submit();
    		});
    	},
    	/**
		 * 上级树
		 */
		modalSelEvent: function () {
			var my = this;
			//上级树插件
			$('#parentNodeName,#selectParentNode').on('click', function () {
				var urlAll = hostUrl+'oa/office/officeHouse/queryTreeList'+'?time='+Math.random();
				var dataPost = {
					delflag: 0,
					sidx: "sortNumber",
					state: "1"
				};
				$(my).xljSingleSelector({
					title: '选择上级',//选择器标题，默认是'选择组织机构'
					selectorType: 'company',//选择器类型，默认是组织机构选择器
					immediatelyShow: true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
					treeUrl: urlAll,
					treeParam: JSON.stringify(dataPost),//生成zTree树的参数
					targetId: 'parentNodeId',//选择的数据的ID存储input域
					targetName: 'parentNodeName',//选择的数据的Name存储input域
					ajaxType: 'POST', //ajax的type 默认为post
					saveCallback: my.flowCallback,
					treeSettings: {
						data: {
							simpleData: {
								enable: true,
								idKey: 'id',
								pIdKey: 'parentNodeId'
							},
							key: {
								name: "typeName"
							}
						},
					}
				});
			});
		},
		/**
		 * 上级回调函数
		 * @param data
		 */
		flowCallback: function (treeNode, e) {
			var flowId = $("#officeHouseForm").find("input[name='id']").val();
			if (treeNode.id == flowId) {
				pop_tip_open("blue", "上级用品分类不能选择自己");
				$("#officeHouseForm").find("input[id='parentNodeId']").val('');
				$("#officeHouseForm").find("input[id='parentNodeName']").val('');
			}else{
				$("#officeHouseForm").find("input[id='parentNodeId']").val(treeNode.id);
				$("#officeHouseForm").find("input[id='parentNodeName']").val(treeNode.typeName);
			}
		},
		/**
		 * 现金流量名称清空
		 */
		empty:function () {
			$("#officeHouseForm").find("input[id='parentNodeId']").val('');
			$("#officeHouseForm").find("input[id='parentNodeName']").val('');
		},
    	/**
    	 * 页面初始化
    	 */
    	pageInit:function(){
    		//事件绑定
    		this.bind_event();
    		//设置表单id
    		this.setFromId();
    		//绑定事件
    		this.modalSelEvent();
    		//初始化form表单
    		this.initFrom();
    	}
    };
    $(_formEdit.pageInit());
    window[_formEdit.ns] = _formEdit;
})(window,document);

