/**
 * [PerDepartment] author by $YourName$
 * @include "../../extclient/RowExpander.js"
 * @include "../../extclient/gridToExcel.js"
 * @include "../../extclient/SearchField.js"
 */
 
Ext.namespace('com.ysys.www');
Ext.namespace('com.ysys.www.perdepartment');

/**
 * 查询表单
 * @class com.ysys.www.perdepartment.queryformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.perdepartment.queryformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        	,{xtype:'textfield',fieldLabel:'部门名称',name:'s_deptNm',width:288}
	        	,{xtype:'textfield',fieldLabel:'所属部门ID',name:'s_parentDeptId',width:288}
	        	,{xtype:'textfield',fieldLabel:'所属公司ID',name:'s_companyId',width:288}
	        	,{xtype:'textfield',fieldLabel:'部门描述',name:'s_deptDesc',width:288}
	        	,{xtype:'textfield',fieldLabel:'部门所在开发室',name:'s_deptRoom',width:288}
	        	,{xtype:'textfield',fieldLabel:'该部门部长的社员ID',name:'s_leaderId',width:288}
	        	,{xtype:'textfield',fieldLabel:'该部门部长的内线电话',name:'s_leaderTel',width:288}
	        	,{xtype:'textfield',fieldLabel:'更新时间',name:'s_updatetime',width:288}
	            ]
	    });
		com.ysys.www.perdepartment.queryformpanel.superclass.initComponent.call(this);
	}
});

/**
 * 查询窗口
 * @class com.ysys.www.perdepartment.querywin
 * @extends Ext.Window
 */
com.ysys.www.perdepartment.querywin = Ext.extend(Ext.Window,{
	initComponent:function() {
		Ext.apply(this,{
	        title:'高级查询',
	        width:455,
	        height:395,
	        modal:true,
	        closeAction:'hide',
	        layout:'fit'
	    });
		com.ysys.www.perdepartment.querywin.superclass.initComponent.call(this);
	}
});

/**
 * 内容表单
 * @class com.ysys.www.perdepartment.dtlformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.perdepartment.dtlformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        		,{xtype:'hidden',fieldLabel:'部门ID',name:'deptId',width:288}
	        		,{xtype:'textfield',fieldLabel:'部门名称',name:'deptNm',width:288}
	        		,{xtype:'textfield',fieldLabel:'所属部门ID',name:'parentDeptId',width:288}
	        		,{xtype:'textfield',fieldLabel:'所属公司ID',name:'companyId',width:288}
	        		,{xtype:'textfield',fieldLabel:'部门描述',name:'deptDesc',width:288}
	        		,{xtype:'textfield',fieldLabel:'部门所在开发室',name:'deptRoom',width:288}
	        		,{xtype:'textfield',fieldLabel:'该部门部长的社员ID',name:'leaderId',width:288}
	        		,{xtype:'textfield',fieldLabel:'该部门部长的内线电话',name:'leaderTel',width:288}
	        		,{xtype:'textfield',fieldLabel:'更新时间',name:'updatetime',width:288}
	        ]
	    });
	    com.ysys.www.perdepartment.dtlformpanel .superclass.initComponent.call(this);
	}
	
});

/**
 * 表单窗口
 * @class com.ysys.www.perdepartment.dtlwin
 * @extends Ext.Window
 */		
com.ysys.www.perdepartment.dtlwin =  Ext.extend(Ext.Window,{
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
		com.ysys.www.perdepartment.dtlwin.superclass.initComponent.call(this);
	}
});


/**
 * 主表格入口
 * @class com.ysys.www.perdepartment
 * @extends Ext.grid.GridPanel
 */
