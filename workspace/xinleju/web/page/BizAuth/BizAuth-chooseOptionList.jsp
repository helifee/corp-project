<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<title>标准角色选择</title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
<script type="text/javascript" src="page/BizAuth/BizAuth-chooseOptionList.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<s:form id="frm" name="frm" action="BizAuth!roleList.do" method="post">
        <input type="hidden" id="roleIds" name="roleIds"/>
		<table width="330" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td align="center" valign="top" width="60" class="popbtn">
					<br/>
					<br/>
					<br/>
					<br/>
					<a href="#"><img src="images/arrow_02.png" width="32" height="36" border="0"  title="移除" style="cursor: pointer;" align="absmiddle" onclick="javascript:sc.removeRole();return false;"/></a>
					<a href="#"><img src="images/arrow_01.png" width="32" height="50" border="0"  title="全部移除" style="cursor: pointer;" align="absmiddle" onclick="javascript:sc.removeAll();return false;"/></a>
				</td>
				<td width="270" valign="top" height="380">
					<table width="290" border="0" align="center" cellpadding="0" cellspacing="1" id="r_table" class="wd_tablelist01_2">
						<tbody id="addTr">
							<tr>
								<th width="20"><input type="checkbox" name="r_check_all" id="r_check_all" onclick="javascript:sc.checkAll(this);" /></th>
								<th>已选分类</th>
							</tr>
                            <s:iterator value="#request.otherOptions" var="item">
                                <tr id="${item.code}">
                                    <!-- 若父亲id为空，则此分类为特殊的叶子节点，默认为其本身id -->
                                    <td align="center"><input type="checkbox" name="r_role" value="${item.code}" onclick="javascript:sc.checkOne(this);" alt="${item.name }"/></td>
                                    <td align="left">${item.name }</td>
                                </tr>
                            </s:iterator>							
						</tbody>
					</table>
				</td>
			</tr>
		</table>
</s:form>
</body>
</html>