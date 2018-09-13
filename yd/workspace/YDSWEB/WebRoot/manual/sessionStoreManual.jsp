<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>画面重载</title>
		<!-- 共通css -->
		<link rel="stylesheet" type="text/css" href="../css/gray.css">
		<link rel="stylesheet" type="text/css" href="../css/manual.css">
		<link rel="stylesheet" type="text/css" href="../js/highlighter/highlighter.css">
		<!-- 共通js -->
		<script type="text/javascript" src="../js/common/prototype.js"></script>
		<script type="text/javascript" src="../js/common/util.js"></script>
		<script type="text/javascript" src="../js/highlighter/highlighter.js"></script>
		<script type="text/javascript" src="../js/manual/common.js"></script>
	</head>
	
	<body class="bgclr_gray">
		<table class="mbg">
			<tr>
				<td class="mbg_lt"></td>
				<td class="mbg_t"></td>
				<td class="mbg_rt"></td>
			</tr>
			<tr>
				<td class="mbg_l"></td>
				<td class="mbg_c">
				<!-- 内容开始  -->
				
	<div class="container span-20 last">
		<div class="title"><h2>画面重载</h2></div>
						
		<!-- 功能简介  -->
		<div class="span-20 last">
			<div class="h2">一、 功能简介</div>
			<div class="prepend-1">处理action请求，在session中保存检索条件或页面数据时使用，减少session中的冗余数据。</div>
		</div>
		
		<!-- 示例说明  -->
		<div class="span-20 last">
			
			<div class="h2">二、示例说明</div>
			<div class="prepend-1 span-19">
				
				
				<div class="h3">示例 </div>
				<div class="span-18 text_center">
					<p><a href="guideLinkShow.action?fromFlg=1">示例 - 1 - 查询条件重载</a></p>
					<p><a href="guideLinkShow.action?fromFlg=2">示例 - 2 - 画面数据重载</a></p>
				</div>
	
				<hr class="space"/>
				
				<!-- 示例1 -->
				<div class="h3">示例 - 1 部分代码</div>
				
				<div class="prepend-1 span-18 margin_top_10">
					
					<div class="module code">
						<div class="module_header">
							action配置：<hr class="codetoggle none"/>
						</div>
						<div class="module_body span-17">
							<pre class="brush: xml">
								&lt;!-- 查询操作 --&gt;
								&lt;action name="searchPersons" method="searchPersons" class="sessionStoreSample"&gt;
									&lt;result name="success"&gt;personSearch.jsp&lt;/result&gt;
								&lt;/action&gt;
								
								&lt;!-- 删除操作 --&gt;
								&lt;action name="deletePerson" method="deletePerson" class="sessionStoreSample"&gt;
									&lt;result name="success" type="redirectAction"&gt;
										&lt;param name="actionName"&gt;searchPersons&lt;/param&gt;
										&lt;param name="reloadFlg"&gt;1&lt;/param&gt;
									&lt;/result&gt;
								&lt;/action&gt;
							</pre>
						</div>
					</div>
					
					<div class="clear_both"><p>执行删除操作后，重定向到查询操作，传入reloadFlg。</p></div>
					
				</div>
				
				<div class="prepend-1 span-18 margin_top_10">
					
					<div class="module code">
						<div class="module_header">
							action：<hr class="codetoggle none"/>
						</div>
						<div class="module_body span-17">
							<pre class="brush: java">
									public String searchPersons() {
										
										// 判断reloadFlg（利用条件进行画面重载）
										if (CommonConstants.ActionReloadFlg.Condition_Reload.value()
												.equals(super.getReloadFlg())) {
											// 取得检索条件
											personSearchInfo = (Person) SessionStore.getCondition(actionkey);
										}
										
										persons = sessionStoreSampleService.getPersons(personSearchInfo);
										
										// 每次检索后记录检索条件
										SessionStore.setCondition(actionkey, personSearchInfo);
										
										return SUCCESS;
									}
							</pre>
						</div>
					</div>
													
				</div>
				
				<!-- 示例 2 -->			
				<div class="h3">示例 - 2 部分代码</div>
				
				<div class="prepend-1 span-18 margin_top_10">
					
					<div class="module code">
						<div class="module_header">
							action配置：<hr class="codetoggle none"/>
						</div>
						<div class="module_body span-17">
							<pre class="brush: xml">
								&lt;!-- 点击人员选择 --&gt;
								&lt;action name="selectPerson" method="beforeSelectPerson" class="sessionStoreGroup"&gt;
									&lt;result name="success"&gt;selectPerson.jsp&lt;/result&gt;
								&lt;/action&gt;
								
								&lt;!-- 确认选择 --&gt;
								&lt;action name="selectSubmit" method="selectSubmit" class="sessionStoreGroup"&gt;
									&lt;result name="success"&gt;groupAdd.jsp&lt;/result&gt;
								&lt;/action&gt;
							</pre>
						</div>
					</div>
										
				</div>
				
				<div class="prepend-1 span-18 margin_top_10">
					
					<div class="module code">
						<div class="module_header">
							action：<hr class="codetoggle none"/>
						</div>
						<div class="module_body span-17">
							<pre class="brush: java">
								/**
								 * 进入人员选择页面前处理
								 */
								public String beforeSelectPerson() {
									
									// 记录画面录入数据
									SessionStore.setCondition(actionkey, group);
									
									return SUCCESS;
								}
								
								/**
								 * 选择人员后提交
								 */
								public String selectSubmit() {
									
									StringBuilder strbuilder = new StringBuilder();
							
									if (selectPersonId != null) {
										for (String id : selectPersonId) {
											strbuilder.append(id + ",");
										}
									}
							
									String idStr = strbuilder.toString();
									
									if (idStr.length() != 0) {
										idStr = idStr.substring(0, idStr.length() - 1);
									}
									
									// 取得画面数据
									group = (Group) SessionStore.getCondition(actionkey);
									
									group.setPersons(idStr);
									
									return SUCCESS;
								}
							</pre>
						</div>
					</div>
													
				</div>
				
				<div class="prepend-1 span-18 margin_top_10">
					
					<div class="module code">
						<div class="module_header">
							javaScript：<hr class="codetoggle none"/>
						</div>
						<div class="module_body span-17">
							<pre class="brush: js">
								// 选择人员链接click事件
								$('selectPersonLink').observe('click', function(event) {
									$('selectPersonLink').setAttribute('href', 'selectPerson.action?' 
										+ $('addgroupForm').serialize());
								});
							</pre>
						</div>
					</div>
										
				</div>
						
				<div class="h3">使用说明</div>
				
				<div class="prepend-1 span-18">
					
					<div class="clear_both">
						<p>如果重载需要经过判断之后进行，在向action发送请求时，添加参数reloadFlg，赋值给action基类中定义的reloadFlg。</p>
						<p>在action中添加判断（使用CommonConstants.ActionReloadFlg中定数）。</p>					
						<p>"0" 不做处理</p>		
					</div>
					
					<div class="clear_both"><p>"1" 取得、保存条件对象</p></div>
					
					<div class="module code">
						<div class="module_header">
							java：<hr class="codetoggle none"/>
						</div>
						<div class="module_body span-17">
							<pre class="brush: java">
								SessionStore.getCondition(String actionkey);
								
								SessionStore.setCondition(String actionkey, Object condition);
							</pre>
						</div>
					</div>
					
					<div class="clear_both"><p>"2" 取得、保存数据对象</p></div>
					
					<div class="module code">
						<div class="module_header">
							java：<hr class="codetoggle none"/>
						</div>
						<div class="module_body span-17">
							<pre class="brush: java">
								SessionStore.getData(String actionkey);
								
								SessionStore.setData(String actionkey, Object data);
							</pre>
						</div>
					</div>
					
					<div class="clear_both"><p>"3"  取得、保存条件对象和数据对象</p></div>
					
					<div class="module code">
						<div class="module_header">
							java：<hr class="codetoggle none"/>
						</div>
						<div class="module_body span-17">
							<pre class="brush: java">
								SessionStore.getCondition(String actionkey);
								SessionStore.getData(String actionkey);
								
								SessionStore.setCondition(String actionkey, Object condition);
								SessionStore.setData(String actionkey, Object data);
							</pre>
						</div>
					</div>
					
					<div class="clear_both"><p>"4"  销毁所有保存的对象</p></div>
					
					<div class="module code">
						<div class="module_header">
							java：<hr class="codetoggle none"/>
						</div>
						<div class="module_body span-17">
							<pre class="brush: java">
								SessionStore.destroy();						
							</pre>
						</div>
					</div>
					
				</div>
				
			</div>
		</div>
		
		<!-- 方法接口  -->
		<div class="span-20 last">
			<div class="h2">三、 方法接口</div>
			<div class="prepend-2 span-18">
				<div class="module code">
					<div class="module_header">
						java：<hr class="codetoggle none"/>
					</div>
					<div class="module_body span-17">
						<pre class="brush: java">					
							/**
							 * 保存条件对象
							 * 
							 * @param actionkey
							 * @param object
							 */
							public static void setCondition(String actionkey, Object condition)
							
							/**
							 * 取得条件对象
							 * 
							 * @param actionkey
							 * 
							 * @return 条件bean
							 */
							public static Object getCondition(String actionkey) 
							
							/**
							 * 保存数据对象
							 * 
							 * @param actionkey
							 * @param object
							 */
							public static void setData(String actionkey, Object condition)
																		
							/**
							 * 取得数据对象
							 * 
							 * @param actionkey
							 * 
							 * @return 数据bean
							 */
							public static Object getData(String actionkey)
							
							/**
							 * 销毁存储的数据
							 */
							public static void destroy()
						</pre>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 常见问题  -->
		<div class="span-20 last">
			<div class="h2">四、 常见问题</div>
		</div>
		
	</div>
	
				<!-- 内容结束 -->
				</td>
				<td class="mbg_r"></td>
			</tr>
			<tr>
				<td class="mbg_lb"></td>
				<td class="mbg_b"></td>
				<td class="mbg_rb"></td>
			</tr>
		</table>
		<script type="text/javascript">SyntaxHighlighter.config.clipboardSwf="../js/highlighter/scripts/clipboard.swf";SyntaxHighlighter.all();</script>
	</body>
</html>
