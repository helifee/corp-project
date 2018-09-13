<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/META-INF/struts-tags.tld"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Insert title here</title>
	<link href="../css/gray.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="../js/common/prototype.js"></script>
	<script type="text/javascript" src="../js/common/util.js"></script>
	<script>
		Event.observe(window, 'load', init);
		function init(){
			
			// 添加非空校验
			addRequiredCheck($('yourName'), '姓名必须有', true);
			addRequiredCheck($('yourPhone'), '电话应该有', true);
			addRegexCheck($('yourPhone'), '电话是数字!', '^[0-9]*$');

			// 添加自定义校验
			addCustomCheck($('yourName'), '必须输入远东！', 'mycheck', function(value){
				if(value == '远东')return true;
				else return false;
			});
			addCustomCheck($('yourPhone'), '所有数字必须一样！', 'mycheck', function(value){
				// 关联校验年龄
				checkInput($('yourAge'));
				
				var chars = value.split('');
				for(var i = 1; i < chars.length; i++){
					if(chars[i-1] != chars[i])return false;
				}
				return true;
			});
			addCustomCheck($('yourAge'), '必须等于电话位数', 'mycheck', function(value){
				if(value == $('yourPhone').value.length)return true;
				else return false;
			});
			addCustomCheck($('yourMail'), '不能包含QQ！', 'mycheck', function(value){
				if(value.toLowerCase().lastIndexOf('qq') == -1)return true;
				else return false;
			});
		}
	</script>
</head>
<body class="span-10">
<div class="span-8 prepend-1">
	<s:form action="customSubmitAction" validate="true">
		<div class="span-8 last"><h2>自定义校验</h2></div>
		<div class="span-8 last">
			<div class="span-1 text_right">姓名</div>
			<div class="span-2">
				<s:textfield id="yourName" name="yourName" tooltip="请输入'远东'" cssClass="span-2"/>
			</div>
			<div class="span-1 text_right">电话</div>
			<div class="span-4 last">
				<s:textfield id="yourPhone" name="yourPhone" tooltip="数字一样(33333)" cssClass="span-4"/>
			</div>
		</div>
		<div class="span-8 last">
			<div class="span-1 text_right">年龄</div>
			<div class="span-2">
				<s:textfield id="yourAge" name="yourAge" tooltip="等于电话位数" cssClass="span-2"/>
			</div>
			<div class="span-1 text_right">邮箱</div>
			<div class="span-4 last">
				<s:textfield id="yourMail" name="yourMail" tooltip="不包含字符'QQ'" cssClass="span-4"/>
			</div>
		</div>
		<div class="span-8 text_right">
			<div class="span-4 text_center"><s:fielderror /></div>
			<s:submit value="提交" cssClass="btn span-2"/>
			<input type="button" value="立即校验" onclick="checkForm($('customSubmitAction'));" class="span-2 btn"/>
		</div>
	</s:form>
</div>
</body>
</html>