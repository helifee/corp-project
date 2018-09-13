$(function() {
    $('#gridContainer').height($(window).height() - 470);
    $('#lCheckAll').change(function() {
        var flag = $(this)[0].checked;
        $('#checkL > ul > li > input').each(function(i,ele){
            ele.checked = flag;
        });
    });
    $('#rCheckAll').change(function() {
        var flag = $(this)[0].checked;
        $('#checkR > ul > li > input').each(function(i,ele){
            ele.checked = flag;
        });
    });
    $('.slide').click(function() {
        var checks = $('.check_group');
        checks.fadeToggle('fast');
        setTimeout(function() {
            if(checks.css('display') == 'block') {
                $('.slidespan').text('收起');
                $('.slide').children('.fa').addClass('fa-chevron-up').removeClass('fa-chevron-down');
                $('#gridContainer').height($(window).height() - 470);
            }else{
                $('.slidespan').text('展开');
                $('.slide').children('.fa').addClass('fa-chevron-down').removeClass('fa-chevron-up');
                $('#gridContainer').height($(window).height() - 253);
            }
        },400);

    });
});
