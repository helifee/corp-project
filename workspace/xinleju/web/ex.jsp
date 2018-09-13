<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>出错提示</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	</head>
	<body>
		<div class="alert_box">
			<div class="alert_box_inner" style="padding-bottom: 10px">
				<div class="alert_title">
					<span>友情提示</span>
				</div>
				<div class="alert_content" style="vertical-align: middle;">
					${exception.message }点击 <a href="javascript:void(0)" onclick="history.back(-1)">返回</a> 或联系管理员!<br>
				</div>
				<div class="" align="center">
					<input type="button" value="关闭" onclick="window.close()" />
					<input type="button" value="返回" onclick="history.back(-1)" />
				</div>

			</div>
		</div>
	</body>
</html>
