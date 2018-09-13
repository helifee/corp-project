<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" href="css/search.css" type="text/css" />
<script type="text/javascript" src="js/citysearch/area_common.js"></script>
<script type="text/javascript" src="js/citysearch/combo.js"></script>
<title>城区搜索</title>
</head>
<body class="yj950-2">
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
  <!--/#header end-->
  <!--/header end-->
  <hr class="separation" />
  <!--contents start-->
  <div id="contents">
    <div id="contents-header">
      <div id="new-title">
        <p><img src="images/new_title_kanto.gif" alt="普通住宅-大连地区" height="22" width="241" /></p>
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
      <!--/#my-list end-->
      <!--/#my-list end-->
      <div id="cat-pass">
        <p><span class="yj-guid">現在位置：</span><a href="index.html">搜海</a> &gt; <a href="prosearch.html?value=1">普通住宅（辽宁）</a> &gt; 城区搜索（大连）</p>
      </div>
      <!--/#cat-pass end-->
    </div>
    <!--/#contents-header end-->
    <div id="contents-body">
      <noscript>
      <p class="alert">&nbsp;</p>
      </noscript>
      <!--main start-->
      <div id="main">
        <div id="pos-tn"></div>
        <s:form action="buildinglistAction"   method="post" theme="simple">
          <fieldset>
            <legend></legend>
            <div id="choose">
              <h3><img src="images/title_area_choose_1.gif" height="30" width="634" alt="title_area_choose_1" /></h3>
              <div class="ch-content">
                <h4><a href=" "><s:property value="cityName"/>市区</a></h4>
                <ul>
<s:if test="nDistricts.size > 0">
<s:iterator value="nDistricts" id="aaa">    
                  <li>
                        <s:checkbox name="shiqu" fieldValue="%{distId}"  theme="ysyshy"></s:checkbox>
                        <s:url	action="buildinglistAction" id="buildinglistUrl">
                        	<s:param name="ljsj" value="%{distId}"></s:param>			
						    <s:param name="distId" value="%{distId}"></s:param>
					    </s:url> 
					    <s:a href="%{buildinglistUrl}"><s:property value="distName"/></s:a>
                      
                  </li>
</s:iterator>
</s:if>                  
                </ul>
                 
                <dl class="end">
                  <dt>
                    </dt>
                  <dd>&nbsp;</dd>
                </dl>
              </div>
              <!--/.ch-content end-->
              <div class="ch-content">
                <h4><a href="buildinglist.html"><s:property value="cityName"/>市区以外</a></h4>
                <ul>
<s:if test="wDistricts.size > 0">
<s:iterator value="wDistricts" id="aaa">                
                  <li>
                    <s:checkbox name="shiwai" fieldValue="%{distId}"  theme="ysyshy"></s:checkbox>
                    <s:url action="buildinglistAction" id="wbuildinglistUrl">
                        	<s:param name="ljsj" value="%{distId}"></s:param>			
						    <s:param name="distId" value="%{distId}"></s:param>
					</s:url> 
					<s:a href="%{wbuildinglistUrl}"><s:property value="distName"/></s:a>
                  </li>
