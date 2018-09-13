<%--
 * @(#)Yd0042.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
--%>
<%--
 * 商品信息编辑画面
 * 
 * @author pengchuan
 * @version 1.00 2010/10/21
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsFileUpload.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsContentFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsInputFilter.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/gps/Yd0041.js"></script>
	
	<title>商品信息编辑</title>
</head>
<body onload="initForm()">
<script type="text/javascript">
		window['g_path'] = '<%=path %>';
		window['g_basePath'] = '<%=basePath %>';
</script>
<div id="div_goods_info">
 <s:form id="goodsInfoForm" action="yd0040AddGoodsInfo" method="post" namespace="/gps" validate="true">
  <div id="errorMessage" class="prepend-2 span-5 last">
	<s:fielderror></s:fielderror>
  </div>
  <div class="span-12 last margin_top_8">
	   <div class="span-8">
				 <div class="span-8 last">
				    <!--商品名称-->
					<div class="span-2 text_right"> <s:label value="商品名称"></s:label><span class="color_red">*</span></div>
					<div class="span-6 last">
					 <s:textfield id="goodsName" name="gpsGoodsInfo.goodsName" maxlength="50" cssClass="span-4" tabindex="1"/>
					 <s:hidden id="goodsId" name="gpsGoodsInfo.goodsId"/> 
					 <s:hidden id="goodsImgId" name="gpsGoodsInfo.goodsImage"/> 
					</div>
			    </div>
			    <div class="span-8 last">
				<!--售价-->
					<div class="span-2 text_right"> <s:label value="售价"></s:label><span class="color_red">*</span></div>
					<div class="span-6 last">
					 <s:textfield id="goodsPrice" name="gpsGoodsInfo.goodsPrice" maxlength="6" cssClass="span-2"  tooltip="请输入金额"  tagtype="money" tabindex="2"/>
					</div>
			   </div>
			   <div class="span-8 last">
				<!--商品分类-->
					<div class="span-2 text_right"> <s:label value="商品分类"></s:label></div>
					<div class="span-6 last">
					 <s:textfield id="goodsCateName" name="goodsCateName" cssClass="span-4" />
					</div>
			   </div>
			   <div class="span-8 last">
				<!--所属店铺-->
					<div class="span-2 text_right"> <s:label value="所属店铺"></s:label><span class="color_red">*</span></div>
					<div class="span-6 last">
					 <s:textfield id="store" name="gpsGoodsInfo.store" maxlength="20" cssClass="span-4" tabindex="4"/>
					</div>
			   </div>
			   <div class="span-8 last margin_top_2">
				<!--启用标识-->
					<div class="span-2 text_right"> <s:label value="启用标识"></s:label></div>
					<div class="span-6 last">
					 <s:checkbox id="goodsSwitch" name="gpsGoodsInfo.goodsSwitch" fieldValue="%{gpsGoodsInfo.goodsSwitch}"></s:checkbox>
					</div>
			   </div>
			  <div class="span-8 last">
				<!--商品描述-->
					<div class="span-2 text_right"> <s:label value="商品描述"></s:label></div>
					<div class="span-6 last">
					 <s:textarea id="goodsDesc" name="gpsGoodsInfo.goodsDesc"  rows="5" cols="40"/>
					</div>
			   </div>

	 </div>  
	 <div class="span-4 last">
	       <div class="span-4 last text_center">
                   	<div class="span-4 last">
                   		<img id="goodsImg" class="goodsImg" alt="商品图片"></img>
					</div> 
					<div class="span-4 last text_center">
					<input type="file" id="upload" name="upload" class="jsFileInput cur_pointer"/>
					<input type="button" id="uploadButton" name="uploadBtn"  class="span-2 btn margin_top_6 cur_pointer" value="上传图片" />
					<s:hidden id="fileName" name="fileName"/>
					</div> 
		  </div>
	 </div>
  </div>
  <div class="span-12 last text_center margin_top_10 margin_bottom_10">
	  <input type="button"  value="保存"	class="btn span-2" onclick="creatPosInfo()"/>
  </div>
 </s:form>
</div>
</body>
</html>