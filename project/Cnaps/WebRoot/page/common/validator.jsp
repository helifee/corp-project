<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic"%>
<%
	String path = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>通用JS表单验证</title>
		<script language="javascript"
			src="<%=path%>/js/common/validateUtil.js"></script>
		<style>
body,td {
	font: normal 12px Verdana;
	color: #333333
}

input,textarea,select,td {
	font: normal 12px Verdana;
	color: #333333;
	border: 1px solid #999999;
	background: #ffffff
}

table {
	border-collapse: collapse;
}

td {
	padding: 3px
}

input {
	height: 20;
}

textarea {
	width: 80%;
	height: 50px;
	overflow: auto;
}

form {
	display: inline
}
</style>
		<script language="javascript">
function formSubmit(){
	VForm.Validate("validate")
}
</script>
	</head>

	<body>
		<table align="center">
			<html:form method="post" action="test.do?method=test">
				<!--也可以 onsubmit="return cbValidator.Validate("validate",1);-->
  是否为空:
  <html:text property="isempty"  value=""></html:text>
				<span name="validate" dataName="isempty" dataType="Empty"
					msg="测试文本框不能为空_"></span>
				<!--dataName,regexp-->
				<br />
中文字符:
<html:text property="ischinese"  value=""></html:text>
				<span name="validate" dataName="ischinese" dataType="Chinese"
					msg="测试文本框必需输入中文"></span>
				<br />
英文:
<html:text property="isenglish"  value=""></html:text>
				<span name="validate" dataName="isenglish" dataType="English"
					msg="测试文本框必需输入英文"></span>
				<br />
整数:
<html:text property="isinteger" name="isinteger" value="" />
				<span name="validate" dataName="isinteger" dataType="Integer"
					msg="测试文本框必需输入整数"></span>
				<br />
实数:
<html:text property="isdouble" name="isdouble" value="" />
				<span name="validate" dataName="isdouble" dataType="Double"
					msg="测试文本框必需输入实数"></span>
				<br />
Email地址:
<html:text property="isemail" name="isemail" value="" />
				<span name="validate" dataName="isemail" dataType="Email"
					msg="测试文本框必需输入email"></span>
				<br />
使用HTTP协议的网址:
<html:text property="isurl" name="isurl" value="" />
				<span name="validate" dataName="isurl" dataType="Url"
					msg="测试文本框必需输入url"></span>
				<br />
电话号码:
<html:text property="isphone" name="isphone" value="" />
				<span name="validate" dataName="isphone" dataType="Phone"
					msg="测试文本框必需输入电话号码" require="false"></span>
				<br />
货币:
<html:text property="iscurrency" name="iscurrency" value="" />
				<span name="validate" dataName="iscurrency" dataType="Currency"
					msg="测试文本框必需输入货币"></span>
				<br />
手机号码:
<html:text property="ismobile" name="ismobile" value="" />
				<span name="validate" dataName="ismobile" dataType="Mobile"
					msg="测试文本框必需输入手机号码"></span>
				<br />
邮政编码:
<html:text property="iszip" name="iszip" value="" />
				<span name="validate" dataName="iszip" dataType="Zip"
					msg="测试文本框必需输入邮政编码"></span>
				<br />
身份证号码:
<html:text property="isidcard" name="isidcard" value="" />
				<span name="validate" dataName="isidcard" dataType="IdCard"
					msg="测试文本框必需输入正确的身份证号码"></span>
				<br />
QQ号码:
<html:text property="isqq" name="isqq" value="" />
				<span name="validate" dataName="isqq" dataType="QQ"
					msg="测试文本框必需输入正确的QQ号码"></span>
				<br />
日期:
<html:text property="isdate" name="isdate" value="" />
				<span name="validate" dataName="isdate" dataType="Date" format="ymd"
					msg="测试文本框必需输入正确的日期"></span>
				<br />
符合安全规则的密码:
<html:password property="issafestring" name="issafestring" value="" />
				<!--SafeString-->
				<span name="validate" dataName="issafestring" dataType="English"
					msg="测试文本框必需输入符合安全规则的密码" require="false"></span>
				<br />
某项的重复值:
<html:text property="isrepeat" name="isrepeat" value="" />
				<span name="validate" dataName="isrepeat" dataType="Repeat"
					msg="测试文本框的值必需与 符合安全规则的密码 中的值一样" to="issafestring"></span>
				<br />
两数的关系比较:
<html:text property="iscompare" name="iscompare" value="" />
				<span name="validate" dataName="iscompare" dataType="Compare"
					to="27" operator="GreaterThan" msg="测试文本框的值必需 大于 27"></span>
				<!--operator默认:等于-->
				<br />
判断输入值是否在(n,m)之间:
<html:text property="isrange" name="isrange" value="" />
				<span name="validate" dataName="isrange" dataType="Range" min="10.3"
					max="20.2" msg="测试文本框必需输入的值必需要10.3-20.2之间"></span>
				<br />
输入字符长度限制(非字节):
<html:textarea property="islimit" name="islimit" value=""></html:textarea>
				<span name="validate" dataName="islimit" dataType="Limit" min="1"
					max="21" msg="限制输入1-21个字符"></span>
				<br />
输入字符长度限制(字节):
<html:textarea property="islimitb" name="islimitb" value=""></html:textarea>
				<span name="validate" dataName="islimitb" dataType="LimitB" min="1"
					max="21" msg="限制输1-21个字节"></span>
				<br />
自定义的正则表达式验证:
<html:text property="iscustom" name="iscustom" value="" />
				<span name="validate" dataName="iscustom" dataType="Custom"
					regexp="^\d{3}$" msg="测试文本框必需输三位入纯数字(自定义正则:^\d{3}$)"></span>
				<br />
下拉列表框必需选择:
<html:select property="isemptySelect">
					<option value="">
						请选择
					</option>
					<option value="1">
						请选择1
					</option>
					<option value="2">
						请选择2
					</option>
				</html:select>
				<span name="validate" dataName="isemptySelect" dataType="Empty"
					msg="测试下拉列表框必需选择"></span>
				<br />
				<br />
对于具有相同名称的单选按钮选的选中判断:
<html:radio property="group1" value="radio" />
1
<html:radio property="group1" value="radio2" />
2
<html:radio property="group1" value="radio3" />
3
<span name="validate" dataName="group1" dataType="Group"
					msg="必需选择一个单选按钮"></span>
				<br />
限制具有相同名称的多选按钮的选中数目:
<html:checkbox property="group2" />
1
<html:checkbox property="group2" />
2
<html:checkbox property="group2" />
3
<html:checkbox property="group2" />
4
<span name="validate" dataName="group2" dataType="Group" min="1" max="3"
					msg="允许选择1-3个"></span>
				<br />
				<br />
				<input type="button" name="b" id="b" value="提交"
					onclick="formSubmit();" />
				<br />
				<br />
已通过测试的运行环境(客户端):<br />
IE8.0
</html:form>
		</table>
	</body>
</html>
