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
});