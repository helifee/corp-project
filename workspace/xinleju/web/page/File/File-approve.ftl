<#if lstUpload?? &&(lstUpload?size > 0)>
	<#list lstUpload as upload>
	    <tr>
	    	<td style="vertical-align:middle;">
	    		<#if upload.ext == 'url'>
	    			<a name="urlOpen" href="javascript:;" data-href="${upload.userLabel}" title="${upload.fileName}">${upload.fileName}</a>
	    		<#else>
	    			<a title="${upload.fileName}" href="File!download.do?id=${upload.id}">${upload.fileName}</a>
	    		</#if>
	    	</td>
	        <td style="vertical-align:middle;text-align:center;">
                <#if upload.ext == 'url'>
	        		地址
	        	<#else>
	        		附件
	        	</#if>
	        </td>
	        <td style="vertical-align:middle;text-align:center;">
	        	<a href="javascript:;" name="removeUploadFile" data-id="${upload.id}" data-name="${upload.fileName}"><i class="glyphicon glyphicon-remove"></i></a>
	        </td>
	    </tr>
    </#list>
</#if>