<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!--隐藏判断是否检索到isbn书籍信息 -->	
									<s:if test="bookinfo == null">
							 			<s:textfield id="exittf" cssClass="none" name="exittf"  value="0"></s:textfield>
									</s:if>	
									<s:else>
							 			<s:textfield id="exittf" cssClass="none" name="exittf"  value="1"></s:textfield>
									</s:else>		  

<!--isbn行-->
					      	<div class=" span-9">
					      			<div class=" span-6 margin_top_20 margin_left_20 font_weight_b font_size_18 text_left">
						               <s:label id="isbnnum" name="isbnnum" cssClass="margin_left_10" value="ISBN号："></s:label>
						               <s:textfield id="isbn" name="isbn" onkeyup="sercthkey();" maxlength="13"   cssClass="span-x" value="%{bookinfo.isbn}"></s:textfield>
						               <s:label id="bixuisbn" name="bixuisbn" cssClass="color_red" value="*"></s:label>
						               
					               </div>
					               		<div class="bttn padding_right_34 margin_top_20 text_left" onclick="sercthInfo();" > 
          									<a><span>检索 </span></a> 
          								</div>			               
					         		
<!--图书名称行-->
					      	
						      		<div class=" span-8 margin_top_2 margin_left_20 font_weight_b font_size_18 text_left">
						               <s:label id="bknm" name="bknm" value="图书名称："></s:label>
						               <s:textfield id="bookname" name="bookname" maxlength="40"  cssClass="span-5" value="%{bookinfo.bookname}"></s:textfield>
						               <s:label id="bixubkname" name="bixubkname" cssClass="color_red" value="*"></s:label>	
									</div>		               
					         	
<!--图书册数行-->
					      	
						      		<div class=" span-8 margin_top_2 margin_left_20 font_weight_b font_size_18 text_left">
						               <s:label id="bkcs" name="bkcs" value="图书册数："></s:label>
						               <s:select id="bookcs" name="bookcs" onchange="resultlevelControl(this.value)" list="#{'1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','10':'10'}"></s:select>
									   <s:label id="bkdijice" name="bkdijice" value="第几册："></s:label>
						               <s:select id="bookdijice" name="bookdijice" list="#{'1':'1'}"/>
						               <s:select id="bookdijicehidden" cssClass="none" name="bookdijicehidden" list="#{'1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','10':'10'}"/> 				               
						               <s:label id="bixubkname" name="bixubkname" cssClass="color_red" value="*"></s:label>	
									</div>		               
					         	
<!--图书分类行-->
					      	
						      		<div class=" span-8 margin_top_2 margin_left_20 font_weight_b font_size_18 text_left">
						               <s:label id="bkfl" name="bkfl" value="图书分类："></s:label>
						                <s:select id="bookfl" list="commonbooksort" name="booksytle"  listValue="classname" listKey="classid"  headerKey="-1"  headerValue="" value=""/>
		   				               <s:label id="bixubkfl" name="bixubkfl" cssClass="color_red" value="*"></s:label>	
									</div>		               
					        	
<!--图书作者行-->
					      	
						      		<div class=" span-8 margin_top_2 margin_left_20 font_weight_b font_size_18 text_left">
						               <s:label id="bkzz" name="bkzz" value="作者名称："></s:label>
						               <s:textfield id="bookzuozhe" name="bookzuozhe"  maxlength="40" cssClass="span-3" value="%{bookinfo.bookauthor}"></s:textfield>
						               <s:label id="bksl" name="bksl" value="图书数量："></s:label>
						               <s:textfield id="booknum" name="booknum"    cssClass="span-1" value="1"></s:textfield>
						               <s:label id="bixubkfl" name="bixubkfl" cssClass="color_red" value="*"></s:label>							               
									</div>		               
					         	
<!--出版社行-->
					      	
						      		<div class=" span-8 margin_top_2 margin_left_20 font_weight_b font_size_18 text_left">
						               <s:label id="bkcbs" name="bkcbs" cssClass="margin_left_14" value="出版社："></s:label>
						               <s:textfield id="bookchubanshe" name="bookchubanshe"  maxlength="40" cssClass="span-5" value="%{bookinfo.bookpublisher}"></s:textfield>
									</div>		               
					         	
<!--出版日期-->
									<div class=" span-8 margin_top_2">
							      		<div class=" span-5  margin_left_20 font_weight_b font_size_18 text_left">
							               <s:label id="bkcbs" name="bkcbs" value="出版日期："></s:label>
							               <s:textfield id="bookchubanriqi"  maxlength="8" onblur="dateFormat(this.id,this.value);" onfocus="addEvent(this,'Decimal',8);" name="bookchubanriqi"  cssClass="span-3" value="%{bookinfo.bookpublishdate}"></s:textfield>
							             </div>
										<a class="img_opt margin_top_10 opt_Calendar cur_pointer" onclick="WdatePicker({el:'bookchubanriqi'})"></a>
										<div class=" span-1 margin_left_2   font_weight_b font_size_18 text_left">
										<s:label id="tishi" name="tishi" cssClass="margin_bottom_6" value="(YYYYMMDD)"></s:label>	
										</div>					               
									</div>  

					        	
<!--图书简介行-->
					      	
						      		<div class=" span-8 margin_top_2 margin_left_20 font_weight_b font_size_18  text_left">
						      		    <s:label id="bkjj" name="bkjj" value="图书简介："></s:label>
						                <s:textarea id="bookjianjie" name="bookjianjie" onkeyup="Check(this)"  cssClass="span-6" value="%{bookinfo.booksummary}"></s:textarea>			               
									</div>
<!--图书图片隐藏地址行-->
					      	
						      		<div class="none">
						      		    <s:label id="badd" name="badd" value="图书地址："></s:label>
						                <s:textarea id="bkadd" name="bkadd"  value="%{bookinfo.bookpicadd}"></s:textarea>			               
									</div>		
<!--图书简介是否被截取flg-->
					      	
						      		<div class="none">
						                <s:textarea id="bkplusflg" name="bkplusflg"  value="%{bookinfo.bookoverdays}"></s:textarea>			               
									</div>																	
<!--2个按钮行-->
					      	
						      		<div class=" span-9 margin_top_8">
										<div class="bttn span-4 margin_left_20 font_weight_b font_size_18" onclick="sumitinsertnext();" > 
          									<a><span>录入书籍</span></a> 
          								</div>							      		
										<div class="bttn span-3   font_weight_b font_size_18" onclick="sumitinsert();" > 
          									<a><span>完成 </span></a> 
          								</div>									     
									</div>
									<div class="span-9 margin_top_10 margin_left_20">
	    								<s:label id="a" name="a" theme="simple" value=""/>
	    							</div>
							
											               
					         </div>
					         <div class="span-5" >
					            <img class="icon" alt="" src="<%=basePath %>images/borrow.png">
					         
<!--					         <div class="span-5 margin_gxdtop_100">-->
<!--            					  <s:label id="a"  value=""/>-->
<!--	    					</div>-->
					         <div  class="margin_gxdtop_115" >
					            <!-- 操作状态消息 -->
 								<s:hidden id="operateTipinsert"></s:hidden>
					         </div>	
					         <div id="opTipBox"  class=" margin_top_10" >
					         
					          	<div id="opTipBoxIn"  class="span-gxdwd ydb_font_weight_b ydb_opTip" >
 									
					        	 </div>			
					         </div>	
					         </div>	
			         					         					         					         				         				         					         			         	