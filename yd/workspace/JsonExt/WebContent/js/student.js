/**
 * 
 * @email yulinlincom@gmail.com
 * @author linlin yu
 * @version 1.0
 */

var StudentFormPanel = function() {
	this.idTextField = {
		// xtype : 'hidden',
		xtype : 'textfield',
		fieldLabel : "id",
		readOnly : true,
		name : "id"
	};
	this.nameTextField = {
		xtype : 'textfield',
		fieldLabel : "name",
		allowBlank : false,
		name : "name"
	};
	this.ageTextField = {
		xtype : 'numberfield',
		fieldLabel : "age",
		allowBlank : false,
		name : "age"
	};

	StudentFormPanel.superclass.constructor.call(this, {
		bodyStyle : 'padding:5px 5px 0',
		frame : true,
		reader : new Ext.data.JsonReader( {
			root : 'list',
			successProperty : 'success',
			totalProperty : 'totalSize',
			id : 'id'
		}, ['id', 'name', 'age']),
		items : [this.idTextField, this.nameTextField, this.ageTextField]
	});
}
Ext.extend(StudentFormPanel, Ext.form.FormPanel, {
	loadData : function(id) {
		var url = 'student/doGetStudent.action?id=' + id;
		this.getForm().load( {
			url : url,
			waitMsg : 'Loading',
			failure : function(form, action) {
				var json = action.response.responseText;
				var o = eval("(" + json + ")");
				Ext.MessageBox.show( {
					title : 'Error',
					msg : o.message,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
			}
		});
	}
});

var StudentWindow = function() {
	var _win = this;
	this.formPanel = new StudentFormPanel();
	var _form = this.formPanel.getForm();
	StudentWindow.superclass.constructor.call(this, {
		title : 'Student',
		width : 520,
		height : 300,
		resizable : true,
		plain : false,
		border : false,
		modal : true,
		autoScroll : true,
		layout : 'fit',
		closeAction : 'hide',
		items : this.formPanel,
		buttons : [ {
			text : 'save',
			handler : function() {

				_form.errorReader = new Ext.data.JsonReader( {
					successProperty : 'success',
					root : 'list',
					id : 'id'
				}, ['id', 'name', 'age']);

				if (_form.isValid()) {
					_form.submit( {
						waitMsg : 'wait...',
						url : 'student/doSave.action',
						failure : function(form, action) {
							var json = action.response.responseText;
							var o = eval("(" + json + ")");
							Ext.MessageBox.show( {
								title : 'Error',
								msg : o.message,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
						},
						success : function(form1, action) {
							var data = action.result.errors[0];
							if (_win.record) {
								_win.record.data = data;
								_win.record.reject();
								_win.hide();
							} else {
								_win.record = new Ext.data.Record(data)
							}
							_form.loadRecord(_win.record);
						}
					});
				}
			}
		}, {
			text : 'close',
			handler : function() {
				_win.hide();
			},
			tooltip : 'Close the window'
		}]
	});
}
Ext.extend(StudentWindow, Ext.Window, {
	loadData : function(id) {
		this.formPanel.loadData(id);
	}
});

var StudentGridPanel = function() {
	var stuWindow = new StudentWindow();
	var _grid = this;
	var recordType = Ext.data.Record.create([ {
		name : 'id',
		type : 'float',
		mapping : 'id'
	}, {
		name : 'name',
		type : 'string',
		mapping : 'name'
	}, {
		name : 'age',
		type : 'float',
		mapping : 'age'
	}]);
	this.store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : 'student/doGetStudentList.action'
		}),

		// set up the JsonReader
		reader : new Ext.data.JsonReader( {
			root : 'list',
			totalProperty : 'totalSize',
			id : 'id'
		}, recordType)
	});
	this.store.load();
	var sm = new Ext.grid.CheckboxSelectionModel( {
		singleSelect : false
	});
	this.columns = [new Ext.grid.RowNumberer(), {
		id : 'id',
		header : "id",
		width : 160,
		sortable : true,
		dataIndex : 'id'
	}, {
		header : "name",
		width : 75,
		sortable : true,
		dataIndex : 'name'
	}, {
		header : "age",
		width : 75,
		sortable : true,
		dataIndex : 'age'
	}, sm];

	var deleteFormDiv = Ext.DomHelper.insertHtml('afterEnd', document.body,
			'<div id="' + Ext.id() + '" style="visibility: hidden;"> </div>');

	var deleteForm = new Ext.form.FormPanel( {
		items : {}
	});

	deleteForm.render(deleteFormDiv);
	deleteForm.getForm().errorReader = new Ext.data.JsonReader( {
		successProperty : 'success'
	}, ['id', 'name', 'age']);
	StudentGridPanel.superclass.constructor
			.call(
					this,
					{
						layout : 'fit',
						sm : sm,
						viewConfig : {
							emptyText : "No record to display"
						},
						bbar : new Ext.PagingToolbar( {
							pageSize : 20,
							store : this.store,
							displayInfo : true,
							displayMsg : 'Displaying record {0} - {1} of {2}',
							emptyMsg : "No Outstanding PD Case to display"
						}),
						tbar : [
								{
									text : 'add',
									handler : function() {
										var data = {};
										var record = new Ext.data.Record(data);
										_grid.store.insert(0, record);
										stuWindow.record = record;
										stuWindow.formPanel.getForm().reset();
										stuWindow.show();
									}
								},
								'-',
								{
									text : 'delete',
									handler : function() {
										var records = _grid.getSelections();
										if (records) {
											Ext.MessageBox
													.confirm(
															'Confirm',
															'Are you sure you want to do that?',
															function(btn) {
																if (btn == 'yes') {
																	var ids = "";
																	for (var i = 0; i < records.length; i++) {
																		var record = records[i]
																		if (record.data.id) {
																			ids += record.data.id
																					+ ',';
																		} else {
																			_grid.store
																					.remove(record);
																		}
																	}
																	deleteForm
																			.getForm()
																			.submit( {
																				waitMsg : 'wait...',
																				url : 'student/doDelete.action?ids='
																						+ ids,
																				failure : function(
																						form,
																						action) {
																					var json = action.response.responseText;
																					var o = eval("("
																							+ json
																							+ ")");
																					Ext.MessageBox
																							.show( {
																								title : 'Error',
																								msg : o.message,
																								buttons : Ext.MessageBox.OK,
																								icon : Ext.MessageBox.ERROR
																							});
																				},
																				success : function(
																						form1,
																						action) {
																					_grid.store
																							.load();
																				}
																			});
																}
															});
										}
									}
								}, '-', {
									text : 'edit',
									handler : function() {
										var record = _grid.getSelected();
										if (record != null) {
											stuWindow.show();
											var record = _grid.getSelected();
											stuWindow.record = record;
											stuWindow.loadData(record.data.id);
										}
									}
								}]
					});
}

Ext.extend(StudentGridPanel, Ext.grid.GridPanel, {
	getSelected : function() {
		var record = this.getSelectionModel().getSelected();
		if (record == null) {
			Ext.MessageBox.show( {
				title : 'Infomation',
				msg : "please select record",
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO
			});
		} else {
			return record;
		}
	},
	getSelections : function() {
		var records = this.getSelectionModel().getSelections();
		if (records.length < 1) {
			Ext.MessageBox.show( {
				title : 'Infomation',
				msg : "please select record",
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO
			});
		} else {
			return records
		}
	}
});

Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'under';

	new Ext.Viewport( {
		layout : 'fit',
		items : new StudentGridPanel()
	});
});