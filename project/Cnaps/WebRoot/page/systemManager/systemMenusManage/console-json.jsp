<%@ page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<c:set var="len" value="${fn:length(list)-1}" ></c:set>

[
<c:forEach items="${list}" var="obj" varStatus="i">
{
	id:'${obj.indentifier}',
	text:'${obj.name}',
	<c:if test="${obj.isactivity == 1}">
		leaf:true,
	</c:if>
	singleClickExpand:true
}
	<c:if test="${i.index<len}">,</c:if>
</c:forEach>
]