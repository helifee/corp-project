var formEditor = UE.getEditor('formEditor', {
	toolleipi : true,// 是否显示，设计器的 toolbars
	textarea : 'design_content',
	// 这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
	toolbars : [ [ 'fullscreen', 'source', '|', 'undo', 'redo', '|', 'bold',
			'italic', 'underline', 'fontborder', 'strikethrough',
			'removeformat', '|', 'forecolor', 'backcolor', 'insertorderedlist',
			'insertunorderedlist', '|', 'fontfamily', 'fontsize', '|',
			'indent', '|', 'justifyleft', 'justifycenter', 'justifyright',
			'justifyjustify', '|', 'link', 'unlink', '|', 'horizontal',
			'spechars', 'wordimage', '|', 'inserttable', 'deletetable',
			'mergecells', 'splittocells' ] ],
	// focus时自动清空初始化时的内容
	// autoClearinitialContent:true,
	// 关闭字数统计
	wordCount : false,
	// 关闭elementPath
	elementPathEnabled : false,
	// 默认的编辑区域高度
	initialFrameHeight : 450
// ,iframeCssUrl:"css/cfldcn_style.css" //引入自身 css使编辑器兼容你网站css
// 更多其他参数，请参考ueditor.config.js中的配置项
});

var formDesign = {
	/* 执行控件 */
	exec : function(method) {
		formEditor.execCommand(method);
	},
	
	fnCheckForm : function(type) {
		if (formEditor.queryCommandState('source'))
			formEditor.execCommand('source');// 切换到编辑模式才提交，否则有bug

		var formName = $("#formName").val();
		var formCode = $("#formCode").val();

		if (formName == "") {
			alert("表单名称不能为空！");
			return;
		}

		if (formCode == "") {
			alert("表单编码不能为空！");
			return;
		}

		if (formEditor.hasContents()) {
			formEditor.sync();/* 同步内容 */
			$("#status").val(type);
			$('body').mask("数据保存中...");
			$.ajax({
				type : "POST",
				url : "FormDefine!save.do",
				data : $('#frm').serialize(),
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						window.opener.queryFrm();
						window.close();
					} else {
						alert(data.msg);
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					// $.parseJSON(jqXHR.responseText).data.error.message;
					alert("网络故障！");
				},
				dataType : "json"
			});
		} else {
			alert('表单内容不能为空！')
			return false;
		}
	},
	/* 预览表单 */
	fnReview : function() {
		if (formEditor.queryCommandState('source'))
			formEditor.execCommand('source');/* 切换到编辑模式才提交，否则部分浏览器有bug */

		if (formEditor.hasContents()) {
			formEditor.sync(); /* 同步内容 */

			alert("你点击了预览,请自行处理....");
			return false;
			// --------------以下仅参考-------------------------------------------------------------------

			/* 设计form的target 然后提交至一个新的窗口进行预览 */
			document.saveform.target = "mywin";
			window.open('', 'mywin',
					"menubar=0,toolbar=0,status=0,resizable=1,left=0,top=0,scrollbars=1,width="
							+ (screen.availWidth - 10) + ",height="
							+ (screen.availHeight - 50) + "\"");

			document.saveform.action = "";
			document.saveform.submit(); // 提交表单
		} else {
			alert('表单内容不能为空！');
			return false;
		}
	}
};
