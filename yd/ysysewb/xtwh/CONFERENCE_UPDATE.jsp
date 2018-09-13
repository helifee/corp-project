<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page errorPage="errorpage.jsp" %>
<html>
<head>
<SCRIPT ID=clientEventHandlersJS LANGUAGE=javascript>
<!--
      function frmUpdate_onsubmit() {
            if (window.frmUpdate.CNFS_ID.value=="") {
                  alert("会议室ID不能为空！");
                  return false;
            }
            if (window.frmUpdate.CNFS_NAME.value=="") {
                  alert("会议室名称不能为空！");
                  return false;
            }
            if (window.frmUpdate.MEN_NUM.value=="") {
                  alert("容纳人数不能为空！");
                  return false;
            }
            if (!/[0-9]{2}/.test(document.frmUpdate.MEN_NUM.value)){
            			alert("会议室人容纳人数应该为两位数字!");
            			return false;
            }
            if (window.frmUpdate.CNFS_TEL.value!="" && !/[0-9]{4}/.test(document.frmUpdate.CNFS_TEL.value)){
            			alert("电话号码应该为四位数字!");
            			return false;
            }
            var newvalue2 = document.frmUpdate.CNFS_EQP.value.replace(/[^\x00-\xff]/g, "**");  
       			var newlength2 = newvalue2.length; 
						if (newlength2 > 255){
            			alert("您输入的会议室名称过长，应小于255字节！");
                  return false;	
            }
            var strlength,k,ch,str; 
						str = window.frmUpdate.CNFS_NAME.value; 
						strlength=str.length; 
						for(k=0;k<=strlength;k++) { 
     					ch=str.substring(k,k+1); 
     						if(ch==" "||ch=="　"){ 
      						alert("对不起，会议室名称不能含有空格！");  
      						return false; 
      					} 
  					}
  					var strlength1,k1,ch1,str1; 
						str1 = window.frmUpdate.CNFS_EQP.value; 
						strlength1=str1.length; 
						for(k1=0;k1<=strlength;k1++) { 
     					ch1=str1.substring(k1,k1+1); 
     						if(ch1==" "||ch1=="　"){ 
      						alert("对不起，设备信息不能含有空格！");  
      						return false; 
      					} 
  					}
            
      }
-->
</SCRIPT>
<title>
CONFERENCE_UPDATE
</title>
</head>
<body bgcolor=336699>
<jsp:useBean id="conference_type" scope="session" class="com.ysys.db.RowSet"/>
<%
      request.setCharacterEncoding("UTF-8");
      int PageNo = 1;
      if(request.getParameter("PageNo") != null){
            PageNo = Integer.valueOf(request.getParameter("PageNo")).intValue();
      }
      conference_type.setDbName("UTF8");

      conference_type.setCommand("SELECT * FROM CONFERENCE_TYPE  WHERE CNFS_ID='"+request.getParameter("CNFS_ID")+"'");

      conference_type.freeConnection();
      conference_type.executeQuery();
      conference_type.next();
 %>
      <form  name="frmUpdate" id="frmUpdate" method="post" action="CONFERENCE_UPDATE_SUBMIT.jsp?PageNo=<%=PageNo%>&CNFS_ID=<%=request.getParameter("CNFS_ID")%>">
      <br>
      <TABLE align=center border=0>
      <TR>
      <TD>
            <input type=hidden name=CNFS_ID value=<%=request.getParameter("CNFS_ID")%>>
            <input type=hidden name=PageNo value=<%=request.getParameter("PageNo")%>>
            <input type=image name=btnUpdate id=btnUpdate  src=images/submit.gif alt=保存 onClick="return frmUpdate_onsubmit()">
            <a href="CONFERENCE_UPDATE.jsp?PageNo=<%=PageNo %>&CNFS_ID=<%=request.getParameter("CNFS_ID")%>"><img border=0 alt=取消 src=images/reset.gif width=30 height=32 ></a>
            <a href="CONFERENCE_DVIEW.jsp?PageNo=<%=PageNo%>"><img border=0 alt=返回 src=images/readonly.gif width=30 height=32 ></a>
      </TD>
      </TR>
      </TABLE>
      <br>
      <TABLE align=center border=0 width="350">
            <TR>
                  <td align=CENTER width=150 bgcolor="#800000"> <font style="ARIAL NARROW" color="#ffffff" size=2>会议室ID</font></td>
                  <TD><font style="ARIAL NARROW" size=2><Input type="text" readonly=true id="CNFS_ID" name="LVE_ID" style="height=22px;width=200px"  maxlength=2 value=<%=conference_type.getString(1)%>></font></TD>
            </TR>
            <TR>
                  <td align="CENTER" width=150 bgcolor="#800000"><font style="ARIAL NARROW" color="#ffffff" size=2>会议室名称</font></td>
                  <TD><font style="ARIAL NARROW" size=2><Input type="text" id="CNFS_NAME" name="CNFS_NAME"  style="height=22px;width=200px" maxlength=10 value=<%=conference_type.getString(2)%>></font> </td>
            </TR>
            <TR>
                  <td align="CENTER" width=150 bgcolor="#800000"><font style="ARIAL NARROW" color="#ffffff" size=2>容纳人数</font></td>
                  <TD><font style="ARIAL NARROW" size=2><Input type="text" id="MEN_NUM" name="MEN_NUM"  style="height=22px;width=200px" maxlength=2 value=<%=conference_type.getString(3)%>></font> </td>
            </TR>
            <TR>
                  <td align="CENTER" width=150 bgcolor="#800000"><font style="ARIAL NARROW" color="#ffffff" size=2>电话</font></td>
                  <TD><font style="ARIAL NARROW" size=2><Input type="text" id="CNFS_TEL" name="CNFS_TEL"  style="height=22px;width=200px" maxlength=4 value=<%=conference_type.getString(4)%>></font> </td>
            </TR>
            <TR>
                  <td align="CENTER" width=150 bgcolor="#800000"><font style="ARIAL NARROW" color="#ffffff" size=2>设备</font></td>
                  <TD><font style="ARIAL NARROW" size=2><Input type="text" id="CNFS_EQP" name="CNFS_EQP"  style="height=22px;width=200px" maxlength=255 value=<%=conference_type.getString(5)%>></font> </td>
            </TR>
      </TABLE>
      </form>
</body>
</html>
