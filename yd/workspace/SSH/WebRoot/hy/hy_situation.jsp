<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<%@ taglib uri="http://jsptags.com/tags/navigation/pager" prefix="pg" %>

<div class="span-24">
<pg:pager items="${items1}" 
	index="center"
    url="conferensituationXiangxi.action"
    maxPageItems="${maxPageItems1}"
    maxIndexPages="10"
    isOffset="true"
    export="currentPageNumber=pageNumber "
    scope="request">
          
<div class="span-24">
	<!-- 演示时临时隐藏 -->
	<div class="span3 text_left none">每页显示最大记录数: 
    	<input type="text" id="maxPageItems" name="maxPageItems" 
            value="<s:property value="maxPageItems1"/>" maxlength="3"/>
	</div>
	<div class="span6 text_right margin_top_10">
		<pg:index>		 
			记录数:<s:property value="items1"/>&nbsp;
		                     总页数:<s:property value="maxIndexPages1"/>&nbsp;
		                     当前页:<s:property value="pageNumber"/>&nbsp;
		                                   
				 <pg:first export="pageUrl , pageNumber" >
				 <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>' , '<s:property value="maxPageItems1"/>');" >首页</a> 
				 </pg:first>
				 <pg:prev export="pageUrl , pageNumber" >
				 <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>' , '<s:property value="maxPageItems1"/>');" >上一页</a> 
				 </pg:prev>
				 <pg:pages export="pageUrl , pageNumber" >
				 <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>' , '<s:property value="maxPageItems1"/>');" >${pageNumber}</a> 
				 </pg:pages>
				 <pg:next export="pageUrl , pageNumber" >
				   <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>' , '<s:property value="maxPageItems1"/>');" >下一页</a> 
				 </pg:next>
				<pg:last export="pageUrl , pageNumber" >
				   <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>' , '<s:property value="maxPageItems1"/>');" >尾页</a> 
				</pg:last>   
		 </pg:index>		  		
	</div>
</div>
</pg:pager>

<div class="span-24 bd_1s52">
	<table class="datagrid2">
		<tr>
			<th>日期</th>
			<th>时间</th>
			<th>申请者</th>
			<th>参加人数</th>
			<!-- 
			<th>参加与否</th>
			 -->
			<th>会议主题</th>
			<th>详细</th>			
		</tr>
		<tr>
			<s:if test="conferensituations.size > 0">
				<s:iterator value="conferensituations" id="aaa">
					<tr>
						<td class="percent_10"><s:property value="hyrq" /></td>
						<td class="percent_16"><s:property value="hykssj" />~<s:property value="hyjssj" /></td>
						<td class="percent_10"><s:property value="userName" /></td>
						<td class="percent_10"><s:property value="cjzrs" /></td>
						<!-- 
						<td>
							<s:if test="sumHZ.intValue() == cjzrs"> 全员参加</s:if>
							<s:else>			
								<label onmouseover="show('<s:property value="hysm"/>' , <s:property value="xxqxFlag"/>)" 
								       onmouseout="hide('<s:property value="hysm"/>' , <s:property value="xxqxFlag"/>)"> 
									  <s:property value="sumHZ.intValue()" />/<s:property value="cjzrs" />已回复（一览）
							    </label>
							    <s:if test="#aaa.xxqxFlag == 0">
									<div id="<s:property value="hysm"/>" style="background-color: #99CC99; position: absolute; width: 350px; height: 100px; display: none">未回复人员：
									  <p align="left"><s:property value="wcjrs" /></p>
									</div>
								</s:if>
							</s:else>							
						</td>
						-->
						<td>
							<s:if test="#aaa.bmbz == 0 || #aaa.xxqxFlag == 0">	
							  <s:property value="hyzt" /> 
							</s:if>
							<s:else>保密</s:else>
						</td>
						 
						<td class="percent_10">
		 					<s:if test="#aaa.xxqxFlag == 0">  
								<s:url action="yuyueModifyInit" id="reserveUrl">	
									<s:param name="yuyueInfoSource" value="2"></s:param>
									<s:param name="yuyueinfo.startdate" value="%{#aaa.hyrq}"></s:param>
									<s:param name="yuyueinfo.start_hour" value="%{#aaa.hykssjhour}"></s:param>
									<s:param name="yuyueinfo.start_minute" value="%{#aaa.hykssjminute}"></s:param>
									<s:param name="yuyueinfo.hys" value="%{#aaa.hysid}"></s:param>
									<s:param name="searchType" value="%{radiobutton}"></s:param>
									<s:param name="startDate" value="%{startDateS}"></s:param>
									<s:param name="endDate" value="%{endDateS}"></s:param>
									<s:param name="pageNumber" value="%{pageNumber}"></s:param>
								</s:url>
								<s:a href="%{reserveUrl}">详细</s:a>
							</s:if>
							<s:else>详细
							</s:else> 
						</td>
					</tr>
				</s:iterator>
			</s:if>
		</tr>
	</table>
</div>

<pg:pager items="${items1}" 
	index="center"
    url="conferensituationXiangxi.action"
    maxPageItems="${maxPageItems1}"
    maxIndexPages="10"
    isOffset="true"
    export="currentPageNumber=pageNumber "
    scope="request">
          
<div class="span-24">
	<div class="span6 text_right">
		<pg:index>		 
			记录数:<s:property value="items1"/>&nbsp;
		                     总页数:<s:property value="maxIndexPages1"/>&nbsp;
		                     当前页:<s:property value="pageNumber"/>&nbsp;
		                                   
				 <pg:first export="pageUrl , pageNumber" >
				 <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>' , '<s:property value="maxPageItems1"/>');" >首页</a> 
				 </pg:first>
				 <pg:prev export="pageUrl , pageNumber" >
				 <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>' , '<s:property value="maxPageItems1"/>');" >上一页</a> 
				 </pg:prev>
				 <pg:pages export="pageUrl , pageNumber" >
				 <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>' , '<s:property value="maxPageItems1"/>');" >${pageNumber}</a> 
				 </pg:pages>
				 <pg:next export="pageUrl , pageNumber" >
				   <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>' , '<s:property value="maxPageItems1"/>');" >下一页</a> 
				 </pg:next>
				<pg:last export="pageUrl , pageNumber" >
				   <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>' , '<s:property value="maxPageItems1"/>');" >尾页</a> 
				</pg:last>   
		 </pg:index>		  		
	</div>
</div>
</pg:pager>

</div>

