<script type="text/javascript">
try{
	var hash_url = window.location.hash;
	var hash_height = hash_url.split("#")[1];
	var heightVar = hash_height + 'px';
	var ppdoc = parent.parent.document;
	var b_iframe = ppdoc.getElementById("main");
	b_iframe.style.height = heightVar;
	b_iframe.height = heightVar;
	b_iframe.style.minHeight = heightVar;
	b_iframe.minHeight = heightVar;
	ppdoc.getElementById("erp_body").style.height = heightVar;
	ppdoc.getElementById("erp_body").height = heightVar;
	ppdoc.getElementById("erp_body").style.minHeight = heightVar;
	ppdoc.getElementById("erp_body").sminHeight = heightVar;
} catch (e) {
	// TODO: handle exception
}
</script>