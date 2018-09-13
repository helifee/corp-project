<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
				 <table id="jieshumxtbl" class="grid text_center midintro ellipsis">
				 <s:hidden id="bookinfosize" name="bookinfosize" value="%{bookinfo.size}" />
				 <s:hidden id="overnum" name="overnum" value="%{overdaysnum}" />
			          <tr>
			            <th class="none" >bookid</th><th class="percent_14">ISBN号</th><th class="percent_50">图书名称</th><th class="percent_8">借出天数</th><th class="percent_8">借书人</th><th class="percent_8">操作</th>
			          </tr>
			        <s:if test="bookinfo.size > 0">
			            <s:iterator value="bookinfo" status="stat" id="bookinfo1">
			             <tr>
			             <td class="none">
			        	     	<s:div id="bookid%{#stat.index}">
				                     <s:property value="bookid"/>
			                   </s:div>
			             </td> 
		                  <td>
			        	     	<s:div id="isbn%{#stat.index}">
				                     <s:property value="isbn"/>
			                    </s:div>
			             </td> 
			             <td title="<s:property value="bookname"/>">
			        	     	<s:div id="bookname%{#stat.index}">
				                     <s:property value="bookname"/>
			                    </s:div>
			             </td>
			             <td>
			        	     	<s:div id="booklendingdays%{#stat.index}">
				                     <s:property value="booklendingdays"/>天
			                   </s:div>   
			             </td> 
		                  <td>
			        	     	<s:div id="pursename%{#stat.index}">
				                     <s:property value="pursename"/>
			                    </s:div>
			             </td> 
			             <td>
								<s:div cssClass="center">
									<s:a id="%{#stat.index}" href='javascript:;' onfocus="this.blur();" onclick="returnbook(this.id);">归还</s:a>
								</s:div>
			             </td> 		
			             </tr>            
			          </s:iterator>
					</s:if>
			          
	  	         </table>			    
