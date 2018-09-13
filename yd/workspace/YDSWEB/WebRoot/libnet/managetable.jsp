<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<div class="span-24">
 <div class="span-24 last" >
 	<table id="bookreturnmxtbl" class=" text_center datagrid2 ellipsis">
 		<tr>
          <th class="percent_12">ISBN号</th>
          <th class="percent_16">图书名称</th>
          <th class="percent_12">作者</th>
          <th class="percent_12">出版社</th>
          <th class="percent_10">图书分类</th>
          <th class="percent_6">捐书人</th>
          <th class="percent_8">出版日期</th>
          <th class="percent_16">简介</th>
          <th class="percent_8">图书状态</th>
        </tr>
        <s:iterator value="bookmanageList">
        <tr style="height:28px!important;">
            <td>
	            <s:property value="isbn"/>
            </td>
            <td title="${bookname}">
            	<s:property value="bookname"/>
            </td>
            <td title="${bookauthor}">
            	<s:property value="bookauthor"/>
            </td>
            <td title="${bookpublisher}">
            	<s:property value="bookpublisher"/>
            </td>
            <td title="${booksortname}">
            	<s:property value="booksortname"/>
            </td>
            <td>
            	<s:property value="pursename"/>
            </td>
            <td>
            	<s:property value="bookpublishdate"/>
            </td>
            <td title="${booksummary}">
            	<s:property value="booksummary"/>
            </td>
            <td>
            	<s:property value="loanTF"/>
            </td>
        </tr>
        </s:iterator>
        
 	</table>
 </div>
</div>
    
<div class="span-24 text_center">  
   	<s:include   value="/common/pagerNavigation.jsp" />  
</div> 