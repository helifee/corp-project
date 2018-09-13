(function() {
	var nodeHeight = 120, nodeWidth = 80;
	var rootHeight = 30, rootWidth = 160;
	var lineWidth = 2, lineHeight = 10;
	var border = 2, dist = 25, minLeft = 100, fontDef=14;
	var font=[14,14,14,14,10,10,10,10,10];
	var bgColor = ['lightblue', '#91d8ff', '#81dea5', '#a296d3', '#95c3d5', 'green'];
	
	/**
	 * 创建组织图.
	 * @param {Object} data 数据.
	 * @param {Object} container 容器.
	 * @param {int} width 宽度.
	 * @param {int} height 高度.
	 * @param {int} showLevel 显示层数.
	 */
	var createOrgMap = function(data, container, width, height, showLevel) {
		if (!showLevel || showLevel < 1) showLevel = 100;
		cutLevel(data, showLevel);
		var leaps = getLeap(data);
		for (var i = 0; i < leaps.length; i++) {
			leaps[i]._left = i * nodeWidth;
			leaps[i]._wcnt = 1;
		}
		var offset = data._depth ? data._depth : 0;
		calcDepth(data, offset, true);
		
		Element.update($(container), '<div class="position_rel float_l" style="overflow:auto;width:' + width + 'px;height:' + height + 'px;"><div class="position_rel" style="height:auto;margin:0 auto;"></div></div>');
		$(container)._width = width;
		$(container)._height = height;
		
		$(container).down(1).setStyle({
			width: data._wcnt * nodeWidth + 'px'
		});
		drawNode($(container).down(1), data, offset, true);
		return;
	};
	/**
	 * 根据显示层数进行处理.
	 * @param {Object} data 数据.
	 * @param {int} level 层数.
	 */
	var cutLevel = function(data, level) {
		if (level == 1) {
			data.end = true;
		} else {
			data.end = false;
			if (data.childs && data.childs.length > 0) {
				for (var i = 0; i < data.childs.length; i++) {
					cutLevel(data.childs[i], level - 1);
				}
			}
		}
	};
	/**
	 * 绘制节点.
	 * @param {Object} panel 容器.
	 * @param {Object} data 数据.
	 * @param {int} offset 基本偏移.
	 * @param {bool} root 是否根节点.
	 */
	var drawNode = function(panel, data, offset, root) {
		var arr = data.childs;
		var last, txt, bar, ico;
		$(panel).insert({
			bottom: last = new Element('div').addClassName('position_abs orgBar').setStyle({
				width: nodeWidth + 'px',
				height: nodeHeight + 'px',
				left: data._left + 'px',
				top: (data._depth - offset) * nodeHeight + 'px'
				//,background: 'red'
			})
		});
		if (!root) {
			last.insert({
				bottom: new Element('div').addClassName('position_abs').setStyle({
					width: lineWidth + 'px',
					height: lineHeight + 'px',
					background: 'black',
					top: '0px',
					left: nodeWidth / 2 + 'px'
				})
			});
		}
		if (!root) {
			last.insert({
				bottom: txt = new Element('div').addClassName('position_abs').setStyle({
					width: nodeWidth - dist * 2 - border * 2 + 'px',
					height: nodeHeight - lineHeight * 2 - border * 2 + 'px',
					background: bgColor[data.type],
					top: lineHeight + 'px',
					left: dist + 'px',
					border: border + 'px solid #666',
					cursor: 'pointer'
				}).insert({
					top: new Element('div').setStyle({
						margin: (nodeHeight - lineHeight * 2 - border * 2 - (font[data.type] + 2) * data.name.length) / 2 + 'px auto',
						width: font[data.type] + 'px',
						lineHeight: font[data.type] + 2 + 'px',
						wordWrap: 'break-word',
						fontSize: font[data.type] + 'px'
					}).update(data.name).writeAttribute({
						'title':data.bufferName
					})
				}).observe('click', defClick)
			});
			last.insert({
				bottom: new Element('div').addClassName('position_abs').setStyle({
					margin: '5px 0px',
					width: fontDef + 'px',
					lineHeight: fontDef + 2 + 'px',
					fontSize: fontDef + 'px',
					wordWrap: 'break-word',
					top: lineHeight + 'px',
					left: nodeWidth - dist + 2 + 'px'
				}).update(data.desc)
			});
			last.insert({
				bottom: bar = new Element('div').addClassName('position_abs').setStyle({
					padding: '5px',
					top: lineHeight + 'px',
					height: nodeHeight - lineHeight * 2 - 10 + 'px',
					left: nodeWidth - dist + 'px',
					background: '#fff'
				}).addClassName('none')
			});
			if (data.bar1) {
				makeFloat(txt, bar);
				bar.data = data;
			}
			last.data = data;
			for (var i = 1; i < 10; i++) {
				if (data['bar' + i] && data['bar' + i].length > 0) {
					bar.insert({
						bottom: data['bar' + i]
					});
				} else {
					break;
				}
			}
		} else {
			last.insert({
				bottom: txt = new Element('div').addClassName('position_abs text_center').setStyle({
					width: rootWidth - border * 2 + 'px',
					height: rootHeight - border * 2 + 'px',
					lineHeight: rootHeight - border * 2 + 'px',
					background: bgColor[data.type],
					top: nodeHeight - lineHeight - rootHeight + 'px',
					left: (nodeWidth - rootWidth) / 2 + 'px',
					border: border + 'px solid #666',
					fontSize: font[data.type] + 'px'
				}).update(data.name)
			});
			last.insert({
				bottom: bar = new Element('div').addClassName('position_abs').setStyle({
					padding: '5px',
					top: nodeHeight - lineHeight - rootHeight + 'px',
					width: nodeHeight - lineHeight * 2 - 10 + 'px',
					left: (rootWidth/2 + nodeWidth/2) + 'px',
					background: '#fff'
				}).addClassName('none')
			});
			if (data.bar1) {
				makeFloat(txt, bar);
				bar.data = data;
			}
			last.data = data;
			for (var i = 1; i < 10; i++) {
				if (data['bar' + i] && data['bar' + i].length > 0) {
					bar.insert({
						bottom: data['bar' + i]
					});
				} else {
					break;
				}
			}
		}
		if (!arr || arr.length == 0 || data.end) {
			return null;
		}
		last.insert({
			bottom: new Element('div').addClassName('position_abs').setStyle({
				height: lineHeight + 'px',
				width: lineWidth + 'px',
				background: 'black',
				top: nodeHeight - lineHeight + 'px',
				left: nodeWidth / 2 + 'px'
			})
		});
		$(panel).insert({
			bottom: new Element('div').addClassName('position_abs').setStyle({
				height: lineWidth + 'px',
				width: arr[arr.length - 1]._left - arr[0]._left + 'px',
				left: arr[0]._left + nodeWidth / 2 + 'px',
				top: nodeHeight * (arr[0]._depth - offset) + 'px',
				background: 'black',
				overflow: 'hidden'
			})
		});
		for (var i = 0; i < arr.length; i++) {
			drawNode(panel, arr[i], offset);
		}
	};
	/**
	 * 获取叶子节点.
	 * @param {Object} data 数据.
	 */
	var getLeap = function(data) {
		var arr = data.childs;
		if (!arr || arr.length == 0 || data.end) {
			return [];
		}
		var leaps = [];
		for (var i = 0; i < arr.length; i++) {
			if (!arr[i].childs || arr[i].childs.length == 0 || arr[i].end) {
				leaps.push(arr[i]);
			} else {
				leaps = leaps.concat(getLeap(arr[i]));
			}
			arr[i].parent = data;
		}
		return leaps;
	};
	/**
	 * 计算深度和宽度.
	 * @param {Object} data 数据.
	 * @param {int} base 起始深度.
	 * @param {bool} root 是否根节点.
	 */
	var calcDepth = function(data, base, root) {
		var arr = data.childs;
		if (!arr || arr.length == 0 || data.end) {
			data._depth = base;
			if (root) {
				data._left = (rootWidth - nodeWidth) / 2 + minLeft;
			}
			return null;
		}
		data._depth = base;
		data._wcnt = 0;
		for (var i = 0; i < arr.length; i++) {
			calcDepth(arr[i], base + 1);
			data._wcnt += arr[i]._wcnt;
		}
		data._left = (arr[0]._left + arr[arr.length - 1]._left) / 2;
	};
	/**
	 * 获取触发节点的数据(仅用于图标按钮事件中).
	 */
	var getNodeData = function() {
		var event = getEvent();
		var bar = Element.up(Event.element(event),'.orgBar');
		return bar.data ? bar.data : null;
	};
	
	var defClick = function(event){
		var n = Element.up(Event.element(event),'.orgBar').data;
		if(n.subCountFlg == 1){
			watchDeptOrg();
		}
	};
	window.createOrgMap = createOrgMap;
	window.getNodeData = getNodeData;
})();
