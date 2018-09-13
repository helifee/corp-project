<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Insert title here</title>
	<link href="../css/style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="../js/common/prototype.js"></script>
	<script type="text/javascript" src="../js/common/util.js"></script>
	<script type="text/javascript">
		function init(){
			$('aid').observe('blur',function(){
				var param = 'aid=' + $F('aid');
				param = addStamp(param);
				$('iname').update();
				if(!checkInput('aid'))return;
				new Ajax.Request('templateTestAjax.action', {
					method: 'get',
					parameters: param,
					onComplete: function(request) {
						if(request.responseText!='error'&&request.responseText.length<20){
							$('iname').update(request.responseText);
						} else {
							addFieldError($('aid'),'输入有误！');
						}
					}
				})
			});
		}

		function registSingle(){
			// 单独输入框注册.
			registValidate('noFormTest');
			addRegexCheck('noFormTest', '请输入字母！', '^[a-zA-Z]*$');
			addLengthCheck('noFormTest', '请输入5-7位！', 5, 7);
			addCustomCheck('noFormTest', '不能输入aaaaa', 'acheck', function(val){
				if(val == 'aaaaa')return false;
				else return true;
			}, true);
			
			checkInput('noFormTest');
		}

		function changeMail(){
			// 删除邮箱的校验
			removeCheck('mail','email');
			removeCheck('mail','stringlength');

			// 自定义校验
			addCustomCheck('mail','必须输入abcd！','cus1',function(value){
				if(value!='abcd')return false;
				return true;
			});
			
			checkInput('mail');
		}
		
		// form外校验用
		var body_validation = {
			'noFormTest': {
				'regex': {
					'message': '格式不正确！',
					'param': {
						'expression': '^[0-9]{5}$'
					}
				}
			}
		};
	</script>
</head>
<body onload="init();">
<br/>
<br/>
	<div class="container span-16">
		<s:form action="templateTest" validate="true">
			<div class="prepend-2">
				<s:fielderror/>
			</div>
			<br/>
			<div class="span-16">
				<div class="span-2 text_right">
					<label>Id</label>
				</div>
				<div class="span-2">
					<s:textfield name="aid" id="aid" cssClass="span-2" tooltip="输入三位ID！"/>
				</div>
				<div class="span-1">
					<label id="iname"></label>&nbsp;
				</div>
				<div class="span-2 text_right">
					<label id="yearLabel" tooltip="YEAH!">年龄</label>
				</div>
				<div class="span-3">
					<s:textfield name="year" cssClass="span-3" tooltip="输入年龄！" />
				</div>
				<div class="span-2 text_right">
					<label>电话</label>
				</div>
				<div class="span-3 last">
					<s:textfield name="phone" cssClass="span-3" tooltip="电话(0123-12345678)"/>
				</div>
			</div>
			<div class="span-16">
				<div class="span-2 text_right">
					<label>QQ</label>
				</div>
				<div class="span-3">
					<s:textfield name="qq" cssClass="span-3" tooltip="QQ号码(5-10位)"/>
				</div>
				<div class="span-2 text_right">
					<label>邮箱</label>
				</div>
				<div class="span-3">
					<s:textfield name="mail" id="mail" cssClass="span-3" tooltip="常用邮箱"/>
				</div>
				<div class="span-2 text_right">
					<label>身份证号</label>
				</div>
				<div class="span-3 last">
					<s:textarea name="card" cssClass="span-3" tooltip="身份证号(15或18位)"/>
				</div>
			</div>
			<div class="span-16">
				<div class="span-2 text_right">
					<label>爱好</label>
				</div>
				<div>
					<s:checkboxlist name="fav" list="#{'a1':'吃饭','a2':'睡觉','a3':'打豆豆','a4':'企鹅'}" listKey="key" listValue="value" value="a2,a3" cssClass="span-2"/>
				</div>
			</div>
			<div class="span-16">
				<div class="span-2 text_right">
					<label>省</label>
				</div>
				<div>
					<s:select name="prov" list="#{'p1':'火星','p2':'地球','p3':'月亮','p4':'的脸'}" listKey="key" listValue="value" tooltip="eee"/>
					<s:select name="prov" list="#{'p1':'火星','p2':'地球','p3':'月亮','p4':'的脸'}" listKey="key" listValue="value" multiple="true" cssStyle="width:100px;height:100px"/>
				</div>
			</div>
			<div class="span-15 text_right">
				<s:submit />&nbsp;<s:reset/>
			</div>
		</s:form>
		<hr/>
		<div class="span-16">
			<div class="span-2 text_right">
				<label>Form外校验</label>
			</div>
			<div class="span-3">
				<s:textfield name="year" id="noFormTest" cssClass="span-3" tooltip="5-7位字母"/>
			</div>
			<div class="span-5 prepend-1">
				<input type="button" value="←注册校验" onclick="registSingle();" />&nbsp;<input type="button" value="更改邮箱↑" onclick="changeMail();this.disable();" />
			</div>
		</div>
	</div>
</body>
</html>