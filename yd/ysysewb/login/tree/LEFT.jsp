<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page language="java" import="java.util.*,java.text.SimpleDateFormat"%>
<jsp:useBean id="SYSPARA" scope="page" class="com.ysys.db.RowSet" />
<jsp:useBean id="PROJSCHD" scope="page" class="com.ysys.db.RowSet" />
<html>
<HEAD>
<link href="styles.css" rel="stylesheet">
<SCRIPT language=javascript src="menu.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript">
<%
      if((request.getParameter("LVL_ID") != null) && !request.getParameter("LVL_ID").equals("")){
            String lvl_id = request.getParameter("LVL_ID");
            if(lvl_id.equals("9")){  //"000000"用户
%>
	folder10=new URLEntry("系统维护",  0,"open_folder","","../../xtwh/TDPTINFO.jsp","folder10","0","","");
	folder1009 = new
		URLEntry("数据字典","--","open_folder","","../../xtwh/TDPTINFO.jsp","folder1009","0","","");
      	folder10.addURLEntry(folder1009);

		leaf100901=new URLEntry("部门字典","--","app","","../../xtwh/TDPTINFO.jsp","leaf100901","1","","");
			folder1009.addURLEntry(leaf100901);

		leaf100903=new URLEntry("职务字典","--","app","","../../xtwh/TJOBINFO.jsp","leaf100903","1","","");
			folder1009.addURLEntry(leaf100903);

		leaf100904=new URLEntry("级别信息","--","app","","../../xtwh/TLVLINFO.jsp","leaf100904","1","","");
			folder1009.addURLEntry(leaf100904);

		leaf100905=new URLEntry("职称字典","--","app","","../../xtwh/TTOTINFO.jsp","leaf100905","1","","");
			folder1009.addURLEntry(leaf100905);

		leaf100906=new URLEntry("欠勤类型","--","app","","../../xtwh/TLVEINFO.jsp","leaf100906","1","","");
			folder1009.addURLEntry(leaf100906);

		leaf100908=new URLEntry("讨论群组","--","app","","../../xtwh/TJVGMGRS.jsp","leaf100908","1","","");
			folder1009.addURLEntry(leaf100908);

		leaf100909=new URLEntry("讨论主题","--","app","","../../xtwh/TJVMMGRS.jsp","leaf100909","1","","");
			folder1009.addURLEntry(leaf100909);

                leaf100910=new URLEntry("设备类型","--","app","","../../xtwh/EQUV_TYPE.jsp","leaf100910","1","","");
                        folder1009.addURLEntry(leaf100910);
                leaf100914=new URLEntry("其他设备","--","app","","../../xtwh/OTHER_TYPE.jsp","leaf100914","1","","");
                        folder1009.addURLEntry(leaf100914);
                leaf100911=new URLEntry("班型字典","--","app","","../../xtwh/WORKTYPE.jsp","leaf100911","1","","");
                        folder1009.addURLEntry(leaf100911);
                leaf100912=new URLEntry("系参字典","--","app","","../../xtwh/YSYSTYPE.jsp","leaf100912","1","","");
                        folder1009.addURLEntry(leaf100912);
<!-- 2009-3-16 追加开始-->                        
  				      leaf100916=new URLEntry("会议室字典","--","app","","../../xtwh/CONFERENCE_TYPE.jsp","leaf100916","1","","");
                        folder1009.addURLEntry(leaf100916);         
<!-- 2009-3-16 追加结束-->    
                leaf100913=new URLEntry("大开发室南侧(一部)","--","app","","../../mail/dept1.jsp","leaf100913","1","","");
                        folder1009.addURLEntry(leaf100913);
                leaf100914=new URLEntry("大开发室北侧(二部)","--","app","","../../mail/dept2.jsp","leaf100914","1","","");
                        folder1009.addURLEntry(leaf100914);
                leaf100915=new URLEntry("北开发室(三部)","--","app","","../../mail/dept3.jsp","leaf100915","1","","");
                        folder1009.addURLEntry(leaf100915);

<%--
                leaf100921=new URLEntry("会议申请（测试）","--","app","","../../tvcf/test/TV_INSERT.jsp","leaf100921","1","","");
                        folder1009.addURLEntry(leaf100921);
                leaf100922=new URLEntry("会议详细（测试）","--","app","","../../tvcf/test/TV_VIEW.jsp","leaf100922","1","","");
                        folder1009.addURLEntry(leaf100922);
                leaf100923=new URLEntry("会议更新（测试）","--","app","","../../tvcf/test/TV_UPDATE.jsp","leaf100923","1","","");
                        folder1009.addURLEntry(leaf100923);

                leaf100916=new URLEntry("出差列表（测试）","--","app","","../../tvcf/test/CC_LIST.jsp","leaf100916","1","","");
                        folder1009.addURLEntry(leaf100916);
                leaf100917=new URLEntry("出差登录（测试）","--","app","","../../tvcf/test/CC_INSERT.jsp","leaf100917","1","","");
                        folder1009.addURLEntry(leaf100917);
                leaf100918=new URLEntry("出差详细（测试）","--","app","","../../tvcf/test/CC_VIEW.jsp","leaf100918","1","","");
                        folder1009.addURLEntry(leaf100918);
                leaf100919=new URLEntry("出差更新（测试）","--","app","","../../tvcf/test/CC_UPDATE.jsp","leaf100919","1","","");
                        folder1009.addURLEntry(leaf100919);
                leaf100937=new URLEntry("来访登录（测试）","--","app","","../../tvcf/test/LF_INSERT.jsp","leaf100937","1","","");
                        folder1009.addURLEntry(leaf100937);
                leaf100938=new URLEntry("来访详细（测试）","--","app","","../../tvcf/test/LF_VIEW.jsp","leaf100938","1","","");
                        folder1009.addURLEntry(leaf100938);
                leaf100939=new URLEntry("来访更新（测试）","--","app","","../../tvcf/test/LF_UPDATE.jsp","leaf100939","1","","");
                        folder1009.addURLEntry(leaf100939);
                leaf100950=new URLEntry("（测试）","--","app","","../../tvcf/test/TV_INSERTtest.jsp","leaf100950","1","","");
                        folder1009.addURLEntry(leaf100950);
--%>
<%
            }//"000000"用户结束。
            else{//
%>
      folder10=new URLEntry("内部信息网",0,"open_folder","","../../mail/NOTE.jsp","folder10","0","","");

      folder1009 = new URLEntry("公告信息","--","open_folder","","../../mail/NOTE.jsp","folder1009","0","","");
            folder10.addURLEntry(folder1009);

            leaf100901=new URLEntry("公告信息","--","app","","../../mail/NOTE.jsp","leaf100901","1","","");
                  folder1009.addURLEntry(leaf100901);
<%
                  if(lvl_id.equals("1") || lvl_id.equals("2")){
%>
            leaf100902=new URLEntry("公告发布","--","app","","../../mail/GGFB.jsp","leaf100902","1","","");
                  folder1009.addURLEntry(leaf100902);

            leaf100903=new URLEntry("新闻发布","--","app","","../../mail/XWFB.jsp","leaf100903","1","","");
                  folder1009.addURLEntry(leaf100903);
<%
                  }
%>
            leaf100904=new URLEntry("简报发布","--","app","","../../mail/JBFB.jsp","leaf100904","1","","");
                  folder1009.addURLEntry(leaf100904);
      folder1008 = new URLEntry("项目管理","--","open_folder","","../../mail//PROJ.jsp","folder1008","0","","");
            folder10.addURLEntry(folder1008);
<%
                  if(lvl_id.equals("2") || lvl_id.equals("3") || lvl_id.equals("4")){
%>
            leaf100802=new URLEntry("项目登记","--","app","","../../mail/PROJINSERT.jsp","leaf100802","1","","");
                  folder1008.addURLEntry(leaf100802);

            leaf100808=new URLEntry("项目调度","--","app","","../../mail/PROJ_DDFRAME.jsp","leaf100808","1","","");
                  folder1008.addURLEntry(leaf100808);

<%           }
    if(lvl_id.equals("1") || lvl_id.equals("2") || lvl_id.equals("3") || lvl_id.equals("4")){

%>
  <!--add 2002-8-15-->
         leaf100809=new URLEntry("质量管理要求","--","app","","../../mail/PROJ_DOC_ZLPLANXX.jsp?ID=PLAN0001","leaf100809","1","","");
        folder1008.addURLEntry(leaf100809);
     leaf100807=new URLEntry("配置管理要求","--","app","","../../mail/PROJ_DOC_PZPLANXX.jsp?ID=PLAN0002","leaf100807","1","","");
       folder1008.addURLEntry(leaf100807);
 <!--add 2002-8-15-->
<%}          if(lvl_id.equals("1") || lvl_id.equals("2") || lvl_id.equals("3") || lvl_id.equals("4")){
%>
            leaf100804=new URLEntry("质管表样","--","app","","../../mail/PROJISOF.jsp","leaf100804","1","","");
                  folder1008.addURLEntry(leaf100804);
<%
                  }
%>
<%
                  if(lvl_id.equals("1") || lvl_id.equals("2") || lvl_id.equals("3")){
%>
            leaf100805=new URLEntry("人员调度","--","app","","../../mail/TEMPINFO_DDVIEW.jsp","leaf100805","1","","");
                  folder1008.addURLEntry(leaf100805);
<%
                  }
%>
<%
                  if(lvl_id.equals("2") || lvl_id.equals("3") || lvl_id.equals("4")){
%>
            leaf100810 = new URLEntry("加班申请","--","app","","../../mail/PRJJB_APPLY.jsp","leaf100810","1","","");
                  folder1008.addURLEntry(leaf100810);
<%
                  }
%>
           leaf100811 = new URLEntry("加班一览","--","app","","../../mail/PRJJB_JBLIST.jsp","leaf100811","1","","");
                  folder1008.addURLEntry(leaf100811);
<%
                 if(lvl_id.equals("1") || lvl_id.equals("2") || lvl_id.equals("3") || lvl_id.equals("6")){
%>
           leaf100812 = new URLEntry("N-加班统计","--","app","","../../temp/WORK_TIME.jsp","leaf100812","1","","");
                  folder1008.addURLEntry(leaf100812);
           leaf100813 = new URLEntry("W-加班统计","--","app","","../../temp/RESTWORK_TIME.jsp","leaf100813","1","","");
                  folder1008.addURLEntry(leaf100813);
<%}
                 if(lvl_id.equals("1") || lvl_id.equals("2") || lvl_id.equals("3") || lvl_id.equals("6")){

%>
<%--
           leaf100814 = new URLEntry("车费统计","--","app","","../../mail/TAXIFEE.jsp","leaf100814","1","","");
                  folder1008.addURLEntry(leaf100814);
--%>

                leaf100815=new URLEntry("加班员工清单","--","app","","../../mail/TAXI.jsp","leaf100815","1","","");
                        folder1008.addURLEntry(leaf100815);
<%
                 }
//功能添加，2004-11-09 出差-来访管理
                  if(lvl_id.equals("1") || lvl_id.equals("2") || lvl_id.equals("3") || lvl_id.equals("6")){
%>

                leaf100830=new URLEntry("出差-来访列表","--","app","","../../tvcf/CC_LIST.jsp","leaf100830","1","","");
                        folder1008.addURLEntry(leaf100830);
<%
	              }else{
%>
                leaf100831=new URLEntry("出差列表","--","app","","../../tvcf/CC_LIST.jsp","leaf100831","1","","");
                        folder1008.addURLEntry(leaf100831);

<%
	             }
//功能添加，2004-11-09 会议管理
//                  if(lvl_id.equals("1") || lvl_id.equals("2") || lvl_id.equals("3") || lvl_id.equals("4") || lvl_id.equals("6")){
%>
<%--                leaf100832=new URLEntry("会议列表","--","app","","../../tvcf/TV_LIST.jsp","leaf100832","1","","");
                        folder1008.addURLEntry(leaf100832);
--%>
<%
//}
//功能添加，2009-03-06 会议室预约
                  if(lvl_id.equals("1") || lvl_id.equals("2") || lvl_id.equals("3") || lvl_id.equals("4") || lvl_id.equals("5") || lvl_id.equals("6")){
%>
                leaf100833=new URLEntry("会议室预约","--","app","","../../hyssq/HYSYL_FRAME.jsp","leaf100833","1","","");
                        folder1008.addURLEntry(leaf100833);
<%
}
%>

folder1003 = new URLEntry("质量管理","--","open_folder","","../../mail/MAIL_TMP.jsp","folder1003","0","","");
      folder10.addURLEntry(folder1003);
<%
String sql = "SELECT SYSPARA_VALUE FROM SYSPARA WHERE SYSPARA_ID='B_YEAR'";
SYSPARA.setDbName("UTF8");
int intBegYear = 0;
int intShowYears = 0;
SYSPARA.setCommand(sql,SYSPARA.TYPE_SCROLL_INSENSITIVE,SYSPARA.CONCUR_UPDATABLE);
SYSPARA.executeQuery();
SYSPARA.freeConnection();
if(SYSPARA.next()){
intBegYear = Integer.parseInt(SYSPARA.getString(1));
}
sql = "SELECT SYSPARA_VALUE FROM SYSPARA WHERE SYSPARA_ID='NUM_YEAR'" ;
SYSPARA.setCommand(sql,SYSPARA.TYPE_SCROLL_INSENSITIVE,SYSPARA.CONCUR_UPDATABLE);
SYSPARA.executeQuery();
SYSPARA.freeConnection();
if(SYSPARA.next()){
intShowYears = Integer.parseInt(SYSPARA.getString(1));
}
HttpSession hs=request.getSession(true);
String use_id=hs.getAttribute("use_id").toString();
request.setCharacterEncoding("UTF-8");
int PageNo=1;
if(request.getParameter("PageNo")!=null){
PageNo=Integer.parseInt(request.getParameter("PageNo"));
}
sql = "SELECT B.JOB_LVLID FROM TEMPINFO A,TJOBINFO B WHERE A.EMP_ID='" + use_id + "' AND A.EMP_JOBID=B.JOB_ID";
PROJSCHD.setDbName("UTF8");
PROJSCHD.freeConnection();
PROJSCHD.setCommand(sql);
PROJSCHD.executeQuery();
PROJSCHD.first();

if(PROJSCHD.getString(1).equals("1")||PROJSCHD.getString(1).equals("2")) {
sql = "SELECT PRJ_ID,PRJ_NAME,PRJ_TEDATE FROM TPRJMGRS  where PRJ_ID LIKE ? OR (PRJ_TEDATE = '' and PRJ_ID LIKE ? ) ORDER BY PRJ_ID DESC";   //OR (PRJ_TEDATE = '' and PRJ_ID LIKE ? )
}
else if(PROJSCHD.getString(1).equals("3")){
sql = "SELECT A.PRJ_ID,PRJ_NAME,PRJ_TEDATE FROM TPRJMGRS A,TEMPINFO B WHERE B.EMP_ID='"+use_id+"' AND B.EMP_DPTID=A.PRJ_DPTID AND (A.PRJ_ID LIKE ? OR (A.PRJ_TEDATE = '' and A.PRJ_ID LIKE ? )) ORDER BY A.PRJ_ID DESC";
}
else if(PROJSCHD.getString(1).equals("4")){
sql = "SELECT B.PRJ_ID,B.PRJ_NAME,B.PRJ_TEDATE FROM TPRJJION A,TPRJMGRS B WHERE  PRJ_EMPID='"+use_id+"' AND (PRJ_FLAG='0' OR PRJ_FLAG='1') AND A.PRJ_ID = B.PRJ_ID AND (A.PRJ_ID LIKE ? OR (B.PRJ_TEDATE = '' and A.PRJ_ID LIKE ? )) ORDER BY A.PRJ_ID DESC";
}
else if(PROJSCHD.getString(1).equals("5")||PROJSCHD.getString(1).equals("6")){
sql = "SELECT B.PRJ_ID,B.PRJ_NAME,B.PRJ_TEDATE FROM TPRJJION A,TPRJMGRS B WHERE PRJ_EMPID='"+use_id+"'  AND A.PRJ_ID = B.PRJ_ID AND A.PRJ_ID = B.PRJ_ID AND (A.PRJ_ID LIKE ? OR (B.PRJ_TEDATE = '' and A.PRJ_ID LIKE ? )) ORDER BY A.PRJ_ID DESC";
}

for(int i = 1 ; i <= intShowYears ; i++){
int intShowYear = intBegYear + i -1;
//int intShowYear = intBegYear + i;
String s="";
String s_1="";
s = intShowYear + "";
s_1 = intShowYear - 1 + "";
PROJSCHD.setCommand(sql);
PROJSCHD.setParameter(1,"____"+s.substring(2)+"%");
PROJSCHD.setParameter(2,"____"+s_1.substring(2)+"%");
PROJSCHD.executeQuery();
%>
      folder10030<%=i%> = new URLEntry(<%=intShowYear%>,"--","open_folder","","../../mail/MAIL_TMP.jsp","folder10030<%=i%>","0","","");
           folder1003.addURLEntry(folder10030<%=i%>);
<%
      int k = 0;

      while(PROJSCHD.next()){

        k++;
        if(k<10){
          if((PROJSCHD.getString("PRJ_TEDATE")==null)||(PROJSCHD.getString("PRJ_TEDATE").equals(""))||(PROJSCHD.getString("PRJ_TEDATE").equals("0000-00-00"))||(PROJSCHD.getString("PRJ_TEDATE").equals("2-11-30"))){  //
%>
             leaf10030<%=i%>0<%=k%> = new URLEntry("<FONT COLOR=#FF0000><%=PROJSCHD.getString(2)%></FONT>","--","app","","../../mail/PROJ_MENU_FRAME.jsp?prj_id=<%=PROJSCHD.getString(1)%>","leaf10030<%=i%>0<%=k%>","1","","");
                folder10030<%=i%>.addURLEntry(leaf10030<%=i%>0<%=k%>);
<%
          }
          else{
%>
            leaf10030<%=i%>0<%=k%> = new URLEntry("<%=PROJSCHD.getString(2)%>","--","app","","../../mail/PROJ_MENU_FRAME.jsp?prj_id=<%=PROJSCHD.getString(1)%>","leaf10030<%=i%>0<%=k%>","1","","");
                folder10030<%=i%>.addURLEntry(leaf10030<%=i%>0<%=k%>);
<%
          }
}
        else{
          if((PROJSCHD.getString("PRJ_TEDATE")==null)||(PROJSCHD.getString("PRJ_TEDATE").equals(""))||(PROJSCHD.getString("PRJ_TEDATE").equals("0000-00-00"))||(PROJSCHD.getString("PRJ_TEDATE").equals("2-11-30"))){
%>
           leaf10030<%=i%><%=k%> = new URLEntry("<FONT COLOR=#FF0000><%=PROJSCHD.getString(2)%></FONT>","--","app","","../../mail/PROJ_MENU_FRAME.jsp?prj_id=<%=PROJSCHD.getString(1)%>","leaf10030<%=i%><%=k%>","1","","");
                folder10030<%=i%>.addURLEntry(leaf10030<%=i%><%=k%>);
        <%
          }else{
%>
           leaf10030<%=i%><%=k%> = new URLEntry("<%=PROJSCHD.getString(2)%>","--","app","","../../mail/PROJ_MENU_FRAME.jsp?prj_id=<%=PROJSCHD.getString(1)%>","leaf10030<%=i%><%=k%>","1","","");
                folder10030<%=i%>.addURLEntry(leaf10030<%=i%><%=k%>);
        <%
        }
          }

       }
}
//////////////
%>
  folder100399 = new URLEntry("按内容管理","--","open_folder","","../../mail/MAIL_TMP.jsp","folder100399","0","","");
        folder1003.addURLEntry(folder100399);
<%
        if(lvl_id.equals("2") || lvl_id.equals("3") || lvl_id.equals("4")){
%>
        leaf10039901=new URLEntry("项目调度","--","app","","../../mail/PROJ_DDFRAME.jsp","leaf10039901","1","","");
              folder100399.addURLEntry(leaf10039901);
<%
        }
%>
        leaf10039902=new URLEntry("项目进度","--","app","","../../mail/PROJSCHD_FRAME.jsp","leaf10039902","1","","");
              folder100399.addURLEntry(leaf10039902);

        leaf10039903=new URLEntry("项目周报","--","app","","../../mail/PROJWEEK_FRAME.jsp","leaf10039903","1","","");
              folder100399.addURLEntry(leaf10039903);
<%
        if(lvl_id.equals("1") || lvl_id.equals("2") || lvl_id.equals("3") || lvl_id.equals("4")){
%>
        leaf10039904=new URLEntry("管理文档","--","app","","../../mail/PROJDOCS_FRAME.jsp","leaf10039904","1","","");
              folder100399.addURLEntry(leaf10039904);
<%
        }
%>
<%
        if(lvl_id.equals("1") || lvl_id.equals("2") || lvl_id.equals("3") || lvl_id.equals("4")){
%>
        leaf10039905=new URLEntry("汇签设定","--","app","","../../mail/PROJ_DOC_HQ_FRAME.jsp","leaf10039905","1","","");
              folder100399.addURLEntry(leaf10039905);
<%
        }
%>
        <!--leaf10039906=new URLEntry("文档汇签","--","app","","../../mail/PROJ_DOC_HQREVIEW.jsp","leaf10039906","1","",""); -->
        <!--      folder100399.addURLEntry(leaf10039906); -->

        leaf10039907=new URLEntry("共享文件","--","app","","../../mail/PROJSHFL_FRAME.jsp","leaf10039907","1","","");
              folder100399.addURLEntry(leaf10039907);

<%

//////////////
%>

      folder1007 = new URLEntry("内部沟通","--","open_folder","","../../mail/MAIL_NEW.jsp","folder1007","0","","");
            folder10.addURLEntry(folder1007);

            leaf100702=new URLEntry("未签阅邮件","--","app","","../../mail/MAIL_NEW.jsp","leaf100702","1","","");
                  folder1007.addURLEntry(leaf100702);
<%
                  if(lvl_id.equals("1") || lvl_id.equals("2") || lvl_id.equals("3")){
%>
                  leaf100706=new URLEntry("指令下达","--","app","","../../mail/MAIL_ZL.jsp","leaf100706","1","","");
                        folder1007.addURLEntry(leaf100706);
<%
                  }
                  else if(lvl_id.equals("4")){
%>
                  leaf100708=new URLEntry("指令下达","--","app","","../../mail/MAIL_ZL_FRAME.jsp","leaf100708","1","","");
                        folder1007.addURLEntry(leaf100708);
<%
                  }
                  if(lvl_id.equals("3") || lvl_id.equals("4") || lvl_id.equals("5") || lvl_id.equals("6")){
%>
                  leaf100709=new URLEntry("工作汇报","--","app","","../../mail/MAIL_HB.jsp","leaf100709","1","","");
                        folder1007.addURLEntry(leaf100709);
<%
                  }
                  if(lvl_id.equals("3") || lvl_id.equals("4")){
%>
                  leaf100710=new URLEntry("项目通信","--","app","","../../mail/MAIL_XM_FRAME.jsp","leaf100710","1","","");
                        folder1007.addURLEntry(leaf100710);
<%
                  }
%>
                  leaf100711=new URLEntry("专人沟通","--","app","","../../mail/MAIL_GR.jsp","leaf100711","1","","");
                        folder1007.addURLEntry(leaf100711);

            leaf100703=new URLEntry("已签阅邮件","--","app","","../../mail/MAIL_OLD.jsp","leaf100703","1","","");
                  folder1007.addURLEntry(leaf100703);

            leaf100704=new URLEntry("已发邮件","--","app","","../../mail/MAIL_SEND.jsp","leaf100704","1","","");
                  folder1007.addURLEntry(leaf100704);
            leaf100705=new URLEntry("已删签阅邮件","--","app","","../../mail/MAIL_DELETE.jsp","leaf100705","1","","");
                  folder1007.addURLEntry(leaf100705);
            leaf100712=new URLEntry("已删发送邮件","--","app","","../../mail/MAIL_DELETE_SEND.jsp","leaf100712","1","","");
                  folder1007.addURLEntry(leaf100712);

      folder1006 = new URLEntry("考勤管理","--","open_folder","","../../mail/WORK_FRAME.jsp","folder1006","0","","");
            folder10.addURLEntry(folder1006);

            leaf100601=new URLEntry("考勤查询","--","app","","../../mail/WORK_FRAME.jsp","leaf100601","1","","");
                  folder1006.addURLEntry(leaf100601);
            leaf100609=new URLEntry("考勤详表","--","app","","../../mail/WORK_DETAIL4_FRAME.jsp","leaf100609","1","","");
                  folder1006.addURLEntry(leaf100609);
<%
      if(lvl_id.equals("1")||lvl_id.equals("2")||lvl_id.equals("3") ||lvl_id.equals("6")){
%>
            leaf100612=new URLEntry("考勤月报表","--","app","","../../mail/STATISM_FRAME.jsp","leaf100612","1","","");
                  folder1006.addURLEntry(leaf100612);
		  <%
       }
       if(lvl_id.equals("2")){
		  %>
            leaf100611=new URLEntry("弹性月报表","--","app","","../../mail/STATIS_FRAME.jsp","leaf100611","1","","");
                  folder1006.addURLEntry(leaf100611);
		  <%
        }

        %>
            leaf100620=new URLEntry("年休统计表","--","app","","../../mail/NIANXIU_FRAME.jsp","leaf100620","1","","");
                  folder1006.addURLEntry(leaf100620);

            leaf100613=new URLEntry("换休统计表","--","app","","../../mail/HUANXIU_FRAME.jsp","leaf100613","1","","");
                  folder1006.addURLEntry(leaf100613);
<%   
	    //}
         if(lvl_id.equals("2") || lvl_id.equals("6")){
%>
            leaf100602=new URLEntry("考勤类型初始","--","app","","../../mail/WORK_INIT.jsp","leaf100602","1","","");
                  folder1006.addURLEntry(leaf100602);
            leaf100608=new URLEntry("考勤类型一览","--","app","","../../mail/WORKTYPE_FRAME.jsp","leaf100608","1","","");
                  folder1006.addURLEntry(leaf100608);
<%
                  }
%>
            leaf100604=new URLEntry("漏考说明","--","app","","../../mail/TVACMGRS.jsp","leaf100604","1","","");
                  folder1006.addURLEntry(leaf100604);
            leaf100605=new URLEntry("漏考一览","--","app","","../../mail/TVACMGRS_LIST.jsp","leaf100605","1","","");
                  folder1006.addURLEntry(leaf100605);
            leaf100606=new URLEntry("请假申请","--","app","","../../mail/THOLMGRS_APPLY.jsp","leaf100606","1","","");
                  folder1006.addURLEntry(leaf100606);
            leaf100607=new URLEntry("请假一览","--","app","","../../mail/THOLMGRS_LIST.jsp","leaf100607","1","","");
                  folder1006.addURLEntry(leaf100607);
      folder1004 = new URLEntry("技术论坛","--","open_folder","","../../mail/JSLT.jsp","folder1004","0","","");
            folder10.addURLEntry(folder1004);

            leaf100401=new URLEntry("技术讨论","--","app","","../../mail/JSLT.jsp","leaf100401","1","","");
                  folder1004.addURLEntry(leaf100401);

            leaf100402=new URLEntry("技术园地","--","app","","../../mail/JSLT_SECOND.jsp","leaf100402","1","","");
                  folder1004.addURLEntry(leaf100402);
<%
            }
%>
      folder1005 = new URLEntry("个人信息","--","open_folder","","../../mail/PROJ_NULL.jsp","folder1005","0","","");
            folder10.addURLEntry(folder1005);

            leaf100501=new URLEntry("个人信息","--","app","","../../login/GRXX.jsp","leaf100501","1","","");
                  folder1005.addURLEntry(leaf100501);

            leaf100502=new URLEntry("口令修改","--","app","","../../login/GRKL.jsp","leaf100502","1","","");
                  folder1005.addURLEntry(leaf100502);
<%
            if(lvl_id.equals("9")){
%>
      folder1020 = new URLEntry("系统工具","--","open_folder","","../../mail/PROJ_NULL.jsp","folder1020","0","","");
        folder10.addURLEntry(folder1020);

        leaf102001=new URLEntry("UTF8转换工具","--","app","","../../mail/TOOL_DB.jsp","leaf102001","1","","");
              folder1020.addURLEntry(leaf102001);
        leaf102002=new URLEntry("考勤月报表工具","--","app","","../../mail/TOOL_KQTABLE.jsp","leaf102002","1","","");
              folder1020.addURLEntry(leaf102002);

        leaf102003=new URLEntry("数据库操作工具","--","app","","../../mail/DIR_TOOL.jsp","leaf102003","1","","");
              folder1020.addURLEntry(leaf102003);
        leaf102004=new URLEntry("设备管理工具","--","app","","../../mail/EQUV_TOOL.jsp","leaf102004","1","","");
              folder1020.addURLEntry(leaf102004);
        leaf102005=new URLEntry("更新设备使用人","--","app","","../../mail/EMP_TOOL.jsp","leaf102005","1","","");
              folder1020.addURLEntry(leaf102005);

<%
            }
%>
<%
            if(!lvl_id.equals("9")){
%>
            leaf100503=new URLEntry("人事登记","--","app","","../../rens/11RSGL.jsp","leaf100503","1","","");
                  folder1005.addURLEntry(leaf100503);
<%
            //}

      if(lvl_id.equals("1") || lvl_id.equals("2") || lvl_id.equals("3") || lvl_id.equals("4") || lvl_id.equals("6")){
%>
      folder1010 = new URLEntry("员工信息","--","open_folder","","../../mail/PROJ_NULL.jsp","folder1010","0","","");

            folder10.addURLEntry(folder1010);
<%
            if(lvl_id.equals("1") || lvl_id.equals("2") || lvl_id.equals("6")){
%>
            leaf101002=new URLEntry("人事信息","--","app","","../../mail/11RSGLVIEW.jsp","leaf101002","1","","");
                  folder1010.addURLEntry(leaf101002);
            leaf101001=new URLEntry("一般信息","--","app","","../../xtwh/TEMPINFO.jsp","leaf101001","1","","");
                  folder1010.addURLEntry(leaf101001);
<%
  }else{
%>
            leaf101003=new URLEntry("一般信息","--","app","","../../xtwh/TEMPINFO1.jsp","leaf101003","1","","");
                  folder1010.addURLEntry(leaf101003);

<%}
      }
%>


<%-- 林海 20081208  add start
--%> 

<%
      if( lvl_id.equals("1") || lvl_id.equals("2") || lvl_id.equals("3")){
%>

          folder1012 = new URLEntry("设备管理","--","open_folder","","../../mail/PROJ_NULL.jsp","folder1012","0","","");
             folder10.addURLEntry(folder1012);
                 leaf101201=new URLEntry("新件入库","--","app","","../../shebei/DEV_ADD_NEW.jsp","leaf101201","1","","");
                    folder1012.addURLEntry(leaf101201);
                 leaf101202=new URLEntry("设备检索","--","app","","../../shebei/DEV_SEARCH_FRAME.jsp","leaf101202","1","","");
                    folder1012.addURLEntry(leaf101202);
                 leaf101203=new URLEntry("履历检索","--","app","","../../shebei/DEV_HIST_SEARCH_FRAME.jsp","leaf101203","1","","");
                    folder1012.addURLEntry(leaf101203);

                 folder101204 = new URLEntry("管理表维护","--","open_folder","","../../mail/PROJ_NULL.jsp","folder101204","0","","");
                    folder1012.addURLEntry(folder101204);
　　　　            leaf10120401=new URLEntry("设备表维护","--","app","","../../shebei/DEV_TYPE_PROP_FRAME.jsp","leaf10120401","1","","");
                       folder101204.addURLEntry(leaf10120401);
                    leaf10120402=new URLEntry("区分表维护","--","app","","../../shebei/DEV_MSTADD_FRAME.jsp","leaf10120402","1","","");
                       folder101204.addURLEntry(leaf10120402);


<%
   }
%>

<%-- 林海 20081208  add end
--%>


<%
      if(lvl_id.equals("1") || lvl_id.equals("2") || lvl_id.equals("3")){
%>
      folder1011 = new URLEntry("设备信息","--","open_folder","","../../mail/PROJ_NULL.jsp","folder1011","0","","");
            folder10.addURLEntry(folder1011);
<%
      }else{
%>
      folder1011 = new URLEntry("设备信息","--","open_folder","","../../mail/PROJ_NULL.jsp","folder1011","0","","");
           folder10.addURLEntry(folder1011);

<%
}
%>

<%
            if(lvl_id.equals("1") || lvl_id.equals("2") || lvl_id.equals("6") ){
%>
            leaf101101=new URLEntry("计算机","--","app","","../../xtwh/SBXX.jsp","leaf101101","1","","");
                  folder1011.addURLEntry(leaf101101);
            leaf101103=new URLEntry("座位信息","--","app","","../../xtwh/SEATINFO.jsp","leaf101103","1","","");
                  folder1011.addURLEntry(leaf101103);

            leaf101104=new URLEntry("图书信息","--","app","","../../xtwh/BOOKS.jsp","leaf101104","1","","");
                  folder1011.addURLEntry(leaf101104);
            leaf101105=new URLEntry("光盘资料","--","app","","../../xtwh/MATE.jsp","leaf101105","1","","");
                  folder1011.addURLEntry(leaf101105);
            leaf101106=new URLEntry("设备信息","--","app","","../../xtwh/FIXTURE.jsp","leaf101106","1","","");
                folder1011.addURLEntry(leaf101106);

<%
            }
%>
            folder101103 = new URLEntry("座位管理","--","open_folder","","../../mail/PROJ_NULL.jsp","folder101103","0","","");
            folder1011.addURLEntry(folder101103);

                leaf10110301=new URLEntry("大开发室南侧(一部)","--","app","","../../mail/dept1.jsp","leaf10110301","1","","");
                      folder101103.addURLEntry(leaf10110301);

                leaf10110302=new URLEntry("大开发室北侧(二部)","--","app","","../../mail/dept2.jsp","leaf10110302","1","","");
                      folder101103.addURLEntry(leaf10110302);

                leaf10110303=new URLEntry("北开发室(三部)","--","app","","../../mail/dept3.jsp","leaf10110303","1","","");
                      folder101103.addURLEntry(leaf10110303);


                leaf10110304=new URLEntry("514","--","app","","../../mail/513.jsp","leaf10110304","1","","");
                      folder101103.addURLEntry(leaf10110304);

                leaf10110305=new URLEntry("515","--","app","","../../mail/514.jsp","leaf10110305","1","","");
                      folder101103.addURLEntry(leaf10110305);
<%--

                leaf10110306=new URLEntry("516","--","app","","../../mail/516.jsp","leaf10110306","1","","");
                      folder101103.addURLEntry(leaf10110306);

                leaf10110307=new URLEntry("517","--","app","","../../mail/517.jsp","leaf10110307","1","","");
                      folder101103.addURLEntry(leaf10110307);
--%>



<%
            }
      }
%>







      leaf1010=new URLEntry("用户手册","--","app","","../../login/help.jsp","leaf1010","0","","");
            folder10.addURLEntry(leaf1010);

      leaf1011=new URLEntry("点击离开","--","app","","../../login/LOGOUT.jsp","leaf1010","0","","");
            folder10.addURLEntry(leaf1011);

	var ROOTNODE = folder10;
	var first_object        =  leaf100901;
	var first_object_image  = "leaf100901";

	displayRoot();
	showRoot();
	initimage();
</SCRIPT>
</HEAD>
<BODY bgcolor=#336699 topmargin=0 marginheight=5 leftmargin=10 marginwidth=5>
</BODY>
</HTML>

