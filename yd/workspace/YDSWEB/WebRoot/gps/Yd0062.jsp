<%--
 * @(#)Yd0063.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
--%>
<%--
 * 修改订单画面
 * 
 * @author pengchuan
 * @version 1.00 2010/11/08
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="div_plus_order"  class="span-8 show_grid container">
	<s:form id="orderModifyForm" action="" method="post" namespace="/gps" validate="true">
			<div class="span-10 margin_top_8">
						<div class="span-2 text_right ">
							<s:label value="订单标题" />
						</div>
						<div class="span-6 last">
						     <s:textfield id="orderTitle" name="gpsOrderInfo.orderContent" maxlength="20" cssClass="span-5"/>
					    </div>
		     </div>
		     <div class="span-8">
		                <div class="span-2 text_right">
							<s:label value="备注" />
						</div>
						<div class="span-6 last">
						     <s:textarea name="gpsOrderInfo.orderRemarks" cssClass="span-5"/>
					    </div>
            </div>
            <div class="span-8 text_center margin_top_8">
                  <input type="button"  value="保存"	class="btn span-2" onclick="saveModifyOrder()"/>
            </div>
	</s:form>
</div>