<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!-- 返回顶部 -->
<div style="display:none;" class="back-to" id="toolBackTop">
	<a title="返回顶部" onclick="window.scrollTo(0,0);return false;" href="#top" class="back-top">返回顶部</a>
</div>
<style>
	.back-to {bottom: 65px;overflow:hidden;position:fixed;right:10px;width:55px;z-index:999;}
	.back-to .back-top {background: url("images/back-top.png") no-repeat scroll 0 0 transparent;display: block;float: right;height:70px;margin-left: 10px;outline: 0 none;text-indent: -9999em;width: 50px;}
	.back-to .back-top:hover {background-position: -50px 0;}
</style>
<script>
	window.onload = function() {
		var bt = document.getElementById('toolBackTop');
		var sw = document.body.clientWidth;
		var limitsw = (sw - 1250) / 2 - 40;
		if (limitsw > 0) {
			limitsw = parseInt(limitsw);
			bt.style.right = limitsw;
		}
		window.onscroll = function() {
			var st = document.documentElement.scrollTop;
			if (st > 150) {
				bt.style.display = '';
			} else {
				bt.style.display = 'none';
			}
		}
	};
</script>