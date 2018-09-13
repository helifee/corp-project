<%--
 * @(#)Yb0051.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 员工管理
--%>
<%--
 * 部门信息画面
 * 
 * @author pengchuan
 * @version 1.00 2010/07/30
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<div id="div_emp_Info" class="span-9 last" >
<s:form id="mainForm" action="yb0051FormMain" method="post" namespace="/employee" validate="true">
	<div  class="span-9 last">
	    <!--上级部门-->
     	<div class="span-9 last">
	        <div class="span-2 text_right"><s:label value="上级部门 "/></div>
	        <div class="span-5  last">
	        	<s:label id="orgSnm2" name="empOrgInfo2.orgSnm"/>
	        </div>
        </div>
	    <!--部门名称-->
       	<div class="span-9 last">
	        <div class="span-2 text_right"><s:label value="部门名称"/><span class="color_red">*</span></div>
	        <div class="span-4  last">
	        	<s:textfield id="orgNm" name="empOrgInfo.orgNm" maxlength="30" cssClass="span-4"/>
	         </div>
        </div>
	    <!--部门略称-->
	    <div class="span-9 last">
	         <div class="span-2 text_right"><s:label value="部门略称"/><span class="color_red">*</span></div>
	         <div class="span-4  last">
	         	<s:textfield id="orgSnm" name="empOrgInfo.orgSnm" maxlength="10" cssClass="span-4"/>
	         </div>
       	</div>
	    <!--级别-->
        <div class="span-9 last">
	         <div class="span-2 text_right"><s:label value="级别"/><span class="color_red">*</span></div>
	         <div class="span-4 last">
	         	<s:select id="orgState" name="orgState.diffNo" list="orgStateList" listKey="diffNo" listValue="diffName" cssClass="span-3"/>
	         	<s:hidden id="firstFlg" name="firstFlg" ></s:hidden>
	         </div>
        </div>
	    <!--部门主管-->
        <div class="span-9 last">
	        <div class="span-2 text_right"><s:label value="部门主管"/></div>
	         <div class="span-2">
	             <s:textfield id="empId" name="empInfo.empId" maxlength="6" cssClass="span-2" />
	        </div>
	        <div class="span-2">
	             <s:textfield id="orgMngerNm" name="empInfo.empCnm" maxlength="30" cssClass="span-2" />
	        </div>
	        <div class="span-2  last">
	        	<input type="button" id="mngerSet" name="mngerSet" value="设置主管" onclick="setOrgMnger()"   class="btn span-2"  />               
	        </div>
        </div>
	              
	    <!--部门描述-->
        <div class="span-9 margin_bottom_6 last">
            <div class="span-2 text_right"><s:label value="部门描述"/></div>
            <div class="span-6  last">
                 <s:textarea id="orgDesc"  name="empOrgInfo.orgDesc"  cssClass="span-6" />
             </div>
        </div>
        <!--操作控件-->
	    <div class="span-9 text_center margin_bottom_6 last">
	        <input type="button" id="modify" name="mngerModify" value="修改"  onclick="modifyOrgInfo()"  class="btn span-2"  />
	        <input type="button" id="save" name="mngerSave" value="保存" onclick="saveOrgInfo()" class="btn span-2"  />               
	        <input type="button" id="cancel" name="mngerCancel" value="取消"  onclick="modifyCancel()" class="btn span-2"  />               
	    </div>
	</div>
    <!-- 操作模式 -->
    <s:hidden id="mode" name="mode" ></s:hidden>
    <s:hidden id="orgId" name="orgId" ></s:hidden>
    <s:hidden id="orgId2" name="orgId2" ></s:hidden>
    <s:hidden id="orgProId" name="empOrgInfo.orgProId" ></s:hidden>
    <s:hidden id="orgProId2" name="empOrgInfo2.orgProId" ></s:hidden>
    <s:hidden id="diffName" name="orgState.diffName" ></s:hidden>
    <s:hidden id="operate" name="operate" ></s:hidden>
    <s:hidden id="dispSeqUp" name="dispSeqUp" ></s:hidden>
    <s:hidden id="dispSeqDown" name="dispSeqDown" ></s:hidden>
    <s:hidden id="dispSeq" name="dispSeq" ></s:hidden>    
    <s:hidden id="empOrgInfo2orgSnm" name="empOrgInfo2.orgSnm" ></s:hidden>
</s:form>
</div>
                        
	                        	