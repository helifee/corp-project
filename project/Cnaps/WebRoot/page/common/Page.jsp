<%@ page contentType="text/html; charset=GBK"%>
<%@ page import="com.bancstone.common.page.PageInfo"%>
<%@ page import="com.bancstone.common.utils.MoneyUtil"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<table width="95%" align="center">
	<tr>
		<td align="center" class="text1">
			<input type="hidden" name="page" id="page"/>
			<%
				int currencyPage = 0;//��ǰҳ
				int total = 0;//�ܼ�¼��
				int totalPage = 0;//��ҳ��
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
							<font size="2"> &nbsp;�ܽ�</font><b><font size="2" color="#ff0000">
							<%=MoneyUtil.formatMoney(sumcount)%> </font></b>
						<%} %>
						<font size="2"> &nbsp;�ܼ�¼��:</font>
						<b><font size="2" color="#ff0000"><%=total%> </font>
						</b>
						<font size="2">����</font>
						<b><font size="2" color=#ff0000> <%=currencyPage%> </font> /<font
							size="2" color=#ff0000><%=totalPage%>
						</font> </b><font size="2">ҳ</font>&nbsp;

						<%
						if (currencyPage == 1) {
						%>
						<input type="button" value="�ס�ҳ" class="button"
							style="cursor:pointer" onclick="return alertyou('1');" />
						<%
						} else {
						%>
						<input type="button" value="�ס�ҳ" class="button"
							style="cursor:pointer" onclick="return gotopageLog('1');" />
						<%
								}
								if (currencyPage <= 1) {
						%>
						<input type="button" value="��һҳ" class="button"
							style="cursor:pointer" onclick="return alertyou('1');" />
						<%
						} else {
						%>
						<input type="button" value="��һҳ" class="button"
							style="cursor:pointer" onclick=" return gotopageLog('<%=currencyPage - 1%>');" />
						<%
						}
						%>
						<%
						if (currencyPage >= totalPage) {
						%>
						<input type="button" value="��һҳ" class="button"
							style="cursor:pointer" onclick="return alertyou('2');" />
						<%
						} else {
						%>
						<input type="button" value="��һҳ" class="button"
							style="cursor:pointer" onclick="return gotopageLog('<%=currencyPage + 1%>');" />
						<%
								}
								if (currencyPage == totalPage) {
						%>
						<input type="button" value="β��ҳ" class="button"
							style="cursor:pointer" onclick="return alertyou('2');" />
						<%
						} else {
						%>
						<input type="button" value="β��ҳ" class="button"
							style="cursor:pointer" onclick="return gotopageLog('<%=totalPage%>');" />
						<%
						}
						%>
						<font size="2">ǰ����</font>
			 
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
						<font size="2">ҳ</font>
						<input type="button" class="button" name="gobutton" value="ȷ��" onclick="return goSelectedPage('<%=totalPage%>');">
						<font size="2"> &nbsp;����/ҳ:</font>
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
    	alert("����ҳ����ҳ��̫��");
    	return false;
    }
    if(goToPages<1)
    {
    	alert("����ҳ����ҳ��̫С");
    	return false;
    }
   document.getElementById("page").value=goToPages;
  document.forms[0].submit();
}

function gotopageLog(page1){
    document.getElementById("page").value=page1;//�������ڸ�ֵ�����ڷ�ҳ�Ĳ�ѯ����
    //alert("����page1��ֵΪ"+page1);
    //alert("�����������ֵΪ��"+document.getElementById("page").value);
   // alert("���������form������Ϊ��"+document.forms[0].name);//�鿴һ�����ύ����һ��form
    document.forms[0].submit();//�ύҳ���е�form������form�������ύ��ѯ������Ҳ����ͨ����ӵ������ѯ����ȷ������ť����ҳ��ѯ
    //���ͨ��queryGo()���js��������һҳ�Ĳ�ѯ
}

function alertyou(type){
    if(type == 1){
    	alert("�Ѿ��ǵ�һҳ�ˣ�");
    }else{
    	alert("�Ѿ������һҳ�ˣ�");
    }
	
}
</script>
