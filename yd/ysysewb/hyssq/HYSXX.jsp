<%/**
 * 概要：  会议室详细信息
 * 版数      日付          担当      内容
 * V2.0   2009.2.18     苑金玲   新規作成
 */
%>
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
<title>
会议室详细信息
</title>
</head>

<body align="center"  bgcolor="#ecf6ff">
	<jsp:useBean id="conference" class="com.ysys.db.RowSet" />
	<br/>
	<p align=center><font size=5 color=green><strong>会议室详细信息</strong></font></p>
<table align=center  border="0px" >
	<br/>
		<table align=center border="0px" width=890>
			<tr>
			 <td align=CENTER width=80 bgcolor=#800000> <font style="ARIAL NARROW" color="#ffffff" size=3>会议室ID</font></td>
			 
			 <td align="CENTER"  width=190 bgcolor="#800000"><font style="ARIAL NARROW" color="ffffff" size=3>会议室名称</font></td>
			 
			 <td align="CENTER"  width=80 bgcolor="#800000"><font style="ARIAL NARROW" color="ffffff" size=3>容纳人数</font></td>
			 
			 <td align="CENTER"  width=150 bgcolor="#800000"><font style="ARIAL NARROW" color="ffffff" size=3>电话</font></td>
			 
			 <td align="CENTER"  width=200 bgcolor="#800000"><font style="ARIAL NARROW" color="ffffff" size=3>设备</font></td>
			</tr>
		<%
      request.setCharacterEncoding("UTF-8");
      String sql = "SELECT * FROM CONFERENCE_TYPE ORDER BY CNFS_ID";
      conference.setDbName("UTF8");
      conference.setCommand(sql);
      conference.executeQuery();
      conference.freeConnection();
     while(conference.next()){
      //显示会议室信息;
     %>	          
         <tr>   
                  <TD bgcolor=f7efde align=CENTER><font style="ARIAL NARROW" size=3><%=conference.getString(1)%></font></TD>
            
                  
                  <TD bgcolor=f7efde align=LEFT><font style="ARIAL NARROW" size=3><%=conference.getString(2)%></font></TD>
            
                  
                  <TD bgcolor=f7efde align=CENTER><font style="ARIAL NARROW" size=3><%=conference.getString(3)%></font></TD>
            
                 
                  <TD bgcolor=f7efde align=CENTER><font style="ARIAL NARROW" size=3><%=conference.getString(4)%></font></TD>
            
                  
                  <TD style="WIDTH:250;WORD-WRAP:break-word" bgcolor=f7efde align=LEFT><font style="ARIAL NARROW" size=3><%=conference.getString(5)%></font></TD>
          </tr>
               
      <%
      }
      %>
      </table>
<br/>  
<br/>	  
  <table  align="center" border="0px">
	<tr align="center">
		<td align="center">
				<IMG src="../upload/conference_map.jpg" align="center">			
		</td>		
	</tr>
  </table>
<br/>
  <table align="center" border="0px"〉  		  
	<tr >
		<td width=890 align=right><input type="button" value="关闭" onclick="window.close()" align="right"></td>
	</tr>
  </table>		  
</table>
</body>
</html>