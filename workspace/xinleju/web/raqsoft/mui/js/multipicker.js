(function($, document) {
	//创建 DOM
	$.dom = function(str) {
		if (typeof(str) !== 'string') {
			if ((str instanceof Array) || (str[0] && str.length)) {
				return [].slice.call(str);
			} else {
				return [str];
			}
		}
		if (!$.__create_dom_div__) {
			$.__create_dom_div__ = document.createElement('div');
		}
		$.__create_dom_div__.innerHTML = str;
		return [].slice.call($.__create_dom_div__.childNodes);
	};

	var panelBuffer = '<div class="mui-poppicker" style="height:250px">\
		<div class="mui-poppicker-header">\
			<button class="mui-btn mui-poppicker-btn-cancel">取消</button>\
			<button class="mui-btn mui-btn-blue mui-poppicker-btn-ok">确定</button>\
			<div class="mui-poppicker-clear"></div>\
		</div>\
		<div class="mui-poppicker-body">\
		</div>\
	</div>';

	var pickerBuffer = '<div style="height:205px;overflow:auto;">\
		<table id=multiTbl width=100%>\
		</table>\
	</div>';

	//定义弹出选择器类
	var MultiPicker = $.MultiPicker = $.Class.extend({
		//构造函数
		init: function(options) {
			var self = this;
			self.options = options || {};
			self.options.buttons = self.options.buttons || ['取消', '确定'];
			self.panel = $.dom(panelBuffer)[0];
			document.body.appendChild(self.panel);
			self.ok = self.panel.querySelector('.mui-poppicker-btn-ok');
			self.cancel = self.panel.querySelector('.mui-poppicker-btn-cancel');
			self.body = self.panel.querySelector('.mui-poppicker-body');
			self.mask = $.createMask();
			self.cancel.innerText = self.options.buttons[0];
			self.ok.innerText = self.options.buttons[1];
			self.cancel.addEventListener('tap', function(event) {
				self.hide();
			}, false);
			self.ok.addEventListener('tap', function(event) {
				if (self.callback) {
					var items = self.getSelectedItems();
					var rs = self.callback( items[0], items[1] );
					if (rs !== false) {
						self.hide();
					}
				}
			}, false);
			self.mask[0].addEventListener('tap', function() {
				self.hide();
			}, false);
			self._createPicker();
			//防止滚动穿透
			self.panel.addEventListener('touchstart', function(event) {
				event.preventDefault();
			}, false);
			self.panel.addEventListener('touchmove', function(event) {
				event.preventDefault();
			}, false);
		},
		_createPicker: function() {
			var self = this;
			var width = '100%';
			var pickerElement = $.dom(pickerBuffer)[0];
			pickerElement.style.width = width;
			self.body.appendChild(pickerElement);
			self.table = $("#multiTbl")[0];
			pickerElement.addEventListener('touchstart', function(event) {
				event.preventDefault();
				self.startY = (event.changedTouches ? event.changedTouches[0] : event).pageY;
			}, false);
			pickerElement.addEventListener('touchmove', function(event) {
				event.preventDefault();
				var endY = (event.changedTouches ? event.changedTouches[0] : event).pageY;
				var dy = endY - self.startY;
				pickerElement.scrollTop -= dy;
			}, false);
		},
		//填充数据
		setData: function(data) {
			var self = this;
			data = data || [];
			var tbl = self.table;
			for( var i = tbl.rows.length - 1; i >= 0; i-- ) {
				tbl.deleteRow( i );
			}
			for( var i = 0; i < data.length; i++ ) {
				var row = tbl.insertRow( -1 );
				row.style.height = "30px";
				row.setAttribute( "value", data[i].value );
				var cell = row.insertCell( -1 );
				cell.style.textAlign = "center";
				cell.style.width = "70%";
				cell.innerText = data[i].text;
				var cell2 = row.insertCell( -1 );
				cell2.style.textAlign = "center";
				cell2.style.width = "30%";
				cell2.innerHTML = '<div class="mui-input-row mui-checkbox mui-left"><label>&nbsp;</label><input class="multi-checkbox" type="checkbox"></div>';
			}
		},
		//获取选中的项（字符串数组,第一个串为真实值，第二个串为显示值）
		getSelectedItems: function() {
			var self = this;
			var items = [];
			var values = "", disps = "";
			var tbl = self.table;
			for( var i = 0; i < tbl.rows.length; i++ ) {
				var row = tbl.rows[i];
				var box = row.cells[1].childNodes[0].childNodes[1];
				if( box.checked ) {
					if( values.length > 0 ) {
						values += ",";
						disps += ",";
					}
					values += row.getAttribute( "value" );
					disps += row.cells[0].innerText;
				}
			}
			items[0] = values;
			items[1] = disps;
			return items;
		},
		setSelectedItems: function(values) {
			var self = this;
			var tbl = self.table;
			for( var i = 0; i < tbl.rows.length; i++ ) {
				var row = tbl.rows[i];
				var box = row.cells[1].childNodes[0].childNodes[1];
				var value = row.getAttribute( "value" );
				if( ("," + values + ",").indexOf( "," + value + "," ) >= 0 ) {
					box.checked = true;
					box.scrollIntoView();
				}
				else box.checked = false;
			}
		},
		//显示
		show: function(callback) {
			var self = this;
			self.callback = callback;
			self.mask.show();
			document.body.classList.add($.className('poppicker-active-for-page'));
			self.panel.classList.add($.className('active'));
			//处理物理返回键
			self.__back = $.back;
			$.back = function() {
				self.hide();
			};
		},
		//隐藏
		hide: function() {
			var self = this;
			if (self.disposed) return;
			self.panel.classList.remove($.className('active'));
			self.mask.close();
			document.body.classList.remove($.className('poppicker-active-for-page'));
			//处理物理返回键
			$.back=self.__back;
		},
		dispose: function() {
			var self = this;
			self.hide();
			setTimeout(function() {
				self.panel.parentNode.removeChild(self.panel);
				for (var name in self) {
					self[name] = null;
					delete self[name];
				};
				self.disposed = true;
			}, 300);
		}
	});

})(mui, document);