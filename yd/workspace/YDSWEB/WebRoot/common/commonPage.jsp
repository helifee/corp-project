<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
	<div class="guidArea">
		<div class="span-24">
			<s:if test="#session.guideList.size > 0">
				<div class="span-20">
				<s:iterator value="#session.guideList" status="offset">
					<s:if test="clickable">
						<s:url id="actionUrlValue" value="%{actionUrl}"></s:url>
						<s:a href="%{actionUrlValue}">
							<span class="font_weight_br">
								<s:property value="title"></s:property>
							</span>
						</s:a>
					</s:if>
					<s:else>
						<span class="font_weight_br">
							<s:property value="title"></s:property>
						</span>
					</s:else>
					<s:if test="!#offset.last">
						 » 
					</s:if>
				</s:iterator>
				</div>
				<div class="span-4 padding_top_4  last">
				<s:iterator value="#session.guideList" status="offset">
					<s:if test="#offset.index == #session.guideList.size-1">
						<s:set name="tmp_title" value ="title"/>
					</s:if>
				</s:iterator>
				</div>
			</s:if>
		</div>
	</div>
	<div class="span-24 title">
		<div class="span-19" id="_title"><h2>${tmp_title}</h2><span id="_title_after"></span></div>
		<div class="span-5 margin_top_6 text_right last" id="btnSet">
			<s:iterator value="#session.guideList" status="offset">
				<s:if test="#session.guideList.size > 1">
					<s:if test="(#offset.index == #session.guideList.size-2) && backFlg == 1">
						<s:url id="backActionUrlValue" value="%{actionUrl}"></s:url>
						<input type="button" class="btn span-2" value="返回" onclick="window.location.href='${backActionUrlValue}'"/>
					</s:if>
				</s:if>	 
			</s:iterator>
		</div>
	</div>
 	<!-- 操作状态消息 -->
 	<s:hidden id="operateTip" value="%{#session.operateTip}"></s:hidden>
	<%session.removeAttribute("operateTip");%>
	<script type="text/javascript">
		window['g_path'] = '<%=path %>';
		window['g_basePath'] = '<%=basePath %>';
	</script>
	<!--[if IE 6]>
		<script type="text/javascript" src="<%=path %>/js/common/fix/IE7.js">IE7_PNG_SUFFIX = "-ie6.png";</script>
	<![endif]-->