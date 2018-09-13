<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page errorPage="errorpage.jsp" %>
<html>
<head>
<SCRIPT ID=clientEventHandlersJS LANGUAGE=javascript>
<!--
      function frmInsert_onsubmit() {	          
            if (window.frmInsert.CNFS_ID.value=="") {
                  alert("会议室ID不能为空！");
                  return false;
            }
            if (window.frmInsert.CNFS_NAME.value=="") {
                  alert("会议室名称不能为空！");
                  return false;
            }
            if (window.frmInsert.MEN_NUM.value=="") {
                  alert("容纳人数不能为空！");
                  return false;
            }                               
            if (!/[0-9]{2}/.test(document.frmInsert.CNFS_ID.value)){
            			alert("会议室ID应该为两位数字!");
            			return false;
            }
            if (!/[0-9]{2}/.test(document.frmInsert.MEN_NUM.value)){
            			alert("会议室人容纳人数应该为两位数字!");
            			return false;
            }
            if (window.frmInsert.CNFS_TEL.value!="" && !/[0-9]{4}/.test(document.frmInsert.CNFS_TEL.value)){
            			alert("电话号码应该为四位数字!");
            			return false;
            }
            var newvalue2 = document.frmInsert.CNFS_EQP.value.replace(/[^\x00-\xff]/g, "**");  
       			var newlength2 = newvalue2.length; 
						if (newlength2 > 255){
            			alert("您输入的会议室名称过长，应小于255字节！");
                  return false;	
            }
            var strlength,k,ch,str; 
						str = window.frmInsert.CNFS_NAME.value; 
						strlength=str.length; 
						for(k=0;k<=strlength;k++) { 
     					ch=str.substring(k,k+1); 
     						if(ch==" "||ch=="　"){ 
      						alert("对不起，会议室名称不能含有空格！");  
      						return false; 
      					} 
  					}
  					var strlength1,k1,ch1,str1; 
						str1 = window.frmInsert.CNFS_EQP.value; 
						strlength1=str1.length; 
						for(k1=0;k1<=strlength;k1++) { 
     					ch1=str1.substring(k1,k1+1); 
     						if(ch1==" "||ch1=="　"){ 
      						alert("对不起，设备信息不能含有空格！");  
      						return false; 
      					} 
  					}  
-->
            
            
      }

</SCRIPT>
<title>
CONFERENCE_INSERT
</title>
</head>
<body bgcolor=336699>
<jsp:useBean id="conference_type" class="com.ysys.db.RowSet" />
<%
  

      request.setCharacterEncoding("UTF-8");
      int PageNo=1;
      int PageID=1;
 %>
      <%if(request.getParameter("record") != null){  %>
            <script language=javascript>alert("表中无记录请添加新记录");</script>
      <% }
      if(request.getParameter("flag") != null&&request.getParameter("flag").equals("list")){%>     
            <form action="CONFERENCE_INSERT_SUBMIT.jsp?flag=list"  name=frmInsert id=frmInsert method=post>
      <%}
      else{
      %>
            <form action="CONFERENCE_INSERT_SUBMIT.jsp" name=frmInsert id=frmInsert method=post>
      <% } %>
      <br>
      <TABLE align=center border=0>
            <input type=image name=subControl id=subControl  src=images/submit.gif alt=保存 onClick="return frmInsert_onsubmit()">
            <%if(request.getParameter("record")!=null){  %>
                  <a href="CONFERENCE_INSERT.jsp?record=null"><img border=0 alt=返回 src=images/reset.gif width=30 height=32 ></a>
            <% }
            else
            {
                  if(request.getParameter("flag") != null&&request.getParameter("flag").equals("list")){
                        if(request.getParameter("PageID") != null){
                              PageID = Integer.valueOf(request.getParameter("PageID")).intValue();
                        }
                  %>
                        <a href="CONFERENCE_INSERT.jsp?flag=list&PageID=<%=PageID%>"><img border=0 alt=取消 src=images/reset.gif width=30 height=32 ></a>
                        <a href="CONFERENCE_TYPE.jsp?PageID=<%=PageID%>"><img border=0 alt=返回 src=images/readonly.gif width=30 height=32 ></a>
                  <%
                  }
                  else{
                        if(request.getParameter("PageNo") != null){
                              PageNo = Integer.valueOf(request.getParameter("PageNo")).intValue();
                        }
                  %>
                        <a href="CONFERENCE_INSERT.jsp?PageNo=<%=PageNo%>"><img border=0 alt=取消 src=images/reset.gif width=30 height=32 ></a>
                        <a href="CONFERENCE_DVIEW.jsp?PageNo=<%=PageNo%>"><img border=0 alt=返回 src=images/readonly.gif width=30 height=32 ></a>
                  <%
                  }
            } %>
      </TABLE>
      <br>
      <TABLE align=center border=0 width="350">
            <TR>
                  <td align="CENTER" width="150" bgcolor="#800000"> <font style="ARIAL NARROW" color="#ffffff" size=2>会议室ID</font></td>
                  <TD><Input type="text" id="CNFS_ID" name="CNFS_ID" style="height=22px;width=200px" maxlength=2></td>
            </TR>
            <TR>
                  <td align="CENTER" width="150" bgcolor="#800000"><font style="ARIAL NARROW" color="#ffffff" size=2>会议室名称</font></td>
                  <TD><Input type="text" id="CNFS_NAME" name="CNFS_NAME"  style="height=22px;width=200px" maxlength=10> </td>
            </TR>
            <TR>
                  <td align="CENTER" width="150" bgcolor="#800000"><font style="ARIAL NARROW" color="#ffffff" size=2>容纳人数</font></td>
                  <TD><Input type="text" id="MEN_NUM" name="MEN_NUM"  style="height=22px;width=200px" maxlength=2> </td>
            </TR>
            <TR>
                  <td align="CENTER" width="150" bgcolor="#800000"><font style="ARIAL NARROW" color="#ffffff" size=2>电话</font></td>
                  <TD><Input type="text" id="CNFS_TEL" name="CNFS_TEL"  style="height=22px;width=200px" maxlength=4> </td>
            </TR>
            <TR>
                  <td align="CENTER" width="150" bgcolor="#800000"><font style="ARIAL NARROW" color="#ffffff" size=2>设备</font></td>
                  <TD><Input type="text" id="CNFS_EQP" name="CNFS_EQP"  style="height=22px;width=200px" maxlength=255> </td>
            </TR>
      </TABLE>
      </form>
</body>
</html>
