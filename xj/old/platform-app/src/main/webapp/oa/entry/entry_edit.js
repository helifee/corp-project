/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _entryEdit = {
    	ns : "_entryEdit",
    	dataPar:{upId:"",addParentId:""},
    	/**
    	 * 保存方法
    	 */
    	save_form:function(){//保存规则编号类型
    		var my = this;
    		//映射后台保存方法
			var url=hostUrl+"sys/quick/entry/saveEntryAndAuthor";
			$.ajax({
		       url:url,
		       data:new FormData($( "#entryForm" )[0]),  
		       type:'POST',
			   processData:false,
			   contentType:false,
		       success:function (resultData) {
    	           if(resultData) {
    	               var successFlag = resultData.success;
    	               if(successFlag) {
    	            	   pop_tip_open("green",'数据保存成功！');
    	            	   var parentId = $("#parentId").val();
    	            	   var entryId = $("#entryId").val();
    	            	   var selId = parentId=="0"?entryId:parentId
    	            	   if(my.dataPar.upId){
    	            		   selId = entryId;
    	            	   }
    	                   window.opener.location="javascript:_entryList.reloadGrid('"+selId+"')";
    	                   window.opener=null;
    	                   window.close();
    	               }else {
    	            	   pop_tip_open("red",resultData.msg);
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
     	   window.opener.location="javascript:_entryList.reloadGrid()";
           window.opener=null;
           window.close();
    	},
    	/**
    	 * 是否内部链接元素绑定事件
    	 */
    	event_isInner:function(el){
    		if($('#parentId').val()!=0){
    			$('#_url').val('');
    			if(el==1){
    				$('#_external').css('display', '');
    				$('#_url').attr("readonly","readonly")
    			}else{
    				$('#_external').css('display', 'none');
    				$('#_url').removeAttr("readonly")
    				$("#resourceId").val("");
    				$("#resourceName").val("");
    			}
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
    		$(":radio[name='isInner']").click(function(){
    			   my.event_isInner($(this).val());
		    });
    		$("#resourceName").on('click',function(){
    			my.openModel();
    		});
    		$("#selectBtn").on('click',function(){
    			my.openModel();
    		});
    		$("#confirmData").on('click',function(){
    			my.confirmResource();
    		});
    		$('#myModal').on('hidden.bs.modal', function () {
    			$("#modal_list").empty();//清空div
    		});
    		//图标上传事件
    		var $inputImage = $("#inputImage");
    		var $image = $('#newImg')
            if (window.FileReader) {
                $inputImage.change(function () {
                    var fileReader = new FileReader(),
                        files = this.files,
                        file;

                    if (!files.length) {
                        return;
                    }

                    file = files[0];

                    if (/^image\/\w+$/.test(file.type)) {
                    	var windowURL = window.URL || window.webkitURL;
                        var loadImg = windowURL.createObjectURL(file);
                        $image.attr('src',loadImg);
                        $image.attr('width',"80px");
                        $image.attr('hight',"80px");
                    } else {
                    	pop_tip_open("blue","请选择图片文件");
                    }
                });
            } else {
                $inputImage.addClass("hide");
            }
    	},
    	/**
    	 * 选择资源确定方法
    	 */
    	confirmResource:function(rowData){
    		if(!rowData){
    			var ids=$('#resourcelist').jqGrid('getGridParam','selrow');
    			if(!ids||ids.length==0) {
    				pop_tip_open("blue","请选择一行数据行！");
    				return;
    			}
    			rowData = $("#resourcelist").jqGrid("getRowData",ids);
    		}
    		$("#resourceId").val(rowData.id);
    		$("#resourceName").val(rowData.name);
    		$("#_url").val(rowData.url);
    		$("#myModal").modal("hide");
    	},
    	/**
    	 * 加载上级元素下拉框
    	 */
    	loadSelect:function(e_val){
    		var my = this;
    		$.ajax({
  	          type:'POST',
  	          url:hostUrl+'sys/quick/entry/queryList'+'?time='+Math.random(),
  	          dataType:'json',
  	          contentType:'application/json',
  	          async:false,
  	          data:JSON.stringify('{"parentId":"0","delflag":"0","sidx":"sort"}'),
  	          success: function(json) {
  	        	  if(json.success){
  	        		  data=json.result;
  	        		  for (var o in data){
  	        			  if(data[o].parentId!=0){
  	        				  continue;
  	        			  }else{
  	        				  if(my.dataPar.upId==data[o].id){
  	        					continue;
  	        				  }
  	        				  var name = data[o].name;
  	        				  if(name.length>32){
  	        					  name = name.substring(0,32)+"...";
  	        				  }
  	        				  if(data[o].id==e_val){
	        						$("#parentId").append("<option selected = 'selected' value='"+data[o].id+"'>"+name+"</option>");
	        				  }else{
	        					  $("#parentId").append("<option value='"+data[o].id+"'>"+name+"</option>");  
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
		  $.xljUtils.addGridScroll('chosen-results');
    	},
    	/**
    	 * 打开资源modal
    	 */
    	openModel:function(){
    		$("#modal_list").empty();
    		$("#modal_list").load("entry_resource.html");
    		$("#myModal").modal("show");
    	},
    	/**
    	 * 设置表单id
    	 */
    	setFromId:function(){
    		this.dataPar.upId=$.xljUtils.getUrlParam('id');
    		if(this.dataPar.upId){
    			$('#entryTitle').html("快速入口-修改");
    			$(document).attr("title","快速入口-修改");//修改title值
    			//赋值给页面id元素
    			$("#entryForm").find("input[name='id']").val(this.dataPar.upId);
//    			$('#iconUpload').xljAttachment({appId:'1',businessId:this.dataPar.upId,categoryId:'1',mode:'edit',singleUpload:true});
    		}else{
    			$('#entryTitle').html("快速入口-新增");
    			$(document).attr("title","快速入口-新增");//修改title值
    			//生成uuid并赋值页面id元素
    			this.getUUID();
    			this.dataPar.addParentId=$.xljUtils.getUrlParam('addParentId');
    			//上传图片初始化
//    			var uuId = $("#entryForm").find("input[name='id']").val();
//    			$('#iconUpload').xljAttachment({appId:'1',businessId:uuId,categoryId:'1',mode:'add',singleUpload:true});
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
    				$("#entryForm").find("input[name='id']").val(data.result);
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
        	        url:hostUrl+'sys/quick/entry/get/'+this.dataPar.upId+'?time='+Math.random(),
        	        success: function(data) {
        	        	var fromData=data.result;
        	        	if(fromData){
        	        		$("input[name='code']").val(fromData.code);
        	        		$("input[name='name']").val(fromData.name);
        	        		$("input[name='parentId']").val(fromData.parentId);
        	        		//加载下拉框
        	        		my.loadSelect(fromData.parentId);
        	        		//判断是否展示资源及url
    	        			if(fromData.parentId=='0'){
    	        				$("#_external").css('display', 'none');
    		    				$("#isParent").css('display', 'none');
    	        			}else{
    	        				$("#_external").css('display', '');
    		    				$("#isParent").css('display', '');
    	        			}
    	        			//内部连接初始化
    	        			my.event_isInner(fromData.isInner);
    	        			
        	        		$("input[name='icon']").val(fromData.linkIcon);
        	        		if(fromData.linkIcon){
       	    		    	 	document.getElementById('newImg').setAttribute('src',"data:image/jpeg;base64,"+fromData.linkIcon);
       	    		    	 	document.getElementById('newImg').setAttribute('width',"80px");
       	    		    	 	document.getElementById('newImg').setAttribute('hight',"80px");
       	    		     	}
        	        		$("input[name='resourceId']").val(fromData.resourceId);
        	        		$("input[name='resourceName']").val(fromData.resourceName);
        	        		$("#_url").val(fromData.url);
        	        		$(":radio[name='isInner'][value="+fromData.isInner+"]").attr("checked",true);
        	        		$(":radio[name='status'][value="+fromData.status+"]").attr("checked",true);
        	        		
        	        	}else{
        	        		pop_tip_open("red","获取数据为空！");
        	        	}
    	        	},
    	          	 error: function(XMLHttpRequest, textStatus, errorThrown) {
    	          		 pop_tip_open("red","服务异常,请联系管理员！");
    	              }
        		});
    		}else{
    			my.loadSelect(my.dataPar.addParentId);
        		//下拉框加载
    			if($('#parentId').val()==0){
    				//隐藏资源及url
    				$("#_external").css('display', 'none');
    				$("#isParent").css('display', 'none');
        		}
        		//初始内部链接事件
        		my.event_isInner(1);
    		}
    	},
    	/**
    	 * 装载过滤查询的条件
    	 */
    	searchDate:function(){
    		var corname=$("#corname").val();
    		$('#searchVal').val(corname);
    		$('#resourcelist').jqGrid().trigger("reloadGrid");
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
    		})
    	},
    	/**
    	 * 绑定事件(上级改变后，数据清空并显隐div)
    	 */
		bindIsParentEvent:function(){
			var my = this;
			$('#parentId').on('change',function(e){
				var selObj = $(this);
    			var _val = selObj.children('option:selected').val();
    			if(_val=='0'){
    				$('#resourceId').val("");
    				$('#resourceName').val("");
    				$('#_url').val("");
    				$("#_external").css('display', 'none');
    				$("#isParent").css('display', 'none');
    			}else{
    				$("#_external").css('display', '');
    				$("#isParent").css('display', '');
    				my.event_isInner($("input[name='isInner']:checked").val());
    			}
				$(".chosen-results").getNiceScroll().show().resize();
    		});
			//点击页面 滚动条重置
			$(document).on("click",function(){
				$(".chosen-results").getNiceScroll().hide();
			});
		},
    	/**
    	 * 页面初始化
    	 */
    	pageInit:function(){
    		//事件绑定
    		this.bind_event();
    		//设置表单id
    		this.setFromId();
    		//初始化form表单
    		this.initFrom();
    		//绑定上级下拉框事件
    		this.bindIsParentEvent();
    		//回车事件
    		this.bindSearchDate();
    	}
    };
    $(_entryEdit.pageInit());
    window[_entryEdit.ns] = _entryEdit;
})(window,document);