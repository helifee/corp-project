$(function() {
    //读图片文件
    function viewFile(file) {
        var reader = new FileReader();
        reader.onload = function(evt) {
            $('.fullPic').css('background','url(' + evt.target.result + ')');
        }
        reader.readAsDataURL(file);
    }
    $('#viewFiles').change(function() {
        viewFile(this.files[0]);
    });
    
    	focusborder($(".settext"));
    	focusborder($(".setheight"));
    	focusborder($(".testnumer"));
    	function focusborder(_this) {
           _this.on("focus",function() {
              $(this).css("border","1px solid #46A7FF ")
           })
           _this.on("blur",function() {
               $(this).css("border","1px solid #E2E2E2")
           })
    	}

});