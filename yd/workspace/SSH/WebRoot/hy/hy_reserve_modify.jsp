<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>会议室预约更改</title>

<!-- import css -->
<link rel="stylesheet" type="text/css" href="css/style.css" />

<!-- import javascript -->
<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/prototype.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/reserve_modify.js"></script>

<script type="text/javascript">
		<!--
			//页面控件的可编辑性设置
			function selectDay() {

				//权限定数
				var WRITE = 1;
				var READONLY = 2;
				var NOT_READ = 3;
				
				var form = $('hysyy');
				var button = $('bgbutton');
				var hyjl = $('hyjl');
				var permission = <s:property value="%{permission}"/>;
				var editable = <s:property value="%{yuyueinfo.editable}"/>;

				//单日会议判断
				if(permission == WRITE) {
					
					if(!editable) {
						form.disable();
						button.enable();
					} else {
						form.enable();
					}

					//如果是TV会议，则会议记录可编辑
					if(<s:property value="%{yuyueinfo.bgbz}"/> != 0) {
						hyjl.enable();
					} else {
						hyjl.disable();
					}

				} else if(permission == READONLY){

					form.disable();
					hyjl.disable();
				}
			}
		
			function init() {
				var from = <s:property value="%{yuyueInfoSource}"/>;

				//从一览或详细来
				if(from == 1 || from == 2) {
					
					//默认为单日修改,并且隐藏结束日期
					var radioType = document.getElementsByName('yuyueinfo.yuyuetype');
					radioType[0].checked = true;

					hidden_enddate();

					//选择人员返回
				} else { //0：出错；3：从选择返回
					
					var pageYuyueType = <s:property value="%{yuyueinfo.pageYuyueType}"/>;
					var radioType = document.getElementsByName('yuyueinfo.yuyuetype');
					if(pageYuyueType == 0) {
						radioType[0].checked = true;
						hidden_enddate();
					} else if(pageYuyueType == 1) {
						radioType[1].checked = true;
						display_enddate();
					}
				}


				//如果是单日预约，则周期控件不可用
				var yuyuetype = <s:property value="%{yuyueinfo.yuyuetype}"/>;
				if(yuyuetype == "0") {
					var radioType = document.getElementsByName('yuyueinfo.yuyuetype');
					radioType[1].disabled = true;

					disableDay();
					disableWeek();
					disableMonth();
				} else if(yuyuetype == "1") {
					
					var radioZhouqi = document.getElementsByName('yuyueinfo.zhouqitype');
					if(radioZhouqi[0].checked) {
						disableWeek();
						disableMonth();						
					} else if(radioZhouqi[1].checked) {
						disableDay();
						disableMonth();
					} else if(radioZhouqi[2].checked) {
						disableDay();
						disableWeek();
					}
				}

				//非TV会议室，填写报告按钮不可用
				var editable = <s:property value="%{yuyueinfo.editable}"/>;
				var bgbz = <s:property value="%{yuyueinfo.bgbz}"/>;
				var bgButton = $("bgbutton");
				if(!editable) {
					if(bgbz == 0) {
						bgButton.disabled = true;
					}
				}

				//hyjl内容hyjl2中
				var hyjl = $("hyjl");
				var hyjl2 = $("hyjl2");
				hyjl2.value = hyjl.value;
				
			}

			function disableDay() {
				var radioZhouqi = document.getElementsByName('yuyueinfo.zhouqitype');
				radioZhouqi[0].disabled = true;
			}

			function disableWeek() {
				var radioZhouqi = document.getElementsByName('yuyueinfo.zhouqitype');
				radioZhouqi[1].disabled = true;

			  	var mon = $("mon");
			  	var tue = $("tue");
			  	var wen = $("wen");
			  	var thu = $("thu");
			  	var fri = $("fri");
				mon.disabled = true;
				tue.disabled = true;
				wen.disabled = true;
				thu.disabled = true;
				fri.disabled = true;	
			}

			function disableMonth() {
				var radioZhouqi = document.getElementsByName('yuyueinfo.zhouqitype');
				radioZhouqi[2].disabled = true;

				var day = $("yuyueinfo.day");
				day.disabled = true;

				var qianhou = document.getElementsByName("yuyueinfo.qianhou");
				qianhou[0].disabled = true;
				qianhou[1].disabled = true;
			}

			// 选上周期
			function selectZhouqi() {
				var radioType = document.getElementsByName('yuyueinfo.yuyuetype');
				if(!radioType[1].checked) {
					radioType[1].checked = true;
				}

				//显示结束日期
				var enddate = window.$('enddate');
			  	enddate.style.display = '';

			  	//选择周期时，不能填写会议报告
//			  	var hyjl = $("hyjl");
//			  	hyjl.disabled = true;
			}

			/*
			 * 显示结束日期（周期Radio的onclick事件）
			 */
			function display_enddate() {
				var enddate = window.$('enddate');
				enddate.style.display = '';
				
				//设置开始日期为周期开始日期
//				$("startdate").value = startdate_cycle;
			  	var startdate = $("startdate2").value;
			  	$("startdate").value = startdate;
			  	
			  	//选择周期时，不能填写会议报告
//			  	var hyjl = $("hyjl");
//			  	hyjl.disabled = true;

			  	//显示周期预约设置
			  	var cycle = $('cycle');
			  	cycle.style.display = '';
			}

			/*
			 * 隐藏结束日期
			 */
			function hidden_enddate() {
				var enddate = window.$('enddate');
				enddate.style.display = 'none';
				
				//设置开始日期为单日会议开始日期
			  	var startdate = $("startdate1").value;
			  	$("startdate").value = startdate;
			  	
			  	//单日修改时，如果是TV会议可填写报告
			  	var hyjl = $("hyjl");
			  	var bgbz = <s:property value="%{yuyueinfo.bgbz}"/>;
			  	if(bgbz == 1) {
				  	hyjl.disabled = false;
			  	}

			  	//隐藏周期预约设置
			  	var cycle = $('cycle');
			  	cycle.hide();
			}

			/*
			 * 将开始日期存入两个Hidden中（与单日会议开始日期和周期会议开始日期对应）
			 */
			function textToHidden() {
				var value = getRadioChecked();
				var startdate = $("startdate").value;
				var startdate_old = '<s:property value="%{yuyueinfo.startdate_cycle}"/>';
				var now = new Date();
				var year = now.getYear();
				var month = now.getMonth() + 1;
				var date = now.getDate();
				if(month < 10) {
					month = "0" + month; 
				}
				var today = year + "-" + month + "-" + date;

				if(value == 0) {

					if((startdate >= startdate_old) && (startdate < today)) {
						alert("您选择的日期已过期，请选择其它日期！");
						$("startdate").value = startdate;
						
					} else {
						$("startdate1").value = startdate;
					}
					
				} else if(value == 1) {

					if((startdate > startdate_old) && (startdate < today)) {
						alert("您选择的日期已过期，请选择其它日期！");
						$("startdate").value = startdate_old;
					} else {
						$("startdate2").value = startdate;
					}
				}
			}
			
		//-->
		</script>

