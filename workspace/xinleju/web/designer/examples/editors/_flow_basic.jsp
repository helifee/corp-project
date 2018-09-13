<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<div id="flow-basic-div" class="x-hidden">
	<table width="100%" border="0" cellpadding="1" cellspacing="1" class="wd_tablelist01_2">
		<tr>
			<td width="120px" align="center">
				流程名称:
			</td>
			<td colspan="3">
				<input id="flowName" type="text" style="width: 100%">
			</td>
			<td colspan="1" width="20%" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center">
				类别名称:
			</td>
			<td colspan="3">
				<input type="hidden" id="ctId">
				<input id="flowCtName" type="text" style="width: 100%" readonly="readonly" disabled="disabled"/>
			</td>
			<td colspan="1" align="left">
				<input type="button" value="选择" class="btn_q" onclick="showTree('Cate_',0);" style="padding: 1px 3px 1px 3px;">
			</td>
		</tr>
		<tr>
			<td align="center">
				模板ID:
			</td>
			<td colspan="3">
				<input id="flowCode" type="text" style="width: 100%" readonly="readonly" disabled="disabled"/>
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center">
				版本号:
			</td>
			<td class="edit" colspan="3">
				<input id="flowVersion" type="text" style="width: 100%" readonly="readonly" disabled="disabled"/>
			</td>
			<td colspan="1" align="left">
				&nbsp;<!-- <input type="button" value="版本管理" class="btn_q" onclick="alert('TODO');" style="padding: 1px 3px 1px 3px;"> -->
			</td>
		</tr>
		<tr>
			<td align="center">
				流程说明:
			</td>
			<td colspan="3">
				<textarea id="flRemark" rows="3" style="width: 99%;overflow-y:hidden;font-size: 12px;font-family: 'Microsoft Yahei', 微软雅黑, 宋体, Helvetica, Tahoma, Arial,Helvetica, STHeiti;"></textarea>
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center">
				排序号:
			</td>
			<td colspan="3">
				<input id="flSort" type="text" style="width: 100%">
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center">
				发起方式:
			</td>
			<td colspan="3">
				<input type="radio" name="startType" value="0">集成<input type="radio" name="startType" value="1">手动
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center" rowspan="2">
				编号规则:
			</td>
			<td colspan="1" align="right" width="40px">
				前缀
			</td>
			<td colspan="2" align="left">
				<input id="codePrefix" type="text" style="width: 100%">
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td colspan="1" align="right" width="40px">
				规则
			</td>
			<td colspan="2" align="left">
				<input id="codeTypeCode" type="hidden">
				<input id="codeType" type="text" style="width: 100%" readonly="readonly" disabled="disabled">
			</td>
			<td colspan="1" align="left">
				<input type="button" value="选择" class="btn_q" onclick="showIdRuleTree('IdRule_',0);" style="padding: 1px 3px 1px 3px;">
			</td>
		</tr>
		<tr>
			<td align="center">
				默认主题:
			</td>
			<td colspan="3" align="left">
				<input id="titleType" type="text" style="width: 100%">
			</td>
			<td colspan="1" align="left">
				<input type="checkbox" id="canChangeTitle" value="1">&nbsp;允许用户修改
			</td>
		</tr>
		<tr>
			<td align="center">
				业务对象:
			</td>
			<td colspan="3" align="left">
				<input id="serviceObjectDefineId" type="hidden">
				<input id="serviceObjectDefineName" type="text" style="width: 100%" readonly="readonly" disabled="disabled">
			</td>
			<td colspan="1" align="left">
				<input type="button" value="选择" class="btn_q" onclick="showTree('Object_',0);" style="padding: 1px 3px 1px 3px;">
			</td>
		</tr>
		<tr>
			<td align="center">
				PC版审批单地址:
			</td>
			<td colspan="3" align="left">
				<input id="serviceObjectDefineUrlPc" type="text" style="width: 100%" readonly="readonly" disabled="disabled">
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center">
				移动版审批单地址:
			</td>
			<td colspan="3" align="left">
				<input id="serviceObjectDefineUrlPh" type="text" style="width: 100%" readonly="readonly" disabled="disabled">
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center">
				平板版审批单地址:
			</td>
			<td colspan="3" align="left">
				<input id="serviceObjectDefineUrlPd" type="text" style="width: 100%" readonly="readonly" disabled="disabled">
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center">
				是否禁用:
			</td>
			<td colspan="3" align="left">
				<input type="radio" name="isDisabled" value="0">启用<input type="radio" name="isDisabled" value="1">禁用
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center">
				是否显示流程图:
			</td>
			<td colspan="3" align="left">
				<input type="radio" name="showGraph" value="1">显示<input type="radio" name="showGraph" value="0">不显示
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center">
				显示发起人补充附件:
			</td>
			<td colspan="3" align="left">
				<input type="radio" name="showRelationFile" value="0">显示<input type="radio" name="showRelationFile" value="1">不显示
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center">
				审批意见排序:
			</td>
			<td colspan="3" align="left">
				<input type="radio" name="wisSortType" value="0">正序<input type="radio" name="wisSortType" value="1">倒序
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center">
				重复参与人策略:
			</td>
			<td colspan="3" align="left">
				<select id="doWhenRepeatInAcs" style="width: 99%">
					<option value="0">
						无
					</option>
					<option value="1">
						后置审批
					</option>
					
					<option value="3">
						连续环节后置审批
					</option>
					
				</select>
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td style="text-align: center;">
				允许加签策略默认值:
			</td>
			<td class="edit" colspan="3" align="left">
				<select id="jqStrategyDefault" style="width: 99%">
					<option value="0">未配置</option>
					<option value="1">允许加签</option>
					<option value="2">仅前加签</option>
					<option value="3">仅后加签</option>
				</select>
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center">
				岗位为空策略:
			</td>
			<td colspan="3" align="left">
				<select id="doWhenNoUsersAtWp" style="width: 99%">
					
					<option value="1">
						挂起
					</option>
					<option value="2">
						跳过
					</option>
				</select>
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center">
				创建人:
			</td>
			<td colspan="3" align="left">
				<input id="createUserName" type="text" style="width: 100%" readonly="readonly" disabled="disabled"/>
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center">
				创建时间:
			</td>
			<td colspan="3" align="left">
				<input id="createTime" type="text" style="width: 100%" readonly="readonly" disabled="disabled"/>
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center">
				修改人:
			</td>
			<td colspan="3" align="left">
				<input id="editUserName" type="text" style="width: 100%" readonly="readonly" disabled="disabled"/>
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center">
				修改时间:
			</td>
			<td colspan="3" align="left">
				<input id="updateTime" type="text" style="width: 100%" readonly="readonly" disabled="disabled"/>
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr style="display: none;">
			<td align="left" colspan="5">
				<ul>
					<li>
						页面说明：
					</li>
					<li>
						1、流程的配置包括基本模板信息配置和流程步骤配置，配置完成的流程可以进行仿真测试
					</li>
					<li>
						2、流程说明为管理员日常维护使用的配置描述，用户不可见
					</li>
					<li>
						3、发起方式为集成时，平台发起界面不可见；如发起方式为手动时，平台发起界面可见，有多个条件流程时，弹框让用户选择
					</li>
					<li>
						4、编号规则在平台管理定义，此处调用。前缀支持公式，前缀+规则=完整编号
					</li>
					<li>
						5、默认主题支持公式定制
					</li>
					<li>
						6、点击版本管理按钮，可查看历史版本，并恢复成旧版本。模板保存时，会提示保存新版本还是更新现有版本
					</li>
					<li>
						7、业务对象指引用流程配置中的业务对象清单，即绑定业务单据字段和审批单
					</li>
					<li>
						8、是否显示流程图指用户审批时，是否在流程信息中显示流程图及节点状态，考虑到目前的流程引擎不支持此功能，先预留接口，默认不显示
					</li>
					<li>
						9、显示发起人补充附件是指流程流转过程中，协办、沟通发起人或发起人校稿所补充的附件是否在审批单下方集中显示，作为审批单的一部分
					</li>
					<li>
						10、审批意见排序指审批意见按正序还是倒序显示，按正序即按审批的顺序自上而下显示，按倒序指后审批的意见在上方显示
					</li>
					<li>
						11、默认可阅人员指流程实例一旦发起，这些人员即可查阅流程（不发待办消息）
					</li>
					<li>
						12、默认发起权限指手动发起方式时，控制谁能在平台流程发起页面看到此流程
					</li>
				</ul>
			</td>
		</tr>
		<tr style="display: none;">
			<td align="center">
				所属应用系统
			</td>
			<td id="apps_html" colspan="3" align="left">
				<script type="text/javascript">
					document.all.apps_html.innerHTML = apps;
				</script>
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr style="display: none;">
			<td align="center">
				启用时限:
			</td>
			<td>
				<input id="isFlowTimeLimit" type="checkbox"/>
			</td>
			<td style="text-align: center;">
				时限:
			</td>
			<td class="edit">
				<input id="flowTimeLimit" type="text" style="width: 60%"/>
				<select id="flowTimeUnit" style="width: 35%">
					<option value="0">
						(单位)
					</option>
					<option value="1">
						分钟
					</option>
					<option value="2">
						小时
					</option>
					<option value="3">
						工作日
					</option>
					<option value="4">
						自然日
					</option>
					<option value="5">
						周
					</option>
				</select>
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr style="display: none;">
			<td align="center">
				流程图显示.Left修正:
			</td>
			<td>
				<input id="fix_left" type="text" style="width: 100%"/>
			</td>
			<td align="center">
				流程图显示.Top修正:
			</td>
			<td class="edit">
				<input id="fix_top" type="text" style="width: 100%"/>
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center">
				是否业务流程:
			</td>
			<td colspan="3" align="left">
				<input type="radio" name="isBizFl" value="1">是
				<input type="radio" name="isBizFl" value="0">否
			</td>
			<td colspan="1" align="left">
				&nbsp;
			</td>
		</tr>
	</table>
</div>
