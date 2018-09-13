<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>


<s:form id="form2" name="form2" method="post" theme="ysyshy">
	<div class="span-15 last edit_box" id="div_hy_attend_list">
		<div class="span-15 last">
		  <div class="span-15 last">
			 <div class="span-2 text_right"><label>组名：</label></div>
			 <div class="span-7 text_left"> <s:select name="zuid" id="zuid"
				cssClass="span-3" list="zmList" listKey="zuid" listValue="zumc"
				headerKey="0" onchange="getattendzuname()" theme="ysyshy">
			</s:select></div>
			<!-- 
			<div class="span-5 text_center last">
                        <input type="Button" class="btn span-2" id="guanli"
				name="guanli" value="组管理" onclick="zuguanli()">
            </div>
             -->
          </div>
		  <div class="span-15 last">
			<div class="span-2 text_right">人名：</div>
			 <div class="span-8 text_left">
			 	<s:textfield id="renming" name="renming" cssClass="span-2" size="18" maxlength="6"
				onkeyup="getppName(this.value)" theme="ysyshy"
				onkeypress="if (event.keyCode == 13) return false" />
			</div>
		  </div>
		</div>
		<div class="span-15 last">
			<div class="span-14 last">
				<s:optiontransferselect id="leftname"
				name="leftname" doubleName="rightname" doubleId="rightname"
				leftTitle="组员列表" rightTitle="参加会议人员列表" addToLeftLabel="< 向左移动"
				addAllToLeftLabel="<< 全部左移" addToRightLabel="向右移动 >"
				addAllToRightLabel="全部右移 >>" selectAllLabel="-全部选择-"
				cssStyle="width:200px;height:250px;"
				doubleCssStyle="width:200px;height:250px;" buttonCssStyle=""
				buttonCssClass = "btn span-3"
				list="leftpinfos" listKey="empid" listValue="empmc"
				emptyOption="false" multiple="true" doubleMultiple="true"
				doubleList="rightpinfos" doubleListKey="empid"
				doubleListValue="empmc" doubleEmptyOption="false"
				addToRightOnclick="Moveoneselfoptions(document.getElementById('rightname'))"
				addAllToRightOnclick="Moveoneselfoptions(document.getElementById('rightname'))"
				addToLeftOnclick="Moveoneselfoptions(document.getElementById('leftname'))"
				addAllToLeftOnclick="Moveoneselfoptions(document.getElementById('leftname'))"
				allowUpDownOnLeft="false" allowUpDownOnRight="false"
				allowSelectAll="false" />
			</div>
		</div>
		<div class="span-15 last">
			<div class="span-15 text_right last">
				<input type="Button" id="quren" class="btn span-2"
				name="quren" value="确认" onclick="affirm()"> <input
				type="Button"  class="btn span-2"
				id="fanhui" name="quren" value="返回" onclick="goback()">
			</div>
		</div>
		<div class="none">
			<s:select id="hiddenleft"
				name="hiddenleft" label="" listKey="empid" listValue="empmc"
				list="hiddenleftList" />
			<s:select id="pyinfos" name="pyinfos"
				label="" listKey="empid" listValue="mcpinyin" list="hiddenpyinfos" />
		</div>
	</div>
</s:form>