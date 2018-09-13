/**
 * [PerProject] author by $YourName$
 * @include "../../extclient/RowExpander.js"
 * @include "../../extclient/gridToExcel.js"
 * @include "../../extclient/SearchField.js"
 */
 
Ext.namespace('com.ysys.www');
Ext.namespace('com.ysys.www.perproject');

/**
 * 查询表单
 * @class com.ysys.www.perproject.queryformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.perproject.queryformpanel = Ext.extend(Ext.form.FormPanel,{
	initComponent:function() {
		Ext.apply(this,{
	        labelAlign:'right',
	        labelWidth:80,
	        defaultType:'textfield',
	        bodyStyle:'padding:20px;',
	        defaults:{width:290},
	        items:[{
	            xtype:'panel',
	            html:'请在下面输入查询条件：',
	            width:370,
	            border:false,
	            style:'padding:10 0 0 3;margin:0 0 20 10;border-bottom:1px solid #ccc;font-size:14px;font-weight:bold;'
	        	}
	        	,{
	            xtype:'panel',
	            layout:'column',
	            width:400,
	            border:false,
	            defaults:{border:false}
	        	}
	        	,{xtype:'textfield',fieldLabel:'项目名称(日文)',name:'s_proName',width:288}
	        	,{xtype:'textfield',fieldLabel:'项目名称（中文）',name:'s_proNameCn',width:288}
	        	,{xtype:'textfield',fieldLabel:'项目名称（英文）',name:'s_proNameEng',width:288}
	        	,{xtype:'textfield',fieldLabel:'项目描述',name:'s_proDesc',width:288}
	        	,{xtype:'textfield',fieldLabel:'父项目',name:'s_parentPro',width:288}
	        	,{xtype:'textfield',fieldLabel:'客户名称',name:'s_cusName',width:288}
	        	,{xtype:'textfield',fieldLabel:'客户负责人',name:'s_cusContact',width:288}
	        	,{xtype:'textfield',fieldLabel:'开发环境',name:'s_developEnvi',width:288}
	        	,{xtype:'textfield',fieldLabel:'所属部门',name:'s_deptId',width:288}
	        	,{xtype:'textfield',fieldLabel:'预计开始日期',name:'s_planStaDate',width:288}
	        	,{xtype:'textfield',fieldLabel:'预计结束日期',name:'s_planEndDate',width:288}
	        	,{xtype:'textfield',fieldLabel:'实际开始日期',name:'s_realStaDate',width:288}
	        	,{xtype:'textfield',fieldLabel:'实际结束日期',name:'s_realEndDate',width:288}
	        	,{xtype:'textfield',fieldLabel:'更新时间',name:'s_updatetime',width:288}
	            ]
	    });
		com.ysys.www.perproject.queryformpanel.superclass.initComponent.call(this);
	}
});

/**
 * 查询窗口
 * @class com.ysys.www.perproject.querywin
 * @extends Ext.Window
 */
com.ysys.www.perproject.querywin = Ext.extend(Ext.Window,{
	initComponent:function() {
		Ext.apply(this,{
	        title:'高级查询',
	        width:455,
	        height:395,
	        modal:true,
	        closeAction:'hide',
	        layout:'fit'
	    });
		com.ysys.www.perproject.querywin.superclass.initComponent.call(this);
	}
});