</head>
<body onload="selectDay();init();">
	<div class="container">
	  <s:form id="hysyy" name="hysyy" method="post" theme="simple">
		<div class="span-24 title">
			<div class="span-22"><h2>会议室预约更改</h2></div>
			<div class="span-2 margin_top_4 last">
				<s:if test="yuyueinfo.preInfoSource == 1">
					<s:url id="conferenceinit" action="conferenceinit">
						<s:param name="yyDate" value="%{yilanDate}"></s:param>
					</s:url>
					<s:a href="%{conferenceinit}" cssClass="btn span-2">返回</s:a>
		
				</s:if><s:elseif test="yuyueinfo.preInfoSource == 2">
					<s:url id="conferensituation" action="conferensituation">
						<s:param name="conferensituationId" value="%{yuyueinfo.hys}"></s:param>
						<s:param name="radiobutton" value="%{searchType}"></s:param>
						<s:param name="startDate" value="%{startDate}"></s:param>
						<s:param name="endDate" value="%{endDate}"></s:param>
						<s:param name="pageNumber" value="%{pageNumber}"></s:param>
					</s:url>
					<s:a href="%{conferensituation}" cssClass="btn span-2">返回</s:a>
				</s:elseif>
			</div>
		</div>
		<div class="span-22">
		<div class="span-22 last">
			<div class="span-2 text_right">
				预约方式
			</div>
			<div class="span-4">
				<s:radio id="yuyuetype" name="yuyueinfo.yuyuetype" list="#{0 : '单日更改'}"
					onclick="hidden_enddate();">
				</s:radio>
				<s:radio name="yuyueinfo.yuyuetype" list="#{1 : '周期更改'}"
					onclick="display_enddate();">
				</s:radio>
			</div>
		</div>
		<div class="span-22 last" id="cycle">
			<div class="span-2 text_right">
				周期设定
			</div>
			<div class="span-20 last">
				<div class="span-22 last">
				  <div class="span-2">
					<s:radio id="meiri" name="yuyueinfo.zhouqitype" list="#{1 : '每日'}">
					</s:radio>
				  </div>
				</div>
				<div class="span-22 last">
					<div class="span-10">
						<s:radio name="yuyueinfo.zhouqitype" list="#{2 : '每周'}"></s:radio>
						<s:checkbox id="mon" name="yuyueinfo.mon" fieldValue="2" 
							theme="ysyshy" value="%{yuyueinfo.mon}" onclick="selectZhouqi();">
						</s:checkbox>星期一 
						<s:checkbox id="tue" name="yuyueinfo.tue" fieldValue="3" 
							theme="ysyshy" value="%{yuyueinfo.tue}" onclick="selectZhouqi();">
						</s:checkbox>星期二 
						<s:checkbox id="wen" name="yuyueinfo.wen" fieldValue="4" 
							theme="ysyshy" value="%{yuyueinfo.wen}" onclick="selectZhouqi();">
						</s:checkbox>星期三
						<s:checkbox id="thu" name="yuyueinfo.thu" fieldValue="5"
							theme="ysyshy" value="%{yuyueinfo.thu}" onclick="selectZhouqi();">
						</s:checkbox>星期四
						<s:checkbox id="fri" name="yuyueinfo.fri" fieldValue="6" 
							theme="ysyshy" value="%{yuyueinfo.fri}" onclick="selectZhouqi();">
						</s:checkbox>星期五
					</div>
					<div class="span-20 last">
						<div class="span-10">
							<s:radio name="yuyueinfo.zhouqitype" list="#{3 : '每月'}">
							</s:radio>
							<s:textfield id="yuyueinfo.day" name="yuyueinfo.day" cssStyle="width:25px"
								maxlength="2" onclick="selectZhouqi();"></s:textfield>&nbsp;日 
							<s:radio name="yuyueinfo.qianhou" list="#{1 : '遇休日提前'}" 
								onclick="selectZhouqi();">
							</s:radio>
							<s:radio name="yuyueinfo.qianhou" list="#{0 : '遇休日后延'}" 
								onclick="selectZhouqi();">
							</s:radio>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="span-22 last">
			<s:property value="errormsg" />
			<s:fielderror />
			<s:hidden id="startdate1" name="yuyueinfo.startdate"></s:hidden>
			<s:hidden id="startdate2" name="yuyueinfo.startdate_cycle"></s:hidden>
		</div>
		<div class="span-22 last">
			<div class="span-2 text_right">日期*</div>
			<div class="span-8">
				<s:textfield id="startdate" name="tempdate"
					cssStyle="width:80px; text-align:center" maxlength="10"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd', isShowClear:false, minDate:'%{yuyueinfo.startdate_cycle}'})"
					onchange="textToHidden();" theme="simple"  readonly="true">
				</s:textfield> 
				<span id="enddate">&nbsp;～&nbsp; 
				<s:textfield id="yuyueinfo.enddate" name="yuyueinfo.enddate" cssStyle="width:80px; text-align:center" 
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd', isShowClear:false, minDate:'%y-%M-%d'})"
					maxlength="10" theme="simple" readonly="true">
				</s:textfield> </span>
			</div>
		</div>
		<div class="span-22 last">
			<div class="span-2 text_right">会议室*</div>
			<div class="span-20 last">
				<s:select id="yuyueinfo.hys" name="yuyueinfo.hys"
				list="hysList" listKey="Id" listValue="Hysmc" headerKey="0"
				headerValue="-------------------请选择-------------------">
				</s:select>&nbsp;
			</div>
		</div>
		<div class="span-22 last">
			<div class="span-2 text_right">会议主题*</div>
			<div class="">
				<s:textfield id="yuyueinfo.hyzt" name="yuyueinfo.hyzt" 
				cssStyle="width:220px" maxlength="100"></s:textfield>
				<s:checkbox name="yuyueinfo.bmbz" fieldValue="1" theme="ysyshy" 
					value="%{yuyueinfo.bmbz}"></s:checkbox>保密
			</div>
		</div>
		<div class="span-22 last">
			<div class="span-2 text_right">时间*</div>
			<div class="span-20 last">
				<s:select id="yuyueinfo.start_hour" name="yuyueinfo.start_hour" cssStyle="width:52px"
					list="#{'08':'8', '09':'9', '10':'10', '11':'11', '12':'12', '13':'13', '14':'14', 
					'15':'15', '16':'16', '17':'17', '18':'18'}">
				</s:select> ： 
				<s:select id="yuyueinfo.start_minute" name="yuyueinfo.start_minute" cssStyle="width:52px"
					list="#{'00':'00', '30':'30'}">
				</s:select> ～ 
				<s:select id="yuyueinfo.end_hour" name="yuyueinfo.end_hour" cssStyle="width:52px"
					list="#{'08':'8', '09':'9', '10':'10', '11':'11', '12':'12', '13':'13', '14':'14', 
					'15':'15', '16':'16', '17':'17', '18':'18'}">
				</s:select> ： 
				<s:select id="yuyueinfo.end_minute" name="yuyueinfo.end_minute" cssStyle="width:52px"
					list="#{'00':'00', '30':'30'}">
				</s:select>
			</div>
		</div>
		<div class="span-22 last">
			<div class="span-2 text_right">申请者*</div>
			<div class="span-10">
				<s:textfield name="yuyueinfo.sqr" cssStyle="width:115px"
					maxlength="5" readonly="true">
				</s:textfield>
			</div>
		</div>
		<div class="span-22 last">
			<div class="span-2 text_right">参加者*</div>
			<div class="">
				<s:textfield id="yuyueinfo.cjr" name="yuyueinfo.cjr" cssStyle="width:267px"
					maxlength="10" readonly="true"></s:textfield> 
				<input type="button" class="btn" value="选择" onclick="doSubmit('select')" />
			</div>
		</div>
		<div class="span-22 last">
			<div class="span-2 text_right">人数*</div>
			<div class="">
				<s:textfield id="yuyueinfo.cjrs" name="yuyueinfo.cjrs" cssStyle="width:115px"
				maxlength="2" readonly="true"></s:textfield>人
			</div>
		</div>
		<div class="prepend-2 span-22 last">
			*如果是TV会议，需要填写会议记录，否则不必填写
		</div>
		<div class="span-22 last">
			 <div class="span-2 text_right">会议记录</div>
			 <div>
				 <s:textarea id="hyjl" name="yuyueinfo.hyjl" cols="60" rows="4">
				</s:textarea>
			 </div>
			 
			<!-- 参加人ID List -->
			<s:hidden name="yuyueinfo.cjrIdList"></s:hidden>
			
			<!-- 初始时保存会议室人数字符串("20,8,30,4,15")，用于检查修改时人数是否超员 -->
			<s:hidden id="rsString" name="rsString"></s:hidden>
			
			<!-- 初始化保存报告，用于非TV会议室提交会议记录 -->
			<s:hidden id="hyjl2" name="yuyueinfo.hyjl2"></s:hidden>
		</div>
		</div>
		<div class="span-11 text_center margin_top_4 last">
			<s:if test="%{yuyueinfo.editable}">
				<input id="update" type="button" class="btn" value="更改预约"
					onclick="doSubmit('update', <s:property value="%{yuyueinfo.changedFlg}"/>)" />
				<input id="delete" type="button" class="btn" value="取消预约"
					onclick="doSubmit('delete')" />
			</s:if><s:else>
				<input id="bgbutton" type="button" class="btn" value="填写报告"
					onclick="doSubmit('writeBg')" />
			</s:else>
		</div>
		</s:form>
	</div>
</body>
</html>
