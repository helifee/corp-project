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
		<title>ͨ��JS����֤</title>
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
				<!--Ҳ���� onsubmit="return cbValidator.Validate("validate",1);-->
  �Ƿ�Ϊ��:
  <html:text property="isempty"  value=""></html:text>
				<span name="validate" dataName="isempty" dataType="Empty"
					msg="�����ı�����Ϊ��_"></span>
				<!--dataName,regexp-->
				<br />
�����ַ�:
<html:text property="ischinese"  value=""></html:text>
				<span name="validate" dataName="ischinese" dataType="Chinese"
					msg="�����ı��������������"></span>
				<br />
Ӣ��:
<html:text property="isenglish"  value=""></html:text>
				<span name="validate" dataName="isenglish" dataType="English"
					msg="�����ı����������Ӣ��"></span>
				<br />
����:
<html:text property="isinteger" name="isinteger" value="" />
				<span name="validate" dataName="isinteger" dataType="Integer"
					msg="�����ı��������������"></span>
				<br />
ʵ��:
<html:text property="isdouble" name="isdouble" value="" />
				<span name="validate" dataName="isdouble" dataType="Double"
					msg="�����ı����������ʵ��"></span>
				<br />
Email��ַ:
<html:text property="isemail" name="isemail" value="" />
				<span name="validate" dataName="isemail" dataType="Email"
					msg="�����ı����������email"></span>
				<br />
ʹ��HTTPЭ�����ַ:
<html:text property="isurl" name="isurl" value="" />
				<span name="validate" dataName="isurl" dataType="Url"
					msg="�����ı����������url"></span>
				<br />
�绰����:
<html:text property="isphone" name="isphone" value="" />
				<span name="validate" dataName="isphone" dataType="Phone"
					msg="�����ı����������绰����" require="false"></span>
				<br />
����:
<html:text property="iscurrency" name="iscurrency" value="" />
				<span name="validate" dataName="iscurrency" dataType="Currency"
					msg="�����ı�������������"></span>
				<br />
�ֻ�����:
<html:text property="ismobile" name="ismobile" value="" />
				<span name="validate" dataName="ismobile" dataType="Mobile"
					msg="�����ı�����������ֻ�����"></span>
				<br />
��������:
<html:text property="iszip" name="iszip" value="" />
				<span name="validate" dataName="iszip" dataType="Zip"
					msg="�����ı������������������"></span>
				<br />
���֤����:
<html:text property="isidcard" name="isidcard" value="" />
				<span name="validate" dataName="isidcard" dataType="IdCard"
					msg="�����ı������������ȷ�����֤����"></span>
				<br />
QQ����:
<html:text property="isqq" name="isqq" value="" />
				<span name="validate" dataName="isqq" dataType="QQ"
					msg="�����ı������������ȷ��QQ����"></span>
				<br />
����:
<html:text property="isdate" name="isdate" value="" />
				<span name="validate" dataName="isdate" dataType="Date" format="ymd"
					msg="�����ı������������ȷ������"></span>
				<br />
���ϰ�ȫ���������:
<html:password property="issafestring" name="issafestring" value="" />
				<!--SafeString-->
				<span name="validate" dataName="issafestring" dataType="English"
					msg="�����ı������������ϰ�ȫ���������" require="false"></span>
				<br />
ĳ����ظ�ֵ:
<html:text property="isrepeat" name="isrepeat" value="" />
				<span name="validate" dataName="isrepeat" dataType="Repeat"
					msg="�����ı����ֵ������ ���ϰ�ȫ��������� �е�ֵһ��" to="issafestring"></span>
				<br />
�����Ĺ�ϵ�Ƚ�:
<html:text property="iscompare" name="iscompare" value="" />
				<span name="validate" dataName="iscompare" dataType="Compare"
					to="27" operator="GreaterThan" msg="�����ı����ֵ���� ���� 27"></span>
				<!--operatorĬ��:����-->
				<br />
�ж�����ֵ�Ƿ���(n,m)֮��:
<html:text property="isrange" name="isrange" value="" />
				<span name="validate" dataName="isrange" dataType="Range" min="10.3"
					max="20.2" msg="�����ı�����������ֵ����Ҫ10.3-20.2֮��"></span>
				<br />
�����ַ���������(���ֽ�):
<html:textarea property="islimit" name="islimit" value=""></html:textarea>
				<span name="validate" dataName="islimit" dataType="Limit" min="1"
					max="21" msg="��������1-21���ַ�"></span>
				<br />
�����ַ���������(�ֽ�):
<html:textarea property="islimitb" name="islimitb" value=""></html:textarea>
				<span name="validate" dataName="islimitb" dataType="LimitB" min="1"
					max="21" msg="������1-21���ֽ�"></span>
				<br />
�Զ����������ʽ��֤:
<html:text property="iscustom" name="iscustom" value="" />
				<span name="validate" dataName="iscustom" dataType="Custom"
					regexp="^\d{3}$" msg="�����ı����������λ�봿����(�Զ�������:^\d{3}$)"></span>
				<br />
�����б�����ѡ��:
<html:select property="isemptySelect">
					<option value="">
						��ѡ��
					</option>
					<option value="1">
						��ѡ��1
					</option>
					<option value="2">
						��ѡ��2
					</option>
				</html:select>
				<span name="validate" dataName="isemptySelect" dataType="Empty"
					msg="���������б�����ѡ��"></span>
				<br />
				<br />
���ھ�����ͬ���Ƶĵ�ѡ��ťѡ��ѡ���ж�:
<html:radio property="group1" value="radio" />
1
<html:radio property="group1" value="radio2" />
2
<html:radio property="group1" value="radio3" />
3
<span name="validate" dataName="group1" dataType="Group"
					msg="����ѡ��һ����ѡ��ť"></span>
				<br />
���ƾ�����ͬ���ƵĶ�ѡ��ť��ѡ����Ŀ:
<html:checkbox property="group2" />
1
<html:checkbox property="group2" />
2
<html:checkbox property="group2" />
3
<html:checkbox property="group2" />
4
<span name="validate" dataName="group2" dataType="Group" min="1" max="3"
					msg="����ѡ��1-3��"></span>
				<br />
				<br />
				<input type="button" name="b" id="b" value="�ύ"
					onclick="formSubmit();" />
				<br />
				<br />
��ͨ�����Ե����л���(�ͻ���):<br />
IE8.0
</html:form>
		</table>
	</body>
</html>
