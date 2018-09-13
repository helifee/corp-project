/*
 * 人力资源系统共通查询条件
 * panbingzhi 2017-12-26
 */
(function($, window, document, undefined) {
	var seniorCheckCount = 0; // 高级查询组合，默认最多4组
	$.extend({hrQry:{
		// 条件选择节点类型
		selectNodeType:{company:'company', dept:'dept', person:'person', companyOrDept:'companyOrDept'},
		selectNodeTypeName:{company:'所属公司', dept:'所属部门', person:'人员', companyOrDept:'所属机构'},
		selectedQryCacheKey:'selected_query_condition_json',
		seniorSeparator:' ~ ', // 双日历及双数字值分割符
		// 条件选择节点类型提示信息
		selectNodeTypeMsg: {company:'请选择公司', dept:'请选择部门', person:'请选择人员', companyOrDept:'请选择所属机构'},
		querytype:{text:'text', number:'number', date:'date', list:'list', sysCode:"sysCode", sysCodeSet:"sysCodeSet"},
		maxCheckCount: 4, // 高级查询最多选4个组合
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
			seniorSeparator: $.hrQry.seniorSeparator, // 双日历及双数字值分割符
			querytype: $.hrQry.querytype.text, // 数据类型
			querycodeset: null,   // 当querytype为sysCode时需要指定代码集ID
			queryHandler:null,    // 选择条件后查询函数，当为函数类型对象时，函数有唯一参数：条件选择返回值
			queryUrl:null,        // 查询url
			ajaxType: 'POST',     // 请求类型  默认POST
			resultDataHandler: function(resultData){},      // 查询结果处理函数
			selectNodeType: $.hrQry.selectNodeType.company, // 查询条件选择限制：公司、部门、人员、公司或者部门四种，默认公司
			// 自定义追加查询条件，最多两个，html脚本字符串，多余两个的被忽略，自定义条件事件处理自己绑定
			// 例如：[{label:'楼栋', input:'<select><option value="1">10栋</option></select>'}]
			afterInit:function(queryEle){}, // 初始化之后
			toggleSeniorCallback: null,
			loadCompleteCallback: null
		};
		this.options = $.extend({},this.defaults, opts);
	};

	// 初始化下拉多选
	var InitMultipleSelect = function(that) {
		 $('select[multiple="multiple"]').multipleSelect({
			filter : true,
            addTitle: true,
			minimumCountSelected : 10
		});
	};

	// 初始化代码项选择
	var InitSysCodeSelect = function(that) {
		//迭代所有代码项
        $('.sysCode').each(function(index, ele) {
            //获取当前元素的树参数
            var treeParam= that._get('.sysCode:eq('+index+')').attr('data-treeParam');
            // SelectorReset(ele,treeParam);
            treeParam=JSON.parse(treeParam);//转为对象
            SelectorReset(that._get('.sysCode:eq('+index+')'),treeParam);
        });

	};

    /**
	 * 重置代码字典选择器
     * @param ele 当前的元素
     * @param treeParam 参数指定代码集
     * @constructor
     */
	function SelectorReset(ele,treeParam) {
        ele.hrxljSingleSelectorReset({
            title: '选择代码',//选择器标题，默认是'选择组织机构'
            // selectorPersonType: 'org',
            selectorType: 'hrSysCode',//选择器类型，默认是组织机构选择器
            immediatelyShow: false,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
            gridTitle: '',//列表标题，默认是'组织列表'
            treeUrl: null,
            ajaxType: 'POST',	//ajax的type 默认为post
            treeParam: treeParam,//生成zTree树的参数
            targetId: null,//选择的数据的ID存储input域ID
            targetName: null,//选择的数据的Name存储input域ID
            targetPrefixId: null,//选择的数据的PrefixId存储input域ID
            targetPrefixName: null,//选择的数据的PrefixName存储input域ID
            targetCode: null,//选择数据的编码存储input域ID
            noSelectedDataTip: null,
            selectNodeType: {},//JSON格式,可选节点,其中msg为固定key，显示选择错误提示之用
            // 例：{
            //      msg:'请选择分期',
            //      type:'branch',//指定分期可选
            //      type:'dept',//指定部门可选
            //      type:'company',//指定公司可选
            //      type:'group',//指定项目可选
            //      type:'person',//指定人员可选
            //      type:'post',//指定岗位可选
            //      mold:'role'//指定角色可选
            // }
            /**
             * 保存回调函数
             * @param selectedData 已选择的数据json对象
             * @param ele 绑定选择器的对象
             */
            saveCallback: codeCallback,
            treeSettings: {}
        });
    }
    /**
	 * 代码回调
     * @param data 已选择的数据json对象
     * @param ele 绑定选择器的对象
     */
    function codeCallback(data,ele) {
    	//动态赋值
        var codeId=$(ele).context.dataset['targetid'];
        var codeName=$(ele).context.dataset['targetname'];
        $('#'+codeId+'').val(data.id);
        $('#'+codeName+'').val(data.name);
    }
    
	/**
	 * 初始化双日历选择
	 */ 
	var InitDateRangePicker = function(that) {
		// 双日历选择
		that._get('.searchDateRange').each(function(index, ele) {
            //获取当前元素的值（用来判断是否已初始化）
            if($(ele).val()) {
            	return;
            }
            that._get('.searchDateRange:eq('+index+')').daterangepicker({
    			startDate: moment().startOf('year'), //默认开始日期
    			endDate: moment(), // 默认结束日期
    			autoUpdateInput: false,
    			//minDate: '01/01/2012', //最小时间
    			//maxDate : moment(), //最大时间 
    			//dateLimit : {
    			//	days : 30
    			//}, //起止时间的最大间隔
    			showDropdowns : true,
    			//showWeekNumbers : false, //是否显示第几周
    			//timePicker : true, //是否显示小时和分钟
    			//timePickerIncrement : 60, //时间的增量，单位为分钟
    			//timePicker12Hour : false, //是否使用12小时制来显示时间
    			showCustomRangeLabel : false,
    			alwaysShowCalendars : true,
    			autoApply : false,
    			ranges : {
    				//'最近1小时': [moment().subtract('hours',1), moment()],
    				'今日': [moment().startOf('day'), moment()],
                    '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
                    '当月': [moment().startOf('month'), moment()],
                    '最近7日': [moment().subtract('days', 6), moment()],
                    '最近30日': [moment().subtract('days', 29), moment()]
    			},
    			opens : 'left', //日期选择框的弹出位置
    			buttonClasses : [ 'btn btn-default' ],
    			applyClass : 'btn-small btn-primary blue',
    			cancelClass : 'btn-small',
    			locale : {
    				separator : that.options.seniorSeparator,
    				format : 'YYYY-MM-DD', //控件中from和to 显示的日期格式
    	            direction: 'ltr',
    				applyLabel : '确定',
    				cancelLabel : '取消',
    				fromLabel : '起始时间',
    				toLabel : '结束时间',
    				customRangeLabel : '自定义',
    				daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
    				monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
    				firstDay : 1
    			}
    		}, function(start, end, label) {//格式化日期显示框
              	$(this).val(start.format('YYYY-MM-DD') + that.options.seniorSeparator + end.format('YYYY-MM-DD'));
            });
        });
	};
	
	HrQueryCondition.prototype = {
		// 初始化
		_init: function() {
			var that = this;
			this.$element.css({
				'margin-bottom': '4px'
			});
			// 加载HTML
			this.$element.load('/static/hr/common/querycondition/query-condition.html', function(){
				// 显示高级查询
				if (that.options.seniorContainer !== null && $(that.options.seniorContainer).length > 0) {
					// 收起/展开
					that._get('#collapseSearchBtn').show().on('click', function(){
						var toggleHeight = 0;
						$(this).children('i').toggleClass('fa-angle-down fa-angle-up');
						if(!$('#collapseSearchSpan').html() || $('#collapseSearchSpan').html() == '收起') {
							// 点击收起
							$("#queryToolBar").css({
								'margin-top':'0px'
							});
							$('#collapseSearchSpan').html("展开");
							$(".hiddenTd").hide();
							seniorCheckCount = 0;
							toggleHeight = 1; //展开
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
												// 默认查询条件
												if(colModel[idx].querydefault && that._get('.condition-table tr th:eq('+(seniorCheckCount+2)+')').length > 0) {
													//将默认查询的设为选中状态 否则上面查询条件加载出来了，下面高级查询的选中处于非选中状态
                                                    $('#chk_'+colModel[idx].name+'').prop("checked","checked");
													var tmp = that._get('.condition-table tr th:eq('+(seniorCheckCount+2)+')').show().find('label').text(colNames[idx]+'').end().next().show();
													if(tmp.children('input').attr('name') == undefined && tmp.children('select').attr('name') == undefined) {
														// 日期
														if(colModel[idx].querytype == $.hrQry.querytype.date) {
															tmp.append('<input type="text" class="form-control searchDateRange addInputWidth1" name="'+colModel[idx].name
																	+'" placeholder="'+colNames[idx]+'">');
														} 
														// 数字
														else if(colModel[idx].querytype == $.hrQry.querytype.number) {
															tmp.append('<input type="开始'+colModel[idx].querytype+'" class="form-control addInputWidth3" name="'+colModel[idx].name
																	+'" placeholder="'+colNames[idx]+'">');
															tmp.append('<input type="结束'+colModel[idx].querytype+'" class="form-control addInputWidth3" name="'+colModel[idx].name
																	+'" placeholder="'+colNames[idx]+'">');
														}
														// 下拉列表
														else if(colModel[idx].querytype == $.hrQry.querytype.list) {
															var selHtml = '<select name="'+colModel[idx].name+'" class="form-control multiple-select addInputWidth1" multiple="multiple" data-placeholder="'+colNames[idx]+'" size="1">';
															if(colModel[idx].listoption && colModel[idx].listoption.length > 0) {
																for(var idx1 = 0; idx1 < colModel[idx].listoption.length; idx1++) {
																	selHtml += '<option value="'+colModel[idx].listoption[idx1].value+'">'+colModel[idx].listoption[idx1].name+'</option>';
																}
															}
															selHtml += '</select>';
															tmp.append(selHtml);
														}
														// 代码
														else if(colModel[idx].querytype == $.hrQry.querytype.sysCode) {
															tmp.append('<input type="text" class="form-control addInputWidth" id="'+colModel[idx].name
																	+'_name" name="'+colModel[idx].name
																	+'_name" data-required="true" data-placeholder="'+colNames[idx]+'" readonly="readonly" placeholder="'+colNames[idx]+'"/>'
																	+'<input type="hidden" id="'+colModel[idx].name+'" name="'+colModel[idx].name+'" class="form-control addInputWidth"/>'
																	+'<div class="input-group-addon">'
																	+'  <a class="glyphicon glyphicon-remove" onclick="emptyInfo(\''+colModel[idx].name+'_name\',\''+colModel[idx].name+'\')"></a>'
																	+'</div>'
																	+'<span class="input-group-addon hr-single-selector sysCode" data-selectorType="hrSysCode" data-title="选择代码"'
																	+'  data-savecallback="" data-treeParam=\'{"code_set_id":"'+colModel[idx].querycodeset+'"}\''
																	+'  data-targetname="'+colModel[idx].name+'_name" data-targetId="'+colModel[idx].name+'">'
																	+'  <a class="fa fa-ellipsis-h" data-selectorType=""></a>'
																	+'</span>'
											                );
														}
														// 代码集
														else if(colModel[idx].querytype == $.hrQry.querytype.sysCodeSet) {
															tmp.append('<input type="text" class="form-control addInputWidth" name="'+colModel[idx].name
																	+'_name" data-required="true" data-placeholder="'+colNames[idx]+'" readonly="readonly" placeholder="'+colNames[idx]+'"/>'
																	+'<input type="hidden" name="'+colModel[idx].name+'" class="form-control addInputWidth"/>'
																	+'<div class="input-group-addon">'
																	+'  <a class="glyphicon glyphicon-remove" onclick="emptyInfo(\''+colModel[idx].name+'_name\',\''+colModel[idx].name+'\')"></a>'
																	+'</div>'
																	+'<span class="input-group-addon hr-single-selector" data-selectorType="hrSysCodeSet" data-title="选择代码集"'
																	+'  data-savecallback="" data-targetname="'+colModel[idx].name+'_name" data-targetId="'+colModel[idx].name+'">'
																	+'  <a class="fa fa-ellipsis-h" data-selectorType=""></a>'
																	+'</span>'
															);
														}
														// 默认文本
														else {
															tmp.append('<input type="'+colModel[idx].querytype+'" class="form-control addInputWidth1" name="'+colModel[idx].name
																	+'" placeholder="'+colNames[idx]+'">');
														}
													}
													seniorCheckCount += 1;
												}
												
												// 高级查询下拉选项
												var tmp1 = that._get('.dropdown-menu li input[value="'+colModel[idx].name+'"]');
												if(!tmp1 || tmp1 == undefined || tmp1.length == 0) {
													if (queryIndex > 2) {
														that._get('.dropdown-menu').append('<li role="presentation" class="divider"></li>');
													}
													var liHtml = '<li role="presentation">'
														+ '  <input type="checkbox" class="senior-search-checkbox" id="'
														+ 'chk_'+colModel[idx].name+'" value="'+colModel[idx].name+ '"'
														+ (colModel[idx].querydefault ? ' checked="checked" ' : '');
													if(colModel[idx].listoption && colModel[idx].listoption.length > 0) {
														var listValue = '';
														var listName = '';
														for(var idx1 = 0; idx1 < colModel[idx].listoption.length; idx1++) {
															if(idx1 == 0) {
																listValue += colModel[idx].listoption[idx1].value;
																listName += colModel[idx].listoption[idx1].name;
															} else {
																listValue += ',' + colModel[idx].listoption[idx1].value;
																listName += ',' + colModel[idx].listoption[idx1].name;
															}
														}
														liHtml += ' listValue="' + listValue +'" listName="' + listName + '"';
													}
													liHtml += ' querytype="'+colModel[idx].querytype+'" showvalue="'+colNames[idx]+'">'
														+ colNames[idx]
														+ '</li>';
													that._get('.dropdown-menu').append(liHtml);
												}
											}
										}
										
										// 初始化下拉多选
										InitMultipleSelect(that);
										
										// 初始化双日历选择
										InitDateRangePicker(that);

										// 初始化代码项选择
                                        InitSysCodeSelect(that);

										// 高级查询
										that._get('.senior-search-checkbox').on('click', function(){
											// 选中
											if($(this).is(':checked')) {
												if(seniorCheckCount >= $.hrQry.maxCheckCount) {
													$(this).checked = false;
													$.xljUtils.tip('blue', '高级查询条件最多可以设置4个进行组合');
													return false;
												} else {
													seniorCheckCount += 1;
												}
												
												var tmp = that._get('.condition-table tr td input[name="'+$(this).val()+'"]');
												if(tmp.length == 0) {
													tmp = that._get('.condition-table tr td select[name="'+$(this).val()+'"]');
												}
												if(!tmp.attr('name')) {
													for(var idx = 0; idx < $.hrQry.maxCheckCount ; idx++) {
														var tmp1 = that._get('.condition-table tr th:eq('+(idx+2)+')');
														if(tmp1.length > 0 && tmp1[0].style.display == 'none') {
															tmp1.show().find('label').text($(this).attr('showvalue')+'');
															
															// 日期
															if($(this).attr('querytype') == $.hrQry.querytype.date) {
																tmp1.next().show().append('<input type="text" class="form-control searchDateRange addInputWidth1" name="'+$(this).val()
																		+'" placeholder="'+$(this).attr('showvalue')+'">');
															} 
															// 数字
															else if($(this).attr('querytype') == $.hrQry.querytype.number) {
																tmp1.next().show().append('<input type="'+$(this).attr('querytype')+'" class="form-control addInputWidth3" name="'+$(this).val()
																		+'" placeholder="开始'+$(this).attr('showvalue')+'">');
																tmp1.next().show().append('<input type="'+$(this).attr('querytype')+'" class="form-control addInputWidth3" name="'+$(this).val()
																		+'" placeholder="结束'+$(this).attr('showvalue')+'">');
															}
															// 下拉列表
															else if($(this).attr('querytype') == $.hrQry.querytype.list) {
																var selHtml = '<select name="'+$(this).val()+'" class="form-control multiple-select addInputWidth1"  multiple="multiple" data-placeholder="'+$(this).attr('showvalue')+'" size="1">';
																if($(this).attr('showvalue') && $(this).attr('showvalue').split(',').length > 0) {
																	var listValue = $(this).attr('listValue').split(',');
																	var listName = $(this).attr('listName').split(',');
																	for(var idx1 = 0; idx1 < listValue.length; idx1++) {
																		selHtml += '<option value="'+listValue[idx1]+'">'+listName[idx1]+'</option>';
																	}
																}
																selHtml += '</select>';
																tmp1.next().show().append(selHtml);
															}
															// 代码
															else if($(this).attr('querytype') == $.hrQry.querytype.sysCode) {
																//选择的迭代序号，和初始化的不同
																var codecolidx=0;//当前代码的索引
                                                                for(var i=0;i<colModel.length;i++){
                                                                    //如果列定义=当前指定代码的值
                                                                    if(colModel[i].name==$(this).val()){
                                                                        codecolidx=i;//摘除索引
                                                                        break;
                                                                    }
																}
																tmp1.next().show().append('<input type="text" class="form-control addInputWidth" id="'+$(this).val()
                                                                    	+'_name" name="'+$(this).val()
																		+'_name" data-required="true" data-placeholder="'+$(this).attr('showvalue')+'" readonly="readonly" placeholder="'+$(this).attr('showvalue')+'"/>'
																		+'<input type="hidden" id="'+$(this).val()+'" name="'+$(this).val()+'" class="form-control addInputWidth"/>'
																		+'<div class="input-group-addon">'
																		+'  <a class="glyphicon glyphicon-remove" onclick="emptyInfo(\''+$(this).val()+'_name\',\''+$(this).val()+'\')"></a>'
																		+'</div>'
																		+'<span class="input-group-addon hr-single-selector sysCode" data-selectorType="hrSysCode" data-title="选择代码"'
																		+'  data-savecallback="" data-treeParam=\'{"code_set_id":"'+colModel[codecolidx].querycodeset+'"}\''
																		+'  data-targetname="'+$(this).val()+'_name" data-targetId="'+$(this).val()+'">'
																		+'  <a class="fa fa-ellipsis-h" data-selectorType=""></a>'
																		+'</span>'
												                );
															}
															// 代码集
															else if($(this).attr('querytype') == $.hrQry.querytype.sysCodeSet) {
																tmp1.next().show().append('<input type="text" class="form-control addInputWidth" name="'+$(this).val()
																		+'_name" data-required="true" data-placeholder="'+$(this).attr('showvalue')+'" readonly="readonly" placeholder="'+$(this).attr('showvalue')+'"/>'
																		+'<input type="hidden" name="'+$(this).val()+'" class="form-control addInputWidth"/>'
																		+'<div class="input-group-addon">'
																		+'  <a class="glyphicon glyphicon-remove" onclick="emptyInfo(\''+$(this).val()+'_name\',\''+$(this).val()+'\')"></a>'
																		+'</div>'
																		+'<span class="input-group-addon hr-single-selector" data-selectorType="hrSysCodeSet" data-title="选择代码集"'
																		+'  data-savecallback="" data-targetname="'+$(this).val()+'_name" data-targetId="'+$(this).val()+'">'
																		+'  <a class="fa fa-ellipsis-h" data-selectorType=""></a>'
																		+'</span>'
													                );
															}
															// 默认文本
															else {
																tmp1.next().show().append('<input type="'+$(this).attr('querytype')+'" class="form-control addInputWidth1" name="'+$(this).val()
																		+'" placeholder="'+$(this).attr('showvalue')+'">');
															}
															break;
														}
													}
												} else {
													tmp.parent().show();
													tmp.parent().prev().show();
												}
											}
											// 取消选中
											else {
												seniorCheckCount -= 1;
												var tmp = that._get('.condition-table tr td input[name="'+$(this).val()+'"]');
												if(tmp.length == 0) {
													tmp = that._get('.condition-table tr td select[name="'+$(this).val()+'"]');
												}
												if(tmp.attr('name')) {
													tmp.parent().prev().hide().find('label').text('');
													tmp.parent().hide().empty();
												}
											}

											// 初始化下拉多选
											InitMultipleSelect(that);
											
											// 初始化双日历选择
											InitDateRangePicker(that);

                                            // 初始化代码项选择
                                            InitSysCodeSelect(that);
										});
									} catch(e) {
										console.info(e);
										$.xljUtils.tip('red', '自定义条件html脚本错误');
									}
								}
							}

							// 点击展开
							var rWinWidth = $(".common-condition").width();
							if(rWinWidth > 1125) {
								$("#queryToolBar").css({
									'margin-top':'64px'
								});
							} else {
								$("#queryToolBar").css({
									'margin-top':'0px'
								});
							}
							$('#collapseSearchSpan').html("收起");
							$(".hiddenTd").show();
							toggleHeight = -1; //收起
						}
						
						// 调用回调函数调整网格列表高度
						if (that.options.toggleSeniorCallback && that.options.toggleSeniorCallback.constructor === Function) {
							that.options.toggleSeniorCallback(toggleHeight);
						}
					});
					
					// 调用加载完高级查询条件后回调函数
					if (that.options.loadCompleteCallback && that.options.loadCompleteCallback.constructor === Function) {
						that.options.loadCompleteCallback();
					}
				}

				// 更新条件显示标签
				that._get('.condition-table tr th:eq(1) label').text(
					$.hrQry.selectNodeTypeName[that.options.selectNodeType] + ''
				);
				
				// 查询按钮事件
				that._get('#searchFormBtn').on('click', function() {
					var postData = {};
					var $eles = that._get('.condition-table tr td input[name]');
					$eles.each(function(index, ele) {
						if(postData[$(ele).attr('name')] && $(ele).val()) {
							postData[$(ele).attr('name')]=postData[$(ele).attr('name')] + that.options.seniorSeparator + $(ele).val();
						} else {
							postData[$(ele).attr('name')]=$(ele).val();
						}
					});
					
					//下拉多选单独处理
					$eles = that._get('.condition-table tr td select[name]');
					$eles.each(function(index, ele) {
						var listValue = '';
						if($(ele).val() && $(ele).val().length > 0) {
							var listArrayValue = $(ele).val();
							for(var idx1 = 0; idx1 < listArrayValue.length; idx1++) {
								if(!listValue) {
									listValue = listArrayValue[idx1];
								} else {
									listValue += ',' + listArrayValue[idx1];
								}
							}
						}
						if(postData[$(ele).attr('name')] && $(ele).val()) {
							postData[$(ele).attr('name')]=postData[$(ele).attr('name')] + ',' + listValue;
						} else {
							postData[$(ele).attr('name')]=listValue;
						}
					});
					
					// 调用回调函数
					if (that.options.queryHandler && that.options.queryHandler.constructor === Function) {
						that.options.queryHandler(postData);
					}
				});

				// 重置清空条件，调用查询
				that._get('#resetConditionBtn').on('click', function() {
					that._get('.condition-table tr td input').val('');
					that._get('select[multiple="multiple"]').multipleSelect('uncheckAll');//清空下拉多选值
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

	//清空信息
	window.emptyInfo=function (id,hiddenId){
		$("#"+id).val("");
		$("#"+hiddenId).val("");
		queryByConditon();
	}
})(jQuery, window, document);