</s:iterator>
</s:if>                  
                </ul>
              </div>
              <!--/.ch-content end-->
              <ul class="search">
                <li> 
                	<s:submit type="image" src="images/btn_search3.gif" label="按照以上条件检索"  > </s:submit>
                </li>
              </ul>
              <dl class="nav">
                <dt>附近城区检索：</dt>
                <dd><a href="buildinglist.html">丹东</a>｜<a href="buildinglist.html">锦州</a>｜<a href="buildinglist.html">营口</a>｜<a href="buildinglist.html">盘锦</a>｜<a href="buildinglist.html">葫芦岛</a></dd>
              </dl>
            </div>
            <!--/#choose end-->
          </fieldset>
        </s:form>
      </div>
      <!--/#main end-->
      <!--/main end-->
      <!--sub start-->
      <div id="sub">
        <hr class="separation"/>
        <!--/#pos-lrec end-->
        <!--/#my end-->
        <div id="ranking">
          <h3>访问排行 - 大连 <img src="images/icn_monday_off.gif" width="86" height="13"  alt="icn_monday_off"/></h3>
          <p class="cap-tex">1周内访问排行</p>
          <h4><img src="images/title_area_rank_1.gif" height="23" width="275" alt="title_area_rank_1" alt="title_area_rank_1"/></h4>
          <ul>
            <li class="bold"><img src="images/icn_rank_1.gif" alt="1位" height="19" width="41"/> <a href="buildinglist.html">西岗区</a>（36）</li>
            <li class="bold"><img src="images/icn_rank_2.gif" alt="2位" height="19" width="41"/> <a href="#"></a><a href="buildinglist.html">中山区</a> （10）</li>
            <li class="bold"><img src="images/icn_rank_3.gif" alt="3位" height="19" width="41"/> <a href="buildinglist.html">甘井子区</a> （15）</li>
            <li><img src="images/icn_rank_4.gif" alt="4位" height="19" width="41"/> <a href="buildinglist.html">沙河口区</a> （23）</li>
            <li class="end"><img src="images/icn_rank_5.gif" alt="5位" height="19" width="41"/> <a href="buildinglist.html">金州区</a>（47）</li>
          </ul>
          <h4><img src="images/title_area_rank_4.gif" height="23" width="275" alt="title_area_rank_4"/></h4>
          <dl>
            <dt><img src="images/cn_rank_1.gif" height="19" width="41" alt="icn_rank_1"/></dt>
            <dd class="summary bold"><a href="buildingdetail2.html">亿达蓝湾</a><br/>
              旅顺南路西段178号<br/>
              均价：8500元</dd>
            <dd class="img"> <a href="buildingdetail2.html"><img src="images/resize_002.jpeg" width="40" height="40" border="0" alt="resize_002"/></a></dd>
          </dl>
          <dl>
            <dt><img src="images/icn_rank_2.gif" width="41" height="19" border="0" alt="icn_rank_2"/></dt>
            <dd class="summary bold"><a href="buildingdetail.html">中拥蓝天下</a><br/>
              大连市旅顺口区模珠街<br/>
              均价：5500元</dd>
            <dd class="img"> <a href="buildingdetail.html"><img src="images/resize_005.jpeg" width="40" height="40" border="0" alt="resize_005"/></a></dd>
          </dl>
          <dl>
            <dt><img src="images/icn_rank_3.gif" height="19" width="41" alt="icn_rank_3"/></dt>
            <dd class="summary bold"><a href="#">远洋风景</a><br/>
              西岗区黄河路北、长江路南、沈阳路西<br/>
              均价：14000元</dd>
            <dd class="img"> <img src="images/resize.jpeg" width="40" height="40" alt="resize"/></dd>
          </dl>
          <dl>
            <dt><img src="images/icn_rank_4.gif" height="19" width="41" alt="icn_rank_4"/></dt>
            <dd class="summary"><a href="#">峰景•西海岸</a><br/>
              金州区国防路与同济路的交汇处<br/>
              均价：5400元</dd>
            <dd class="img"> <img src="images/resize_003.jpeg" width="40" height="40" alt="resize_003"/></dd>
          </dl>
          <dl class="end">
            <dt><img src="images/icn_rank_5.gif"  height="19" width="41" alt="icn_rank_5"/></dt>
            <dd class="summary"><a href="#">星海湾壹号</a><br/>
              沙河口区星海广场<br/>
              均价：20000元</dd>
            <dd class="img"> <img src="images/resize_004.jpeg" width="40" height="40" alt="resize_004"/></dd>
          </dl>
        </div>
        <!--/#ranking end-->
      </div>
      <!--/#sub end-->
      <!--/sub end-->
    </div>
    <!--/#contents-body end-->
    <!--/#contents-footer end-->
  </div>
  <!--/#contents end-->
  <!--/contents end-->
  <hr class="separation"/>
  <!--footer start-->
  <div id="footer">
    <address>
    <br/>
    <a href="http://www.soohai.com/About.asp">关于我们</a> ┊ 广告服务 ┊ <a href="http://www.soohai.com/legal.asp">法律声明</a> ┊ <a href="http://www.soohai.com/touch.asp">联系我们</a> ┊
    招聘信息
    </address>
    <p class="summary STYLE1">全国销售热线：400-600-1510<br/>
      大连地区销售热线：0411-84338333/84339333<br/>
      海景房地产经纪(大连)有限公司 版权所有<br/>
      技术支持：大连远东计算机系统有限公司</p>
    <p> <img src="images/s2592252157546.gif" name="" alt="s2592252157546" border="0" height="1" width="1"/> </p>
    <!-- SiteCatalyst -->
    <!-- SiteCatalyst code version: H.14. Copyright 1997-2008 Omniture, Inc. More info available at http://www.omniture.com -->
    <script language="JavaScript" src="buildinglist_files/s_code_mansion.js" type="text/javascript"></script>
    <img src="images/s85237007326110.gif" name="s_i_yahoocojprealestatemain" alt="s85237007326110" width="1" border="0" height="1"/>
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
