<#if isDisplay??>
	<table class="table table-bordered">
	    <thead>
		    <tr>
		        <th style="width: 5%">
	                <input type="checkbox" checked value="" name="type">
		        </th>
		        <th style="width: 60%">
	               	 附件名称&nbsp;&nbsp;&nbsp;<a href="#">打包下载</a>
		        </th>
		        <th style="width: 15%">
	                                             附件类型
		        </th>
		        <th style="width: 10%">
	                                             上传时间
		        </th>
		        <th style="width: 10%">
	                                             上传者
		        </th>
		    </tr>
	    </thead>
	    <tbody>
	    	<#list lstUpload as upload>
			    <tr>
			    	<td>
			    		<input type="checkbox" checked name="type">
			    	</td>
			        <td>
		                <a href="File!download.do?id=${upload.id!''}" name="attachementName" title="${upload.fileName!''}">${upload.fileName!''}
							<#if upload.fileSize??>
								（upload.fileSize}）
							</#if>
						</a>
			        </td>
			        <td>
			        	<#if upload.ext == 'url'>
			        		附件
			        	<#else>
			        		地址
			        	</#if>
			        </td>
			        <td>
			        	${upload.uploadTime}
			        </td>
			        <td>
			        	${upload.userName!''}
			        </td>
			    </tr>
		    </#list>
	    </tbody>
	</table>
</#if>