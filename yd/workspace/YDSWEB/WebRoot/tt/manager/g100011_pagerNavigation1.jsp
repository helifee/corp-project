<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib uri="http://jsptags.com/tags/navigation/pager" prefix="pg" %>
<style>.n{TEXT-DECORATION:none}</style>
<s:if test="pager1 != null">
  <s:if test="pager1.totalPagesCount == 1">
                总计:<s:property value="%{pager1.totalCount}"/>件
  </s:if>
<pg:pager items="${pager1.totalCount}"
    index="center"
	url="${pager1.pagerActionName}"
    maxPageItems="${pager1.perDisplayCount}"
    maxIndexPages="${pager1.pagerIndexCount}"
    isOffset="true"
    export="currentPageNumber=pageNumber"
    scope="request" id="pager1">
	<pg:index>	
	<div class="span-4 text_left float_l ">	 
		 总计:<s:property value="%{pager1.totalCount}"/>件&nbsp;
	            总页数:<s:property value="%{pager1.totalPagesCount}"/>页          
	</div>
	 <div class="span-12 text_center float_r ">	                               
		 <pg:first export="pageUrl , pageNumber" >
		 <a href="#" onclick="pagerCommonTag1('${pageUrl}' , '${pageNumber}');" >首页</a> 
		 </pg:first>
		 <pg:prev export="pageUrl , pageNumber, firstItem"  >
		 <a href="#" onclick="pagerCommonTag1('${pageUrl}' , '${pageNumber}');" >上一页</a> 
		 </pg:prev>
		 <pg:pages export="pageUrl , pageNumber" >
		  
		 <% if (pageNumber == currentPageNumber) { %>  
		     <a href="#" style="text-decoration: none" onclick="pagerCommonTag1('${pageUrl}' , '${pageNumber}');" >
		        <font color="#316AC5" >${pageNumber}</font></a>
         <% }else{%>
        	 <a href="#" onclick="pagerCommonTag1('${pageUrl}' , '${pageNumber}');" >
		        ${pageNumber}</a>  
         <%}%>		  
		 </pg:pages>
		 <pg:next export="pageUrl , pageNumber" >
		   <a href="#" onclick="pagerCommonTag1('${pageUrl}' , '${pageNumber}');" >下一页</a> 
		 </pg:next>
		<pg:last export="pageUrl , pageNumber" >
		   <a href="#" onclick="pagerCommonTag1('${pageUrl}' , '${pageNumber}');" >尾页</a> 
		</pg:last>  
		</div> 
		<div class=" text_left float_l ">
		</div>
	 </pg:index>		          	 
</pg:pager>	
</s:if>