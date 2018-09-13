/*
 * 全文检索js
 * 创建者：haoqipeng 2017-04-15
 */

;(function($, window, document, undefined) {
	
	// 分页栏显示的分页范围数目
	var pageRangeSize = 10	
	// 检索类型：normal 常规检索，senior 高级检索
	, searchTypeEnum = {normal:1, senior:2} 
	// 最后一次检索类型
	, lastSearchType = searchTypeEnum.normal;
	
	/**
	 * 初始化检索分类
	 * 
	 * @returns
	 */
	function initSearchCategoryTab() {
		$('.flow-tab').append($('<a href="#" class="active">全部</a>'));
		
		// 查询检索分类
		$.xljUtils.xljAjax({
			url : serviceUrl + 'univ/search/searchCategory/queryList',
			data:'{}'
		}, function(resultData) {
			if (resultData != null && resultData.length > 0) {
				$.each(resultData, function(index, item){
					$('.flow-tab').append($('<a href="#"/>').attr('data-type', item.code).text(item.name));
				});
			}
		});
	}

	/**
	 * 常规检索
	 * @param {Number} pageNo 当前页码
	 */
	function doSearch(pageNo) {
		// 查询条件
		var parameters = getSearchParameters(pageNo);
		
		if (parameters.keyword == '') {
			return;
		}
		
		// console.log('----- doSearch -----');
		$.xljUtils.xljAjax({
			url : serviceUrl + 'univ/search/searchIndex/pageFullTextQuery',
			data:JSON.stringify(parameters)
		}, function(resultData) {
			// console.log('----- doSearch show result  esDocType = '+parameters.esDocType+'-----');
			lastSearchType = searchTypeEnum.normal;
			if ($('.flow-tab a.active').attr('data-type') == parameters.esDocType) {
				showResultList(resultData);
			}
		});
		
	}
	
	/**
	 * 高级检索，添加高级查询条件
	 * @param {Number} pageNo 当前页码
	 * @returns
	 */
	function doSeniorSearch(pageNo) {
		// 查询条件
		var parameters = getSearchParameters(pageNo);
		
		// 高级查询条件
		var seniorParametersObject = $('.senior-box input').serializeObject();
		var createStartDate = seniorParametersObject.createStartDate;
		var createEndDate = seniorParametersObject.createEndDate;
		delete seniorParametersObject.createStartDate;
		delete seniorParametersObject.createEndDate;
		if (createStartDate.length == 16) {
			createStartDate += ':00';
		}
		if (createEndDate.length == 16) {
			createEndDate += ':59';
		}
		
		seniorParametersObject.createDate = {start:createStartDate,end:createEndDate};
		
		parameters.seniorParameters = seniorParametersObject;
		//parameters.keyword = '';
		
		$.xljUtils.xljAjax({
			url : serviceUrl + 'univ/search/searchIndex/pageFullTextQuery',
			data:JSON.stringify(parameters)
		}, function(resultData) {
			lastSearchType = searchTypeEnum.senior;
			if ($('.flow-tab a.active').attr('data-type') == parameters.esDocType) {
				showResultList(resultData);
			}
		});
		
	}
	
	/**
	 * 检索分类切换时执行查询操作
	 * 
	 * @param {Number} pageNo 当前页码
	 */
	function doSearchBySwitch(pageNo){
		// console.log('------- doSearchBySwitch --------');
		if (lastSearchType == searchTypeEnum.normal) {
			// console.log('------- doSearchBySwitch normal --------');
			doSearch(pageNo);
		} else {
			doSeniorSearch(pageNo);
		}
	}
	
	/**
	 * 取得查询条件
	 * @param {Number} pageNo 当前页码
	 */
	function getSearchParameters(pageNo) {
		/// 全文检索条件
		var parameters = {};
		
		// 每页记录数
		var pageSize = parseInt($('.page .pageevery select').val());
		if (isNaN(pageSize)) {
			pageNo = 20;
		}
		
		// 第几页
		if (isNaN(pageNo) || pageNo < 1) pageNo = 1
		
		parameters.start = (pageNo - 1)*pageSize + '';
		parameters.limit = pageSize + '';
		// 检索索引  已在controller里设置为租户ID
		parameters.esDocIndex = '001';
		// 检索分类
		parameters.esDocType = $('.flow-tab a.active').attr('data-type');
		// 排序
		parameters.orderby = $('.dropdown-orderby li.selected').attr('data-orderby');
		parameters.sortOrder = 'asc';
		// 检索关键词
		parameters.keyword = $('.keyword-input').val();
		// 匹配内容高亮标签
		parameters.hilightPreTag = '<span class="hit" style="margin:0;padding:0;">';
		parameters.hilightPostTag = '</span>'
		
		return parameters;
	}
	
	/**
	 * 显示检索结果
	 * 
	 * @param {object} resultData 查询结果
	 * @returns
	 */
	function showResultList(resultData) {
		// console.log('----- showResultList -----');
		
		$(".list-box .cont-box").empty();
		$('.record-total-num').show();
		$('.tit-num #num').text(resultData.total);
		if (resultData.list != null && resultData.list.length > 0) {
			var resultItemHtmls = [];
			$.each(resultData.list, function(index, item){
				resultItemHtmls = [];
				resultItemHtmls.push('<div class="item">');
				resultItemHtmls.push('	<div class="tit">');
				resultItemHtmls.push('		<a href="',$.xljUtils.isEmpty(item.contentObject.url)?'#':item.contentObject.url,'" target="_blank">',item.contentObject.title,'</a>');
				resultItemHtmls.push('	</div>');
				resultItemHtmls.push('	<div class="con">',item.contentObject.content);
				resultItemHtmls.push('	</div>');
				// 显示附件名列表
				resultItemHtmls.push(createAttachmentItemsHtml(item.contentObject.files));
				resultItemHtmls.push('	<div class="foot">');
				resultItemHtmls.push('		<label>发起人 : &nbsp;</label><span>',item.contentObject.createPersonName,'</span> <label>发起时间 : &nbsp;</label><span>',formatDate(item.contentObject.createDate));
//				resultItemHtmls.push('			 </span>', createAttachmentDownloadAll(item.contentObject.files));
				resultItemHtmls.push('			 </span>');
				resultItemHtmls.push('	</div>');
				resultItemHtmls.push('</div>');
				
				$(resultItemHtmls.join('')).appendTo($(".list-box .cont-box"));
				
			});
		}
		// 显示分页
		showPage(resultData);
	}
	
	/**
	 * 创建附件名列表显示内容
	 * 
	 * @param {Array} files 附件列表
	 */
	function createAttachmentItemsHtml(files) {
		if (files != undefined && files != null && files.constructor === Array && files.length > 0) {
			var wholeHtml = ['<div class="file"><label class="tit">附件:</label>'];
			$.each(files, function(index, val){
				wholeHtml.push('<span class="file-name" data-param="', encodeURIComponent(JSON.stringify({"name":val.fullName,"fullName":val.fullName,"path":val.path})) ,'">', val.fullName, '</span>');
			});
			wholeHtml.push('</div>');
			return wholeHtml.join('')
		}
	}

	/**
	 * 显示附件信息下载
	 * 
	 * @param {Array} files 附件列表
	 * @returns
	 */
	function createAttachmentDownloadAll(files) {
		if (files != undefined && files != null && files.constructor === Array) {
			var downloadJsonParam = [];
			$.each(files, function(index, val){
				downloadJsonParam.push({"name":val.fullName,"fullName":val.fullName,"path":val.path});
			});
			if (downloadJsonParam.length > 0) {
				return '<a href="#" class="a-all-download" data-files="'+encodeURIComponent(JSON.stringify(downloadJsonParam))+'">批量下载附件</a>';
			}
		}
		return '';
	}
	
	
	/**
	 * 显示分页
	 * @param {object} pageObj 分页数据对象
	 * @returns
	 */
	function showPage(pageObj) {
		if (pageObj.total == 0) {
			$('.page-number').empty();
		} else {
			
			var pageHtmls = [];
			
			// 计算总页数
			var pageCount = parseInt(pageObj.total/pageObj.limit) + ((pageObj.total%pageObj.limit>0)?1:0);
			
			// 计算当前页
			var curPageNo = parseInt((pageObj.start + 1)/pageObj.limit);
			if ((pageObj.start + 1)%pageObj.limit > 0) {
				curPageNo += 1;
			}
			
			// 计算首页
			var firstPage = parseInt(curPageNo / pageRangeSize) * pageRangeSize + 1;
			
			var lastPage = firstPage + pageRangeSize - 1;
			if (lastPage > pageCount) {
				lastPage = pageCount;
			}
			
			// 是否显示上一页
			if (curPageNo > firstPage) {
				pageHtmls.push('<a href="#" class="turn-page previous-page">上一页</a>');
			}
			
			for (var i = firstPage; i <= lastPage; i++) {
				pageHtmls.push('<a href="#">',i,'</a>');
			}
			
			// 是否显示下一页
			if (curPageNo < pageCount) {
				pageHtmls.push('<a href="#" class="turn-page next-page">下一页</a>');
			}
			
			var $pageBar = $('.page-number');
			$pageBar.html(pageHtmls.join(''));
			
			$pageBar.find('a:not(.turn-page):eq('+(curPageNo - 1)+')').addClass('active');
			
			$('.pageevery select').val(pageObj.limit + '');
		}
		
	}
	
	/**
	 * 格式化日期
	 * 
	 * @param {Date} date 日期
	 * @param {String} formatter 日期格式化字符串
	 */
	function formatDate(date, formatter) {
		if (date == undefined || date == null) return '';
		if (date.constructor == Number) { 
			date = new Date(date);
		} else if (date.constructor == String) {
			try {
				date = new Date(Number(date));
			} catch(e){
				return '';
			}
		} else if (date.constructor == Date) {
			
		} else if (isNaN(date)) {
			return '';
		}
		if (formatter == undefined || formatter == null) {
			formatter = 'yyyy-MM-dd HH:mm:ss';
		}
		var zeroPad = function(v){return v < 10?('0' + v):('' + v)};
		return formatter.replace(/yyyy|MM|dd|HH|mm|ss/g, function(p){
			switch(p){  
				case 'yyyy':  
					return zeroPad(date.getFullYear());  
				case 'MM':  
					return zeroPad(date.getMonth() + 1);  
				case 'mm':  
					return zeroPad(date.getMinutes());  
				case 'dd':  
					return zeroPad(date.getDate());    
				case 'HH':  
					return zeroPad(date.getHours());    
				case 'ss':  
					return zeroPad(date.getSeconds());    
			} 
		});
	}
	
	/**
	 * 创建日期辅助下拉框change事件
	 */
	function createDateAssistChange(){
		var dateHelpeValue = $(this).val();
		
		// 当前时间
		var startDate = new Date();
		var endDate = new Date(startDate.getTime());
		
		switch (dateHelpeValue) {
			case '1':
				// 最近一周
				startDate.setDate(startDate.getDate() - 7);
				break;
			case '2':
				// 最近一个月
				startDate.setMonth(startDate.getMonth() - 1);
				break;
			case '3':
				// 最近三个月
				startDate.setMonth(startDate.getMonth() - 3);
				break;
			default:
				startDate = null;
				endDate = null;
		}
		
		// 设置开始时间
		var startDateStr = formatDate(startDate);
		var endDateStr = formatDate(endDate);
		if (startDateStr.length > 16) {
			startDateStr = startDateStr.substring(0, 16);
		}
		if (endDateStr.length > 16) {
			endDateStr = endDateStr.substring(0, 16);
		}
		$('input[name="createStartDate"]').val(startDateStr);
		$('input[name="createEndDate"]').val(endDateStr);
	}

	$(function() {
		
		// 初始化分类
		initSearchCategoryTab();
		
		// 隐藏总记录数
		$('.record-total-num').hide();
		
		// 搜索框回车事件，执行查询
		$('.keyword-input').on('keydown', function(e){
			if (e.keyCode == 13) {
				// 失去焦点
				$(this).blur();
				// 调用检索
				doSearch(1);
			}
		});
		
		// 检索按钮点击事件，执行查询
		$('.search-btn').on('click', function(){
			// 调用检索
			doSearch(1);
		});
		
		// 高级检索
		$('.senior-search-btn').on('click', function(e){
			// 调用检索
			doSeniorSearch(1);
			// 隐藏多条件
			$(".senior-box").hide();
			e.stopPropagation();
		});
		
		
		// 定义datatimepicker的日期格式
		$('.form_datetime').datetimepicker({
			language : 'zh-CN',
			format : 'yyyy-mm-dd hh:ii',
			weekStart : 1,
			todayBtn : 1,
			autoclose : 1,
			todayHighlight : 1,
			startView : 2,
			forceParse : 0,
			showMeridian : 1
		});
		
		// 高级检索发布时间变更事件，重置时间辅助下拉项
		$('.search-create-date').change(function(){
			$('.search-create-date-select').val('0');
		});
		
		// 发起时间辅助下拉框选择时间
		$('.search-create-date-select').on('change', createDateAssistChange);

		// 点击 在结果中检索，下拉显示条件项
		$(".senior-a").on("click", function(e) {
			$(".senior-box").toggle();
			e.stopPropagation();
		});
		
		// 高级检索显示
		$(".senior-box").click(function(e) {
			$(this).show();
			e.stopPropagation();
		});
		
		// 选择排序方式显示
		$(".tit-num .order").on("click", function() {
			$(this).toggleClass("active");
		});
		
		// 点击空白 隐藏高级检索或者选择排序方式
		$(document).click(function() {
			$(".senior-box").hide();
			$(".tit-num .order").removeClass("active");
		});
		
		// 种类tab切换
		$(document).on("click", ".flow-tab a", function(e) {
			var index = $(this).index();
			$(this).siblings("a").removeClass("active");
			$(this).addClass("active");
			$('.xj-form-title').text($(this).text() + '检索');
			
			$(".list-box .cont-box").empty();
			$('.tit-num #num').text('0');
			$('.page-number').empty();
			$('.record-total-num').hide();
			// console.log('------- 种类tab切换 -------');
			doSearchBySwitch(1);
			e.stopPropagation();
		});
		
		// 页码链接点击事件
		$('.page-number').on('click', 'a:not(.turn-page):not(.active)', function(e){
			$(this).siblings('.active').removeClass('active').end().addClass('active');
			doSearchBySwitch(parseInt($(this).text()));
			e.stopPropagation();
		});
		
		// 排序事件
		$('.dropdown-orderby').on('click', 'li', function(e){
			$(this).siblings('.selected').removeClass('selected').end().addClass('selected');
			$('.orderby-name-show').text($(this).find('a').text());
			//e.stopPropagation();
		});
		
		// 单文件下载
//		$('.list-box .cont-box').on('click', '.item .file span.file-name', function (e) {
//			var $this = $(this);
//			var fileInfo = JSON.parse(decodeURIComponent($this.attr('data-param')));
//			$.xljUtils.xljDownloadFromFileInfo(fileInfo.path, fileInfo.fullName);
//		});

		// 批量附件下载
		$('.list-box .cont-box').on('click','a.a-all-download', function(e){
			var form1 = $('<form action="' + serviceUrl +'univ/attachment/attachment/downloadAll" method="post"/>')
	        	.append($('<input type="hidden" name="attListJson" value="'+ $(this).attr('data-files') + '"/>'));
			var div1 = $('<div style="width:0;height:0;"/>').appendTo('body');
			div1.append(form1)
			form1.submit();
			div1.remove();
		});
		
		// 上一页/下一页点击事件
		$('.page-number').on('click', 'a.turn-page', function(e){
			var $activePage = $(this).siblings(':not(.turn-page).active');
			var searchPageNo;
			// 下一页
			if (e.target.className.indexOf('next-page') != -1) {
				searchPageNo = parseInt($activePage.text()) + 1;
			} 
			// 上一页
			else {
				searchPageNo = parseInt($activePage.text()) - 1;
			}
			doSearchBySwitch(searchPageNo);
			e.stopPropagation();
		});
		
	});
})(jQuery, window, document);
