(function ($,window,document,undefined) {
	$(document).ready(function () {
		$('#officeJk').height($(window).height()-100);
        //新闻生产path
        var path = $.xljUtils.getUrlParam('path');
        //编辑的新闻ID
        var contentRowTypeId = $.xljUtils.getUrlParam('id');

        var tableObj = $('#newContentTbody');
        //加载office静态文件
        addOfficeToForm(tableObj);
        /**
         * 添加正文金格office操作行
         * @param table
         */
        function addOfficeToForm(table) {
            //添加正文金格office
            var contentTrObj = $('<tr class="form-tr"></tr>');
            table.append(contentTrObj);

            var contentTdObj = $('<td colspan="4"></td>');
            contentTrObj.append(contentTdObj);
            var contentDivObj = $('<div id="officeJk" style="min-height:200px;"></div>');
            contentTdObj.append(contentDivObj);

            var contentIframeObj = $('<iframe class="mt50 embed-responsive-item" src="" id="contentOffice" name="contentOffice"></iframe>');
            contentIframeObj.css({width:'100%',border:'none'});
            contentIframeObj.on("load",function(){
            	var b_iframe = document.getElementById("contentOffice");
            	$($(document.contentOffice.document.body).find('div')[0]).width($(b_iframe).width()-65);
            	$($(document.contentOffice.document.body).find('div')[0]).css({margin:'auto'});
            	$(b_iframe).height(document.contentOffice.document.body.scrollHeight+20);
            });
            contentIframeObj.attr('src',path+'?time='+Math.random()).ready();
            
            contentDivObj.append(contentIframeObj);
        }
        /**
         * 添加附件操作行
         * @param table
         */
        function addAttachToForm() {
        	//初始化附件
        	try{
        		$('#attach_files').xljAttachment({
        			appId: '1',
        			businessId: contentRowTypeId,
        			categoryId: '1',
        			mode: 'view',
        			hideButtonsWithNoFile:true,
        			singleUpload: false
        		});
        	}catch (e){
        		//console.warn('附件初始化失败！');
        	}
        }
    });
    /**
     *  closeWin
     */
    window.closeWin =function closeWin() {
        window.close();
    }
})(jQuery,window,document)




