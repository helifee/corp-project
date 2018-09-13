
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<meta http-equiv="Content-Style-Type" content="text/css"/>
<meta http-equiv="Content-Script-Type" content="text/javascript"/>
<title>楼盘一览</title>
<link rel="stylesheet" href="css/list.css" type="text/css" />
<script type="text/javascript" src="js/list/list_common.js"></script>
<script type="text/javascript" src="js/list/page_scroll.js"></script>
</head>
<body class="yjr950-2">
<!--wrapper start-->
<div id="wrapper">
  <!--header start-->
  <div id="header">
    <div id="masthead">
      <div class="yjmth">
        <div class="yjmthproplogoarea"><img src="images/realestate.jpg" alt="搜海网" name="ygmhlog" width="146" height="69" border="0" id="ygmhlog" /></div>
        <div class="yjmthloginarea"></div>
      </div>
    </div>
   
    <div id="emg">
 
    </div>
  </div>
  
    <hr class="separation"/>
    <!--contents start-->
    <div id="contents">
      <div id="contents-header">
        <div id="new-title">
          <p>
            <img src="images/new_title_kinki.gif" alt="辽宁地区普通住宅" width="241" height="22"/>
          </p>
          <ul>
            <li>
              <a href="buildinglist.html" target="_top"></a>
            </li>
          </ul>
        </div>
        <!--/#new-title end-->
        <div id="my-list">
          <dl>
            <dt>我的欲购房产：</dt>
            <dd>
              <ul>
                <li><a href="#">房屋一览</a></li>
                <li><a href="#">房屋比较表</a></li>
              </ul>
            </dd>
          </dl>
        </div>
        <div id="cat-pass">
          <p>
            <span class="yj-guid">現在位置：</span>
            <a href="index.html">搜海</a> &gt; 
            <a href="prosearch.html?value=1">普通住宅(辽宁) </a>
            &gt; 楼盘一览
          </p>
        </div>
        <!--/#cat-pass end-->
      </div>
      <!--/#contents-header end-->
      <div id="contents-body">
        <span class="yj-guid">
          <a name="contents-start" id="contents-start"></a>
          <img src="images/clear.gif"  width="1" height="1" alt="mmmm"/>
        </span>
        <div id="lead">
          <h2>
            <img src="images/title_list_1_cl.gif" width="69" height="17"/>
          </h2>
        </div>
        <!--/#lead end-->
        <!--main start-->
        <div id="main">
          <div id="number">
            <dl>
              <dt>当前符合条件的楼盘</dt>
              <dd>
                <span class="all">1～5</span>
                件、共
                <span class="view"><s:property value="count" /></span>件符合检索条件。
              </dd>
            </dl>
          </div>
          <!--/#number end-->
          <form name="slist" action="" target="sho">
            <input name="chkdoc" value="" type="hidden"/>
            <input name="lc" value="03" type="hidden"/>
            <input name="selchk" value="" type="hidden"/>
            <noscript>
              <div id="sort">
                <dl>
                  <dt>排序方法：</dt>
                  <dd>
                    <ul>
                    </ul>
                  </dd>
                </dl>
              </div>
            <!--/.sort end-->
            </noscript>
              <div id="sort">
                <dl>
                  <dd>
                    <select id="sort_top" name="sort" onchange="changeSort(this, 'buildinglist.html?lc=03&amp;p_from=0&amp;p_to=0&amp;p_und_flg=1&amp;ma_from=0&amp;ma_to=0&amp;min_st=0&amp;mip=0&amp;ln=2199&amp;tid=04&amp;sort=')">
                      <option value="0"  selected="selected">默认方法</option>
                      <option value="price">价格从低到高</option>
                      <option value="-price">价格从高到底</option>
                    </select>
                  </dd>
                </dl>
                <ul class="btn-tog">
                  <li>排序方法：</li>
                </ul>
              </div>
              <!--/.sort end-->
              <div id="list">
                <table summary="" border="0" cellspacing="0">
                  <caption>物件一覧</caption>
                  <tbody>
                    <tr>
                      <th width="24" class="col-0" scope="row">&nbsp;</th>
                      <th width="127" class="col-1" scope="row">楼盘图片</th>
                      <th width="138" class="col-2" scope="row">位置</th>
                      <th width="94" class="col-3" scope="row">交通</th>
                      <th width="60" class="col-4" scope="row">第几期</th>
                      <th width="87" class="col-5" scope="row">价格</th>
                      <th width="87" class="col-6" scope="row">户型<br/>面积</th>
                      <th width="80" class="col-7" scope="row">已售套数<br/>总套数</th>
                    </tr>
                    <!--row start-->                  