/**
 * 内容表单
 * @class com.ysys.www.perproject.dtlformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.perproject.dtlformpanel = Ext.extend(Ext.form.FormPanel,{
	initComponent:function() {
		Ext.apply(this,{
	        labelWidth:100,
	        labelAlign:'right',
	        frame:true,
//	        bodyStyle:'padding:10px',
	        autoScroll:true,//滚动条
			items:[{
		            xtype:'panel',
		            layout:'column',
		            width:400,
		            border:false,
		            defaults:{border:false}
		        	}
	        		,{xtype:'hidden',fieldLabel:'项目ID',name:'proId',width:288}
	        		,{xtype:'textfield',fieldLabel:'项目名称(日文)',name:'proName',width:288}
	        		,{xtype:'textfield',fieldLabel:'项目名称（中文）',name:'proNameCn',width:288}
	        		,{xtype:'textfield',fieldLabel:'项目名称（英文）',name:'proNameEng',width:288}
	        		,{xtype:'textfield',fieldLabel:'项目描述',name:'proDesc',width:288}
	        		,{xtype:'textfield',fieldLabel:'父项目',name:'parentPro',width:288}
	        		,{xtype:'textfield',fieldLabel:'客户名称',name:'cusName',width:288}
	        		,{xtype:'textfield',fieldLabel:'客户负责人',name:'cusContact',width:288}
	        		,{xtype:'textfield',fieldLabel:'开发环境',name:'developEnvi',width:288}
	        		,{xtype:'textfield',fieldLabel:'所属部门',name:'deptId',width:288}
	        		,{xtype:'textfield',fieldLabel:'预计开始日期',name:'planStaDate',width:288}
	        		,{xtype:'textfield',fieldLabel:'预计结束日期',name:'planEndDate',width:288}
	        		,{xtype:'textfield',fieldLabel:'实际开始日期',name:'realStaDate',width:288}
	        		,{xtype:'textfield',fieldLabel:'实际结束日期',name:'realEndDate',width:288}
	        		,{xtype:'textfield',fieldLabel:'更新时间',name:'updatetime',width:288}
	        ]
	    });
	    com.ysys.www.perproject.dtlformpanel .superclass.initComponent.call(this);
	}
	
});

/**
 * 表单窗口
 * @class com.ysys.www.perproject.dtlwin
 * @extends Ext.Window
 */		
com.ysys.www.perproject.dtlwin =  Ext.extend(Ext.Window,{
	initComponent:function() {
		Ext.apply(this,{
	        width:535,
	        height:400,
	        layout:'fit',
	        border:false,
	        closeAction:'hide',
	        modal:true,
	        maximizable:true,
	        constrain: true,
	        collapsible:true
	    });
		com.ysys.www.perproject.dtlwin.superclass.initComponent.call(this);
	}
});


/**
 * 主表格入口
 * @class com.ysys.www.perproject
 * @extends Ext.grid.GridPanel
 */
