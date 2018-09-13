<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../common/common.jsp" %>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>企业信息查询</title>

    <link href="${www_url}/static/css/base.initial.css" rel="stylesheet">
    <link href="${www_url}/static/css/base.common.css" rel="stylesheet">
    <link href="${www_url}/static/css/enterprise-infomation.css" rel="stylesheet">
    <link href="${www_url}/static/css/datepicker3.css" rel="stylesheet">

</head>
<body>


	<div class="site-main clearfix ">
        <div class="site-main-inner clearfix">
            <div class="site-main-filter clearfix">
                <div class="hd">
                    <h1>企业信息</h1>
                </div>
                <div class="md clearfix">
                        <ul class="clearfix">
                            <li>
								<div class="site-main-filter-box  project-xlg" >
                                    <label>企业编号</label>
                                    <input class="text" type="text" name="queryEid">
                                </div>
                                <div class="site-main-filter-box  project-xlg" >
                                    <label>企业名称</label>
                                    <input class="text" type="text" name="queryEname">
                                </div>
                                <div class="site-main-filter-box  project-primary">
                                    <label>审核状态</label>
                                    <select name="select" class="select" >
                                        <option selected="selected">全部</option>
                                        <c:forEach var="audSt" items="${auditStatus }" >
	                                        <option value="${audSt.value }">${audSt.name }</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div class="site-main-filter-box  project-small" id="event_period">
                                    <label>入网时间</label>
                                    <input class="text" type="text" id="joinStartDate">
                                    <span class="interval">至</span>
                                    <input class="text" type="text"  id="joinEndDate">
                                </div>
                                <div class="site-main-filter-box  project-small" id="event_period">
                                    <label>到期时间</label>
                                    <input class="text" type="text" id="eDueStartDate">
                                    <span class="interval">至</span>
                                    <input class="text" type="text" id="eDueEndDate">
                                </div>
                                <div class="site-main-filter-box  project-primary">
                                    <label>企业状态</label>
                                    <select name="select" class="select">
                                        <option selected="selected">全部</option>
                                        <c:forEach items="${enterpriseStatus }" var="enterSt">
	                                        <option value="${enterSt.value }">${enterSt.name } </option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </li>
                        </ul>
                </div>
                <div class="bd">
                    <a id="querySumbit" href="#" class="btn btn-primary btn-xs mr10 w60">查询</a>
                    <a href="#" class="btn btn-default btn-xs w60">导出</a>
                </div>
                
            </div>
            <div class="btn-group-block clearfix">
                <ul>
                    <li class="add-to"><a href="#" data-toggle="modal" data-target="#business-management-model-add"><i></i>增加</a></li>
                    <li class="export"><a href="#"><i></i>导出</a></li>
                </ul>
            </div>
            <div class="site-main-list-block clearfix">
                <div class="main">
                    <table class="table table-bordered clearfix" width="100%">
                          <thead>
                            <tr>
                              <th scope="col">企业编号</th>
                              <th scope="col">企业名称</th>
                              <th scope="col">企业状态</th>
                              <th scope="col">审核状态</th>
                              <th scope="col">入网时间</th>
                              <th scope="col">到期时间</th>
                              <th scope="col">操作</th>
                            </tr>
                          </thead>
                          <tbody id="showDatas">
 							<!-- 列表数据 渲染  -->
 
                          </tbody>
                    </table>
                </div>
                <div class="pager clearfix ">
                        <ul class="pagination">
                            <li class="previous"><a href="#"><i></i></a></li>
                            <li class="active"><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li class="next"><a href="#"><i></i></a></li>
                         </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade business-management-model" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="business-management-model-add">
      <div class="modal-dialog modal-lg">
        <div class="modal-content business-managementlogin-form-area">
                <div class="modal-header">
                  <ul class="business-management-tab-head clearfix">
                      <li class="active"><p>基本信息</p><i></i></li>
                      <li><p>经营信息</p><i></i></li>
                      <li><p>联系人信息</p><i></i></li>
                      <li><p>产品选择</p></li>

                  </ul>
                </div>
                <form id="saveForm">
                <div class="modal-body business-management-tab-content">

                        <div class="basic-information">
                            <ul class="clearfix">
                                <li class="clearfix">
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>企业名称</label>
                                        <input class="text" type="text" name="esEnterpriseInfoChktemp.EName">
                                        <em class="error">名称错误</em>
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>企业简称</label>
                                        <input class="text" type="text" name="esEnterpriseInfoChktemp.EShortname">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>组织机构代码证号</label>
                                        <input class="text" type="text" name="esEnterpriseInfoChktemp.orgInstdId">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>开户许可证核准号 </label>
                                        <input class="text" type="text" name="esEnterpriseInfoChktemp.arrpId">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>ICP证编号 </label>
                                        <input class="text" type="text" name="esEnterpriseInfoChktemp.icpId">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>企业类型</label>
                                        <select name="select" class="select">
                                            <option selected="selected">请选择</option>
                                         	<c:forEach var="opeType" items="${operateTypeEnum}">
                                        		<option value="${opeType.value}">${opeType.name}</option>
                                        	</c:forEach>
                                        </select>
                                    </div>   
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>内/外部企业</label>
                                        <select name="ECategory" class="select">
                                        	<c:forEach items="${eCategory }" var="eCate">
	                                            <option value="${eCate.value }">${eCate.name }</option>
                                        	</c:forEach>
                                        </select>
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>营业执照注册号</label>
                                        <input class="text" type="text" name="ELicenseId">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>税务登记证号</label>
                                        <input class="text" type="text" name="taxId">
                                    </div>
                                    <div class="site-main-filter-box  project-small" id="event_period">
                                        <label><i>*</i>企业到期时间</label>
                                        <input class="text" type="text">
                                        <span class="interval">至</span>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>税务登记证号</label>
                                        <textarea class="textarea" rows="2"></textarea>
                                    </div>
                                </li>
                            </ul>
                            <div class="line-dashed-l"></div>
                            <ul class="clearfix">
                                <li class="clearfix">
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>法人代表名</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>法定代表人证件类型</label>
                                        <select name="select" class="select">
                                            <option>请选择</option>
                                            <option>类型一</option>
                                            <option>类型二</option>
                                        </select>
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>法定代表人证件号码</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-small" id="event_period">
                                        <label><i>*</i>营业期限</label>
                                        <input class="text" type="text">
                                        <span class="interval">至</span>
                                        <input class="text" type="text">
                                    </div>
   
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>注册资本</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-small" id="event_period">
                                        <label><i>*</i>成立日期</label>
                                        <input class="text" type="text" name="esEnterpriseInfoChktemp.corpEstDateTemp">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>住所</label>
                                        <input class="text" type="text">
                                    </div>
                                </li>
                            </ul>
                            <div class="line-dashed-xl"></div>
                            
                        </div>

                        <div class="run-information">
                                <ul class="clearfix">
                                    <li class="clearfix">
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>企业名称</label>
                                            <input class="text" type="text">
                                            <em class="error">名称错误</em>
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>具体地址</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>营业地段</label>
                                            <select name="select" class="select">
                                                <option selected="selected">请选择</option>
                                                <c:forEach items="${bizCommodity }" var="bizCom">
	                                                <option value="${bizCom.value }">${bizCom.name }</option>
                                                </c:forEach>
                                            </select>
                                        </div> 
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>行业大类</label>
                                            <select name="select" class="select">
                                                <option>请选择</option>
                                                <option>类型一</option>
                                                <option>类型二</option>
                                            </select>
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>行业细分</label>
                                            <select name="select" class="select">
                                                <option>请选择</option>
                                                <option>类型一</option>
                                                <option>类型二</option>
                                            </select>
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>网站地址</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>企业电话</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>信用级别</label>
                                            <select name="select" class="select">
                                                <option selected="selected">请选择</option>
                                                <c:forEach items="${creditLevel }" var="creLev">
	                                                <option value="${creLev.value }">${creLev.name }</option>
                                                </c:forEach>
                                            </select>
                                        </div>   
                                    </li>
                                    <li>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>节假日营业</label>
                                            <select name="select" class="select">
                                            	<c:forEach items="${holidayBiz }" var="holiday">
	                                                <option value="${holiday.value }">${holiday.name }</option>
                                            	</c:forEach>
                                            </select>
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>员工人数</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>企业行业描述</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>经营范围（主业）</label>
                                            <textarea class="textarea" rows="2"></textarea>
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>经营范围（副业）</label>
                                            <textarea class="textarea" rows="2"></textarea>
                                        </div>
                                    </li>
                                </ul>
                                <div class="line-dashed-xl"></div>
                        </div>
                        <div class="contacts-information clearfix">
                            <div class="btn-group-block clearfix">
                                <ul>
                                    <li class="add-to"><a href="#"><i></i>增加</a></li>
                                </ul>
                            </div>
                            <ul class="clearfix">
                                <div class="title">联系人（1） <div class="delete"><a href="#"><i></i>删除</a></div></div>
                                <li>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>类型</label>
                                       <select name="select" class="select">
                                           <option selected="selected">请选择</option>
                                           <c:forEach items="${contactorType }" var="contact">
	                                           <option value="${contact.value }">${contact.name }</option>
                                           </c:forEach>
                                       </select>
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>姓名</label>
                                       <input class="text" type="text" name="esContactInfoChktemps[0].contactorNm">
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>邮箱</label>
                                       <input class="text" type="text" name="esContactInfoChktemps[0].contactorMail">
                                   </div>  
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>手机</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>座机</label>
                                        <input class="text" type="text">
                                    </div>  
                                    <div class="site-main-filter-box  project-lg">
                                        <label>传真</label>
                                        <input class="text" type="text">
                                    </div>    
                                </li>
                            </ul>
                            <ul class="clearfix">
                                <div class="title">联系人（2 ） <div class="delete"><a href="#"><i></i>删除</a></div></div>
                                <li>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>类型</label>
                                       <select name="select" class="select">
                                           <option selected="selected">请选择</option>
                                           <c:forEach items="${contactorType }" var="contact">
	                                           <option value="${contact.value }">${contact.name }</option>
                                           </c:forEach>
                                       </select>
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>姓名</label>
                                       <input class="text" type="text">
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>邮箱</label>
                                       <input class="text" type="text">
                                   </div>  
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>手机</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>座机</label>
                                        <input class="text" type="text">
                                    </div>  
                                    <div class="site-main-filter-box  project-lg">
                                        <label>传真</label>
                                        <input class="text" type="text">
                                    </div>    
                                </li>
                            </ul>  
                        </div>
                        <div class="product-selection">
                            <div class="hd"><i>*</i>产品选择设置</div>
                            <ul class="clearfix">
                                <li><input type="checkbox" class="checkbox" name="esEproductInfoChktemps[0].productTp" value="1">企业付款</li>
                                <li><input type="checkbox" class="checkbox" name="esEproductInfoChktemps[1].productTp" value="2">代发工资</li>
                                <li><input type="checkbox" class="checkbox" name="esEproductInfoChktemps[2].productTp" value="3">企业报销</li>
                                <li><input type="checkbox" class="checkbox" name="esEproductInfoChktemps[3].productTp" value="4">资金划拨</li>
                            </ul>
                            <div class="line-dashed-xxl"></div>
                        </div>
                </div>
                </form>
                <div class="modal-footer">
                    <button onclick="javascript:save()" type="button" class="btn btn-primary btn-xs mr10 w80">保存</button>
                    <button type="button" class="btn btn-primary btn-xs mr10 w80">提交审核</button>
                    <button type="button" class="btn btn-default btn-xs mr10 w80" data-dismiss="modal">关闭</button>
                </div>
              </div>
      </div>
    </div> 
    <div class="modal fade business-management-model" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="business-management-model-modify">
      <div class="modal-dialog modal-lg">
        <div class="modal-content business-managementlogin-form-area">
                <div class="modal-header">
                  <ul class="business-management-tab-head clearfix">
                      <li class="active"><p>基本信息</p><i></i></li>
                      <li><p>经营信息</p><i></i></li>
                      <li><p>联系人信息</p><i></i></li>
                      <li><p>产品选择</p></li>

                  </ul>
                </div>
                <form>
                <div class="modal-body business-management-tab-content">

                        <div class="basic-information">
                            <ul class="clearfix">
                                <li class="clearfix">
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>企业名称</label>
                                        <input class="text" type="text">
                                        <em class="error">名称错误</em>
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>企业简称</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>组织机构代码证号</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>开户许可证核准号 </label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>ICP证编号 </label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>企业类型</label>
                                        <select name="select" class="select">
                                            <option>请选择</option>
                                            <option>类型一</option>
                                            <option>类型二</option>
                                        </select>
                                    </div>   
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>内/外部企业</label>
                                        <select name="select" class="select">
                                            <option>内部</option>
                                            <option>外部</option>
                                        </select>
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>营业执照注册号</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>税务登记证号</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-small" id="event_period">
                                        <label><i>*</i>企业到期时间</label>
                                        <input class="text" type="text">
                                        <span class="interval">至</span>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>税务登记证号</label>
                                        <textarea class="textarea" rows="2"></textarea>
                                    </div>
                                </li>
                            </ul>
                            <div class="line-dashed-l"></div>
                            <ul class="clearfix">
                                <li class="clearfix">
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>法人代表名</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>法定代表人证件类型</label>
                                        <select name="select" class="select">
                                            <option>请选择</option>
                                            <option>类型一</option>
                                            <option>类型二</option>
                                        </select>
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>法定代表人证件号码</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-small" id="event_period">
                                        <label><i>*</i>营业期限</label>
                                        <input class="text" type="text">
                                        <span class="interval">至</span>
                                        <input class="text" type="text">
                                    </div>
   
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>注册资本</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-small" id="event_period">
                                        <label><i>*</i>成立日期</label>
                                        <input class="text" type="text">
                                        <span class="interval">至</span>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>住所</label>
                                        <input class="text" type="text">
                                    </div>
                                </li>
                            </ul>
                            <div class="line-dashed-xl"></div>
                            
                        </div>

                        <div class="run-information">
                                <ul class="clearfix">
                                    <li class="clearfix">
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>企业名称</label>
                                            <input class="text" type="text">
                                            <em class="error">名称错误</em>
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>具体地址</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>营业地段</label>
                                            <select name="select" class="select">
                                                <option>请选择</option>
                                                <option>类型一</option>
                                                <option>类型二</option>
                                            </select>
                                        </div> 
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>行业大类</label>
                                            <select name="select" class="select">
                                                <option>请选择</option>
                                                <option>类型一</option>
                                                <option>类型二</option>
                                            </select>
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>行业细分</label>
                                            <select name="select" class="select">
                                                <option>请选择</option>
                                                <option>类型一</option>
                                                <option>类型二</option>
                                            </select>
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>网站地址</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>企业电话</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>信用级别</label>
                                            <select name="select" class="select">
                                                <option>请选择</option>
                                                <option>类型一</option>
                                                <option>类型二</option>
                                            </select>
                                        </div>   
                                    </li>
                                    <li>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>节假日营业</label>
                                            <select name="select" class="select">
                                                <option>营业一</option>
                                                <option营业二</option>
                                            </select>
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>员工人数</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>企业行业描述</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>经营范围（主业）</label>
                                            <textarea class="textarea" rows="2"></textarea>
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>经营范围（副业）</label>
                                            <textarea class="textarea" rows="2"></textarea>
                                        </div>
                                    </li>
                                </ul>
                                <div class="line-dashed-xl"></div>
                        </div>
                        <div class="contacts-information clearfix">
                            <div class="btn-group-block clearfix">
                                <ul>
                                    <li class="add-to"><a href="#"><i></i>增加</a></li>
                                </ul>
                            </div>
                            <ul class="clearfix">
                                <div class="title">联系人（1） <div class="delete"><a href="#"><i></i>删除</a></div></div>
                                <li>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>类型</label>
                                       <select name="select" class="select">
                                           <option>请选择</option>
                                           <option>类型一</option>
                                           <option>类型二</option>
                                       </select>
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>姓名</label>
                                       <input class="text" type="text">
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>邮箱</label>
                                       <input class="text" type="text">
                                   </div>  
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>手机</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>座机</label>
                                        <input class="text" type="text">
                                    </div>  
                                    <div class="site-main-filter-box  project-lg">
                                        <label>传真</label>
                                        <input class="text" type="text">
                                    </div>    
                                </li>
                            </ul>
                            <ul class="clearfix">
                                <div class="title">联系人（2 ） <div class="delete"><a href="#"><i></i>删除</a></div></div>
                                <li>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>类型</label>
                                       <select name="select" class="select">
                                           <option>请选择</option>
                                           <option>类型一</option>
                                           <option>类型二</option>
                                       </select>
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>姓名</label>
                                       <input class="text" type="text">
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>邮箱</label>
                                       <input class="text" type="text">
                                   </div>  
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>手机</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>座机</label>
                                        <input class="text" type="text">
                                    </div>  
                                    <div class="site-main-filter-box  project-lg">
                                        <label>传真</label>
                                        <input class="text" type="text">
                                    </div>    
                                </li>
                            </ul>  
                        </div>
                        <div class="product-selection">
                            <div class="hd"><i>*</i>产品选择设置</div>
                            <ul class="clearfix">
                                <li><input type="checkbox" class="checkbox">企业付款</li>
                                <li><input type="checkbox" class="checkbox">代发工资</li>
                                <li><input type="checkbox" class="checkbox">企业报销</li>
                                <li><input type="checkbox" class="checkbox">资金划拨</li>
                            </ul>
                            <div class="line-dashed-xxl"></div>
                        </div>
                </div>
                </form>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-xs mr10 w80">保存</button>
                    <button type="button" class="btn btn-primary btn-xs mr10 w80">提交审核</button>
                    <button type="button" class="btn btn-default btn-xs mr10 w80" data-dismiss="modal">关闭</button>
                </div>
              </div>
      </div>
    </div>
    <div class="modal fade business-management-model" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="business-management-model-detail">
      <div class="modal-dialog modal-lg">
        <div class="modal-content business-managementlogin-form-area">
                <div class="modal-header">
                  <ul class="business-management-tab-head clearfix">
                      <li class="active"><p>基本信息</p><i></i></li>
                      <li><p>经营信息</p><i></i></li>
                      <li><p>联系人信息</p><i></i></li>
                      <li><p>产品选择</p></li>
                  </ul>
                </div>
                <form>
                <div class="modal-body business-management-tab-content">

                        <div class="basic-information">
                            <ul class="clearfix">
                                <li class="clearfix">
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>企业名称</label>
                                        <input class="text" type="text">
                                        <em class="error">名称错误</em>
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>企业简称</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>组织机构代码证号</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>开户许可证核准号 </label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>ICP证编号 </label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>企业类型</label>
                                        <input class="text" type="text">
                                    </div>   
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>内/外部企业</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>营业执照注册号</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>税务登记证号</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-small" id="event_period">
                                        <label><i>*</i>企业到期时间</label>
                                        <input class="text" type="text">
                                        <span class="interval">至</span>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>税务登记证号</label>
                                        <textarea class="textarea" rows="2"></textarea>
                                    </div>
                                </li>
                            </ul>
                            <div class="line-dashed-l"></div>
                            <ul class="clearfix">
                                <li class="clearfix">
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>法人代表名</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>法定代表人证件类型</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>法定代表人证件号码</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-small" id="event_period">
                                        <label><i>*</i>营业期限</label>
                                        <input class="text" type="text">
                                        <span class="interval">至</span>
                                        <input class="text" type="text">
                                    </div>
   
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>注册资本</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-small" id="event_period">
                                        <label><i>*</i>成立日期</label>
                                        <input class="text" type="text">
                                        <span class="interval">至</span>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>住所</label>
                                        <input class="text" type="text">
                                    </div>
                                </li>
                            </ul>
                            <div class="line-dashed-xl"></div>
                            
                        </div>

                        <div class="run-information">
                                <ul class="clearfix">
                                    <li class="clearfix">
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>企业名称</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>具体地址</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>营业地段</label>
                                            <input class="text" type="text">
                                        </div> 
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>行业大类</label>
                                            <select name="select" class="select">
                                                <option>请选择</option>
                                                <option>类型一</option>
                                                <option>类型二</option>
                                            </select>
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>行业细分</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>网站地址</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>企业电话</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>信用级别</label>
                                            <input class="text" type="text">
                                        </div>   
                                    </li>
                                    <li>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>节假日营业</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>员工人数</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>企业行业描述</label>
                                            <input class="text" type="text">
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label><i>*</i>经营范围（主业）</label>
                                            <textarea class="textarea" rows="2"></textarea>
                                        </div>
                                        <div class="site-main-filter-box  project-lg">
                                            <label>经营范围（副业）</label>
                                            <textarea class="textarea" rows="2"></textarea>
                                        </div>
                                    </li>
                                </ul>
                                <div class="line-dashed-xl"></div>
                        </div>
                        <div class="contacts-information clearfix">
                            <div class="btn-group-block clearfix">
                                <ul>
                                    <li class="add-to"><a href="#"><i></i>增加</a></li>
                                </ul>
                            </div>
                            <ul class="clearfix">
                                <div class="title">联系人（1） </div>
                                <li>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>类型</label>
                                       <select name="select" class="select">
                                           <option>请选择</option>
                                           <option>类型一</option>
                                           <option>类型二</option>
                                       </select>
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>姓名</label>
                                       <input class="text" type="text">
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>邮箱</label>
                                       <input class="text" type="text">
                                   </div>  
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>手机</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>座机</label>
                                        <input class="text" type="text">
                                    </div>  
                                    <div class="site-main-filter-box  project-lg">
                                        <label>传真</label>
                                        <input class="text" type="text">
                                    </div>    
                                </li>
                            </ul>
                            <ul class="clearfix">
                                <div class="title">联系人（2 ） </div>
                                <li>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>类型</label>
                                       <select name="select" class="select">
                                           <option>请选择</option>
                                           <option>类型一</option>
                                           <option>类型二</option>
                                       </select>
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>姓名</label>
                                       <input class="text" type="text">
                                   </div>
                                   <div class="site-main-filter-box  project-lg">
                                       <label><i>*</i>邮箱</label>
                                       <input class="text" type="text">
                                   </div>  
                                </li>
                                <li>
                                    <div class="site-main-filter-box  project-lg">
                                        <label><i>*</i>手机</label>
                                        <input class="text" type="text">
                                    </div>
                                    <div class="site-main-filter-box  project-lg">
                                        <label>座机</label>
                                        <input class="text" type="text">
                                    </div>  
                                    <div class="site-main-filter-box  project-lg">
                                        <label>传真</label>
                                        <input class="text" type="text">
                                    </div>    
                                </li>
                            </ul>  
                        </div>
                        <div class="product-selection">
                            <div class="hd"><i>*</i>产品选择设置</div>
                            <ul class="clearfix">
                                <li><input type="checkbox" class="checkbox">企业付款</li>
                                <li><input type="checkbox" class="checkbox">代发工资</li>
                                <li><input type="checkbox" class="checkbox">企业报销</li>
                                <li><input type="checkbox" class="checkbox">资金划拨</li>
                            </ul>
                            <div class="line-dashed-xxl"></div>
                        </div>
                </div>
                </form>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-xs mr10 w80">保存</button>
                    <button type="button" class="btn btn-primary btn-xs mr10 w80">提交审核</button>
                    <button type="button" class="btn btn-default btn-xs mr10 w80" data-dismiss="modal">关闭</button>
                </div>
              </div>
      </div>
    </div>

