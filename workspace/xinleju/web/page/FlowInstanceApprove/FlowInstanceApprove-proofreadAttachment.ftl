<#if isDisplay??>
	<table class="table table-bordered">
	    <thead>
		    <tr>
		        <th style="width: 50%">
	                <input type="checkbox" checked value="" name="type">
	                <a href="#">打包下载（校稿前）</a>
		        </th>
		        <th style="width: 50%">
	                <input type="checkbox" checked value="" name="type">
	                <a href="#">打包下载（校稿后）</a>
		        </th>
		    </tr>
	    </thead>
	    <tbody>
	    	<#list lstMapUpload as mapUpload>
					    <tr>
					        <td>
					        	<#if mapUpload['proofreadBefore']??>
					        		<#assign upload = mapUpload['proofreadBefore']>
						                <input type="checkbox" value="" name="type">
						                <a href="File!download.do?id=${upload.id!''}" name="attachementName" title="${upload.fileName!''}">${upload.fileName!''}
											<#if upload.fileSize??>
												（upload.fileSize}）
											</#if>
										</a>
					            </#if>
					        </td>
					        <td>
					        	<#if mapUpload['proofreadAfter']??>
					        		<#assign upload = mapUpload['proofreadAfter']>
						            
						                <input type="checkbox" value="" name="type">
						                <a href="File!download.do?id=${upload.id!''}" name="attachementName" title="${upload.fileName!''}">${upload.fileName!''}
											<#if upload.fileSize??>
												（${upload.fileSize}）
											</#if>
										</a>
					            </#if>
					        </td>
					    </tr>
		    </#list>
	    </tbody>
	</table>
</#if>