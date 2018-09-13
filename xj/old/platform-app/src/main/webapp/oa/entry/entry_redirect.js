(function ($,window,document,undefined) {
	$(document).ready(function () {
		var tableObj = $('#newContentTbody');
		var path = window.opener._entryPlugins.getParentPath();//$.xljUtils.getUrlParam('path');
        var name = window.opener._entryPlugins.getParentName();//decodeURI($.xljUtils.getUrlParam('name'));

        addOfficeToForm(tableObj,path);
        $(document).attr("title",name)
    });
    /**
     *  closeWin
     */
    window.closeWin =function closeWin() {
        window.close();
    }
    function addOfficeToForm(table,path) {
        var contentTrObj = $('<tr class="form-tr"></tr>');
        table.append(contentTrObj);

        var contentTdObj = $('<td colspan="4"></td>');
        contentTrObj.append(contentTdObj);
        var contentDivObj = $('<div id="officeJk" ></div>');
        contentTdObj.append(contentDivObj);

        if($('#bizForm')[0]){
            contentDivObj.width($('#bizForm').width()-100);
            contentDivObj.css({'overflow':'auto'});
        }
        var contentIframeObj = $('<iframe class="mt50 embed-responsive-item" src="" id="contentOffice" name="contentOffice"></iframe>');
        contentIframeObj.css({width:'100%',border:'none'});
        contentIframeObj.css({height:$(window).height()-125});
        if(path.indexOf("?")==-1){
            contentIframeObj.attr('src',path+'?time='+Math.random()).ready();
        }else {contentIframeObj.attr('src',path+'&time='+Math.random()).ready();}

        contentDivObj.append(contentIframeObj);
    };
})(jQuery,window,document)