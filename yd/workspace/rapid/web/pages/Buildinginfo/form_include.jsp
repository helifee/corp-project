<%@page import="com.ysys.www.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/commons/taglibs.jsp" %>

	<s:hidden id="buildid" name="buildid" />

<!-- ONGL access static field: @package.class@field or @vs@field -->
	
	<s:textfield label="%{@vs@ALIAS_CITYID}" key="cityid" value="%{model.cityid}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_DISTID}" key="distid" value="%{model.distid}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_BUILDNAME}" key="buildname" value="%{model.buildname}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_ADDRESS}" key="address" value="%{model.address}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_SURPLUS_NUMBER}" key="surplusNumber" value="%{model.surplusNumber}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_STARTING_PRICE}" key="startingPrice" value="%{model.startingPrice}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_EVEN_PRICE}" key="evenPrice" value="%{model.evenPrice}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_NOTICE}" key="notice" value="%{model.notice}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_IMAGE_PATH}" key="imagePath" value="%{model.imagePath}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_SALES_COMPANY}" key="salesCompany" value="%{model.salesCompany}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_DETAIL_INTRODUCTION}" key="detailIntroduction" value="%{model.detailIntroduction}" cssClass="required " required="true" />
	
	
	<s:textfield label="%{@vs@ALIAS_FLAG}" key="flag" value="%{model.flag}" cssClass="required validate-integer max-value-2147483647" required="true" />
	
	
	<tr>	
		<td class="tdLabel">
			<%=Buildinginfo.ALIAS_UPDATETIME%>:
		</td>	
		<td>
		<input value="${model.updatetimeString}" onclick="WdatePicker({dateFmt:'<%=Buildinginfo.FORMAT_UPDATETIME%>'})" id="updatetimeString" name="updatetimeString"  maxlength="0" class="" />
		</td>
	</tr>
	
