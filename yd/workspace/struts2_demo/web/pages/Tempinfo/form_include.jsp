<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="empId" name="empId" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_EMP_NAME}" key="empName" value="%{model.empName}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_PASSWD}" key="empPasswd" value="%{model.empPasswd}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_DPTID}" key="empDptid" value="%{model.empDptid}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_JOBID}" key="empJobid" value="%{model.empJobid}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_TOTID}" key="empTotid" value="%{model.empTotid}" cssClass="" required="false" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=Tempinfo.ALIAS_EMP_NIAN%>:
		</td>	
		<td>
		<input value="${model.empNianString}" onclick="WdatePicker({dateFmt:'<%=Tempinfo.FORMAT_EMP_NIAN%>'})" id="empNianString" name="empNianString"  maxlength="0" class="" />
		</td>
	</tr>
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_MAIL}" key="empMail" value="%{model.empMail}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_PHONE}" key="empPhone" value="%{model.empPhone}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_HOMEPG}" key="empHomepg" value="%{model.empHomepg}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_PWDASK}" key="empPwdask" value="%{model.empPwdask}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_PWDASW}" key="empPwdasw" value="%{model.empPwdasw}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_COOKIE}" key="empCookie" value="%{model.empCookie}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_WORKID}" key="empWorkid" value="%{model.empWorkid}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_GUPID}" key="empGupid" value="%{model.empGupid}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_ORNGUPID}" key="empOrngupid" value="%{model.empOrngupid}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_SFZH}" key="sfzh" value="%{model.sfzh}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_XB}" key="xb" value="%{model.xb}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_NL}" key="nl" value="%{model.nl}" cssClass="validate-integer max-value-2147483647" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_MZFL}" key="mzfl" value="%{model.mzfl}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_JIGU}" key="jigu" value="%{model.jigu}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_GKSZ}" key="gksz" value="%{model.gksz}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_WHCD}" key="whcd" value="%{model.whcd}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_ZHUZ}" key="zhuz" value="%{model.zhuz}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_SHJI}" key="shji" value="%{model.shji}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_SGAO}" key="sgao" value="%{model.sgao}" cssClass="validate-number " required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_TIZH}" key="tizh" value="%{model.tizh}" cssClass="validate-number " required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_ZJXY}" key="zjxy" value="%{model.zjxy}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_ZHMM}" key="zhmm" value="%{model.zhmm}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_FZYT}" key="fzyt" value="%{model.fzyt}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_XIQU}" key="xiqu" value="%{model.xiqu}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_BEIZ}" key="beiz" value="%{model.beiz}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_YXPC}" key="yxpc" value="%{model.yxpc}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_SEAT}" key="seat" value="%{model.seat}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_FLAG}" key="empFlag" value="%{model.empFlag}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EXPHONE}" key="exphone" value="%{model.exphone}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_LDHT}" key="ldht" value="%{model.ldht}" cssClass="" required="false" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=Tempinfo.ALIAS_LJSR%>:
		</td>	
		<td>
		<input value="${model.ljsrString}" onclick="WdatePicker({dateFmt:'<%=Tempinfo.FORMAT_LJSR%>'})" id="ljsrString" name="ljsrString"  maxlength="0" class="" />
		</td>
	</tr>
	
	
	<s:textfield label="%{@vs@ALIAS_YXHT}" key="yxht" value="%{model.yxht}" cssClass="" required="false" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=Tempinfo.ALIAS_YJSR%>:
		</td>	
		<td>
		<input value="${model.yjsrString}" onclick="WdatePicker({dateFmt:'<%=Tempinfo.FORMAT_YJSR%>'})" id="yjsrString" name="yjsrString"  maxlength="0" class="" />
		</td>
	</tr>
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_JNAME}" key="empJname" value="%{model.empJname}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_MIMA}" key="empMima" value="%{model.empMima}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_DIRECT}" key="empDirect" value="%{model.empDirect}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_EMP_STOP}" key="empStop" value="%{model.empStop}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_NOTE3}" key="note3" value="%{model.note3}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_NOTE1}" key="note1" value="%{model.note1}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_NOTE2}" key="note2" value="%{model.note2}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_SFZH1}" key="sfzh1" value="%{model.sfzh1}" cssClass="" required="false" />
	
