<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%> 
<p>Books</p>
<s:if test="books.size > 0">
 <table>
  <s:iterator value="books">
   <tr id="row_<s:property value="id"/>">
    <td>
     <s:property value="name" />
    </td>
    <td>
     <s:property value="isbm" />
    </td>
    <td>
     <s:property value="author"/>
    </td>
    <td>
     <s:url id="removeUrl" action="remove">
      <s:param name="id" value="id" />
     </s:url>
     <sx:a href="%{removeUrl}"  targets="books">Remove</sx:a>
     <sx:a id="a_%{id}" notifyTopics="/edit">Edit</sx:a>
    </td>
   </tr>
  </s:iterator>
 </table>
</s:if>
