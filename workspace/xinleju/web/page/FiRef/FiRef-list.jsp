<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title></title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/FiRef/FiRef-list.js"></script>
		<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
	</head>
	<body >
			<div class="t_title">
			  <div class="hh">${title}</div>
			  <div class="tool">
			<a href="#" onclick="javascript:ok('${keyField}','${nameField}','${isMutil}')" class="t_submit">确定</a> <a href="#" onclick="window.close();" class = "t_del">关闭</a>
						</div>
			</div>
			<div style = "display: block;	height: 530px;	overflow: auto;	width: 100%">
			<table width="100%" cellpadding="0" cellspacing="1"  style="height:100px" class="wd_tablelist01">
			<thead>
				<tr>
				<th width = '20px'></th>
				<s:iterator value="#request.showNames"  status="status">
					<th align="center">${showNames[status.index]}</th>
				</s:iterator>
				</tr>
			</thead>
			<tbody>
				<s:iterator value="#request.dataList"  var="elem" >
					<tr>
						<td align="center"  width='20px' >
							<input name="${keyField}"   type=${isMutil eq true?"checkbox":"radio"}  value="${elem[keyField]}" />
						</td>
						<s:iterator value="#request.showFields"  status="fstatus">
							<td align="center"  id="${showFields[fstatus.index]}.${elem[keyField]}">
								${elem[showFields[fstatus.index]]}
							</td>
						</s:iterator>
					</tr>
				</s:iterator>
				</tbody>
			</table>
			</div>
	</body>
</html>