com.ysys.www.perdepartmentGrid = Ext.extend(Ext.grid.GridPanel,{
    initComponent:function() {
    	this.pageSize=10;
    	this.ds = new Ext.data.Store({
	        url:'../PerDepartment/extlist.do',
	        reader:new Ext.data.JsonReader({
	            root:'list',
	            totalProperty:'totalSize',
	            id:'id'
		        }
		        ,['deptId','deptNm','parentDeptId','companyId','deptDesc','deptRoom','leaderId','leaderTel','updatetime',]
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
	        ,{header:'部门名称',width:100,sortable:true,dataIndex:'deptNm'}
	        ,{header:'所属部门ID',width:100,sortable:true,dataIndex:'parentDeptId'}
	        ,{header:'所属公司ID',width:100,sortable:true,dataIndex:'companyId'}
	        ,{header:'部门描述',width:100,sortable:true,dataIndex:'deptDesc'}
	        ,{header:'部门所在开发室',width:100,sortable:true,dataIndex:'deptRoom'}
	        ,{header:'该部门部长的社员ID',width:100,sortable:true,dataIndex:'leaderId'}
	        ,{header:'该部门部长的内线电话',width:100,sortable:true,dataIndex:'leaderTel'}
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
	        	{text:'新增',cls:'x-btn-text-icon',iconCls:'addicon',handler:this.addPerDepartment,scope:this},'-'
	        	,{text:'修改',cls:'x-btn-text-icon',iconCls:'editicon',handler:this.editPerDepartment,scope:this},'-'
	        	,{text:'删除',cls:'x-btn-text-icon',iconCls:'deleteicon',handler:this.deletePerDepartment,scope:this},'-'
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
        			data: [['部门名称', 'deptNm'],['所属部门ID', 'parentDeptId'],['所属公司ID', 'companyId'],['部门描述', 'deptDesc'],['部门所在开发室', 'deptRoom'],['该部门部长的社员ID', 'leaderId'],['该部门部长的内线电话', 'leaderTel'],['更新时间', 'updatetime']]
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
        com.ysys.www.perdepartmentGrid.superclass.initComponent.call(this);
        //加载数据
        this.store.load({params:{start:0}});
        
 		//扩展类的详细弹出窗口
 		this.dtlformpanel = new com.ysys.www.perdepartment.dtlformpanel();
 		this.dtlwin =  new com.ysys.www.perdepartment.dtlwin({items:this.dtlformpanel,buttons:[{
	            text:'保存',
	            handler:this.savePerDepartment,
	            scope:this
	        },{
	            text:'取消',
	            handler:function(){this.dtlwin.hide();},
	            scope:this
	        }]});
	    
	    //扩展类的查询弹出窗口
	    this.queryformpanel = new com.ysys.www.perdepartment.queryformpanel();
	    this.querywin =  new com.ysys.www.perdepartment.querywin({items:this.queryformpanel,buttons:[{
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
				        this.dtlwin.setTitle('修改PerDepartment');
				        this.dtlwin.show();
				        this.dtlformpanel.form.reset();
				        this.dtlformpanel.form.loadRecord(record);
				        this.dtlformpanel.url = '../PerDepartment/extupdate.do';
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
						url:'../PerDepartment/extdelete.do?ids='+record.data.deptId,
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
        this.dtlwin.setTitle('修改PerDepartment');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
        this.dtlformpanel.form.loadRecord(record);
        this.dtlformpanel.url = '../PerDepartment/extupdate.do';
    }
    
    //新建窗口
    ,addPerDepartment : function(){
        this.dtlwin.setTitle('新建PerDepartment');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
	    this.dtlformpanel.url = '../PerDepartment/extsave.do';
	}
	
	//编辑操作
    ,editPerDepartment:function(){
    	var records = this.getSelectionModel().getSelections();//单选
    	
	   if (records.length!=1) {
			Ext.Msg.alert("提示", "请先选择要修改的记录");
			return;
		}
	    this.dtlwin.setTitle('修改PerDepartment');
	    this.dtlwin.show();
	    this.dtlformpanel.form.reset();
	    this.dtlformpanel.form.loadRecord(records[0]);
	    this.dtlformpanel.url = '../PerDepartment/extupdate.do';

    }
    
    //删除操作
    ,deletePerDepartment:function(){
    	var records = this.getSelectionModel().getSelections();
		if (!records||records.length == 0) {
			Ext.Msg.alert("提示", "请先选择要删除的�记录");
			return;
		}
		Ext.MessageBox.confirm('确认删除','确定要删除这些记录?',function(btn){
			if (btn == 'yes'){
				Ext.Ajax.request({
					url:'../PerDepartment/extdelete.do?ids='+this.getRecordArrayUtils(records, 'deptId'),
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
    ,savePerDepartment:function(){
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
    	this.getStore().baseParams['s_deptNm'] = this.queryformpanel.form.findField('s_deptNm').getRawValue();
    	this.getStore().baseParams['s_parentDeptId'] = this.queryformpanel.form.findField('s_parentDeptId').getRawValue();
    	this.getStore().baseParams['s_companyId'] = this.queryformpanel.form.findField('s_companyId').getRawValue();
    	this.getStore().baseParams['s_deptDesc'] = this.queryformpanel.form.findField('s_deptDesc').getRawValue();
    	this.getStore().baseParams['s_deptRoom'] = this.queryformpanel.form.findField('s_deptRoom').getRawValue();
    	this.getStore().baseParams['s_leaderId'] = this.queryformpanel.form.findField('s_leaderId').getRawValue();
    	this.getStore().baseParams['s_leaderTel'] = this.queryformpanel.form.findField('s_leaderTel').getRawValue();
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
Ext.reg('perdepartment', com.ysys.www.perdepartmentGrid);


