<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>会议室预约统计一览</title>
		<style type="text/css">
		<!--
			body {
				margin-left:10px;
				margin-top:10px;
				background-color:#ecf6ff;
			}
			ul { list-style:none; }
			
			/* 菜单class */
			.Menubox {
				width:50%;
				height:28px;
				line-height:28px;
			}
			.Menubox ul {
				margin:0px;
				padding:0px;
			}
			.Menubox li {
				float:left;
				display:block;
				cursor:pointer;
				width:80px;
				text-align:center;
				color:#000000;
				background-color:#ecf6ff;
				border-left:1px solid #A8C29F;
				border-top:1px solid #A8C29F;
				border-right:1px solid #A8C29F;
				border-bottom:1px solid #A8C29F;
			 }
			.Menubox li.hover {
				padding:0px;
				background-color:#33FF99;
				width:80px;
				border-left:1px solid #000000;
				border-top:1px solid #000000;
				border-right:1px solid #000000;
				border-bottom:1px solid #000000;
				color:#000000;
				font-weight:bold;
				height:27px;
				line-height:27px;
			}
		-->
		</style>
		
		<script>
		<!--
			function setTab(name, cursel, n){
				for(i=1; i<=n; i++){
			  		var menu = document.getElementById(name + i);
			  		var con = document.getElementById("con_" + name + "_" + i);
			  		menu.className = i == cursel ? "hover" : "";
			  		con.style.display = i == cursel ? "block" : "none";
			 	}
			} 
		//-->
		</script>
	</head>
	
	<body>
		<br />
		<br />
		<p align="center"><font size="4" color="green"><strong>会议室预约统计一览</strong></font></p>
		<br />
		<table width="1177" border="0" cellspacing="0">
			<tr>
				<td width="100" height="50">&nbsp;</td>
			    <td width="700"><label>
			    	<select name="select" style="width:88px;">
				        <option>2000</option>
				        <option>2001</option>
				        <option>2002</option>
				        <option>2003</option>
				        <option>2004</option>
				        <option>2005</option>
				        <option>2006</option>
				        <option>2007</option>
				        <option>2008</option>
				        <option>2009</option>
			    	</select>&nbsp;年</label>
				</td>
				<td>
					<a href="会议室预约情况一览画面.html">返回</a>	
				</td>
			</tr>
		</table>
		
		<table width="1177" height="318" border="0" cellspacing="0">
			<tr>
				<td width="100" height="22">&nbsp;</td>
			    <td width="1073">	
					<div class="Menubox">
						<ul>
							<li id="stat1" onClick="setTab('stat',1,2)"  class="hover">当前年</li>
						   	<li id="stat2" onClick="setTab('stat',2,2)" >三年</li>
						</ul>
					</div>
				</td>
			</tr>
			<tr>
				<td height="33">&nbsp;</td>
				<td rowspan="8">
					<div class="Contentbox">
						<div id="con_stat_1" >
							<table width="1046" height="372" border="1" cellspacing="0" bordercolor="#000000">
				            	<tr>
				                	<td height="20" colspan="12" align="center">次数</td>
				                  	<td width="50" align="center">合计</td>
				                  	<td colspan="12" align="center">利用率</td>
				                  	<td width="50" align="center">合计</td>
				                </tr>
				                <tr>
				                	<td width="35" height="20" align="center">1</td>
				                	<td width="35" align="center">2</td>
				                  	<td width="35" align="center">3</td>
				                  	<td width="35" align="center">4</td>
				                  	<td width="35" align="center">5</td>
				                  	<td width="35" align="center">6</td>
				                  	<td width="35" align="center">7</td>
				                  	<td width="35" align="center">8</td>
				                  	<td width="35" align="center">9</td>
				                  	<td width="35" align="center">10</td>
				                  	<td width="35" align="center">11</td>
				                  	<td width="35" align="center">12</td>
				                  	<td align="center">&nbsp;</td>
				                  	<td width="35" align="center">1</td>
				                  	<td width="35" align="center">2</td>
				                  	<td width="35" align="center">3</td>
				                  	<td width="35" align="center">4</td>
				                  	<td width="35" align="center">5</td>
				                  	<td width="35" align="center">6</td>
				                  	<td width="35" align="center">7</td>
				                  	<td width="35" align="center">8</td>
				                  	<td width="35" align="center">9</td>
				                  	<td width="35" align="center">10</td>
				                  	<td width="35" align="center">11</td>
				                  	<td width="35" align="center">12</td>
				                  	<td align="center">&nbsp;</td>
				                </tr>
				                <tr>
				                	<td height="30">&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                  	<td>&nbsp;</td>
				                	<td>&nbsp;</td>
				                </tr>
				                <tr>
									<td height="30">&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
				                </tr>
				                <tr>
									<td height="30">&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
				                </tr>
				                <tr>
									<td height="30">&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
				                </tr>
				                <tr>
									<td height="30">&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
				                </tr>
				                <tr>
									<td height="30">&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
				                </tr>
				        	</table>
						</div>
							
						<div id="con_stat_2" style="display:none">
							<table width="494" height="372" border="1" cellspacing="0" bordercolor="#000000" >
					        	<tr>
					            	<td height="20" colspan="6" align="center">次数</td>
					               	<td colspan="6" align="center">利用率</td>
					            </tr>
					            <tr>
					            	<td height="20" colspan="2" align="center">2007</td>
					               	<td colspan="2" align="center">2008</td>
					               	<td colspan="2" align="center">2009</td>
					               	<td colspan="2" align="center">2007</td>
					               	<td colspan="2" align="center">2008</td>
					               	<td colspan="2" align="center">2009</td>
					            </tr>
					            <tr>
									<td width="37" height="30">&nbsp;</td>
									<td width="37">&nbsp;</td>
									<td width="37">&nbsp;</td>
									<td width="37">&nbsp;</td>
									<td width="37">&nbsp;</td>
									<td width="37">&nbsp;</td>
									<td width="37">&nbsp;</td>
									<td width="37">&nbsp;</td>
									<td width="37">&nbsp;</td>
									<td width="37">&nbsp;</td>
									<td width="37">&nbsp;</td>
									<td width="37">&nbsp;</td>
					            </tr>
					            <tr>
									<td height="30">&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
					            </tr>
					            <tr>
									<td height="30">&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
					            </tr>
					            <tr>
									<td height="30">&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
					            </tr>
					            <tr>
									<td height="30">&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
					            </tr>
					            <tr>
									<td height="30">&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
					            	<td>&nbsp;</td>
					        	</tr>
							</table>
						</div>
					</div>
				</td>
			</tr>
			<tr>
				<td height="31">&nbsp;</td>
			</tr>
			<tr>
				<td height="50" align="center">大会議室(経理室側)</td>
			</tr>
			<tr>
				<td height="49" align="center">テレビ会議室</td>
			</tr>
			<tr>
				<td height="46" align="center">多功能庁</td>
			</tr>
			<tr>
				<td height="49" align="center">打ち合せ室</td>
			</tr>
			<tr>
				<td height="50" align="center">打合せ室(大開東南)</td>
			</tr>
			<tr>
				<td height="50" align="center">打合せ室(大開東北)</td>
			</tr>
		</table>
	</body>
</html>


