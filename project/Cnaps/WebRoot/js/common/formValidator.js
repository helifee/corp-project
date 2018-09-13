//====================================================================================================
// [�������] jQuery formValidator
//----------------------------------------------------------------------------------------------------
// [��    ��] jQuery formValidator����֤��������ǻ���jQuery��⣬ʵ����js�ű���ҳ��ķ��롣��һ����
//            ��������ֻ��Ҫдһ�д���Ϳ�������ʵ��20�����ϵĽű����ơ���֧��һ����Ԫ���ۼӺܶ���
//            У�鷽ʽ,����������Ϣ��˼�룬�����ǰ���Ϣд�ڱ�Ԫ���ϣ��ܱȽ�������ʵ��ajax����
//----------------------------------------------------------------------------------------------------
// [��������] è��	
// [��    ��] 2008-01-11	
// [��    ��] wzmaodong@126.com
// [���߲���] http://wzmaodong.cnblogs.com
//====================================================================================================
var jQuery_formValidator_initConfig;
(function($) {

$.formValidator = 
{
	//����У�鷽ʽ֧�ֵĿؼ�����
	sustainType : function(id,setting)
	{
		var elem = $("#"+id).get(0);
		var srcTag = elem.tagName;
		var stype = elem.type;
		switch(setting.validatetype)
		{
			case "InitValidator":
				return true;
			case "InputValidator":
				if (srcTag == "INPUT" || srcTag == "TEXTAREA" || srcTag == "SELECT"){
					return true;
				}else{
					return false;
				}
			case "CompareValidator":
				if (srcTag == "INPUT" || srcTag == "TEXTAREA")
				{
					if (stype == "checkbox" || stype == "radio"){
						return false;
					}else{
						return true;
					}
				}
				return false;
			case "AjaxValidator":
				if (stype == "text" || stype == "textarea" || stype == "file" || stype == "select-one"){
					return true;
				}else{
					return false;
				}
			case "RegexValidator":
				if (srcTag == "INPUT" || srcTag == "TEXTAREA")
				{
					if (stype == "checkbox" || stype == "radio"){
						return false;
					}else{
						return true;
					}
				}
				return false;
			case "FunctionValidator":
			    return true;
		}
	},
    
	initConfig : function(controlOptions)
	{
		var settings = 
		{
			debug:false,
			validatorgroup : "1",
			alertmessage:false,
			validobjectids:"",
			onsuccess: function() {return true;},
			onerror:function() {},
			submitonce:false,
			formid:"",
			autotip: false
		};
		controlOptions = controlOptions || {};
		$.extend(settings, controlOptions);
		if(settings.formid!=""){$("#"+settings.formid).submit(function(){return $.formValidator.pageIsValid("1");})};
		if (jQuery_formValidator_initConfig == null ){jQuery_formValidator_initConfig = new Array();}
		jQuery_formValidator_initConfig.push( settings );
	},
	
	//���validator�����Ӧ��element�����validator����׷��Ҫ���е�У�顣
	appendValid : function(id, setting )
	{
		//����Ǹ���У�鲻֧�ֵ����ͣ��Ͳ�׷�ӵ�������-1��ʾû��׷�ӳɹ�
		if(!$.formValidator.sustainType(id,setting)) return -1;
		var srcjo = $("#"+id).get(0);   
		if (setting.validatetype=="InitValidator" || !srcjo.settings || srcjo.settings == undefined ){srcjo.settings = new Array();}   
		var len = srcjo.settings.push( setting );
		srcjo.settings[len - 1].index = len - 1;
		return len - 1;
	},
	
	//���validator�����Ӧ��element�����validator����׷��Ҫ���е�У�顣
	getInitConfig : function( validatorgroup )
	{
		if(jQuery_formValidator_initConfig!=null)
		{
		    for(i=0;i<jQuery_formValidator_initConfig.length;i++)
		    {
		        if(validatorgroup==jQuery_formValidator_initConfig[i].validatorgroup)
				{
					return jQuery_formValidator_initConfig[i];
				}
		    }
		}
		return null;
	},

	//����ÿ���ؼ��ϵĸ���У��
	triggerValidate : function(returnObj)
	{
		switch(returnObj.setting.validatetype)
		{
			case "InputValidator":
				$.formValidator.inputValid(returnObj);
				break;
			case "CompareValidator":
				$.formValidator.compareValid(returnObj);
				break;
			case "AjaxValidator":
				$.formValidator.ajaxValid(returnObj);
				break;
			case "RegexValidator":
				$.formValidator.regexValid(returnObj);
				break;
			case "FunctionValidator":
				$.formValidator.functionValid(returnObj);
				break;
		}
	},
	
	//������ʾ��Ϣ
	setTipState : function(tipid,showclass,showmsg)
	{
	    var tip = $("#"+tipid);
		if(showmsg==null || showmsg==""){
			tip.hide();
		}else
		{
			tip.show();
			tip.removeClass();
			tip.addClass( showclass );
			tip.html( "<nobr>"+showmsg+"</nobr>" );
		}
	},
	
	//���ô������ʾ��Ϣ
	setFailState : function(tipid,showmsg)
	{
	    var tip = $("#"+tipid);
	    tip.removeClass();
	    tip.addClass( "onError" );
	    tip.html( showmsg );
	},

	//���ݵ�������,��ȷ:��ȷ��ʾ,����:������ʾ
	showMessage : function(returnObj)
	{
	    var id = returnObj.id;
		var isvalid = returnObj.isvalid;
		var setting = returnObj.setting;//��ȷ:setting[0],����:��Ӧ��setting[i]
		var showmsg = "";
		var showclass = "";
		var settings = $("#"+id).get(0).settings;
		var intiConfig = $.formValidator.getInitConfig(settings[0].validatorgroup);
		if (!isvalid)
		{		
			if(setting.validatetype=="AjaxValidator")
			{
				if(setting.lastValid=="")
				{
				    showclass = "onLoad";
				    showmsg = setting.onwait;
				}
				else
				{
				    showclass = "onError";
				    showmsg = setting.onerror;
				}
			}
			else
			{
				showmsg = (returnObj.errormsg==""? setting.onerror : returnObj.errormsg);
				showclass = "onError";
			}
			if(intiConfig.alertmessage)		
			{
				var elem = $("#"+id).get(0);
				if(elem.validoldvalue!=$(elem).val()){alert(showmsg);}   
			}
			else
			{
				$.formValidator.setTipState(settings[0].tipid,showclass,showmsg);
			}
		}
		else
		{		
			//��֤�ɹ���,���û�����óɹ���ʾ��Ϣ,�����Ĭ����ʾ,��������Զ�����ʾ;����Ϊ��,ֵΪ�յ���ʾ
			if(!intiConfig.alertmessage)
			{
				var showmsg = "";
				if ( $.formValidator.isEmpty(id)){ 
					showmsg = setting.onempty;
				}else{
					showmsg = setting.oncorrect;
				}
			    $.formValidator.setTipState(setting.tipid,"onSuccess",showmsg);
			}
		}
	},

	//��ȡָ���ַ����ĳ���
    getLength : function(id)
    {
        var srcjo = $("#"+id);
        sType = srcjo.get(0).type;
        var len = 0;
        switch(sType)
		{
			case "text":
			case "hidden":
			case "password":
			case "textarea":
			case "file":
		        var val = srcjo.val();
				for (var i = 0; i < val.length; i++) 
                {
			        if (val.charCodeAt(i) >= 0x4e00 && val.charCodeAt(i) <= 0x9fa5){ 
				        len += 2;
			        }else {
				        len++;
					}
		        }
		        break;
			case "checkbox":
			case "radio": 
				len = $("input[@type='"+sType+"'][@name='"+srcjo.attr("name")+"'][@checked]").length;
				break;
		    case "select-one":
		        len = srcjo.get(0).options ? srcjo.get(0).options.selectedIndex : -1;
				break;
			case "select-multiple":
				len = $("select[@name="+srcjo.get(0).name+"] option[@selected]").length;
				break;
	    }
		return len;
    },
    
	//���empty������ԣ��жϽ����Ƿ�Ϊ�յ�У�������
    isEmpty : function(id)
    {
        if($("#"+id).get(0).settings[0].empty && $.formValidator.getLength(id)==0){
            return true;
        }else{
            return false;
		}
    },
    
	//������ã��жϵ�����Ԫ���Ƿ���֤ͨ���������ص�����
    isOneValid : function(id)
    {
	    return $.formValidator.oneIsValid(id,1).isvalid;
    },
    
	//��֤�����Ƿ���֤ͨ��,��ȷ����settings[0],���󷵻ض�Ӧ��settings[i]
	oneIsValid : function (id,index)
	{
		var returnObj = new Object();
		returnObj.id = id;
		returnObj.ajax = -1;
		returnObj.errormsg = "";       //�Զ��������Ϣ
		var elem = $("#"+id).get(0);
	    var settings = elem.settings;
	    var settingslen = settings.length;
		//ֻ��һ��formValidator��ʱ�򲻼���
		if (settingslen==1){settings[0].bind=false;}
		if(!settings[0].bind){return null;}
		for ( var i = 0 ; i < settingslen ; i ++ )
		{   
			if(i==0){
				if($.formValidator.isEmpty(id)){
					returnObj.isvalid = true;
					returnObj.setting = settings[0];
					break;
				}
				continue;
			}
			returnObj.setting = settings[i];
			if(settings[i].validatetype!="AjaxValidator") {
				$.formValidator.triggerValidate(returnObj);
			}else{
				returnObj.ajax = i;
			}
			if(!settings[i].isvalid) {
				returnObj.isvalid = false;
				returnObj.setting = settings[i];
				break;
			}else{
				returnObj.isvalid = true;
				returnObj.setting = settings[0];
				if(settings[i].validatetype=="AjaxValidator") break;
			}
		}
		return returnObj;
	},

	resetTipState : function(validatorgroup)
	{
		var initConfig = $.formValidator.getInitConfig(validatorgroup);
		var jqObjs = $(initConfig.validobjectids);
		jqObjs.each(function(){
			var setting0 = this.settings[0];
			$.formValidator.setTipState(setting0.tipid,"onShow",setting0.onshow);	
		});
	},

	//��֤������Ҫ��֤�Ķ��󣬲������Ƿ���֤�ɹ���
	pageIsValid : function (validatorgroup)
	{
	    if(validatorgroup == null || validatorgroup == undefined) validatorgroup = "1";
		var isvalid = true;
		var thefirstid = "",thefirsterrmsg;
		var returnObj,setting;
		var error_tip = "^"; 	

		var initConfig = $.formValidator.getInitConfig(validatorgroup);
		var jqObjs = $(initConfig.validobjectids);
		jqObjs.each(function(i,elem)
		{
			if(elem.settings[0].bind){
				returnObj = $.formValidator.oneIsValid(elem.id,1);
				if(returnObj)
				{
					var tipid = elem.settings[0].tipid;
					//У��ʧ��,��ȡ��һ�������������Ϣ��ID
					if (!returnObj.isvalid) {
						isvalid = false;
						if (thefirstid == ""){
							thefirstid = returnObj.id;
							thefirsterrmsg = (returnObj.errormsg==""?returnObj.setting.onerror:returnObj.errormsg)
						}
					}
					//Ϊ�˽��ʹ��ͬ��TIP��ʾ����:����ĳɹ���ʧ�ܶ�������ǰ���ʧ��
					if (!initConfig.alertmessage){
						if (error_tip.indexOf("^" + tipid + "^") == -1) {
							error_tip = error_tip + tipid + "^";
							if (!returnObj.isvalid) {
								error_tip = error_tip + tipid + "^";
							}
							$.formValidator.showMessage(returnObj);
						}
					}
				}
			}
		});
		//�ɹ���ʧ�ܺ󣬽��лص������Ĵ����Լ��ɹ���Ļҵ��ύ��ť�Ĺ���
		if(isvalid)
		{
            isvalid = initConfig.onsuccess();
			if(initConfig.submitonce){$("input[@type='submit']").attr("disabled",true);}
		}
		else
		{
			var obj = $("#"+thefirstid).get(0);
			initConfig.onerror(thefirsterrmsg,obj);
			if(thefirstid!=""){$("#"+thefirstid).focus();}
		}
		return !initConfig.debug && isvalid;
	},

	//ajaxУ��
	ajaxValid : function(returnObj)
	{
		var id = returnObj.id;
	    var srcjo = $("#"+id);
		var setting = srcjo.get(0).settings[returnObj.ajax];
		var ls_url = setting.url;
	    if (srcjo.size() == 0 && srcjo.get(0).settings[0].empty) {
			returnObj.setting = $("#"+id).get(0).settings[0];
			returnObj.isvalid = true;
			$.formValidator.showMessage(returnObj);
			setting.isvalid = true;
			return;
		}
		if(setting.addidvalue)
		{
			var parm = "clientid="+id+"&"+id+"="+encodeURIComponent(srcjo.val());
			ls_url = ls_url + ((ls_url).indexOf("?")>0?("&"+ parm) : ("?"+parm));
		}
		$.ajax(
		{	
			mode : "abort",
			type : setting.type, 
			url : ls_url, 
			cache : setting.cache,
			data : setting.data, 
			async : setting.async, 
			dataType : setting.datatype, 
			success : function(data){
			    setting0 = srcjo.get(0).settings[0];
			    if(setting.success(data))
			    {
			        $.formValidator.setTipState(setting0.tipid,"onSuccess",setting0.oncorrect);
			        setting.isvalid = true;
			    }
			    else
			    {
			        $.formValidator.setTipState(setting0.tipid,"onError",setting.onerror);
			        setting.isvalid = false;
			    }
			},
			complete : function(){
				if(setting.buttons && setting.buttons.length > 0) setting.buttons.attr({"disabled":false});
				setting.complete;
			}, 
			beforeSend : function(xhr){
				//�ٷ�����û�з�������֮ǰ���Ȼص��ύ��ť
				if(setting.buttons && setting.buttons.length > 0) setting.buttons.attr({"disabled":true});
				var isvalid = setting.beforesend(xhr);
				if(isvalid) setting.isvalid = false;		//���ǰ��ajax����ɹ��ˣ��ٴ�����֮ǰ�ȵ���������
				setting.lastValid = "-1";
				return isvalid;
			}, 
			error : function(){
				setting0 = srcjo.get(0).settings[0];
			    $.formValidator.setTipState(setting0.tipid,"onError",setting.onerror);
			    setting.isvalid = false;
				setting.error();
			},
			processData : setting.processdata 
		});
	},

	//��������ʽ����У�飨Ŀǰֻ���input��textarea��
	regexValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
		var srcTag = $("#"+id).get(0).tagName;
		var elem = $("#"+id).get(0);
		//���������������ʽ���ͽ��б��ʽУ��
		if(elem.settings[0].empty && elem.value==""){
			setting.isvalid = true;
		}
		else 
		{
			var regexpress = setting.regexp;
			if(setting.datatype=="enum"){regexpress = eval("regexEnum."+regexpress);}
			if(regexpress==undefined || regexpress==""){
				setting.isvalid = false;
				return;
			}
			var exp = new RegExp(regexpress, setting.param);
			if (exp.test($("#"+id).val())){
				setting.isvalid = true;
			}else {
				setting.isvalid = false;
			}
		}
	},
	
	//����У�顣����true/false��ʾУ���Ƿ�ɹ�;�����ַ�����ʾ������Ϣ��У��ʧ��;���û�з���ֵ��ʾ��������У��ɹ�
	functionValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
	    var srcjo = $("#"+id);
		var lb_ret = setting.fun(srcjo.val(),srcjo.get(0));
		if(lb_ret != undefined) 
		{
			if(typeof lb_ret == "string"){
				setting.isvalid = false;
				returnObj.errormsg = lb_ret;
			}else{
				setting.isvalid = lb_ret;
			}
		}
	},
	
	//��input��select���Ϳؼ�����У��
	inputValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
		var srcjo = $("#"+id);
		var elem = srcjo.get(0);
		var val = srcjo.val();
		var sType = elem.type;
		var len = $.formValidator.getLength(id);
		var empty = setting.empty,emptyerror = false;
		switch(sType)
		{
			case "text":
			case "hidden":
			case "password":
			case "textarea":
			case "file":
				if (setting.type == "size") {
					empty = setting.empty;
					if(!empty.leftempty){
						emptyerror = (val.replace(/^[ \s]+/, '').length != val.length);
					}
					if(!emptyerror && !empty.rightempty){
						emptyerror = (val.replace(/[ \s]+$/, '').length != val.length);
					}
					if(emptyerror && empty.emptyerror){returnObj.errormsg= empty.emptyerror}
				}
			case "checkbox":
			case "select-one":
			case "select-multiple":
			case "radio":
				var li_panduan = false;
				if(sType=="select-one" || sType=="select-multiple"){setting.type = "size";}
				if (setting.type == "size") {		//���������ַ����ȣ�������У��
					if(!emptyerror){li_panduan = true}
					if(li_panduan){val = len}
				}
				else
				{
					stype = (typeof setting.min);
					if(stype =="number")
					{
						val = (new Number(val)).valueOf();
						if(!isNaN(val)){
							li_panduan = true;
						}
					}
					if(stype =="string"){
						li_panduan = true;
					}
				}
				if(li_panduan)
				{
					if(val < setting.min || val > setting.max){
						if(val < setting.min && setting.onerrormin){
							returnObj.errormsg= setting.onerrormin;
						}
						if(val > setting.min && setting.onerrormax){
							returnObj.errormsg= setting.onerrormax;
						}
						setting.isvalid = false;
					}
					else{
						setting.isvalid = true;
					}
				}
				else{
					setting.isvalid = false;
				}
				break;
		}
	},
	
	compareValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
		var srcjo = $("#"+id);
	    var desjo = $("#"+setting.desid );
	    setting.isvalid = false;
		curvalue = srcjo.val();
		ls_data = desjo.val();
		if(setting.datatype=="number")
        {
            if(!isNaN(curvalue) && !isNaN(ls_data))
			{
				curvalue = parseFloat(curvalue);
                ls_data = parseFloat(ls_data);
			}
			else
			{
			    return;
			}
        }
		
	    switch(setting.operateor)
	    {
	        case "=":
	            if(curvalue == ls_data){setting.isvalid = true;}
	            break;
	        case "!=":
	            if(curvalue != ls_data){setting.isvalid = true;}
	            break;
	        case ">":
	            if(curvalue > ls_data){setting.isvalid = true;}
	            break;
	        case ">=":
	            if(curvalue >= ls_data){setting.isvalid = true;}
	            break;
	        case "<": 
	            if(curvalue < ls_data){setting.isvalid = true;}
	            break;
	        case "<=":
	            if(curvalue <= ls_data){setting.isvalid = true;}
	            break;
	        case "oneok":
	            if($.formValidator.isEmpty(id) || $.formValidator.isEmpty(isEmpty.desid) ){
	                setting.isvalid = false;
				}else{
	                setting.isvalid = true;
				}
	    }
	}
};