<s:if test="buildinglistResults.size > 0">
  <s:iterator value="buildinglistResults" id="aaa">
                   
                   
                   
                    <tr>
                      <td rowspan="4" class="check">&nbsp;</td>
                      <td rowspan="4" class="img">
                        <p>
					    <s:a href="/build_%{buildId}.html"><img src='images/<s:property value ="imagePath" />'  width="118" height="118" border="0" alt="zyltx"/>
					    </s:a>
                        </p>
                        
                      </td>
                      <td colspan="6" class="summary-1">
                        <h3>

					    <s:a href="/build_%{buildId}.html"><s:property value="buildName" /></s:a>

                        </h3>
                        <p><s:property value="detailIntroduction" />
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td rowspan="2"><s:property value="address" /></td>
                      <td rowspan="2"><p>6路；大连-旅顺公交车；轻轨4号线202路。</p></td>
                      <td>第1期</td>
                      <td><p>起价:<s:property value="staringPrice" />元</p><p>均价:<s:property value="evenPrice" />元</p></td>
                      <td><p>两室两厅一卫,三室两厅两卫46-192平方米。</p></td>
                      <td>未定<br/>3000套</td>
                    </tr>
                    <tr></tr>
                    <tr>
                      <td colspan="6" class="summary-2">
                        <p>
                          <a href="floorplandetail.html" onclick="windowOpen(this);return false;" target="sho">户型</a>
                          &nbsp;|&nbsp;
                          <a href="enviroument.html" onclick="windowOpen(this);return false;" target="sho">周边配套</a>
                          &nbsp;|&nbsp;
                          <a href="map1.html" onclick="windowOpen(this);return false;" target="sho">地图</a>
                        </p>
                        <dl>
                          <dt>特殊条件</dt>
                          <dd>
                            <ul>
                              <li class="cd-12"></li>
                            </ul>
                          </dd>
                          <dd>
                            <ul>
                              <li class="cd-1"><img src="images/showPOIcon4.gif"  width="45" height="25"  alt="showPOIcon4.gif"/></li>
                              <li class="cd-2"><img src="images/showPOIcon2.gif"  width="45" height="25"  alt="showPOIcon2.gif"/></li>
                              <li class="cd-3"><img src="images/showPOIcon(2).gif"  width="45" height="25"  alt="showPOIcon(2).gif"/></li>
                              <li class="cd-4"><img src="images/showPOIcon(3).gif"  width="45" height="25" alt="showPOIcon(3).gif" /></li>
                              <li class="cd-5"><img src="images/showPOIcon(4).gif" width="45" height="25"  alt="showPOIcon(4).gif"/></li>
                              <li class="cd-6"><img src="images/showPOIcon1.gif" width="45" height="25"  alt="showPOIcon1.gif"/></li>
                              <li class="cd-7"><img src="images/showPOIcon8.gif"  width="45" height="25"  alt="showPOIcon8.gif"/></li>
                              <li class="cd-8"><img src="images/showPOIcon7.gif"  width="45" height="25"  alt="showPOIcon7.gif"/></li>
                              <li class="cd-9"><img src="images/showPOIcon(8).gif" width="45" height="25"  alt="showPOIcon(8).gif"/></li>
                              <li class="cd-10"><img src="images/showPOIcon11.gif"  width="45" height="25"  alt="showPOIcon11.gif"/></li>
                              <li class="cd-11"><img src="images/showPOIcon(10).gif"  width="45" height="25"  alt="showPOIcon(10).gif"/>
                              </li>
                              <li class="cd-12"><img src="images/showPOIcon3.gif"  width="45" height="25"  alt="showPOIcon3.gif"/></li>
                            </ul>
                          </dd>
                          <dd>
                            <ul>
                            </ul>
                          </dd>
                        </dl></td>
                    </tr>
                    <!--/row end-->
                   
  </s:iterator>
