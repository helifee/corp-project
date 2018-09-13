<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib uri="http://jsptags.com/tags/navigation/pager" prefix="pg" %>
<style>.n{TEXT-DECORATION:none}</style>
<s:if test="pager != null">
  <s:if test="pager.totalPagesCount == 1">
                总计:<s:property value="%{pager.totalCount}"/>件
  </s:if>
<pg:pager items="${pager.totalCount}"
    index="center"
	url="${pager.pagerActionName}"
    maxPageItems="${pager.perDisplayCount}"
    maxIndexPages="${pager.pagerIndexCount}"
    isOffset="true"
    export="currentPageNumber=pageNumber"
    scope="request"> 	
	<pg:index>	
	<div class="span-4 text_left float_l ">	 
		 总计:<s:property value="%{pager.totalCount}"/>件&nbsp;
	            总页数:<s:property value="%{pager.totalPagesCount}"/>页          
	</div>
	 <div class="span-12 text_center float_r ">	                               
		 <pg:first export="pageUrl , pageNumber" >
		 <a href="#" onclick="pagerCommonTag('${pageUrl}' , '${pageNumber}');" >首页</a> 
		 </pg:first>
		 <pg:prev export="pageUrl , pageNumber" >
		 <a href="#" onclick="pagerCommonTag('${pageUrl}' , '${pageNumber}');" >上一页</a> 
		 </pg:prev>
		 <pg:pages export="pageUrl , pageNumber" >
		  
		 <% if (pageNumber == currentPageNumber) { %>  
		     <a href="#" style="text-decoration: none" onclick="pagerCommonTag('${pageUrl}' , '${pageNumber}');" >
		        <font color="#316AC5" >${pageNumber}</font></a>
         <% }else{%>
        	 <a href="#" onclick="pagerCommonTag('${pageUrl}' , '${pageNumber}');" >
		        ${pageNumber}</a>  
         <%}%>		  
		 </pg:pages>
		 <pg:next export="pageUrl , pageNumber" >
		   <a href="#" onclick="pagerCommonTag('${pageUrl}' , '${pageNumber}');" >下一页</a> 
		 </pg:next>
		<pg:last export="pageUrl , pageNumber" >
		   <a href="#" onclick="pagerCommonTag('${pageUrl}' , '${pageNumber}');" >尾页</a> 
		</pg:last>  
		</div> 
		<div class=" text_left float_l ">
		</div>
	 </pg:index>		          	 
</pg:pager>	
</s:if>