<%@ page language="java" import="java.util.*" pageEncoding="gbk" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
    <base href="<%=basePath%>">

    <title>My JSP 'index.jsp' starting page</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <jsp:include page="/header.jsp"></jsp:include>
    <script type="text/javascript">
        function save() {
            var c = 0;
            var data = {"paramaterJson": "{}", "tendId": $("#tendId").val()};
            data = {"guuid": "2"}
            for (var i = 0; i < 4000; i++) {
                $("#num").val(i);
                $.ajax({
                    type: "get",//ʹ��get/post�������ʺ�̨
                    dataType: "json",//����json��ʽ������
                    url: "<%=request.getContextPath() %>/app/get/2",//Ҫ���ʵĺ�̨��ַ
                    data: data,
                    success: function (msg) {//msgΪ���ص����ݣ������������ݰ�
                        var j = JSON.stringify(msg);
                        $("#context").html(j);
                        $("#result").val(c++);
                    }
                });
            }
        }

    </script>
</head>

<body>
<input id="num">
<input id="result">
<input id="tendId">
<button onclick="save()">hellloworld</button>
This is my JSP page. <br>

<div id="context">

</div>
</body>
</html>
