<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<%@ taglib uri="http://jsptags.com/tags/navigation/pager" prefix="pg" %>
<pg:pager items="${items1}"
    index="center"
    url="conferensituationXiangxi.action"
    maxPageItems="${maxPageItems1}"
    maxIndexPages="10"
    isOffset="true"
    export="currentPageNumber=pageNumber "
    scope="request">
<table width="943" border="0" cellspacing="2" cellpadding="2"
	align="center">
	<tr>
			<td align="center"  colspan="7">
	<pg:index>		 
		记录数:<s:property value="items1"/>&nbsp;
                      总页数:<s:property value="maxIndexPages1"/>&nbsp;
                      当前页:<s:property value="pageNumber"/>&nbsp;                   
			 <pg:first export="pageUrl , pageNumber" >
			 <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>');" >首页</a> 
			 </pg:first>
			 <pg:prev export="pageUrl , pageNumber" >
			 <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>');" >上一页</a> 
			 </pg:prev>
			 <pg:pages export="pageUrl , pageNumber" >
			 <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>');" >${pageNumber}</a> 
			 </pg:pages>
			 <pg:next export="pageUrl , pageNumber" >
			   <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>');" >下一页</a> 
			 </pg:next>
			<pg:last export="pageUrl , pageNumber" >
			   <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>');" >尾页</a> 
			</pg:last>   
  </pg:index>		          
			</td>
			
			
			
	    </tr>
	<tr>
		<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">日期</font></td>
		<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">时间</font></td>
		<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">申请人</font></td>
		<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">参加人数</font></td>
		<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">参加与否</font></td>
		<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">会议主题</font></td>
		<td align="center" bgColor="#6c95d0"><font color="#FFFFFF">详细</font></td>
	</tr>
	<s:if test="conferensituations.size > 0">
		<s:iterator value="conferensituations" id="aaa">
		<pg:item >
			<tr align="center">
				<td width="75" height="25" bgcolor="#ffffd9"><font size="2"><s:property
					value="hyrq" /></font></td>
				<td width="65" bgcolor="#ffffd9"><font size="2"><s:property
					value="hykssj" />~<s:property value="hyjssj" /></font></td>
				<td width="75" bgcolor="#ffffd9"><font size="2"><s:property
					value="userName" /></font></td>
				<td width="85" bgcolor="#ffffd9"><font size="2"><s:property
					value="cjzrs" /></font></td>
				<td align="center" width="155" bgcolor="#ffffd9">
				
				<s:if test="sumHZ.intValue() == cjzrs">
				  全员参加
				</s:if>
				<s:else>			
					<label 	onmouseover="show('<s:property value="hysm"/>' , <s:property value="xxqxFlag"/>)" 
					        onmouseout="hide('<s:property value="hysm"/>' , <s:property value="xxqxFlag"/>)"> 
						<font size="2">
						  <s:property value="sumHZ.intValue()" />/<s:property value="cjzrs" />已回复（一览）
						</font>
				    </label>
				    <s:if test="#aaa.xxqxFlag == 0">
						<div id="<s:property value="hysm"/>" style="background-color: #99CC99; position: absolute; width: 350px; height: 100px; display: none">未回复人员：
						  <p align="left"><s:property value="wcjrs" /></p>
						</div>
					</s:if>
				</s:else>
				</td>
				<td align="left" width="345" bgcolor="#ffffd9">
					<font size="2">
						<s:if test="#aaa.bmbz == 0 || #aaa.xxqxFlag == 0">	
						  <s:property	value="hyzt" /> 
						</s:if>
						<s:else>
						    保密
						</s:else>		
					</font>
				</td>
				<td align="left" width="45" bgcolor="#ffffd9"> 
 				<s:if test="#aaa.xxqxFlag == 0">  
					<s:url	action="yuyueModifyInit" id="reserveUrl">	
						<s:param name="yuyueInfoSource" value="2"></s:param>
						<s:param name="yuyueinfo.startdate" value="%{#aaa.hyrq}"></s:param>
						<s:param name="yuyueinfo.start_hour" value="%{#aaa.hykssjhour}"></s:param>
						<s:param name="yuyueinfo.start_minute" value="%{#aaa.hykssjminute}"></s:param>
						
						<s:param name="yuyueinfo.hys" value="%{#aaa.hysid}"></s:param>
						
						<s:param name="searchType" value="%{radiobutton}"></s:param>
						<s:param name="startDate" value="%{startDateS}"></s:param>
						<s:param name="endDate" value="%{endDateS}"></s:param>
						<s:param name="pageNumber" value="%{pageNumber}"></s:param>
					</s:url> <s:a href="%{reserveUrl}">详细</s:a>
						</s:if>
					<s:else>
					详细
					</s:else>  
               </td>
			</tr>
		</pg:item>		
		</s:iterator>
	</s:if>
	<tr>
			<td align="center"  colspan="7">
	<pg:index>		 
			记录数:<s:property value="items1"/>&nbsp;
                                 总页数:<s:property value="maxIndexPages1"/>&nbsp;
                                 当前页:<s:property value="pageNumber"/>&nbsp;  
				 <pg:first export="pageUrl , pageNumber" >
				 <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>');" >首页</a> 
				 </pg:first>
				 <pg:prev export="pageUrl , pageNumber" >
				 <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>');" >上一页</a> 
				 </pg:prev>
				 <pg:pages export="pageUrl , pageNumber" >
				 <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>');" >${pageNumber}</a> 
				 </pg:pages>
				 <pg:next export="pageUrl , pageNumber" >
				   <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>');" >下一页</a> 
				 </pg:next>
				<pg:last export="pageUrl , pageNumber" >
				   <a href="#" onclick="conferensituationPageTag('${pageUrl}' , '${pageNumber}' , '<s:property value="conferensituationId"/>' , '<s:property value="startDateS"/>' , '<s:property value="endDateS"/>' , '<s:property value="radiobutton"/>' , '<s:property value="items1"/>');" >尾页</a> 
				</pg:last>   
  </pg:index>	          
			</td>
	    </tr>
</table>
</pg:pager>
