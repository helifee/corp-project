<%@ page language="java" contentType="text/html; charset=GB18030"
    pageEncoding="GB18030"%>
    
<%@ page import="org.jfree.data.general.DefaultPieDataset,org.jfree.chart.ChartFactory
,org.jfree.chart.JFreeChart,org.jfree.chart.servlet.*" %>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GB18030">
<title>Insert title here</title>
</head>
<body>

<%

DefaultPieDataset dpd = new DefaultPieDataset();

dpd.setValue("������Ա", 25);
dpd.setValue("�г���Ա", 25);
dpd.setValue("������Ա", 45);
dpd.setValue("������Ա", 10);

JFreeChart chart = ChartFactory.createPieChart3D("ĳ��˾��֯�ṹͼ",dpd, true, false, false);

String fileName = ServletUtilities.saveChartAsPNG(chart,800,600,session);

String url = request.getContextPath() + "/DisplayChart?filename=" + fileName;

%>

<img src="<%= url %>" width="800" height="600">


</body>
</html>