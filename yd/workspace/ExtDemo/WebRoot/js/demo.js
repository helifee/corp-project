Ext.onReady(function(){

	//JsonStore
	var proxyParam ={
			url: "json.action",
			method: "GET"
		}; 
	var jsonReaderMeta = {
			root: "Person"
		};
	var recordType = [
			{name: "id", mapping: "id"},
			{name: "name", mapping: "name"},
			{name: "sex", mapping: "sex"},
			{name: "birthday", mapping: "birthday", type: "date", dateFormat: "Y-m-d"},
			{name: "email", mapping: "email"}
	    ];

	var store = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy(proxyParam),
			reader: new Ext.data.JsonReader(jsonReaderMeta, recordType),
			remoteSort: true
		});
	store.load();

	//grid start
	var sm = new Ext.grid.CheckboxSelectionModel();
	
	var columns = [
		new Ext.grid.RowNumberer(),
		{
			header: "姓名",
			dataIndex: "name",
			sortable: true,
			editor: new Ext.form.TextField()
		},
		{
			header: "性别",
			dataIndex: "sex",
			renderer: function(value){
				if(value == "male") {
					return "<span style='color:red'>男</span>";
				} else {
					return "<span style='color:green'>女</span>";
				}
			},
			editor: new Ext.form.ComboBox({
				transform:"sexList",
				triggerAction: "all",
				listClass: "x-combo-list-small",
				lazyRender:true,
				typeAhead: true
			})
		},
		{
			header: "出生日期",
			dataIndex: "birthday",
			width: 120,
			renderer: Ext.util.Format.dateRenderer("Y年m月d日"),
			editor: new Ext.form.DateField({format:"Y年m月d日"})
		},
		{
			header: "电子邮件",
			dataIndex: "email",
			sortable: true,
			renderer: showURL
			//editor: new Ext.form.TextField()
		},
		sm
	];
	var cm = new Ext.grid.ColumnModel(columns);
	var gridParams = {
		store: store,
		cm: cm,
		sm: sm,
		title: "HelloWorld",
		width: 600,
		//height: 300,
		autoHeight: true,
		//columns: columns,
		autoExpandColumn: 2,
		clicksToEdit:1,
		tbar: new Ext.Toolbar({
			items:[
				{id:"buttonA", text:"save", handler:function(){
						var mod = store.modified;
						updateData(mod);
					}},
				{id:"buttonB", text:"new", handler:function(){alert("You clicked B")}},
				{id:"buttonC", text:"delete", handler:function(){alert("You clicked C")}}
			]
		}),
		listeners: {
			"afterEdit": {
				fn: afterEdit,
				scope: this
			}
		}
	};
	var grid = new Ext.grid.EditorGridPanel(gridParams);
	grid.render("grid");

	//set the grid to a panel
	var panel = new Ext.Panel({
		renderTo: "panel",
		title: "Panel",
		width: 600,
		collapsible:true,
		items: [grid]	
	});
	
});

function showURL(value) {
	return "<a href='http://" + value + "' target='_blank'>" + value + "</a>";
}

//
function updateData(mod) {   
    var json = [];   
    Ext.each(mod, function(item) {   
        json.push(item.data);   
    });   
    if (json.length >= 0) {   
        Ext.Ajax.request({   
            url: "json.action",   
            params: { pl: Ext.util.JSON.encode(json) },
            method: "POST",   
            success: function(response) {   
                Ext.Msg.alert("信息", "数据更新成功！", function() { store.reload(); });   
            },   
            failure: function(response) {   
                Ext.Msg.alert("警告", "数据更新失败，请稍后再试！");   
            }   
        });   
    }   
    else {   
        Ext.Msg.alert("警告", "没有任何需要更新的数据！");   
    }   
}   


//
function afterEdit(e) {
}   