com.ysys.www.perprojectGrid = Ext.extend(Ext.grid.GridPanel,{
    initComponent:function() {
    	this.pageSize=10;
    	this.ds = new Ext.data.Store({
	        url:'../PerProject/extlist.do',
	        reader:new Ext.data.JsonReader({
	            root:'list',
	            totalProperty:'totalSize',
	            id:'id'
		        }
		        ,['proId','proName','proNameCn','proNameEng','proDesc','parentPro','cusName','cusContact','developEnvi','deptId','planStaDate','planEndDate','realStaDate','realEndDate','updatetime',]
	        ),
	        baseParams:{
	            limit:this.pageSize
	        },
	        remoteSort:true
	    });
	    
	    //行扩展
	    this.expander = new Ext.grid.RowExpander({
	        tpl : new Ext.Template(
	            '<p style="margin-left:70px"><b>字典内容:</b> {kvalue}</p><br>'
	        )
	    });
	    
	    this.sm = new Ext.grid.CheckboxSelectionModel();
		this.cm = new Ext.grid.ColumnModel([
		    new Ext.grid.RowNumberer(),
		    this.sm,
		    this.expander
	        ,{header:'项目名称(日文)',width:100,sortable:true,dataIndex:'proName'}
	        ,{header:'项目名称（中文）',width:100,sortable:true,dataIndex:'proNameCn'}
	        ,{header:'项目名称（英文）',width:100,sortable:true,dataIndex:'proNameEng'}
	        ,{header:'项目描述',width:100,sortable:true,dataIndex:'proDesc'}
	        ,{header:'父项目',width:100,sortable:true,dataIndex:'parentPro'}
	        ,{header:'客户名称',width:100,sortable:true,dataIndex:'cusName'}
	        ,{header:'客户负责人',width:100,sortable:true,dataIndex:'cusContact'}
	        ,{header:'开发环境',width:100,sortable:true,dataIndex:'developEnvi'}
	        ,{header:'所属部门',width:100,sortable:true,dataIndex:'deptId'}
	        ,{header:'预计开始日期',width:100,sortable:true,dataIndex:'planStaDate'}
	        ,{header:'预计结束日期',width:100,sortable:true,dataIndex:'planEndDate'}
	        ,{header:'实际开始日期',width:100,sortable:true,dataIndex:'realStaDate'}
	        ,{header:'实际结束日期',width:100,sortable:true,dataIndex:'realEndDate'}
	        ,{header:'更新时间',width:100,sortable:true,dataIndex:'updatetime'}
		]);
		
		/**
		 * 扩展类的构建开始
		 */
		Ext.apply(this,{
			store:this.ds
	        ,sm:this.sm
	        ,cm: this.cm
			,plugins:this.expander
			,collapsible: true
			,viewConfig:{forceFit:true}
	        ,bbar:new Ext.PagingToolbar({
	            pageSize:this.pageSize,
	            store:this.ds,
	            displayInfo:true
	        })
	        , tbar:[
	        	{text:'新增',cls:'x-btn-text-icon',iconCls:'addicon',handler:this.addPerProject,scope:this},'-'
	        	,{text:'修改',cls:'x-btn-text-icon',iconCls:'editicon',handler:this.editPerProject,scope:this},'-'
	        	,{text:'删除',cls:'x-btn-text-icon',iconCls:'deleteicon',handler:this.deletePerProject,scope:this},'-'
	        	,{text:'查询',id:'btn-query',cls:'x-btn-text-icon',iconCls:'queryicon',handler:this.buildQueryWin,scope:this}
	        	,'->'
	        	,'搜索范围：'
				,{xtype:'combo',
	            fieldLabel:'搜索范围',
	            emptyText:'请选择...',
	            name:'field_type',
	            hiddenName:'field_type',
	            store:new Ext.data.ArrayStore({
        			fields: ['name','code'],
        			data: [['项目名称(日文)', 'proName'],['项目名称（中文）', 'proNameCn'],['项目名称（英文）', 'proNameEng'],['项目描述', 'proDesc'],['父项目', 'parentPro'],['客户名称', 'cusName'],['客户负责人', 'cusContact'],['开发环境', 'developEnvi'],['所属部门', 'deptId'],['预计开始日期', 'planStaDate'],['预计结束日期', 'planEndDate'],['实际开始日期', 'realStaDate'],['实际结束日期', 'realEndDate'],['更新时间', 'updatetime']]
        		}),
	            displayField:'name',
	            valueField:'code',
	            forceSelection: false,
	            selectOnFocus: true,
	            editable: false,
	            triggerAction: 'all',
	            allowBlank:true,
	            mode: 'local',
	            width:120
	            ,listeners: {          
          			select:{fn:function(object,record,index){
          				this.getTopToolbar().items.get("searchfld").getStore().baseParams['field_type'] = object.getValue();
          			},scope:this}
          		}    
	        	},{xtype:"searchfield",itemId:"searchfld",width: 130,store:this.ds}
	        ]
		});
		//调用父类构建函数
        com.ysys.www.perprojectGrid.superclass.initComponent.call(this);
        //加载数据
        this.store.load({params:{start:0}});
        
 		//扩展类的详细弹出窗口
 		this.dtlformpanel = new com.ysys.www.perproject.dtlformpanel();
 		this.dtlwin =  new com.ysys.www.perproject.dtlwin({items:this.dtlformpanel,buttons:[{
	            text:'保存',
	            handler:this.savePerProject,
	            scope:this
	        },{
	            text:'取消',
	            handler:function(){this.dtlwin.hide();},
	            scope:this
	        }]});
	    
	    //扩展类的查询弹出窗口
	    this.queryformpanel = new com.ysys.www.perproject.queryformpanel();
	    this.querywin =  new com.ysys.www.perproject.querywin({items:this.queryformpanel,buttons:[{
	            text:'确定',
	            handler:this.queryOrder,
	            scope:this
	        },{
	            text:'取消',
	            handler:function(){this.querywin.hide();},
	            scope:this
	        }]});
	    //双击操作
 		this.on({"dblclick":this.dblclick});
 		//右键菜单监听
 		this.addListener('rowcontextmenu', this.onMessageContextMenu);
    }
    
   /**
    * 构建函数结束
    */

	//右键菜单
    ,onMessageContextMenu : function (grid, rowIndex, e) {
		e.stopEvent();
		var coords = e.getXY();
		var record = grid.getStore().getAt(rowIndex);
		var messageContextMenu = new Ext.menu.Menu({
			id: 'messageContextMenu',
			items: [{icon:'../../images/edit.gif',text: '编辑',handler: rgtEdit,scope: this},
	        		{id: 'delete',icon:'../../images/delete.gif',handler: rgtDelete,text: '删除'
	        }]
	    });
	    //右键编辑
	    function rgtEdit() {
	            		messageContextMenu.hide();
				        this.dtlwin.setTitle('修改PerProject');
				        this.dtlwin.show();
				        this.dtlformpanel.form.reset();
				        this.dtlformpanel.form.loadRecord(record);
				        this.dtlformpanel.url = '../PerProject/extupdate.do';
	    };
	    //右键删除
		function rgtDelete() {
			messageContextMenu.hide();
			if (!record||record.length == 0) {
				Ext.Msg.alert("提示", "请先选择要删除的�记录");
				return;
			}
			Ext.MessageBox.confirm('确认删除','确定要删除这些记录?',function(btn){
				if (btn == 'yes'){
						Ext.Ajax.request({
						url:'../PerProject/extdelete.do?ids='+record.data.proId,
						method:'POST',
						success:function(response){
							var data = Ext.util.JSON.decode(response.responseText);
							if (data.success == true){
								grid.getStore().remove(record);
								grid.getView().refresh();
							}
							else{
								Ext.MessageBox.alert('警告',data.msg);
							}
							 grid.getStore().reload();
						},
						scope:this
					});
				}},this);
		};
		messageContextMenu.showAt([coords[0], coords[1]]);
		e.preventDefault();//to disable the standard browser context menu
	}
	
	//双击事件
    ,dblclick :function(){
	    	var sm = this.getSelectionModel();
	   		var record=null;
			try{
				record=sm.getSelected();
				if(record==null){
					return;
				}
			}
			catch(e){
				try{
					record=sm.selection.record();
				}
				catch(ex){}
			}
	    	this.showWinForm(record);
	}
	//双击打开窗口
    ,showWinForm:function(record){
        this.dtlwin.setTitle('修改PerProject');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
        this.dtlformpanel.form.loadRecord(record);
        this.dtlformpanel.url = '../PerProject/extupdate.do';
    }
    
    //新建窗口
    ,addPerProject : function(){
        this.dtlwin.setTitle('新建PerProject');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
	    this.dtlformpanel.url = '../PerProject/extsave.do';
	}
	
	//编辑操作
    ,editPerProject:function(){
    	var records = this.getSelectionModel().getSelections();//单选
    	
	   if (records.length!=1) {
			Ext.Msg.alert("提示", "请先选择要修改的记录");
			return;
		}
	    this.dtlwin.setTitle('修改PerProject');
	    this.dtlwin.show();
	    this.dtlformpanel.form.reset();
	    this.dtlformpanel.form.loadRecord(records[0]);
	    this.dtlformpanel.url = '../PerProject/extupdate.do';

    }
    
    //删除操作
    ,deletePerProject:function(){
    	var records = this.getSelectionModel().getSelections();
		if (!records||records.length == 0) {
			Ext.Msg.alert("提示", "请先选择要删除的�记录");
			return;
		}
		Ext.MessageBox.confirm('确认删除','确定要删除这些记录?',function(btn){
			if (btn == 'yes'){
				Ext.Ajax.request({
					url:'../PerProject/extdelete.do?ids='+this.getRecordArrayUtils(records, 'proId'),
		            method:'POST',
		            success:function(response){
		                var data = Ext.util.JSON.decode(response.responseText);
		                if (data.success == true){
			                for(var i = 0; i < records.length; i++) {
							 	this.getStore().remove(records[i]);
			                    this.getView().refresh();
							 }
							 this.getStore().reload();
		                }
		                else{
		                    Ext.MessageBox.alert('警告',data.msg);
		                }
		            },
		            scope:this
		        });
			}
		},this);
    }
    
    //保存操作
    ,savePerProject:function(){
		if (this.dtlformpanel.form.isValid() == false){
	        return;
	    }
	    this.dtlformpanel.form.submit({
	        url:this.dtlformpanel.url,
	        success:function(form,action){
	        	Ext.MessageBox.alert('警告',action.result.msg);
	            this.dtlwin.hide();
	          	this.getStore().reload();
	        },
	        scope:this,
	        failure:function(form,action){
	            Ext.MessageBox.alert('警告',action.result.msg);
	        }
	    })
	
    }
    //新建查询窗口
    ,buildQueryWin: function(){
    	this.querywin.setTitle('查询');
        this.querywin.show();
        this.getTopToolbar().items.get("searchfld").setValue("");
        this.getTopToolbar().items.get("searchfld").getStore().baseParams['field_type']=null;
    }
    //查询操作
    ,queryOrder:function(){
    	this.getStore().baseParams['s_proName'] = this.queryformpanel.form.findField('s_proName').getRawValue();
    	this.getStore().baseParams['s_proNameCn'] = this.queryformpanel.form.findField('s_proNameCn').getRawValue();
    	this.getStore().baseParams['s_proNameEng'] = this.queryformpanel.form.findField('s_proNameEng').getRawValue();
    	this.getStore().baseParams['s_proDesc'] = this.queryformpanel.form.findField('s_proDesc').getRawValue();
    	this.getStore().baseParams['s_parentPro'] = this.queryformpanel.form.findField('s_parentPro').getRawValue();
    	this.getStore().baseParams['s_cusName'] = this.queryformpanel.form.findField('s_cusName').getRawValue();
    	this.getStore().baseParams['s_cusContact'] = this.queryformpanel.form.findField('s_cusContact').getRawValue();
    	this.getStore().baseParams['s_developEnvi'] = this.queryformpanel.form.findField('s_developEnvi').getRawValue();
    	this.getStore().baseParams['s_deptId'] = this.queryformpanel.form.findField('s_deptId').getRawValue();
    	this.getStore().baseParams['s_planStaDate'] = this.queryformpanel.form.findField('s_planStaDate').getRawValue();
    	this.getStore().baseParams['s_planEndDate'] = this.queryformpanel.form.findField('s_planEndDate').getRawValue();
    	this.getStore().baseParams['s_realStaDate'] = this.queryformpanel.form.findField('s_realStaDate').getRawValue();
    	this.getStore().baseParams['s_realEndDate'] = this.queryformpanel.form.findField('s_realEndDate').getRawValue();
    	this.getStore().baseParams['s_updatetime'] = this.queryformpanel.form.findField('s_updatetime').getRawValue();
		this.getStore().load();
		this.querywin.hide();
    }
    //工具类
    ,getRecordArrayUtils : function(records,field) {
		var result = [];
		for(var i = 0; i < records.length; i++) {
			result.push(records[i].get(field));
		}
		return result;
	}

});
 
/**
 * 注册主表格的xtype
 */
Ext.reg('perproject', com.ysys.www.perprojectGrid);


