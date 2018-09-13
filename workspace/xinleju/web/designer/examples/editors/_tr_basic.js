$(document).ready(bind_btn_click);

function bind_btn_click() {

	$("input[name='ys']").each(function(new_index) {

		$(this).click(function() {
			var has_b = $(this).hasClass("btn_b");

			$("input[name='ys']").each(function(x_index) {
				$(this).removeClass("btn_b");
			});

			if (!has_b) {
				$(this).addClass("btn_b");
			}
			
			var oper_name = get_exp_oper();
			if (oper_name == "并且" || oper_name == "或者" || oper_name == "(" || oper_name == ")") {
				$("#cond").val($("#cond").val() + " " + oper_name);
				$(this).removeClass("btn_b");
			}
		});
	});
}

function add_exp() {
	var cate_node = tr_win.cate_tree.getSelectionModel().getSelectedNode();
	var cate_name = cate_node == null || cate_node.id == '0' ? ""
			: cate_node.text;

	var cateType = cate_node.attributes.code;
	var oper_name = get_exp_oper();

	var cate_val_node = tr_win.cate_val_tree.getSelectionModel()
			.getSelectedNode();
	var cate_val = cate_val_node == null || cate_val_node.id == 0 ? ""
			: cate_val_node.text;

	var user_input = $("#user_input").val();

	if (null != cateType && 'S' == cateType){
		user_input = '“' + user_input + '”';
	}
	var val = user_input != '' ? user_input : cate_val;

	if (oper_name == "并且" || oper_name == "或者" || oper_name == "("
			|| oper_name == ")") {

		$("#cond").val($("#cond").val() + " " + oper_name);
	} else {
		if (cate_name == "" || oper_name == "" || val == "") {
			alert("判定条目 、运算符、值没有输入，请输入后再添加！");
			return;
		}
		var x = "" + cate_name + "" + " " + oper_name + " " + val;
		
		if($("#cond").val()==''){
			$("#cond").val(x);
		}
		else{
			$("#cond").val($("#cond").val() + " " + x);
		}
		
	}

	// 清楚选择
	tr_win.cate_tree.getSelectionModel().clearSelections();
	tr_win.cate_val_tree.getSelectionModel().clearSelections();

	if (cate_node != null && cate_node.getUI()!=null) {
		cate_node.getUI().check(false);
	}
	if (cate_val_node != null && cate_node.getUI()!=null) {
		cate_val_node.getUI().check(false);
	}

	clear_oper();
	$("#user_input").val("");
}

function get_exp_oper() {
	var oper_name = "";

	$("input[name='ys']").each(function(new_index) {
		var has_b = $(this).hasClass("btn_b");
		if (has_b) {
			oper_name = $(this).attr("value");
			return;
		}
	});

	return oper_name;
}

function clear_oper() {
	$("input[name='ys']").each(function(new_index) {
		$(this).removeClass("btn_b");
	});
}