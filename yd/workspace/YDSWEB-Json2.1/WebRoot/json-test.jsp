<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="js/prototype.js"></script>
<script type="text/javascript" src="js/json2.js"></script>
<title>JSON Test</title>
</head>
<body>

<div id="show"></div>
<hr />
<form id="form1" name="form1">
id: <input type="text" id="id" name="id" /><br />
name: <input type="text" id="name" name="name" />
</form>
<input type="button" value="show" onclick="makeRequest()" />
<script type="text/javascript">

    var url = "json/jsonExample.action";
    var params = Form.serialize('form1');   
    function makeRequest(){
       var request = new Ajax.Request(url, 
    	       {
	           		method: 'post',
	           		parameters:params, 
	           		onComplete: processResponse,
	           		asynchronous:true
           	   });
    }

    function processResponse(json)   
    {   
    	//1.var JSONobj=eval('('+ json.responseText +')');
    	//2.
    	var JSONobj = JSON.parse(json.responseText);
        $("id").value = JSONobj.id;   
        $("name").value = JSONobj.name;
    } 

</script>
</body>
</html>