<script src="${www_url}/static/javascript/jquery-1.11.2.min.js"></script>
<script src="${www_url}/static/javascript/common.js"></script>
<script src="${www_url}/static/javascript/Management-Tab.js"></script>
<script src="${www_url}/static/javascript/datepicker.js"></script>
<script src="${www_url}/static/javascript/datepicker.zh-CN.min.js"></script>
<script type="text/javascript">
(function(){
    $('#event_period input').datepicker({
        language: "zh-CN"
    });
    
    // 初始列表数据
    $.ajax({
		url:"${www_url}/enterpriseInfoManage/queryManageDatas",
		type:"POST",
		data:{},
		async:false,
		success:function(data){
			// 列表渲染数据
			render(data.datas);
			
			// 分页 渲染  id="pageDatas"
			/* 
			var totalPages = data.totalPages;						// 总页数
			var currentPageNO = data.currentPageNO;					// 当前页码
			var firstResult  = (currentPageNO-1) * PAGE_SIZE;		// 从第几条记录开始查询
			var pageStr = "<ul class='pagination'>"
						 + "<li class='previous'><a href='#'><i></i></a></li>";
			for(var i=0; i=1; i++){
				
			} 
			*/
			
			
		}
	});
    

})();

// 条件查询
$("#querySumbit").click(function(){
	//ajax提交数据 
    $.ajax({
    	url:"${www_url}/enterpriseInfoManage/queryManageDatas",
		type:"POST",
		async:false,
		data:{
			eId:$("input[name='queryEid']").val(),					// 企业编号
			eName:$("input[name='queryEname']").val(),				// 企业名称
			eStatus:"",												// 企业状态
			chkStatus:"",											// 审核状态
			joinStartDate:$("#joinStartDate").val(),				// 入网开始日期	格式 yyyy-MM-dd
			joinEndDate:$("#joinEndDate").val(),					// 入网结束日期	格式 yyyy-MM-dd
			eDueStartDate:$("#eDueStartDate").val(),				// 到期开始日期	格式 yyyy-MM-dd
			eDueEndDate:$("#eDueEndDate").val()						// 到期结束日期	格式 yyyy-MM-dd
		},
		success:function(data){
			// 列表渲染数据
			render(data.datas);
		}
	});
	
	
});


