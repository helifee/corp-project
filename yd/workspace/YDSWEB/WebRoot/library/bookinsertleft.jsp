	<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<div class=" span-5 margin_top_40 margin_left_2 font_weight_b font_size_18 text_center">
						<table id="11" class="bookShelf">
								<tr>
									<th colspan="2" class="color_bl">新书书架</th>
								</tr>
								</table>
</div>
					 <div id="bookdiv" class=" span-5  margin_left_2 font_weight_b font_size_18 text_center overflow_insertbksf_y insert_div_height">                    
						<table id="bookShelftable" class="bookShelf" >
								<tr>
									
									<td id="shelftd1" class="leftEmpty"  ondblclick="returndata(this);">
<!--										<img id="aaa" class="margin_left_15"  style="width:45px;height:70px">-->
										<input type="text" id="isbnshelfbk1" name="isbnshelfbk1" class="none" value=""/>
										<input type="text" id="booknameshelfbk1" name="booknameshelfbk1" class="none" value=""/>
										<input type="text" id="bookcsshelfbk1" name="bookcsshelfbk1" class="none" value=""/>
										<input type="text" id="bookdijiceshelfbk1" name="bookdijiceshelfbk1" class="none" value=""/>
										<input type="text" id="bookflshelfbk1" name="bookflshelfbk1" class="none" value=""/>
										<input type="text" id="bookzuozheshelfbk1" name="bookzuozheshelfbk1" class="none" value=""/>
										<input type="text" id="booknumshelfbk1" name="booknumshelfbk1" class="none" value=""/>
										<input type="text" id="bookchubansheshelfbk1" name="bookchubansheshelfbk1" class="none" value=""/>
										<input type="text" id="bookriqishelfbk1" name="bookriqishelfbk1" class="none" value=""/>
										<input type="text" id="bookjianjieshelfbk1" name="bookjianjieshelfbk1" class="none" value=""/>	
										<input type="text" id="bkaddshelfbk1" name="bkaddshelfbk1" class="none" value=""/>																													
									</td>
									
									<td id="shelftd2" class="rightEmpty" ondblclick="returndata(this);">
