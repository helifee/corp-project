<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@page import="com.cnaps.hvps.persistence.transfer.RegularDebit"%>
<%
String path = request.getContextPath();
List ls = (ArrayList)request.getAttribute("po");
if(!"".equals(ls) && ls != null){
	RegularDebit rd = (RegularDebit)ls.get(0);
	if (!"".equals(rd.getSignmd()) && rd.getSignmd() !=null){
		out.print("USED");
	}else{
		String msg=rd.getAclmtamt()+
		"|"+rd.getNboftxs()+
		"|"+rd.getAmount()+
		"|"+((rd.getProposercertid() == null) ? "":rd.getProposercertid())+
		"|"+((rd.getProposercerttp() == null) ? "":rd.getProposercerttp())+
		"|"+((rd.getProposercertissued() == null) ? "":rd.getProposercertissued())+
		"|"+((rd.getProposeracct() == null) ? "":rd.getProposeracct())+
		"|"+((rd.getProposernm() == null) ? "":rd.getProposernm())+
		"|"+((rd.getProposeraddr() == null) ? "":rd.getProposeraddr())+
		"|"+((rd.getProposertel() == null) ? "":rd.getProposertel())+
		"|"+((rd.getProposercstmrid() == null) ? "":rd.getProposercstmrid())+
		"|"+((rd.getProposeraccttp() == null) ? "":rd.getProposeraccttp())+
		"|"+((rd.getProposeracctccy()  == null) ? "":rd.getProposeracctccy())
		;
		out.print(msg);
	}
}else{
	out.print("NULL");
}
%>
