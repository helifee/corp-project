<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-12 bd_1s666">
  <div class="span-12 bgclr_9cf last text_center bd_b_1s666">
    <div class="span-4">姓名</div>
    <div class="span-5 bd_l_1s000">职位</div>
    <div class="span-2 bd_l_1s000 last">操作</div>
  </div>
  <div id="UserPosMgrListContent" class="span-12 last overflow_scr_y h_382" >
    <s:iterator value="userPosMgrUserDetailInfos">
      <table class="span-12" >
        <s:if test="posNum!=null">
          <tr class="span-2" >
            <td  colspan="2" class="span-9" >
              <input type="button" id="btn_name1" value="+" />
              <s:property value="userNm" />
            </td>
            <td   class="span-2 text_center"  ><span id="num_per1_pos"><s:property value="PosNum" /></span>个职位</td>
          </tr>
        </s:if>
      </table> 
     <div id="name1"  >
        <table width="224px" align="right"  >
        <s:if test="posNm!=null">
          <tr id="YD_200901" class="user_pos_mgr_user_XingXi_tr">
          <td width="128px" align="center"><s:property value="posNm" /></td>
          <td width="96px" align="center"><a href="#this"   >删除</a></td>
          </tr>
          </s:if>         
        </table>
     </div>   	
    </s:iterator>
  </div>
</div>
<div class="span-8">
<fieldset class="span-7">
<legend >职位列表</legend>
<table>
	<tr>
		<td align="center" width="150" bgColor="#6c95d0"><font color="#FFFFFF">职位ID</font></td>
		<td align="center" width="200" bgColor="#6c95d0"><font color="#FFFFFF">职位名称</font></td>
	</tr>
</table>	
	<s:if test="positionList.size > 0">
		<s:iterator value="positionList">		
			<div class="prepend-1 span-7"><s:checkbox name="posId"
				fieldValue="%{posId}" id="%{posId}" />
				<s:url action="getPosInfosAction" id="getPosInfosActionUrl">
				<s:param name="posInfoId" value="posId"></s:param>
				</s:url>
				<s:a href="%{getPosInfosActionUrl}">
				<s:property value="posName" />
				</s:a>
				<br>
			</div>			
		</s:iterator>
	</s:if>
</fieldset>
</div>