<!--										<img id="bbb" style="width:45px;height:70px">-->
										<input type="text" id="isbnshelfbk2" name="isbnshelfbk2" class="none" value=""/>
										<input type="text" id="booknameshelfbk2" name="booknameshelfbk2" class="none" value=""/>
										<input type="text" id="bookcsshelfbk2" name="bookcsshelfbk2" class="none" value=""/>
										<input type="text" id="bookdijiceshelfbk2" name="bookdijiceshelfbk2" class="none" value=""/>
										<input type="text" id="bookflshelfbk2" name="bookflshelfbk2" class="none"/>
										<input type="text" id="bookzuozheshelfbk2" name="bookzuozheshelfbk2" class="none" value=""/>
										<input type="text" id="booknumshelfbk2" name="booknumshelfbk2" class="none" value=""/>
										<input type="text" id="bookchubansheshelfbk2" name="bookchubansheshelfbk2" class="none" value=""/>
										<input type="text" id="bookriqishelfbk2" name="bookriqishelfbk2" class="none" value=""/>
										<input type="text" id="bookjianjieshelfbk2" name="bookjianjieshelfbk2" class="none" value=""/>
										<input type="text" id="bkaddshelfbk2" name="bkaddshelfbk2" class="none" value=""/>										
									</td>
								</tr>
								<tr>
									<td id="shelftd3" class="leftEmpty" ondblclick="returndata(this);">
										<input type="text" id="isbnshelfbk3" name="isbnshelfbk3" class="none" value=""/>
										<input type="text" id="booknameshelfbk3" name="booknameshelfbk3" class="none" value=""/>
										<input type="text" id="bookcsshelfbk3" name="bookcsshelfbk3" class="none" value=""/>
										<input type="text" id="bookdijiceshelfbk3" name="bookdijiceshelfbk3" class="none" value=""/>
										<input type="text" id="bookflshelfbk3" name="bookflshelfbk3" class="none" value=""/>
										<input type="text" id="bookzuozheshelfbk3" name="bookzuozheshelfbk3" class="none" value=""/>
										<input type="text" id="booknumshelfbk3" name="booknumshelfbk3" class="none" value=""/>
										<input type="text" id="bookchubansheshelfbk3" name="bookchubansheshelfbk3" class="none" value=""/>
										<input type="text" id="bookriqishelfbk3" name="bookriqishelfbk3" class="none" value=""/>
										<input type="text" id="bookjianjieshelfbk3" name="bookjianjieshelfbk3" class="none" value=""/>
										<input type="text" id="bkaddshelfbk3" name="bkaddshelfbk3" class="none" value=""/>
									</td>
									<td id="shelftd4" class="rightEmpty" ondblclick="returndata(this);">
										<input type="text" id="isbnshelfbk4" name="isbnshelfbk4" class="none" value=""/>
										<input type="text" id="booknameshelfbk4" name="booknameshelfbk4" class="none" value=""/>
										<input type="text" id="bookcsshelfbk4" name="bookcsshelfbk4" class="none" value=""/>
										<input type="text" id="bookdijiceshelfbk4" name="bookdijiceshelfbk4" class="none" value=""/>
										<input type="text" id="bookflshelfbk4" name="bookflshelfbk4" class="none" value=""/>
										<input type="text" id="bookzuozheshelfbk4" name="bookzuozheshelfbk4" class="none" value=""/>
										<input type="text" id="booknumshelfbk4" name="booknumshelfbk4" class="none" value=""/>
										<input type="text" id="bookchubansheshelfbk4" name="bookchubansheshelfbk4" class="none" value=""/>
										<input type="text" id="bookriqishelfbk4" name="bookriqishelfbk4" class="none" value=""/>
										<input type="text" id="bookjianjieshelfbk4" name="bookjianjieshelfbk4" class="none" value=""/>
										<input type="text" id="bkaddshelfbk4" name="bkaddshelfbk4" class="none" value=""/>
									</td>
								</tr>
								<tr>
									<td id="shelftd5" class="leftEmpty" ondblclick="returndata(this);">
										<input type="text" id="isbnshelfbk5" name="isbnshelfbk5" class="none" value=""/>
										<input type="text" id="booknameshelfbk5" name="booknameshelfbk5" class="none" value=""/>
										<input type="text" id="bookcsshelfbk5" name="bookcsshelfbk5" class="none" value=""/>
										<input type="text" id="bookdijiceshelfbk5" name="bookdijiceshelfbk5" class="none" value=""/>
										<input type="text" id="bookflshelfbk5" name="bookflshelfbk5" class="none" value=""/>
										<input type="text" id="bookzuozheshelfbk5" name="bookzuozheshelfbk5" class="none" value=""/>
										<input type="text" id="booknumshelfbk5" name="booknumshelfbk5" class="none" value=""/>
										<input type="text" id="bookchubansheshelfbk5" name="bookchubansheshelfbk5" class="none" value=""/>
										<input type="text" id="bookriqishelfbk5" name="bookriqishelfbk5" class="none" value=""/>
										<input type="text" id="bookjianjieshelfbk5" name="bookjianjieshelfbk5" class="none" value="" />
										<input type="text" id="bkaddshelfbk5" name="bkaddshelfbk5" class="none" value=""/>
									</td>
									<td id="shelftd6" class="rightEmpty" ondblclick="returndata(this);">
										<input type="text" id="isbnshelfbk6" name="isbnshelfbk6" class="none" value=""/>
										<input type="text" id="booknameshelfbk6" name="booknameshelfbk6" class="none" value=""/>
										<input type="text" id="bookcsshelfbk6" name="bookcsshelfbk6" class="none" value=""/>
										<input type="text" id="bookdijiceshelfbk6" name="bookdijiceshelfbk6" class="none" value=""/>
										<input type="text" id="bookflshelfbk6" name="bookflshelfbk6" class="none" value=""/>
										<input type="text" id="bookzuozheshelfbk6" name="bookzuozheshelfbk6" class="none" value=""/>
										<input type="text" id="booknumshelfbk6" name="booknumshelfbk6" class="none" value=""/>
										<input type="text" id="bookchubansheshelfbk6" name="bookchubansheshelfbk6" class="none" value=""/>
										<input type="text" id="bookriqishelfbk6" name="bookriqishelfbk6" class="none" value=""/>
										<input type="text" id="bookjianjieshelfbk6" name="bookjianjieshelfbk6" class="none" value=""/>
										<input type="text" id="bkaddshelfbk6" name="bkaddshelfbk6" class="none" value=""/>
									</td>
								</tr>
								<tr>
									<td id="shelftd7" class="leftEmpty" ondblclick="returndata(this);">
										<input type="text" id="isbnshelfbk7" name="isbnshelfbk7" class="none" value=""/>
										<input type="text" id="booknameshelfbk7" name="booknameshelfbk7" class="none" value=""/>
										<input type="text" id="bookcsshelfbk7" name="bookcsshelfbk7" class="none" value=""/>
										<input type="text" id="bookdijiceshelfbk7" name="bookdijiceshelfbk7" class="none" value=""/>
										<input type="text" id="bookflshelfbk7" name="bookflshelfbk7" class="none" value=""/>
										<input type="text" id="bookzuozheshelfbk7" name="bookzuozheshelfbk7" class="none" value=""/>
										<input type="text" id="booknumshelfbk7" name="booknumshelfbk7" class="none" value=""/>
										<input type="text" id="bookchubansheshelfbk7" name="bookchubansheshelfbk7" class="none" value=""/>
										<input type="text" id="bookriqishelfbk7" name="bookriqishelfbk7" class="none" value=""/>
										<input type="text" id="bookjianjieshelfbk7" name="bookjianjieshelfbk7" class="none" value=""/>
										<input type="text" id="bkaddshelfbk7" name="bkaddshelfbk7" class="none" value=""/>
									</td>
									<td  id="shelftd8" class="rightEmpty" ondblclick="returndata(this);">
										<input type="text" id="isbnshelfbk8" name="isbnshelfbk8" class="none" value=""/>
										<input type="text" id="booknameshelfbk8" name="booknameshelfbk8" class="none" value=""/>
										<input type="text" id="bookcsshelfbk8" name="bookcsshelfbk8" class="none" value=""/>
										<input type="text" id="bookdijiceshelfbk8" name="bookdijiceshelfbk8" class="none" value=""/>
										<input type="text" id="bookflshelfbk8" name="bookflshelfbk8" class="none" value=""/>
										<input type="text" id="bookzuozheshelfbk8" name="bookzuozheshelfbk8" class="none" value=""/>
										<input type="text" id="booknumshelfbk8" name="booknumshelfbk8" class="none" value=""/>
										<input type="text" id="bookchubansheshelfbk8" name="bookchubansheshelfbk8" class="none" value=""/>
										<input type="text" id="bookriqishelfbk8" name="bookriqishelfbk8" class="none" value=""/>
										<input type="text" id="bookjianjieshelfbk8" name="bookjianjieshelfbk8" class="none" value=""/>
										<input type="text" id="bkaddshelfbk8" name="bkaddshelfbk8" class="none" value=""/>
									</td>
								</tr>
								<tr>
									<td id="shelftd9" class="leftEmpty" ondblclick="returndata(this);">
										<input type="text" id="isbnshelfbk9" name="isbnshelfbk9" class="none" value=""/>
										<input type="text" id="booknameshelfbk9" name="booknameshelfbk9" class="none" value=""/>
										<input type="text" id="bookcsshelfbk9" name="bookcsshelfbk9" class="none" value=""/>
										<input type="text" id="bookdijiceshelfbk9" name="bookdijiceshelfbk9" class="none" value=""/>
										<input type="text" id="bookflshelfbk9" name="bookflshelfbk9" class="none" value=""/>
										<input type="text" id="bookzuozheshelfbk9" name="bookzuozheshelfbk9" class="none" value=""/>
										<input type="text" id="booknumshelfbk9" name="booknumshelfbk9" class="none" value=""/>
										<input type="text" id="bookchubansheshelfbk9" name="bookchubansheshelfbk9" class="none" value=""/>
										<input type="text" id="bookriqishelfbk9" name="bookriqishelfbk9" class="none" value=""/>
										<input type="text" id="bookjianjieshelfbk9" name="bookjianjieshelfbk9" class="none" value=""/>
										<input type="text" id="bkaddshelfbk9" name="bkaddshelfbk9" class="none" value=""/>
									</td>
									<td id="shelftd10" class="rightEmpty" ondblclick="returndata(this);">
										<input type="text" id="isbnshelfbk10" name="isbnshelfbk10" class="none" value=""/>
										<input type="text" id="booknameshelfbk10" name="booknameshelfbk10" class="none" value=""/>
										<input type="text" id="bookcsshelfbk10" name="bookcsshelfbk10" class="none" value=""/>
										<input type="text" id="bookdijiceshelfbk10" name="bookdijiceshelfbk10" class="none" value=""/>
										<input type="text" id="bookflshelfbk10" name="bookflshelfbk10" class="none" value=""/>
										<input type="text" id="bookzuozheshelfbk10" name="bookzuozheshelfbk10" class="none" value=""/>
										<input type="text" id="booknumshelfbk10" name="booknumshelfbk1" class="none" value=""/>
										<input type="text" id="bookchubansheshelfbk10" name="bookchubansheshelfbk10" class="none" value=""/>
										<input type="text" id="bookriqishelfbk10" name="bookriqishelfbk10" class="none" value=""/>
										<input type="text" id="bookjianjieshelfbk10" name="bookjianjieshelfbk10" class="none" value=""/>
										<input type="text" id="bkaddshelfbk10" name="bkaddshelfbk10" class="none"/>
									</td>
								</tr>																
						</table>
					</div>
