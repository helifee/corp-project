<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="js/ext/ext-all.js"></script>
<link rel="stylesheet" type="text/css" href="css/mask.css" />
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<link rel="stylesheet" type="text/css" href="js/Validform5.3.2/css/style.css" />
<script type="text/javascript" src="js/Validform5.3.2/js/Validform_Datatype.js"></script>
<script type="text/javascript" src="js/Validform5.3.2/js/Validform_v5.3.2.js"></script>
<script language="javascript" type="text/javascript">
	var vfrm;
	function init() {
		vfrm = $('#frm').Validform();
		vfrm.config({
			tiptype : 3,
			callback : function(data) {
				save();
				return false;
			}
		});
	}
	$(document).ready(init);
	function dealSave() {
		vfrm.submitForm();
	}
	function newDealSave(){
		vfrm.submitForm();
		window.opener.location.reload();

	}
</script>