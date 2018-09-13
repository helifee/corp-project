<#assign hasFieldErrors = parameters.name?? && fieldErrors?? && fieldErrors[parameters.name]??/>
<#if hasFieldErrors>
 err="1"<#rt/>
 errMsg="<#rt/>
<#list fieldErrors[parameters.name] as error><#t/>
<#if error_index != 0 ><br/></#if><#t/>
${error?html}<#t/>
</#list>"<#t/>
</#if><#t/>
<#if parameters.tooltip??>
 tooltip="${parameters.tooltip?html}"<#rt/>
</#if>