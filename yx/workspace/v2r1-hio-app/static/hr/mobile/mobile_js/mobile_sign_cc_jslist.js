/**
 * js列表
 * 为解决更新后不加载最新的js而是加载缓存的js
 * 将js引用增加时间戳
 */
document.write('<script src="./mobile_js/mobile_sign_cc.js?time='+new Date().getTime()+'" type="text/javascript"></script>');