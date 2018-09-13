<%@ page contentType="text/html; charset=GBK"%>
<%@ page import="com.bancstone.common.page.PageInfo"%>
<%@ page import="com.bancstone.common.utils.MoneyUtil"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<table width="95%" align="center">
	<tr>
		<td align="center" class="text1">
			<input type="hidden" name="page" id="page"/>
			<%
				int currencyPage = 0;//当前页
				int total = 0;//总记录数
				int totalPage = 0;//总页数
				boolean issum = false;
				String sumcount = "0.00";
				PageInfo pg = (PageInfo) request.getAttribute("PageInfo");
				if (pg != null) {
			%>
			<table align="center">
				<tr>
					<td align="center">
						<%
								totalPage = pg.getTotalPageNum();
								if(totalPage!=0){
									currencyPage = pg.getPageNum();
								}
								total = pg.getTotalSize();
								issum = pg.isSum();
								sumcount = pg.getSumcount();
						%>
						<%if(issum){ %>	
							<font size="2"> &nbsp;总金额：</font><b><font size="2" color="#ff0000">
							<%=MoneyUtil.formatMoney(sumcount)%> </font></b>
						<%} %>
						<font size="2"> &nbsp;总记录数:</font>
						<b><font size="2" color="#ff0000"><%=total%> </font>
						</b>
						<font size="2">条：</font>
						<b><font size="2" color=#ff0000> <%=currencyPage%> </font> /<font
							size="2" color=#ff0000><%=totalPage%>
						</font> </b><font size="2">页</font>&nbsp;

						<%
						if (currencyPage == 1) {
						%>
						<input type="button" value="首　页" class="button"
							style="cursor:pointer" onclick="return alertyou('1');" />
						<%
						} else {
						%>
						<input type="button" value="首　页" class="button"
							style="cursor:pointer" onclick="return gotopageLog('1');" />
						<%
								}
								if (currencyPage <= 1) {
						%>
						<input type="button" value="上一页" class="button"
							style="cursor:pointer" onclick="return alertyou('1');" />
						<%
						} else {
						%>
						<input type="button" value="上一页" class="button"
							style="cursor:pointer" onclick=" return gotopageLog('<%=currencyPage - 1%>');" />
						<%
						}
						%>
						<%
						if (currencyPage >= totalPage) {
						%>
						<input type="button" value="下一页" class="button"
							style="cursor:pointer" onclick="return alertyou('2');" />
						<%
						} else {
						%>
						<input type="button" value="下一页" class="button"
							style="cursor:pointer" onclick="return gotopageLog('<%=currencyPage + 1%>');" />
						<%
								}
								if (currencyPage == totalPage) {
						%>
						<input type="button" value="尾　页" class="button"
							style="cursor:pointer" onclick="return alertyou('2');" />
						<%
						} else {
						%>
						<input type="button" value="尾　页" class="button"
							style="cursor:pointer" onclick="return gotopageLog('<%=totalPage%>');" />
						<%
						}
						%>
						<font size="2">前往第</font>
			 
						<input type="text" name="goToPage" id="goToPage" style="width:58px" value="<%=currencyPage%>" > 
						<!--  <select name="goToPage" onchange="return goSelectedPage();">
							<%--
							for (int i = 1; i <= currencyPage+10; i++) {
							--%>
							<option value=<%--=i--%> <%--=i == currencyPage ? "selected" : ""--%>>
								<%--=i--%>
							</option>
							<%--
							}
							--%>  
						</select> -->
						<font size="2">页</font>
						<input type="button" class="button" name="gobutton" value="确定" onclick="return goSelectedPage('<%=totalPage%>');">
						<font size="2"> &nbsp;条数/页:</font>
						<html:select styleClass="text_tablehead_b_c" property="pageSize" onchange="document.forms[0].submit();">
							<html:option value="10">10</html:option>
							<html:option value="30">30</html:option>
							<html:option value="50">50</html:option>
						</html:select>
					</td>
				</tr>
			</table>
			<%
			}
			%>
		</td>
	</tr>
</table>
<script language="javascript">	
	function goSelectedPage(totalpage){
    var goToPages=document.getElementById("goToPage").value;

    //alert(goToPages>totalpage);
    //alert(Number(goToPages)>Number(totalpage));
    if(Number(goToPages)>Number(totalpage))
    {
    	alert("输入页数的页码太大");
    	return false;
    }
    if(goToPages<1)
    {
    	alert("输入页数的页码太小");
    	return false;
    }
   document.getElementById("page").value=goToPages;
  document.forms[0].submit();
}

function gotopageLog(page1){
    document.getElementById("page").value=page1;//给隐藏于赋值，用于分页的查询条件
    //alert("看看page1的值为"+page1);
    //alert("隐藏域里面的值为："+document.getElementById("page").value);
   // alert("看看捕获的form的名字为："+document.forms[0].name);//查看一下是提交的哪一个form
    document.forms[0].submit();//提交页面中的form（顶层form），即提交查询条件，也就是通过间接点击【查询】或【确定】按钮做分页查询
    //最后通过queryGo()这个js函数做下一页的查询
}

function alertyou(type){
    if(type == 1){
    	alert("已经是第一页了！");
    }else{
    	alert("已经是最后一页了！");
    }
	
}
</script>
