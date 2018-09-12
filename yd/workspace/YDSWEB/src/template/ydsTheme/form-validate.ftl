<#if parameters.validate?default(false) == true>
<script type="text/javascript" src="${base}/js/common/formValidation.js"></script>
<script type="text/javascript">
Event.observe(window, 'load', function() { 
	initValidation('${parameters.name}');
}); 
</script>
</#if>