//ÿ��У��ؼ������ʼ����
$.fn.formValidator = function( msgOptions) 
{
	var setting = 
	{
		validatorgroup : "1",
		empty :false,
		submitonce : false,
		automodify : false,
		onshow :"����������",
		onfocus: "����������",
		oncorrect: "������ȷ",
		onempty: "��������Ϊ��",
		defaultvalue : null,
		bind : true,
		validatetype : "InitValidator",
		tipcss : 
		{
			"left" : "10px",
			"top" : "1px",
			"height" : "20px",
			"width":"250px"
		},
		triggerevent:"blur"
	};
	
	//�Ⱥϲ���������(��ȿ���)
	msgOptions = msgOptions || {};
	$.extend(true,setting, msgOptions);

	//��ȡ��У�����ȫ��������Ϣ
	var initConfig = $.formValidator.getInitConfig(setting.validatorgroup);

	return this.each(function()
	{
		var setting_temp = {};
		$.extend(setting_temp, setting);
		//�Զ��γ�TIP
		var tip = "";
		if(initConfig.autotip)
		{
			if (!setting_temp.tipid){setting_temp.tipid = this.id+"Tip"};
			tip = setting_temp.tipid;
			if (!setting_temp.relativeid){setting_temp.relativeid = this.id};
			aftertip = setting_temp.relativeid;
			var y = getAbsoluteTop(aftertip) - 3;
			var x = getElementWidth(aftertip) + getAbsoluteLeft(aftertip);
			if($("#"+tip).length==0)
			{
				$("<div class='formValidateTip'></div>").appendTo($("body")).css({left: x+"px", top: y+"px"}).prepend($('<div id="'+tip+'"></div>').css(setting_temp.tipcss));
			}
			setting_temp.tipid = tip;
		}
		//�ֶ�TIP
		else
		{
			if (!setting_temp.tipid){setting_temp.tipid = this.id+"Tip"};
			tip = setting_temp.tipid;
		}

		//ÿ���ؼ���Ҫ�������������Ϣ
		$.formValidator.appendValid(this.id,setting_temp);

		//����ؼ�ID
		var validobjectids = initConfig.validobjectids;
		if(validobjectids.indexOf("#"+this.id+" ")==-1){
			initConfig.validobjectids = (validobjectids=="" ? "#"+this.id : validobjectids + ",#" + this.id);
		}

		//��ʼ����ʾ��Ϣ
		if(!initConfig.alertmessage){
			$.formValidator.setTipState(tip,"onShow",setting.onshow);
		}

		//ע���¼�
		var srcTag = this.tagName;
		var stype = this.type;
		var defaultvalue = setting.defaultvalue;
		var jqobj = $(this);

		if (srcTag == "INPUT" || srcTag=="TEXTAREA")
		{
			//����Ĭ��ֵ
			if(defaultvalue){
				if (stype == "checkbox" || stype == "radio") {
					if(stype == "radio"){
						if(this.value==defaultvalue){jqobj.attr("checked",true)}
					}
					else
					{
						jqobj.attr("checked",$.inArray(this.value, defaultvalue)>=0);
					}
				}else{
					jqobj.val(defaultvalue);
				}
			}
			
			//ע���ý�����¼����ı���ʾ��������ֺ���ʽ������ԭֵ
			jqobj.focus(function()
			{	
				if(!initConfig.alertmessage){
					$.formValidator.setTipState(tip,"onFocus",setting.onfocus);
				}
				if (stype == "password" || stype == "text" || stype == "textarea" || stype == "file") {
					this.validoldvalue = jqobj.val();
				}
			});
			//ע��ʧȥ������¼�������У�飬�ı���ʾ��������ֺ���ʽ���������ʾ����
			jqobj.bind(setting.triggerevent, function(){   
				var settings = this.settings;
				var returnObj = $.formValidator.oneIsValid(this.id,1);
				if(returnObj==null){return;}
				if(returnObj.ajax >= 0) 
				{
					if(this.validoldvalue!=$(this).val())
					{
						$.formValidator.setTipState(tip,"onLoad",settings[returnObj.ajax].onwait);
						$.formValidator.ajaxValid(returnObj);
					}
				}
				else
				{
					$.formValidator.showMessage(returnObj);
					if(!returnObj.isvalid)
					{
						//�Զ���������
						var auto = setting.automodify && (this.type=="text" || this.type=="textarea" || this.type=="file");
						if(auto && !initConfig.alertmessage)
						{
							alert(returnObj.setting.onerror);
							$.formValidator.setTipState(tip,"onShow",setting.onshow);
						}
					}
				}
			});
		} 
		else if (srcTag == "SELECT")
		{
			//����Ĭ��ֵ
			if (defaultvalue){
				if(stype=="select-one"){
					jqobj.attr("value",defaultvalue);
				}
			}
			//��ý���򵥻�
			//stype=="select-one"?"focus":"click"
			jqobj.bind(stype=="select-one"?"focus":"click", function(){	
				if(!initConfig.alertmessage){
					$.formValidator.setTipState(tip,"onFocus",setting.onfocus);
				}
			});
			//ѡ����Ŀ�󴥷�
			jqobj.bind(stype=="select-one"?"change":"blur" , function()
			{
				var returnObj = $.formValidator.oneIsValid(this.id,1);	
				if(returnObj==null){return;}
				if ( returnObj.ajax >= 0 && this.validoldvalue!=$(this).val()){
					$.formValidator.ajaxValid(this.id, returnObj.setting);
				}else{
					$.formValidator.showMessage(returnObj);    
				}
			});
		}
	});
}; 

