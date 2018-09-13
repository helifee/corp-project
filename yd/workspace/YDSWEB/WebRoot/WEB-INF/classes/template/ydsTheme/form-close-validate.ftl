<#if ((parameters.validate?default(false) == true) && (parameters.performValidation?default(false) == true))>
<script type="text/javascript">
window['${parameters.name}_validation'] = {
<#list parameters.tagNames as tagName>
<#assign validators=tag.getValidators("${tagName}")>
<#if validators?size != 0>
'${tagName}':{
<#list validators as validator>
'${validator.validatorType}':{<#t/>
'message':'${validator.getMessage(action)?js_string}',<#t/>
'param':{<#t/>
<#if validator.validatorType = "required">
<#elseif validator.validatorType = "requiredstring">
<#if validator.trim>
'trim':'true',<#t/>
</#if>
<#elseif validator.validatorType = "stringlength">
'minLength':'${validator.minLength!0}',<#t/>
'maxLength':'${validator.maxLength!999}',<#t/>
<#elseif validator.validatorType = "regex">
'expression': '${validator.expression?js_string}',<#t/>
<#elseif validator.validatorType = "int">
<#if validator.min??>
'min':'${validator.min}',<#t/>
</#if>
<#if validator.max??>
'max':'${validator.max}',<#t/>
</#if>
<#elseif validator.validatorType = "double">
<#if validator.minInclusive??>
'minInclusive':'${validator.minInclusive}',<#t/>
</#if>
<#if validator.maxInclusive??>
'maxInclusive':'${validator.maxInclusive}',<#t/>
</#if>
<#if validator.minExclusive??>
'minExclusive':'${validator.minExclusive}',<#t/>
</#if>
<#if validator.maxExclusive??>
'maxExclusive':'${validator.maxExclusive}',<#t/>
</#if>
<#elseif validator.validatorType = "date">
</#if>
<#if validator.shortCircuit>
'shortCircuit':'true',
</#if>
'_p':null<#t/>
}},
</#list>
'_r':null
},
</#if>
</#list>
'_s':null};
</script>
</#if>