<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="hysid" name="hysid" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_HYSMC}" key="hysmc" value="%{model.hysmc}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_RNRS}" key="rnrs" value="%{model.rnrs}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_DH}" key="dh" value="%{model.dh}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_SB}" key="sb" value="%{model.sb}" cssClass="" required="false" />
	
	
	<s:textfield label="%{@vs@ALIAS_HYBGBZ}" key="hybgbz" value="%{model.hybgbz}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_WXJK}" key="wxjk" value="%{model.wxjk}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_SORTID}" key="sortid" value="%{model.sortid}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_IMAGEFROMX}" key="imagefromx" value="%{model.imagefromx}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_IMAGEFROMY}" key="imagefromy" value="%{model.imagefromy}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_IMAGETOX}" key="imagetox" value="%{model.imagetox}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_IMAGETOY}" key="imagetoy" value="%{model.imagetoy}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=TabHysyl.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=TabHysyl.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="" />
		</td>
	</tr>
	
