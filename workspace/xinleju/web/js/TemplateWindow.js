function TemplateWindow(options){

	//设置初始化参数
    this.setOptions=function(options){
    	this.id=(options&&options.id)?options.id:"div_window_"+Math.floor(Math.random()*10000); //如果不存在,自动创建
    	this.title=(options&&options.title)?options.title:'';//主题
    	this.templateUrl=(options&&options.templateUrl)?options.templateUrl:'';
    	this.window=(options&&options.window)?options.window:window; //如果不传递,使用当前window
		this.width=(options&&options.width)?options.width:400;
		this.height=(options&&options.height)?options.height:450;
		this.baseParams=(options&&options.baseParams)?options.baseParams:{};
		this.okCallback=(options&&options.okCallback)?options.okCallback:null; //确定
		this.cancelCallback=(options&&options.cancelCallback)?options.cancelCallback:null;  //取消
		this.okTitle = (options&&options.okTitle)?options.okTitle:'选择';//
		this.cancelTitle = (options&&options.cancelTitle)?options.cancelTitle:'关闭';//
    }
    
    //设置div模板
    this.setTemplate=function(){
    	if($(this.window.document.body).children('div[id="'+this.id+'"]').length>0){
    		//已经存在模板,不需要自己添加 ,或者再次添加
    	}else{
    		var div_window=$("<div></div>");
    		div_window.attr("id",this.id);
    		div_window.attr("title",this.title);
    		$(this.window.document.body).append(div_window);
    	}
    	/**
    	//判断参数
    	var baseParamsElement=$(this.window.document.body).children('div[id="'+this.id+'"]').children('input[id="baseParams_'+this.id+'"]');
    	if(baseParamsElement.length>0){
    		
    	}else{
    		var input_baseParams=$('<input type="hidden"  id="baseParams_'+this.id+'"  value="helloWorld"/>');
    		$(this.window.document.body).children('div[id="'+this.id+'"]').append(input_baseParams);
    	}
    	**/
    }
    
    //初始化设置
	this.setOptions(options);
	this.setTemplate();
	 
	
     
	//重新设置
    this.setReloadOptions=function(options){
		this.width=(options&&options.width)?options.width:this.width;
		this.height=(options&&options.height)?options.height:this.height;
		this.baseParams=(options&&options.baseParams)?options.baseParams:this.baseParams;
		this.okCallback=(options&&options.okCallback)?options.okCallback:this.okCallback; //确定
		this.cancelCallback=(options&&options.cancelCallback)?options.cancelCallback:this.cancelCallback;  //取消
    }
    
    
    

    this.openWindow=function(options){
        this.setReloadOptions(options); //设置属性
        //输出参数
        var baseParams=$.extend(true,{},this.baseParams);
        if(this.baseParams.initIds){
        	var initIds=$("#"+this.baseParams.initIds,this.window.document).val();
        	baseParams.initIds=initIds;
        }else{
        	baseParams.initIds="";
        }
        
        if(this.baseParams.initTypes){
        	var initTypes=$("#"+this.baseParams.initTypes,this.window.document).val();
        	baseParams.initTypes=initTypes;
        }else{
        	baseParams.initTypes="";
        }
        
        
        var url="";
        if(this.templateUrl.indexOf("?")>0){
             url=this.templateUrl+"&componentId="+this.id;//模板地址
        }else{
        	   
             url=this.templateUrl+"?componentId="+this.id;//模板地址
        }
    	var id=this.id;
    	var okCallback=this.okCallback;
    	var cancelCallback=this.cancelCallback;
    	if(this.id){
    		$('#'+id).dialog({    
        	    title: this.title,    
        	    width: this.width,    
        	    height: this.height,    
        	    closed: false, 
        	    resizable:true,
        	    cache: false,      
        	    modal: true,
        	    content:'<input type="hidden"  id="baseParams_'+this.id+'"  value='+ JSON.stringify(baseParams)+' ></input><iframe  scrolling="auto" id="iframedialog_'+this.id+'" frameborder="0"  src="' + url + '" style="width:100%;height:98%;"></iframe>',
        	    buttons: [
        	                {
        	                    text: this.okTitle,
        	                    handler: function () {
        	                        var data = $("#iframedialog_"+id)[0].contentWindow.okCallback();
        	                        if(data!=null && data!='' ){
        	                        	 if(okCallback){
                                         	okCallback(data);
                                         }
        	                        	 $('#'+id).dialog('close');
        	                        }else{
        	                        	 ashow("没有选择数据");
        	                        }
        	                        
        	                       
        	                    }
        	                },
        	                {
        	                    text: this.cancelTitle,
        	                    handler: function () {
        	                    	 var data = $("#iframedialog_"+id)[0].contentWindow.cancelCallback();
                                     if(cancelCallback){
                                    	 cancelCallback(data);
                                     }
        	                        $('#'+id).dialog('close');
        	                    }
        	                }
        	           ]
        	});    
    	}
    }
    
  


}
