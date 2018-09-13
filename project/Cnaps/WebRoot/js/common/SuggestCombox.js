Ext.SuggestCombox = function(config) {
	Ext.SuggestCombox.superclass.constructor.call(this, config);
};
Ext.extend(Ext.SuggestCombox, Ext.form.ComboBox, {

			// *************************************
			hideTrigger : true,// 隐藏下拉按钮(表现为文本框 )
			loadingText : '正在加载数据,请稍后...',// 提示信息
			mode : 'remote',// 远程模式
			editable : true,// 开启查询联想功能
			selectOnFocus : true,
			triggerAction : "all",
			typeAhead : false,
			queryDelay : 200,
			minListWidth : 300,
			url : '/',
			// *************************************
			initComponent : function() {
				this.initStore();
				Ext.SuggestCombox.superclass.initComponent.call(this);
			},
			initStore : function() {
				if (!this.store) {
					this.store = new Ext.data.Store({
								proxy : new Ext.data.HttpProxy({
											url : this.url
										}),
								reader : new Ext.data.JsonReader({}, [
												this.valueField,
												this.displayField])
							});
					this.store.sortInfo = {
						field : this.valueField,
						direction : 'ASC'
					};
					this.store.remoteSort = true;
				}
			},
			doQuery : function(q, forceAll) {
				if (q === undefined || q === null) {
					q = '';
				}
				var qe = {
					query : q,
					forceAll : forceAll,
					combo : this,
					cancel : false
				};
				if (this.fireEvent('beforequery', qe) === false || qe.cancel) {
					return false;
				}
				q = qe.query;
				forceAll = qe.forceAll;
				if (forceAll === true || (q.length >= this.minChars)) {
					if (this.lastQuery !== q) {
						this.lastQuery = q;
						if (this.mode == 'remote') {
							delete qe.forceAll;
							delete qe.combo;
							delete qe.cancel;
							this.store.load({
										params : {
											param : qe.query
										}
									});
							this.expand();
						}
					}
					else {
						this.selectedIndex = -1;
						this.onLoad();
					}
				}
			}
		});
Ext.reg('suggestcombox', Ext.SuggestCombox);

initSuggestCombox = function() {
	Ext.BLANK_IMAGE_URL = getRootPath()
			+ "/ext2.2.1/resources/images/default/s.gif";
	if (config == null || config == 'undefined') {
		alert('config 配置文件还没有定义! ')
	}
	else {
		if (!Ext.suggestcombox) {
			Ext.suggestcombox = new Ext.SuggestCombox({
						applyTo : config.renderId,
						hiddenName : config.hiddenName,
						valueField : config.valueField,
						displayField : config.displayField,
						minChars : config.minChars || 2,
						url : config.url
					});
		}
	}
}
Ext.onReady(initSuggestCombox);