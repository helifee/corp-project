/*
 * 人力资源系统共通查询条件
 * panbingzhi 2017-12-26
 */
(function($, window, document, undefined) {
	$.extend({hrQry:{
		// 条件选择节点类型
		selectNodeType:{company:'company', dept:'dept', person:'person', companyOrDept:'companyOrDept'},
		selectNodeTypeName:{company:'所属公司', dept:'所属部门', person:'人员', companyOrDept:'所属机构'},
		selectedQryCacheKey:'selected_query_condition_json',
		// 条件选择节点类型提示信息
		selectNodeTypeMsg: {company:'请选择公司', dept:'请选择部门', person:'请选择人员', companyOrDept:'请选择所属机构'},
		querytype:{text:'text', number:'number', date:'date', list:'select'},
		maxCheckCount: 4, // 高级查询最多选4个组合
		seniorCheckCount: 4, // 高级查询组合，默认4组
		// 根据当前选择节点获取公司、部门、人员的id信息
		getHrParamRecursively: function(zTreeNode, resultObj) {
			if (resultObj === undefined || resultObj === null || resultObj.constructor !== Object) resultObj = {};
			resultObj[zTreeNode.type + 'id'] = zTreeNode.id;
			resultObj[zTreeNode.type] = zTreeNode.name;
			if (zTreeNode.getParentNode()) {
				$.hrQry.getHrParamRecursively(zTreeNode.getParentNode(), resultObj);
			}
		},
		// 根据当前选择节点取得公司名称
		getCompanyNameFromSelectedTreeNode: function(zTreeNode) {
			if (!zTreeNode) return '';
			if (zTreeNode.type == $.hrQry.selectNodeType.company) return zTreeNode.name;
			$.hrQry.getCompanyNameFromSelectedTreeNode(zTreeNode.getParentNode());
		},
		// 根据选择节点取得查询条件保存数据
		getSaveQueryConditionData: function(zTreeNode) {
			var oResult = {};
			if (zTreeNode) {
				if (zTreeNode.type == $.hrQry.selectNodeType.person) {
					oResult.projectid = zTreeNode.id;
					oResult.project = zTreeNode.getParentNode().name + '.' + zTreeNode.name;
					oResult.rootprojectid = zTreeNode.getParentNode().id;
					oResult.companyid = zTreeNode.getParentNode().getParentNode().id;
					oResult.company = zTreeNode.getParentNode().getParentNode().name;
				}
				else if (zTreeNode.type == $.hrQry.selectNodeType.dept) {
					oResult.rootprojectid = zTreeNode.id;
					oResult.companyid = zTreeNode.getParentNode().id;
					oResult.company = zTreeNode.getParentNode().name;
				}
				else if (zTreeNode.type == $.hrQry.selectNodeType.company) {
					oResult.companyid = zTreeNode.id;
					oResult.company = zTreeNode.name;
				}
				else if (zTreeNode.type == $.hrQry.selectNodeType.companyOrDept) {
					oResult.companyid = zTreeNode.id;
					oResult.company = zTreeNode.name;
				}
			}
			return oResult;
		}
	}});

	var HrQueryCondition = function(ele, opts) {
		this.$element = $(ele);
		this.defaults = {
			seniorContainer:null, // 高级查询条件内容容器，html element，不为null且存在时，显示高级查询按钮，且可以展开和收起
			querytype: $.hrQry.querytype.text, // 数据类型
			queryHandler:null,    // 选择条件后查询函数，当为函数类型对象时，函数有唯一参数：条件选择返回值
			queryUrl:null,        // 查询url
			ajaxType: 'POST',     // 请求类型  默认POST
			resultDataHandler: function(resultData){},      // 查询结果处理函数
			selectNodeType: $.hrQry.selectNodeType.company, // 查询条件选择限制：公司、部门、人员、公司或者部门四种，默认公司
			// 自定义追加查询条件，最多两个，html脚本字符串，多余两个的被忽略，自定义条件事件处理自己绑定
			// 例如：[{label:'楼栋', input:'<select><option value="1">10栋</option></select>'}]
			afterInit:function(queryEle){}, // 初始化之后
			toggleSeniorCallback: null
		};
		this.options = $.extend({},this.defaults, opts);

	};
	
	HrQueryCondition.prototype = {
		// 初始化
		_init: function() {
			var that = this;
			this.$element.css({
				'margin-bottom': '4px'
			});
			// 加载HTML
			this.$element.load('/platform-app/hr/common/querycondition/query-condition.html', function(){
				// 显示高级查询
				if (that.options.seniorContainer !== null && $(that.options.seniorContainer).length > 0) {
					// 收起/展开
					that._get('#collapseSearchBtn').show().on('click', function(){
						$(this).children('i').toggleClass('fa-angle-down fa-angle-up');
						if(!$('#collapseSearchSpan').html() || $('#collapseSearchSpan').html() == '收起') {
							// 点击收起
							$('#collapseSearchSpan').html("展开");
							$(".hiddenTd").hide();
						} else {
							if(that.options.seniorContainer) {
								var jqGrid = $(that.options.seniorContainer);
								var colNames = jqGrid.jqGrid('getGridParam', 'colNames');
								//console.log(22, JSON.stringify(colNames));
								
								// 获取列字段
								var colModel = jqGrid.jqGrid('getGridParam', 'colModel');
								//console.log(33, JSON.stringify(colModel));
								
								if(colModel && colModel.length > 0) {
									try {
										var queryIndex = 1;
										for(var idx = 0; idx < colModel.length; idx++) {
											if(colModel[idx].hidden || !colModel[idx].queryable) {
												continue;
											}
											++queryIndex;
											
											if (queryIndex >= 2) {
												if(!that._get('.condition-table tr th:eq('+queryIndex+')')) {
													continue;
												}
												
												//console.log(colNames[idx]+"=="+colModel[idx].name+"=="+queryIndex);
												
												// 查询条件
												var tmp = that._get('.condition-table tr th:eq('+queryIndex+')').show().find('label').text(colNames[idx]+'：').end().next().show();
												if(tmp.children('input').attr('name') == undefined) {
													// 日期
													if(colModel[idx].querytype == $.hrQry.querytype.date) {
														tmp.append('<input type="'+colModel[idx].querytype+'" class="' +(queryIndex==2?'':'mt10')
																+' form-control addInputWidth' +(queryIndex==4?'1':'') +'" name="'+colModel[idx].name+'" placeholder="'+colNames[idx]+'">');
													} 
													// 数字
													else if(colModel[idx].querytype == $.hrQry.querytype.number) {
														tmp.append('<input type="'+colModel[idx].querytype+'" class="'+(queryIndex==2?'':'mt10')
																+' form-control addInputWidth' +(queryIndex==4?'1':'') +'" name="'+colModel[idx].name+'" placeholder="'+colNames[idx]+'">');
													}
													// 下拉列表
													else if(colModel[idx].querytype == $.hrQry.querytype.list) {
														tmp.append('<input type="'+colModel[idx].querytype+'" class="'+(queryIndex==2?'':'mt10')
																+' form-control addInputWidth' +(queryIndex==4?'1':'') +'" name="'+colModel[idx].name+'" placeholder="'+colNames[idx]+'">');
													}
													// 默认文本
													else {
														tmp.append('<input type="'+colModel[idx].querytype+'" class="'+(queryIndex==2?'':'mt10')
																+' form-control addInputWidth' +(queryIndex==4?'1':'') +'" name="'+colModel[idx].name+'" placeholder="'+colNames[idx]+'">');
													}
												}
												
												// 高级查询下拉选项
												var tmp1 = that._get('.dropdown-menu li input[value="'+colModel[idx].name+'"]');
												if(!tmp1 || tmp1 == undefined || tmp1.length == 0) {
													if (queryIndex > 2) {
														that._get('.dropdown-menu').append('<li role="presentation" class="divider"></li>');
													}
													that._get('.dropdown-menu').append('<li role="presentation">'
															+ '  <input type="checkbox" class="senior-search-checkbox" value="'+colModel[idx].name
															+ '" querytype="'+colModel[idx].querytype+'" showvalue="'+colNames[idx]+'">'+colNames[idx]
															+'</li>');
												}
												
											}

										}
										
										// 高级查询
										that._get('.senior-search-checkbox').on('click', function(){
											// 选中
											if($(this).is(':checked')) {
												if($.hrQry.seniorCheckCount >= 4) {
													$(this).checked = false;
													$.xljUtils.tip('blue', '高级查询条件最多可以设置4个进行组合');
													return false;
												} else {
													$.hrQry.seniorCheckCount += 1;
												}
												
												var tmp = that._get('.condition-table tr td input[name="'+$(this).val()+'"]');
												if(!tmp.attr('name')) {
													console.log(11, tmp.attr('name'));
													var trIdx = 0;
													if($.hrQry.seniorCheckCount <= 1) {
														trIdx = 1;
													} else {
														trIdx = 2;
													}
													that._get('.condition-table tr:eq('+trIdx+')').append('<input type="'+$(this).attr('querytype')+'" class="'+(trIdx==2?'':'mt10')
															+' form-control addInputWidth' +($.hrQry.seniorCheckCount==3?'1':'') +'" name="'+$(this).val()
															+'" placeholder="'+$(this).attr('showvalue')+'">');
												} else {
													console.log(22, $(this).val());
													tmp.parent().prev().show();
													tmp.parent().show();
												}
											}
											// 取消选中
											else {
												$.hrQry.seniorCheckCount -= 1;

												var tmp = that._get('.condition-table tr td input[name="'+$(this).val()+'"]');
												if(!tmp.attr('name')) {
													console.log(33, tmp.attr('name'));
												} else {
													console.log(44, $(this).val());
													tmp.parent().prev().hide();
													tmp.parent().hide();
												}
											}
										});
									} catch(e) {
										$.xljUtils.tip('red', '自定义条件html脚本错误');
									}
								}
							}

							// 点击展开
							$('#collapseSearchSpan').html("收起");
							$(".hiddenTd").show();
						}
					});
					
				}

				// 更新条件显示标签
				that._get('.condition-table tr th:eq(1) label').text(
					$.hrQry.selectNodeTypeName[that.options.selectNodeType] + '：'
				);
				
				// 查询按钮事件
				that._get('#searchFormBtn').on('click', function() {
					var postData = {};
					var $eles = that._get('.condition-table tr td input');
					$eles.each(function(index, ele) {
						postData[$(ele).attr('name')]=$(ele).val();
					});
					// 调用回调函数
					if (that.options.queryHandler && that.options.queryHandler.constructor === Function) {
						that.options.queryHandler(postData);
					}
				});

				// 重置清空条件，调用查询
				that._get('#resetConditionBtn').on('click', function() {
					that._get('.condition-table tr td input').val('');
					// 调用回调函数
					if (that.options.queryHandler && that.options.queryHandler.constructor === Function) {
						that.options.queryHandler({});
					}
				});
				
			});
		}
		, _get: function (selector) {
			return $(selector, this.$element);
		}
	};
	
	// jquery extend
	$.fn.extend({
		hrQueryCondition:function(options) {
			// 初始化查询条件
			this.each(function(index, ele){
				var instance = new HrQueryCondition(ele, options);
				instance._init();
			});
			return this;
		},
		// 获取已选择查询条件
		getSelectedQueryCondition:function(){
			return this.data($.hrQry.selectedQryCacheKey);
		}
	});
	
	$(function(){
		var $eles = $('div[data-queryCondition]');
		$eles.each(function(index, ele) {
			var queryUrl = $(ele).attr('data-queryUrl');
			var resultHandler = $(ele).attr('data-resultDataHandler');
			$(ele).hrQueryCondition({url:queryUrl, resultDataHandler:eval(resultHandler)});
		});
	});
})(jQuery, window, document);
