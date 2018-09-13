<%@ page language="java" contentType="text/html; charset=GB18030"
    pageEncoding="GB18030"%>
    
<%@ taglib prefix="s" uri="/struts-tags" %>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GB18030">
<title>Insert title here</title>

<script type="text/javascript">

function addMore()
{
	var td = document.getElementById("more");
	
	var br = document.createElement("br");
	var input = document.createElement("input");
	var button = document.createElement("input");
	
	input.type = "file";
	input.name = "file";
	
	button.type = "button";
	button.value = "Remove";
	
	button.onclick = function()
	{
		td.removeChild(br);
		td.removeChild(input);
		td.removeChild(button);
	}
	
	td.appendChild(br);
	td.appendChild(input);
	td.appendChild(button);
	
}

</script>

</head>

<body>

	<table align="center" width="50%">
			<tr>
				<td>

					<s:fielderror cssStyle="color:red" />

				</td>
			</tr>
		</table>


		<s:form action="upload" theme="simple" enctype="multipart/form-data">

			<table align="center" width="50%" border="1">
				<tr>
					<td>
						username
					</td>
					<td>
						<s:textfield name="username"></s:textfield>
					</td>
				</tr>

				<tr>
					<td>
						password
					</td>
					<td>
						<s:password name="password"></s:password>
					</td>
				</tr>


				<tr>
					<td>
						file
					</td>

					<td id="more">
						<s:file name="file"></s:file><input type="button" value="Add More.." onclick="addMore()">
					</td>
				</tr>
				
				<tr>
					<td>
						<s:submit value=" submit "></s:submit>
					</td>

					<td>
						<s:reset value=" reset "></s:reset>
					</td>
				</tr>
			</table>

		</s:form>

</body>

</html>