$.fn.inputValidator = function(controlOptions)
{
	var settings = 
	{
		isvalid : false,
		min : 0,
		max : 99999999999999,
		type : "size",
		onerror:"�������",
		validatetype:"InputValidator",
		empty:{leftempty:true,rightempty:true,leftemptyerror:null,rightemptyerror:null}
	};
	controlOptions = controlOptions || {};
	$.extend(true, settings, controlOptions);
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.compareValidator = function(controlOptions)
{
	var settings = 
	{
		isvalid : false,
		desid : "",
		operateor :"=",
		onerror:"�������",
		validatetype:"CompareValidator"
	};
	controlOptions = controlOptions || {};
	$.extend(true, settings, controlOptions);
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.regexValidator = function(controlOptions)
{
	var settings = 
	{
		isvalid : false,
		regexp : "",
		param : "i",
		datatype : "string",
		onerror:"����ĸ�ʽ����ȷ",
		validatetype:"RegexValidator"
	};
	controlOptions = controlOptions || {};
	$.extend(true, settings, controlOptions);
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.functionValidator = function(controlOptions)
{
	var settings = 
	{
		isvalid : true,
		fun : function(){this.isvalid = true;},
		validatetype:"FunctionValidator",
		onerror:"�������"
	};
	controlOptions = controlOptions || {};
	$.extend(true, settings, controlOptions);
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.ajaxValidator = function(controlOptions)
{
	var settings = 
	{
		isvalid : false,
		lastValid : "",
		type : "GET",
		url : "",
		addidvalue : true,
		datatype : "html",
		data : "",
		async : true,
		cache : false,
		beforesend : function(){return true;},
		success : function(){return true;},
		complete : function(){},
		processdata : false,
		error : function(){},
		buttons : null,
		onerror:"������У��û��ͨ��",
		onwait:"���ڵȴ���������������",
		validatetype:"AjaxValidator"
	};
	controlOptions = controlOptions || {};
	$.extend(true, settings, controlOptions);
	return this.each(function()
	{
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.defaultPassed = function(onshow)
{
	return this.each(function()
	{
		var settings = this.settings;
		for ( var i = 1 ; i < settings.length ; i ++ )
		{   
			settings[i].isvalid = true;
			if(!$.formValidator.getInitConfig(settings[0].validatorgroup).alertmessage){
				var ls_style = "onSuccess";
				if(onshow){ls_style="onShow"};
				$.formValidator.setTipState(settings[0].tipid,ls_style,settings[0].oncorrect);
			}
		}
	});
};

$.fn.unFormValidator = function(unbind)
{
	return this.each(function()
	{
		this.settings[0].bind = !unbind;
		if(unbind){
			$("#"+this.settings[0].tipid).hide();
		}else{
			$("#"+this.settings[0].tipid).show();
		}
	});
};


})(jQuery);


function getElementWidth(objectId) {
	x = document.getElementById(objectId);
	return x.offsetWidth;
}

function getAbsoluteLeft(objectId) {
	o = document.getElementById(objectId);
	oLeft = o.offsetLeft;
	while(o.offsetParent!=null) {
		oParent = o.offsetParent;
		oLeft += oParent.offsetLeft;
		o = oParent;
	}
	return oLeft;
}

function getAbsoluteTop(objectId) {
	o = document.getElementById(objectId);
	oTop = o.offsetTop;
	while(o.offsetParent!=null) {
		oParent = o.offsetParent;
		oTop += oParent.offsetTop;
		o = oParent;
	}
	return oTop;
}