</s:if>              
                   
                   
                   
                  </tbody>
                </table>
              </div>
              <!--/#list end-->
              <div id="sort">
                <dl>
                  <dd>
                    <select id="sort_bottom" name="sort" onchange="changeSort(this, 'buildinglist.html')">
                      <option value="">默认顺序</option>
                      <option value="price">价格从低到高</option>
                      <option value="-price">价格从高到低</option>
                    </select>
                  </dd>
                </dl>
                <ul class="btn-tog">
                  <li>排序方法：</li>
                </ul>
              </div>
              <!--/.sort end-->
            </form>
          <div id="number">
            <dl>
              <dt>符合条件的楼盘</dt>
              <dd><span class="all">1～5</span>件、共<span class="view"><s:property value="count" /></span>件符合检索条件。</dd>
            </dl>
       	  </div>
        	<!--/#number end-->
      	</div>
      	<!--/#main end-->
      	<!--/main end-->
      	<!--sub start-->
      	<div id="sub">
        	<hr class="separation"/>
        	<form id="serchModuleForm" action="">
          	<h3>
            	<img src="images/title_list_specify_1.gif"  width="98" height="18" alt="title_list_specify_1.gif"/>
            </h3>
          	<fieldset>
            	<!--/#select end-->
           	  <div id="condition1">
              	<h4> 
                	<span id="condition1-close">
                 	  <a href="javascript:sidebar_close('condition1');" title="基本条件">
                    	<img src="images/btn_colum_close.gif" width="14" height="14" alt="btn_colum_close.gif"/>基本条件
                    </a>
                  </span>
                  <span style="display: none;" id="condition1-open">
                    <a href="javascript:sidebar_open('condition1');" title="基本条件">
                      <img src="images/btn_colum_open.gif"  width="14" height="14" alt="btn_colum_open.gif"/>基本条件
                    </a>
                  </span>
               	  <noscript>
                	基本条件
                	</noscript>
                </h4>
                <div id="condition1-wrap">
                  <dl class="price">
                    <dt>价格</dt>
                    <dd>
                      <p>
                        <select name="p_from" id="p_from">
                          <option value="0"  selected="selected">无下限</option>
                          <option value="100000">10万以上</option>
                          <option value="300000">30万以上</option>
                          <option value="500000">50万以上</option>
                          <option value="700000">70万以上</option>
                          <option value="900000">90万以上</option>
                          <option value="1000000">100元以上</option>
                          <option value="1500000">150万以上</option>
                          <option value="2000000">200万以上</option>
                        </select>
                        ～
                        <select name="p_to" id="p_to">
                          <option value="100000">10万以下</option>
                          <option value="200000">20万以下</option>
                          <option value="400000">40万以下</option>
                          <option value="600000">60万以下</option>
                          <option value="800000">80万以下</option>
                          <option value="1000000">100万以下</option>
                          <option value="1500000">150万以下</option>
                          <option value="2000000">200万以下</option>
                          <option value="0"  selected="selected">无上限</option>
                        </select>
                    	</p>
                      <ul>
                        <li>
                          <input name="p_und_flg" value="1" id="p_und_flg_1" checked="checked" type="checkbox"/>
                          <label for="p_und_flg_1">包含未定价的楼盘</label>
                        </li>
                      </ul>
                    </dd>
                  </dl>
                  <dl class="layout">
                    <dt>包含户型</dt>
                    <dd>
                      <ul>
                        <li>
                          <input name="rl" value="1 2" id="rl_1 2" type="checkbox"/>
                          <label for="rl_1 2">一室（<span id="cnt_rl_1 2">0</span>）</label>
                        </li>
                        <li>
                          <input name="rl" value="3" id="rl_3" type="checkbox"/>
                          <label for="rl_3">两室（<span id="cnt_rl_3">3</span>）</label>
                        </li>
                        <li>
                          <input name="rl" value="4" id="rl_4" type="checkbox"/>
                          <label for="rl_4">三室（<span id="cnt_rl_4">5</span>）</label>
                        </li>
                        <li>
                          <input name="rl" value="5 6" id="rl_5 6" type="checkbox"/>
                          <label for="rl_5 6">四室及别墅（<span id="cnt_rl_5 6">2</span>）</label>
                        </li>
                      </ul>
                    </dd>
                  </dl>
                  <dl class="space">
                    <dt>房屋面积</dt>
                    <dd >
                      <select name="ma_from" id="ma_from">
                        <option value="0"  selected="selected">无下限</option>
                        <option id="ma_from_40" value="40">40m2以上</option>
                        <option id="ma_from_50" value="50">50m2以上</option>
                        <option id="ma_from_60" value="60">60m2以上</option>
                        <option id="ma_from_70" value="70">70m2以上</option>
                        <option id="ma_from_80" value="80">80m2以上</option>
                        <option id="ma_from_90" value="90">90m2以上</option>
                        <option id="ma_from_100" value="100">100m2以上</option>
                        <option id="ma_from_120" value="120">120m2以上</option>
                        <option id="ma_from_150" value="150">150m2以上</option>
                      </select>
                      ～
                      <select name="ma_to" id="ma_to">
                        <option value="40" id="ma_to_40">40m2以下</option>
                        <option id="ma_to_50" value="50">50m2以下</option>
                        <option id="ma_to_60" value="60">60m2以下</option>
                        <option id="ma_to_70" value="70">70m2以下</option>
                        <option id="ma_to_80" value="80">80m2以下</option>
                        <option id="ma_to_90" value="90">90m2以下</option>
                        <option id="ma_to_100" value="100">100m2以下</option>
                        <option id="ma_to_120" value="120">120m2以下</option>
                        <option id="ma_to_150" value="150">150m2以下</option>
                        <option value="0"  selected="selected">无上限</option>
                      </select>
                    </dd>
                  </dl>
                  <dl class="walk">
                    <dt>距离最近的海边</dt>
                    <dd>
                      <ul>
                        <li>
                          <input name="min_st" value="5" id="min_st_5" type="radio"/>
                          开门见海
                          <label for="min_st_5">（<span id="cnt_min_st_5">5</span>）</label>
                        </li>
                        <li>
                          <input name="min_st" value="10" id="min_st_10" type="radio"/>
                          <label for="min_st_10">100米以内（<span id="cnt_min_st_10">5</span>）</label>
                        </li>
                        <li>
                          <input name="min_st" value="15" id="min_st_15" type="radio"/>
                          <label for="min_st_15">500米以内（<span id="cnt_min_st_15">5</span>）</label>
                        </li>
                        <li>
                          <input name="min_st" value="0" id="min_st_0" checked="checked" type="radio"/>
                          <label for="min_st_0">未指定（<span id="cnt_min_st_0">5</span>）</label>
                        </li>
                      </ul>
                    </dd>
                  </dl>
                  <dl class="time">
                    <dt>入住时间</dt>
                    <dd>
                      <ul>
                        <li>
                          <input name="mip" value="1" id="mip_1" type="radio"/>
                          <label for="mip_1">即刻入住（<span id="cnt_mip_1">3</span>）</label>
                        </li>
                        <li>
                          <input name="mip" value="3" id="mip_3" type="radio"/>
                          <label for="mip_3">3个月以内（<span id="cnt_mip_3">3</span>）</label>
                        </li>
                        <li>
                          <input name="mip" value="6" id="mip_6" type="radio"/>
                          <label for="mip_6">半年以内（<span id="cnt_mip_6">4</span>）</label>
                        </li>
                        <li>
                          <input name="mip" value="0" id="mip_0" checked="checked" type="radio"/>
                          <label for="mip_0">未指定（<span id="cnt_mip_0">5</span>）</label>
                        </li>
                      </ul>
                    </dd>
                  </dl>
                </div>
                <!--/#condition1-wrap end-->
              </div>
            <!--/#condition1 end-->
            <div id="condition2">
              <h4>
                <span id="condition2-close">
                  <a href="javascript:sidebar_close('condition2');" title="">
                    <img src="images/btn_colum_close.gif"  width="14" height="14" alt="btn_colum_close.gif"/>
                    详细条件
                  </a>
                </span>
                <span style="display: none;" id="condition2-open">
                  <a href="javascript:sidebar_open('condition2');" title="详细条件">
                    <img src="images/btn_colum_open.gif"  width="14" height="14"  alt="btn_colum_open.gif"/>详细条件
                  </a>
                </span>
              </h4>
                <div id="condition2-wrap">
                  <dl class="status">
                    <dt>楼盘的特点</dt>
                    <dd>
                      <ul>
                        <li>
                          <input name="po" value="41028" id="po_41028" type="checkbox"/>
                          <label for="po_41028">可观海（<span id="cnt_po_41028">0</span>）</label>
                        </li>
                        <li>
                          <input name="po" value="41006" id="po_41006" type="checkbox"/>
                          <label for="po_41006">别墅洋房（<span id="cnt_po_41006">5</span>）</label>
                        </li>
                        <li>
                          <input name="po" value="41007" id="po_41007" type="checkbox"/>
                          <label for="po_41007">现房（<span id="cnt_po_41007">5</span>）</label>
                        </li>
                        <li>
                          <input name="po" value="41008" id="po_41008" type="checkbox"/>
                          <label for="po_41008">社区规模大（<span id="cnt_po_41008">3</span>）</label>
                        </li>
                        <li>
                          <input name="po" value="41009" id="po_41009" type="checkbox"/>
                          <label for="po_41009">低容积率（<span id="cnt_po_41009">4</span>）</label>
                        </li>
                        <li>
                          <input name="po" value="41010" id="po_41010" type="checkbox"/>
                          <label for="po_41010">全封闭（<span id="cnt_po_41010">2</span>）</label>
                        </li>
                        <li>
                          <input name="po" value="03003" id="po_03003" type="checkbox"/>
                          <label for="po_03003">环境幽静（<span id="cnt_po_03003">5</span>）</label>
                        </li>
                        <li>
                          <input name="po" value="03002" id="po_03002" type="checkbox"/>
                          <label for="po_03002">海水浴场（<span id="cnt_po_03002">3</span>）</label>
                        </li>
                        <li>
                          <input name="po" value="13009" id="po_13009" type="checkbox"/>
                          <label for="po_13009">园林式设计（<span id="cnt_po_13009">2</span>）</label>
                        </li>
                        <li>
                          <input name="po" value="41019" id="po_41019" type="checkbox"/>
                          <label for="po_41019">车库（<span id="cnt_po_41019">2</span>）</label>
                        </li>
                        <li>
                          <input name="po" value="13005" id="po_13005" type="checkbox"/>
                          <label for="po_13005">学区（<span id="cnt_po_13005">0</span>）</label>
                        </li>
                        <li>
                          <input name="po" value="13003" id="po_13003" type="checkbox"/>
                          <label for="po_13003">南北朝向（<span id="cnt_po_13003">3</span>）</label>
                        </li>
                      </ul>
                    </dd>
                  </dl>
                </div>
                <!--/#condition2-wrap end-->
              </div>
              <!--/#condition2 end-->
              <div id="keep">
                <ul class="add">
                  <li><img src="images/btn_add_choose.gif"  width="164" height="28" alt="btn_add_choose.gif"/></li>
                </ul>
                <div id="ch-act-side" style="display: none;">
                  <dl>
                    <dt>请输入要保存得当前检索条件的名称。</dt>
                    <dd>
                      <input name="" maxlength="42" class="text" id="srchnm_box_side" type="text"/>
                      <input name="" id="Dummy" style="display: none;" type="text"/>
                      <input name="" value="保存" class="submit" id="btn_search_module_my_add_search" onclick="return false;" type="button"/>
                      <input name="" value="取消" class="cancel" onclick="" type="button"/>
                    </dd>
                  </dl>
                </div>
                <!--/#ch-act-side end-->
                <noscript>
                <ul id="focus">
                  <li>
                    <input name="" type="submit" value="提交"/>
                  </li>
                </ul>
                </noscript>
              </div>
              <!--/#keep end-->
            </fieldset>
              <input name="lc" value="03" type="hidden"/>
              <input name="tid" value="04" type="hidden"/>
              <input name="t_name" value="タワーマンション" type="hidden"/>
              <noscript>
                <input type="hidden" name="p_from_b" value="0"/>
                <input type="hidden" name="p_to_b" value="0"/>
                <input type="hidden" name="ma_from_b" value="0"/>
                <input type="hidden" name="ma_to_b" value="0"/>
              </noscript>
            </form>
            <div id="hist">
              <h3>最近关注过的楼盘</h3>
              <dl>
                <dt><a href="buildingdetail.html" onclick="windowOpen(this);return false;" target="sho">中拥蓝天下</a></dt>
                <dd> 大连市旅顺口区模珠街</dd>
                <dt><a href="buildingdetail2.html" onclick="windowOpen(this);return false;" target="sho">蓝湾</a></dt>
                <dd> 旅顺南路西段178号</dd>
              </dl>
            </div>
            <!--/#hist end-->
            <form method="post" action="" target="_blank"></form>
            <!--/#sell-link end-->
          </div>
          <!--/#sub end-->
          <!--/sub end-->
          <hr class="separation"/>
          <div id="pos-sqb">
          <!-- code sqb -->
          <!-- SpaceID=2078684784 loc=SQB noad -->
          <noscript>
            <div id="fdlx">
              <img width="1" height="1" alt="222" src=""/>
            </div>
       	 </noscript>
         <!-- /code sqb -->
       </div>
       <!--#pos-sqb end-->
     </div>
     <!--/#contents-body end-->
     <div id="contents-footer"> 
      <span class="yj-guid">
        <img src="images/clear.gif"  width="1" height="1" alt="clear.gif"/>
      </span> 
      <span class="yj-skip"> 
        <a href="#pagetop">
          <img src="images/clear.gif"  width="1" height="1" alt="clear.gif"/>
        </a>
      </span>
     </div>
     <!--/#contents-footer end-->
   </div>
   <!--/#contents end-->
   <!--/contents end-->
   <hr class="separation"/>
   <!--footer start-->
   <div id="footer">
     <address>
       <br/>
       <span class="STYLE1">
         <a href="http://www.soohai.com/About.asp">关于我们</a> ┊ 广告服务 ┊ 
         <a href="http://www.soohai.com/legal.asp">法律声明</a> ┊ 
         <a href="http://www.soohai.com/touch.asp">联系我们</a> ┊ 招聘信息
       </span>
     </address>
     <p class="footer STYLE1">
        全国销售热线：400-600-1510<br/>
        大连地区销售热线：0411-84338333/84339333<br/>
        海景房地产经纪(大连)有限公司 版权所有<br/>
        技术支持：大连远东计算机系统有限公司
     </p>
     <p> <img src="images/s2592252157546.gif" name="" alt="" border="0" height="1" width="1"/> </p>
     <!-- SiteCatalyst -->
     <!-- SiteCatalyst code version: H.14. Copyright 1997-2008 Omniture, Inc. More info available at http://www.omniture.com -->
<script language="JavaScript" src="js/s_code_mansion.js" type="text/javascript"></script>
     <img src="images/s85237007326110.gif" name="s_i_yahoocojprealestatemain" alt="" width="1" border="0" height="1"/>
     <!-- End SiteCatalyst code version: H.14. -->
     <!-- /SiteCatalyst -->
  </div>
   <!--/#footer end-->
   <!--/footer end-->
</div>
<!--/#wrapper end-->
<!--/wrapper end-->
</body>
</html>
