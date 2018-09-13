<%--
 * @(#)Ye0080.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考勤系统
--%>

<%--
 * 员工考勤查询（主页面JSP）
 * 
 * @author 远东)zhangzheng
 * @version 1.00 2010/12/21
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">

        <style>
            .nodeline div{
                width: 34px;
                height: 20px;
                text-align: center;
                float: left;
				font-family: "Arial","Sans";
                line-height: 20px;
                font-size: 10px;
                border-top: 1px solid #aaa;
                border-right: 1px solid #aaa;
            }
            #gTitle.nodeline div{
            	font-size: 12px !important;
            }
            
            .nameList {
                border-right: 1px solid #aaa;
                text-align:center;
                float: left;
            }
            
            .wCol1 div, .wCol3 div {
                height: 20px;
                line-height: 20px;
                border-top: 1px solid #aaa;
                border-bottom: 1px solid #aaa;
                margin-bottom:-1px;
            }
            
            .nodeline {
                width: 1500px;
                float: left;
            }
            
            .cRight {
                width: 60px;
                border-left: 1px solid #aaa;
                position:absolute;
                left:845px;
                overflow: visible;
                text-indent: 8px;
            }
            
            .data {
                width: auto;
                height: 420px;
                overflow-y: auto;
                overflow-x: hidden;
                margin-top: -1px;
            }
            
            table.datagrid2 {
                width: 948px;
                table-layout: fixed;
            }
            
            table.datagrid2 th, table.datagrid2 td {
                border: 1px solid #aaa !important;
            }
            
            th, td {
                padding: 0px !important;
            }
            
            table.datagrid2 tr:hover {
                background: #fff !important;
                color: #000 !important;
            }
            
            .wCol1{
            	width:75px;
            }
            .wCol2{
            	width:769px;
            }
            .wCol3{
            	width:100px;
            }
            .data .wCol1,.data .wCol2,.data .wCol3{
            	border-bottom:1px solid #aaa;
            	padding-bottom:-1px;
            }
        </style>
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/att/Ye0080.js"></script>
	
	<title>员工考勤查询</title>
</head>
<body onload="init();">
<jsp:include page="../common/commonPage.jsp" />
<div class="ydscontainer span-24">
<!-- 内容区域 -->
<s:hidden id="days" name="days"/>
<table class="datagrid2">
    <tr>
        <th rowspan="2" class="wCol1">
            姓名
        </th>
        <th class="wCol2 text_center"">
            <div class="float_l">
                <input type="button" id="btnLeft" value="←" class="btn span-2" onclick="setPos(-20);"/>
            </div>
            <div class="float_r">
                <input type="button" id="btnRight" value="→" class="btn span-2" onclick="setPos(20);"/>
            </div>
            <span>
            	<input type="text" value="${cond.year}年${cond.month}月" onfocus="WdatePicker({dateFmt:'yyyy年MM月',onpicked:changeDate,maxDate:'%y-%M-%ld'})" class="span-3 text_center btn"/>
            </span>
        </th>
        <th rowspan="2" class="wCol3">
            其他
        </th>
    </tr>
    <tr>
        <th class="wCol2">
            <div class="wCol2 overflow_hd">
                <div id="gTitle" class="nodeline margin_top_p1">
                	<s:iterator var="vl" begin="1" value="dayTypes" status="st"><div<s:if test="#vl==2"> class="color_red"</s:if><s:if test="#vl==1"> class="color_violet"</s:if>><s:property value="#st.count"/></div></s:iterator>
                </div>
            </div>
        </th>
    </tr>
    <tr>
        <td colspan="3">
            <div id="mainGrid" class="data position_rel">
                <div class="float_l">
                    <div id="nameList" class="nameList wCol1 position_rel">
                    	<s:iterator var="bean" value="ye0080CondAList" status="st"><div<s:if test='#st.index%2==1'> class="bgclr_eee"</s:if>><s:property value="#bean.empName"/></div><div<s:if test='#st.index%2==1'> class="bgclr_eee"</s:if>>&nbsp;</div></s:iterator>
	                    <div id="xLineA" class="float_l position_abs"></div>
                    </div>
                </div>
                <div class="float_l overflow_hd wCol2 position_rel">
                    <div id="gContent" class="position_rel">
<s:iterator var="bean" value="ye0080CondAList" status="st">
<div class="nodeline<s:if test='#st.index%2==1'> bgclr_eee</s:if>"><s:iterator var="dy" value="#bean.states" status="stt"><s:property value="#dy.amState" escape="false"/></s:iterator>
</div>
<div class="nodeline<s:if test='#st.index%2==1'> bgclr_eee</s:if>"><s:iterator var="dy" value="#bean.states" status="stt"><s:property value="#dy.pmState" escape="false"/></s:iterator>
</div>
</s:iterator>
                    </div>
<div id="xLine" class="float_l position_abs"></div>
<div id="yLine" class="float_l position_abs"></div>
                </div>
                <div class="cRight">
                    <div id="opList" class="wCol3">
                    	<s:iterator var="bean" value="ye0080CondAList" status="st"><div<s:if test='#st.index%2==1'> class="bgclr_eee"</s:if>><s:property value="#bean.empId"/></div><div<s:if test='#st.index%2==1'> class="bgclr_eee"</s:if>>&nbsp;</div></s:iterator>
	                    <div id="xLineB" class="float_l position_abs"></div>
                    </div>
                </div>
            </div>
        </td>
	</tr>
</table>
<!-- 内容区域 -->
</div>
</body>
</html>