// 列表渲染 
function render(datas){
	if(datas.length > 0){
		var result = "";
		$.each(datas,function(index,json){
			var joinDate = "";
			if(json.joinDate !=null && json.joinDate !=""){
				var date = new Date(json.joinDate);
				joinDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate());
			}
			var edueDate = "";
			if(json.edueDate !=null && json.edueDate !=""){
				var date = new Date(json.edueDate);
				edueDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate());
			}
			// tr奇数行/偶数行 样式渲染
			var firstTr = "<tr class='color-odd'>";
			if(index % 2 ==0){
				firstTr = "<tr>";
			}
			result +=  firstTr  
				 + "<td>"+ json.eid +"</td>"
				 + "<td>"+ json.ename+"</td>"
				 + "<td>"+ json.estatus+"</td>"
				 + "<td>"+ json.chkStatus+"</td>"
				 + "<td>"+ joinDate+"</td>"
				 + "<td>"+ edueDate+"</td>"
				 
				 + "<td>"
                 + "    <div class='btn-group'>"
                 + "       <button type='button' class='btn btn-primary btn-xs dropdown-toggle'  data-hover='dropdown'>"
                 + "         详情 <span class='caret'></span>"
                 + "       </button>"
                 + "          <ul class='table-dropdown-menu'> "
                 + "             <li><a "
                 + "                    href='javascript:void(0)' "
                 + "                    onclick='javascript:esEnterpriseInfo("+ json.eid + ",1)' " 
                 + "                    data-toggle='modal' "
                 + "                    data-target='#business-management-model-detail'>详情</a> "
                 + "             </li> "
                 + "             <li><a "
                 + "                    href='javascript:void(0)' "
                 + "                    onclick='javascript:esEnterpriseInfo("+ json.eid + ",2)' " 
                 + "                    data-toggle='modal' "
                 + "                    data-target='#business-management-model-modify'>修改</a> "
                 + "             </li> "
                 + "         </ul>"
                 + "    </div>"
                 + "</td>"
				 
				 + "</tr>";
			$("#showDatas").html(result);
        });
		
	}else{
		$("#showDatas").html("<tr><td colspan='7'>没有符合条件的数据！</td></tr>");
	}
}

// 保存/提交审核
function save(){
	
	$("#saveForm").attr("action","${www_url}/enterpriseInfoManage/save");
	$("#saveForm").attr("method","POST");
	$("#saveForm").submit();
	/* $("#saveFor").submit(function(){
		
	}); */
	
}


// 审核时加载数据
function esEnterpriseInfo(eid,status){
  $.ajax({
		url:"${www_url}/enterpriseInfoManage/getEsEnterpriseInfoByEid",
		//type:"POST",
		async:false,
		data:{
			eid:eid						// 企业编号
		},
		success:function(data){
			// 详情
			if(status == 1){
				$('#business-management-model-detail').on('show.bs.modal', function (e) {
					alert("详情查看");
				});
			}
			// 修改
			if(status == 2){
				$('#business-management-model-modify').on('show.bs.modal', function (e) {
					alert("修改信息");
				});
			}

		}
	}); 
	   
}

</script>

<script src="${www_url}/static/javascript/table-hover-dropdown.js"></script>
</body>
</html>
