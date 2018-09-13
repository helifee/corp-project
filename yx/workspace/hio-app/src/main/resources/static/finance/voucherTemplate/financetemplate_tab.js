/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window, document) {
	var _tabList = {
		ns : "_tabList",
		dataPar : {
			tabMap : {
				0 : "companycompare_list.html",
				1 : "accountCaption_list.html",
				2 : "cashflowitem_list.html",
				3 : "auxiliaryaccounting_list.html",
				4 : "vouchertemplate_list.html"
			},
			tabIndex:0,
			appCode:$.xljUtils.getUrlParam('app_code')
		},
		/**
		 * 初始页面数据
		 */
		loadInitPageData : function() {
			this.loadTab();// 初始加载tab页面
		},
		/**
		 * 加载tab页面
		 */
		loadTab : function() {
			$.xljUtils.removeGridScroll();
            $(".ztree-box").getNiceScroll().remove();
			$('#tabcontent').empty();
			$('#tabcontent').load(this.dataPar.tabMap[this.dataPar.tabIndex]);
		},
		/**
		 * tab切换事件
		 */
		switchPage : function() {
			var my = this;
			$('.tabbtn').click(function() {
				my.dataPar.tabIndex = $(this).index();
				$('.tabbtn').removeClass('active');
				$(this).addClass('active');
				// 加载tab页面
				my.loadTab();
			})
		},
		/**
		 * 页面高宽度
		 */
		pageStyle : function() {
			$(window).on('resize',function() {
				$('.tabs').height($(window).height() - $('.expand-search').outerHeight() - $('.tabContainer').outerHeight() - 5);
			})
		},
		/**
		 * 加载系统下拉框
		 */
		getFinanceSystem:function() {
			var my = this;
			var data = {
					status:1,
					delflag:0
			}
			$.ajax({
				url : serviceUrl + "finance/sysRegister/queryList",
				data : JSON.stringify(data),
				type : 'POST',
				contentType : 'application/json;charset=utf-8',
				dataType : 'JSON',
				success : function(resultData) {
					if (resultData) {
						var successFlag = resultData.success;
						var result = resultData.result;
						var msg = resultData.msg;
						if (successFlag) {
							$("#selectFinanceSystem").empty();
							for ( var o in result) {
								$("#selectFinanceSystem").append(
										'<option value="' + result[o].id + '">'
												+ result[o].fiSysName
												+ '</option>')
							}
							// 加载公司下拉框
							my.getCompany();
						} else {
							pop_tip_open("red", resultData.msg);
						}
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$.xljUtils.getError(jqXHR.status);
				},
				complete : function() {
				}
			});
		},
		/**
		 * 初始账套下拉框
		 */
		getCompany:function() {
			var my = this ;
			var financeSys = $("#selectFinanceSystem").val();
			var data = {
				registerId : financeSys,
				appCode:this.dataPar.appCode,
				delflag:0
			}
			$.ajax({
				url : serviceUrl + "finance/accountSet/queryAccounSetList",
				data : JSON.stringify(data),
				type : 'POST',
				contentType : 'application/json',
				dataType : 'JSON',
				success : function(resultData) {
					if (resultData) {
						var successFlag = resultData.success;
						var result = resultData.result;
						var msg = resultData.msg;
						if (successFlag) {
							$("#selectCompany").empty();
							for ( var o in result) {
								$("#selectCompany").append(
										'<option appCode="'+result[o].appCode+'" value="' + result[o].id + '">'
												+ result[o].companyName + '</option>')
							}
							// 初始页面数据
							my.loadInitPageData();
						} else {
							pop_tip_open("red", resultData.msg);
						}
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$.xljUtils.getError(jqXHR.status);
				},
				complete : function() {
				}
			});
		},
		/**
		 * 初始财务系统下拉框
		 */

		bindSct:function(){
			var my = this;
			$('#selectFinanceSystem').on("change",function(){
				my.getCompany();
			});
			$('#selectCompany').on("change",function(){
				my.loadTab()
			});
		},
		/**
		 * 绑定导入导出事件
		 */

	//摸态窗口打开事件
	bindExcelEvent:function(){
			var my = this;
			//导入
			$('#excelImport').on("click",function(){
				$('#excelModal').find(".modal-title").html("请选择导入Excel项");
				$("#excelModalFrom").find("input[id='type']").val(1);//导入
				$("#excelModalFrom").find("tr[id='excelFile']").show();
				$('#excelModal').modal("show");
			});

			//导出
			$('#excelExport').on("click",function(){
				//$('#excelModal').find(".modal-title").html("请选择导出Excel项");
				//$("#excelModalFrom").find("tr[id='excelFile']").hide();
				$("#excelModalFrom").find("input[id='type']").val(2);//导出
				//$('#excelModal').modal("show");
				my.excelConfirm();
			});
			//摸态窗口关闭事件
			$('#excelModal').on('hidden.bs.modal', function () {
				$('#excelModal').find(".modal-title").html("");
				$("#excelModalFrom").find("input[id='type']").val('');
				$("#excelModalFrom").find("input[id='excelEntry']").val('')
				$("#excelModalFrom")[0].reset();
			});
			$('#excelModal').on('show.bs.modal', function () {
			});
			//submit url
			$("#excelModalFrom").attr("action",serviceUrl + "finance/excel/excelHelper");
		},
		//复选框改变事件
		excelBoxChange:function(e){
			var obj = $("#excelModalFrom").find("input[id='excelEntry']");
			var codeVal = obj.val();
			if(e.checked ==true){
				if(codeVal.indexOf($(e).val())<0){
					if(obj.val()){
						obj.val(codeVal+";"+$(e).val());
					}else{
						obj.val($(e).val());
					}
				}
			}else{
				var repVal="";
				if(codeVal.indexOf(";"+$(e).val())>=0){
					repVal = codeVal.replace(";"+$(e).val(), "");
				}else if(codeVal.indexOf($(e).val())>=0){
					repVal = codeVal.replace($(e).val(), "");
				}
				obj.val(repVal);
			}
		},
		/**
		 * 确认导入导出excel
		 */
		excelConfirm:function(){
			var data={};
			data.filePathName = $("#excelModalFrom").find("input[name='excelFile']").val();
			data.type=$("#excelModalFrom").find("input[id='type']").val();
			data.item=$("#excelModalFrom").find("input[id='excelEntry']").val();
			var selectCompany = $("#selectCompany").val();//账套id
			if(null==selectCompany||""==selectCompany||undefined==selectCompany){
				pop_tip_open("blue",'请选择所属账套！');
				return false;
			}
			$('#excelCompanyId').val(selectCompany);
			if(data.type==2){
				location.href=serviceUrl + "finance/excel/excelExportHelper?excelCompanyId="+selectCompany;
			}else{
//				if(null==data.item||""==data.item){
//					pop_tip_open("blue",'请选择Excel项！');
//					return false;
//				}
				if(null!=data.type&&1==data.type){
					if(null==data.filePathName||""==data.filePathName){
						pop_tip_open("blue",'请选择导入Excel文件！');
						return false;
					}
				}
				$.ajax({
					url : serviceUrl + "finance/excel/excelImportHelper",
					data : new FormData($( "#excelModalFrom" )[0]),
					type : 'POST',
					processData:false,
					contentType:false,
					success : function(resultData) {
						if (resultData) {
							var successFlag = resultData.success;
							if (successFlag) {
								pop_tip_open("green","导入成功")
							} else {
								pop_tip_open("red", resultData.msg);
							}
						}
					},
					error : function(jqXHR, textStatus, errorThrown) {
						$.xljUtils.getError(jqXHR.status);
					},
					complete : function() {
					}
				});
			}
		},
		/**
		 * 页面初始化
		 */
		pageInit : function() {
			// tab切换事件
			this.switchPage();
			// 初始化tab样式
			this.pageStyle();
			//下拉框onchange事件
			this.bindSct();
			//绑定导入导出事件
			this.bindExcelEvent();
			// 加载系统下拉框
			this.getFinanceSystem();
		}
	};

	
	$(_tabList.pageInit());
	window[_tabList.ns] = _tabList;
})(window, document);