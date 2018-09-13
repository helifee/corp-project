<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>消息中心</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/application.js"></script>
	<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
	<script type="text/javascript" src="js/search.js"></script>
	<script type="text/javascript">
	/*
		if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
			var config = 'fullscreen,location=yes,menuber=yes,scrollbars=yes,status=yes,toolbar=yes,titlebar=yes,resizable=yes';
	
		} 	
	*/
        function openwindowdesk(url, name, iWidth, iHeight) {
			if (isEmpty(iWidth)){
				iWidth = 0;
			}
			if (isEmpty(iHeight)){
				iHeight = 0;
			}
			if(iHeight==0){
				iHeight = window.screen.availHeight - 100;
			}
			if(iWidth==0){
				iWidth = window.screen.availWidth - 100;
			}
			var iTop = (window.screen.availHeight - 30 - iHeight) / 2 - 10; // 获得窗口的垂直位置;
			var iLeft = (window.screen.availWidth - 10 - iWidth) / 2 - 10; // 获得窗口的水平位置;
			
			iHeight=window.screen.availHeight;
			iWidth=window.screen.availWidth;
			window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no');
		}

   </script>
</head>
<body>
    <s:set id="opTypeDb" value="@com.xinleju.erp.frame.models.Msg@OP_TYPE_DB"></s:set>
    <s:set id="opTypeYb" value="@com.xinleju.erp.frame.models.Msg@OP_TYPE_YB"></s:set>
    <s:set id="opTypeYd" value="@com.xinleju.erp.frame.models.Msg@OP_TYPE_YD"></s:set>
    <s:set id="opTypeWd" value="@com.xinleju.erp.frame.models.Msg@OP_TYPE_WD"></s:set>
    <s:set id="opTypeRm" value="@com.xinleju.erp.frame.models.Msg@OP_TYPE_RM"></s:set>
    <s:set id="opTypeLc" value="@com.xinleju.erp.frame.models.Msg@OP_TYPE_LC"></s:set>
	<!-- 路径导航
    <div class="path">
        我的位置：首页&gt;&gt; <a href="#">流程管理</a>
    </div> -->
	<form id="frm" name="frm" action="Msg!index.do" method="post">
	    <input type="hidden" id="start" name="start" value="${start }"/>
        <input type="hidden" name="msgDto.opType" value="${msgDto.opType}"/>
        <s:hidden name="ifShowMore" id="ifShowMore"></s:hidden>
	    <!-- 查询条件 -->
		<div class="s1_searchWrap">
			  <div class="s2">
			    <div class="sl-key"><span>已选条件:</span></div>
			    <div class="s2-clear"><a href="javascript:void(0)" onclick="clearAll()">清除条件</a></div>
			    <div class="s2-value">
			      <ul id="selectedCond">
			      	<%-- <s:if test="#request.msgTypeMap.get(msgDto.msgType) != null">
				        <li id="msgTypeLi">
				        		<a href="javascript:void(0)" onclick="clearCurrent(this)">消息类型：${msgTypeMap[msgDto.msgType]}</a>
				        		<s:hidden name="msgDto.msgType"></s:hidden>
				        </li>
			      	</s:if> --%>
			      	<s:if test="#request.msgTodoTypeMap.get(msgDto.todoType) != null">
						<li id="todoTypeLi">
							<a href="javascript:void(0)" onclick="clearCurrent(this)">任务类型：${msgTodoTypeMap[msgDto.todoType]}</a>
							<s:hidden name="msgDto.todoType"></s:hidden>
						</li>
					</s:if>
			      	<s:if test="#request.appMap.get(msgDto.moduleCode) != null">
			        	<li id="moduleCodeLi">
			        		<a href="javascript:void(0)" onclick="clearCurrent(this)">所属模块：${appMap[msgDto.moduleCode].name}</a>
			        		<s:hidden name="msgDto.moduleCode"></s:hidden>
			        	</li>
			      	</s:if>
			      	<s:if test="#request.msgTodoTypeMap.get(msgDto.todoType) != null && msgDto.todoType == 4">
				      	<s:if test="#request.statusMap.get(msgDto.appStatus) != null">
				        	<li id="appStatusLi">
				        		<a href="javascript:void(0)" onclick="clearCurrent(this)">审批状态：${statusMap[msgDto.appStatus]}</a>
				        		<s:hidden name="msgDto.appStatus"></s:hidden>
				        	</li>
				      	</s:if>	
					</s:if>			      	
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div>
			  <%-- <div class="sl-wrap">
			    <div class="sl-key"><span>任务类型:</span></div>
			    <div class="sl-value">
			      <ul>
			         <s:iterator value="#request.msgTypeMap">
			        	<li class="${key eq msgDto.msgType ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('消息类型：${value}',${key},'msgTypeLi','msgDto.msgType')" id="${key}">${value}</a></li>
			        </s:iterator>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div> --%>
			<div class="sl-wrap">
				<div class="sl-key">
					<span>任务类型:</span>
				</div>
				<div class="sl-value">
					<ul>
						<s:iterator value="#request.msgTodoTypeMap">
							<li class="${key eq msgDto.todoType ? 'current' :''}">
								<a href="javascript:void(0)" onclick="selectCond('任务类型：${value}',${key},'todoTypeLi','msgDto.todoType')" id="${key}">${value}</a>
							</li>
						</s:iterator>
					</ul>
				</div>
				<div class="clear"></div>
			</div>
			<div class="sl-wrap">
			    <div class="sl-key"><span>所属模块:</span></div>
			    <div class="sl-value">
			      <ul>
			        <s:iterator value="#request.appMap">
			        	<li class="${key eq msgDto.moduleCode ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('所属模块：${value.name}','${key}','moduleCodeLi','msgDto.moduleCode')" id="${key}">${value.name}</a></li>
			        </s:iterator>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div>
			<s:if test="#request.msgTodoTypeMap.get(msgDto.todoType) != null && msgDto.todoType == 4">
			<div class="sl-wrap">
			    <div class="sl-key"><span>审批状态:</span></div>
			    <div class="sl-value">
			      <ul>
			        <s:iterator value="#request.statusMap">
			        	<li class="${key eq msgDto.appStatus ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('审批状态：${value}','${key}','appStatusLi','msgDto.appStatus')" id="${key}">${value}</a></li>
			        </s:iterator>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div>			  
			 </s:if>
			  <div class="sl-wrap" id="box2" style="${ifShowMore eq 1 ? 'display:' : 'display:none' }">
			    <div class="sl-key"><span>申请时间:</span></div>
			    <div class="sl-value">
			      <ul>
			        <li>
			        	<input name="msgDto.beginDate" value="${msgDto.beginDate}" style="width: 80px;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
			        </li>
			        <li>-</li>
			        <li>
			        	<input name="msgDto.endDate" value="${msgDto.endDate}" style="width: 80px;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
			        </li>
			      </ul>
			    </div>
			    <div class="clear"></div>
			    <div class="sl-key"><span>处理时间:</span></div>
			    <div class="sl-value">
			      <ul>
			        <li>
			        	<input name="msgDto.opBeginDate" value="${msgDto.opBeginDate}" style="width: 80px;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
			        </li>
			        <li>-</li>
			        <li>
			        	<input name="msgDto.opEndDate" value="${msgDto.opEndDate}" style="width: 80px;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
			        </li>
			      </ul>
			    </div>
			    <div class="clear"></div>
			    <div class="m_searchWrap"><input type="button" value="确定" onclick="queryFrm()"/></div>
			  </div>
			  <s:if test="ifShowMore == 1">
				  <div class="m_searchWrap"><a href="#" onclick="openShutManager(this,'box2',false,'隐藏更多筛选条件｛申请时间、处理时间｝ ','显示更多筛选条件｛申请时间、处理时间｝')">隐藏更多筛选条件｛申请时间、处理时间｝ </a></div>
			  </s:if>
			  <s:else>
			  	  <div class="m_searchWrap"><a href="#" onclick="openShutManager(this,'box2',false,'隐藏更多筛选条件｛申请时间、处理时间｝ ','显示更多筛选条件｛申请时间、处理时间｝')">显示更多筛选条件｛申请时间、处理时间｝ </a></div>
			  </s:else>
		</div>
		
		
		<!-- 标题 -->
		<div class="t_title">
		  <div class="hh">消息列表</div>
		  <div class="t_title_input">
		    <input type="text" name="msgDto.title" id="title" placeholder="标题"  value="${msgDto.title }"/>
		  </div>
		  <div class="t_title_input">
		  	<a href="#" title="查询" onclick="javascript:document.frm.submit();"><img src="images/icon_search.png" width="24" height="24" align="bottom"/> </a>
		  </div>
		  <div class="tool">
		  </div>
		  <div class="clear"></div>
		</div>
				
		

		<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
			<tr>
				<th width="40px">序号</th>
				<th>标题</th>
				<!--<th width="80px">所属模块</th>-->
				<th width="70px">申请时间</th>
				<!-- 
				<th width="70px">处理时间</th>
				<th width="30px">类型</th> 
				-->
				<th width="100px">分类</th>
				<th width="80px">状态</th>
				<th width="200px">当前办理人</th>
			</tr>
			<s:iterator value="page.items" var="item" status="s">
		      	<s:if test="#request.statusMap.get(msgDto.appStatus) != null">
		        	<s:if test="#request.partMap[#item.id] != ''">
						<tr>
							<td align="center">
							   ${s.count }
							</td>
		                    <td align="left">
		                    	<a href="#" onclick="openwindowdesk('<s:property value="#request.urlMap[#item.id]"/>','edit_project_wi')"><app:TruncateTag size="110" src="${item.title}" ></app:TruncateTag></a>
		                    </td>
							<!--
		                    <td align="center">
		                       ${appMap[item.moduleCode].name }
		                    </td>
							-->
		                    <td align="center">
		                       <s:date name="#item.typedDate" format="yyyy-MM-dd"/>
		                    </td>
		                    <!-- 
		                    <td align="center">
		                       <s:date name="#item.dealDate" format="yyyy-MM-dd"/>
		                    </td>
		                    <td align="center">
		                       ${item.opType eq opTypeDb ? '待审' : item.opType eq opTypeYb ? '待阅' : item.opType eq opTypeYd ? '已读' : item.opType eq opTypeWd ? '未读' : item.opType eq opTypeRm ? '删除' : ''}
		                    </td>  
		                     -->
		                    <td align="center">
		                       ${appStatusMap[item.id]['type'] }
		                    </td>
		                    <td align="center">
		                       ${appStatusMap[item.id]['status'] }
		                    </td>                                         
		                    <td align="center">
		                    	${partMap[item.id]}
		                    </td>                                                                                                 					
						</tr>		        	
		        	</s:if>		        	
		      	</s:if>		
		      	<s:else>
				<tr>
					<td align="center">
					   ${s.count }
					</td>
                    <td align="left">
                    	<a href="#" onclick="openwindowdesk('<s:property value="#request.urlMap[#item.id]"/>','edit_project_wi')"><app:TruncateTag size="110" src="${item.title}" ></app:TruncateTag></a>
                    </td>
					<!--
                    <td align="center">
                       ${appMap[item.moduleCode].name }
                    </td>
					-->
                    <td align="center">
                       <s:date name="#item.typedDate" format="yyyy-MM-dd"/>
                    </td>
                    <!-- 
                    <td align="center">
                       <s:date name="#item.dealDate" format="yyyy-MM-dd"/>
                    </td>
                    <td align="center">
                       ${item.opType eq opTypeDb ? '待审' : item.opType eq opTypeYb ? '待阅' : item.opType eq opTypeYd ? '已读' : item.opType eq opTypeWd ? '未读' : item.opType eq opTypeRm ? '删除' : ''}
                    </td>  
                     -->
                    <td align="center">
                       ${appStatusMap[item.id]['type'] }
                    </td>
                    <td align="center">
                       ${appStatusMap[item.id]['status'] }
                    </td>                                          
                    <td align="center">
                    	${partMap[item.id]}
                    </td>                                                                                                 					
				</tr>		      	
		      	</s:else>
			</s:iterator>
		</table>
		<div class="page">
			<app:PageTag actionName="Msg!index.do"></app:PageTag>
		</div>
	</form>
</body>
</html>
