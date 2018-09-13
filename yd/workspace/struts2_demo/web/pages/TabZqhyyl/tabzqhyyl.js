/**
 * [TabZqhyyl] author by $YourName$
 * @include "../../extclient/RowExpander.js"
 * @include "../../extclient/gridToExcel.js"
 * @include "../../extclient/SearchField.js"
 */
 
Ext.namespace('com.ysys.www');
Ext.namespace('com.ysys.www.tabzqhyyl');

/**
 * 查询表单
 * @class com.ysys.www.tabzqhyyl.queryformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.tabzqhyyl.queryformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        	,{xtype:'textfield',fieldLabel:'周期类型',name:'s_zqlx',width:288}
	        	,{xtype:'textfield',fieldLabel:'后延标志',name:'s_hybz',width:288}
	        	,{xtype:'textfield',fieldLabel:'周期会议主题',name:'s_zqhyzt',width:288}
	        	,{xtype:'textfield',fieldLabel:'公开标志',name:'s_bmbz',width:288}
	        	,{xtype:'textfield',fieldLabel:'会议室ID',name:'s_hysid',width:288}
	        	,{xtype:'textfield',fieldLabel:'会议开始日期',name:'s_hyksrq',width:288}
	        	,{xtype:'textfield',fieldLabel:'会议结束日期',name:'s_hyjsrq',width:288}
	        	,{xtype:'textfield',fieldLabel:'会议开始时间',name:'s_hykssj',width:288}
	        	,{xtype:'textfield',fieldLabel:'会议结束时间',name:'s_hyjssj',width:288}
	        	,{xtype:'textfield',fieldLabel:'预约人ID',name:'s_yyrid',width:288}
	        	,{xtype:'textfield',fieldLabel:'项目组ID',name:'s_xmzid',width:288}
	        	,{xtype:'textfield',fieldLabel:'参加者人数',name:'s_cjzrs',width:288}
	        	,{xtype:'textfield',fieldLabel:'更改标志',name:'s_ggbz',width:288}
	        	,{xtype:'textfield',fieldLabel:'删除标志',name:'s_delflg',width:288}
	        	,{xtype:'textfield',fieldLabel:'更新时间',name:'s_updatetime',width:288}
	            ]
	    });
		com.ysys.www.tabzqhyyl.queryformpanel.superclass.initComponent.call(this);
	}
});

/**
 * 查询窗口
 * @class com.ysys.www.tabzqhyyl.querywin
 * @extends Ext.Window
 */
com.ysys.www.tabzqhyyl.querywin = Ext.extend(Ext.Window,{
	initComponent:function() {
		Ext.apply(this,{
	        title:'高级查询',
	        width:455,
	        height:395,
	        modal:true,
	        closeAction:'hide',
	        layout:'fit'
	    });
		com.ysys.www.tabzqhyyl.querywin.superclass.initComponent.call(this);
	}
});

/**
 * 内容表单
 * @class com.ysys.www.tabzqhyyl.dtlformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.tabzqhyyl.dtlformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        		,{xtype:'hidden',fieldLabel:'周期会议ID',name:'zqhyid',width:288}
	        		,{xtype:'hidden',fieldLabel:'周期内会议天数',name:'zqnhyts',width:288}
	        		,{xtype:'textfield',fieldLabel:'周期类型',name:'zqlx',width:288}
	        		,{xtype:'textfield',fieldLabel:'后延标志',name:'hybz',width:288}
	        		,{xtype:'textfield',fieldLabel:'周期会议主题',name:'zqhyzt',width:288}
	        		,{xtype:'textfield',fieldLabel:'公开标志',name:'bmbz',width:288}
	        		,{xtype:'textfield',fieldLabel:'会议室ID',name:'hysid',width:288}
	        		,{xtype:'textfield',fieldLabel:'会议开始日期',name:'hyksrq',width:288}
	        		,{xtype:'textfield',fieldLabel:'会议结束日期',name:'hyjsrq',width:288}
	        		,{xtype:'textfield',fieldLabel:'会议开始时间',name:'hykssj',width:288}
	        		,{xtype:'textfield',fieldLabel:'会议结束时间',name:'hyjssj',width:288}
	        		,{xtype:'textfield',fieldLabel:'预约人ID',name:'yyrid',width:288}
	        		,{xtype:'textfield',fieldLabel:'项目组ID',name:'xmzid',width:288}
	        		,{xtype:'textfield',fieldLabel:'参加者人数',name:'cjzrs',width:288}
	        		,{xtype:'textfield',fieldLabel:'更改标志',name:'ggbz',width:288}
	        		,{xtype:'textfield',fieldLabel:'删除标志',name:'delflg',width:288}
	        		,{xtype:'textfield',fieldLabel:'更新时间',name:'updatetime',width:288}
	        ]
	    });
	    com.ysys.www.tabzqhyyl.dtlformpanel .superclass.initComponent.call(this);
	}
	
});

/**
 * 表单窗口
 * @class com.ysys.www.tabzqhyyl.dtlwin
 * @extends Ext.Window
 */		
com.ysys.www.tabzqhyyl.dtlwin =  Ext.extend(Ext.Window,{
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
		com.ysys.www.tabzqhyyl.dtlwin.superclass.initComponent.call(this);
	}
});


/**
 * 主表格入口
 * @class com.ysys.www.tabzqhyyl
 * @extends Ext.grid.GridPanel
 */
com.ysys.www.tabzqhyylGrid = Ext.extend(Ext.grid.GridPanel,{
    initComponent:function() {
    	this.pageSize=10;
    	this.ds = new Ext.data.Store({
	        url:'../TabZqhyyl/extlist.do',
	        reader:new Ext.data.JsonReader({
	            root:'list',
	            totalProperty:'totalSize',
	            id:'id'
		        }
		        ,['zqhyid','zqnhyts','zqlx','hybz','zqhyzt','bmbz','hysid','hyksrq','hyjsrq','hykssj','hyjssj','yyrid','xmzid','cjzrs','ggbz','delflg','updatetime',]
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
	        ,{header:'周期类型',width:100,sortable:true,dataIndex:'zqlx'}
	        ,{header:'后延标志',width:100,sortable:true,dataIndex:'hybz'}
	        ,{header:'周期会议主题',width:100,sortable:true,dataIndex:'zqhyzt'}
	        ,{header:'公开标志',width:100,sortable:true,dataIndex:'bmbz'}
	        ,{header:'会议室ID',width:100,sortable:true,dataIndex:'hysid'}
	        ,{header:'会议开始日期',width:100,sortable:true,dataIndex:'hyksrq'}
	        ,{header:'会议结束日期',width:100,sortable:true,dataIndex:'hyjsrq'}
	        ,{header:'会议开始时间',width:100,sortable:true,dataIndex:'hykssj'}
	        ,{header:'会议结束时间',width:100,sortable:true,dataIndex:'hyjssj'}
	        ,{header:'预约人ID',width:100,sortable:true,dataIndex:'yyrid'}
	        ,{header:'项目组ID',width:100,sortable:true,dataIndex:'xmzid'}
	        ,{header:'参加者人数',width:100,sortable:true,dataIndex:'cjzrs'}
	        ,{header:'更改标志',width:100,sortable:true,dataIndex:'ggbz'}
	        ,{header:'删除标志',width:100,sortable:true,dataIndex:'delflg'}
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
	        	{text:'新增',cls:'x-btn-text-icon',iconCls:'addicon',handler:this.addTabZqhyyl,scope:this},'-'
	        	,{text:'修改',cls:'x-btn-text-icon',iconCls:'editicon',handler:this.editTabZqhyyl,scope:this},'-'
	        	,{text:'删除',cls:'x-btn-text-icon',iconCls:'deleteicon',handler:this.deleteTabZqhyyl,scope:this},'-'
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
        			data: [['周期类型', 'zqlx'],['后延标志', 'hybz'],['周期会议主题', 'zqhyzt'],['公开标志', 'bmbz'],['会议室ID', 'hysid'],['会议开始日期', 'hyksrq'],['会议结束日期', 'hyjsrq'],['会议开始时间', 'hykssj'],['会议结束时间', 'hyjssj'],['预约人ID', 'yyrid'],['项目组ID', 'xmzid'],['参加者人数', 'cjzrs'],['更改标志', 'ggbz'],['删除标志', 'delflg'],['更新时间', 'updatetime']]
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
        com.ysys.www.tabzqhyylGrid.superclass.initComponent.call(this);
        //加载数据
        this.store.load({params:{start:0}});
        
 		//扩展类的详细弹出窗口
 		this.dtlformpanel = new com.ysys.www.tabzqhyyl.dtlformpanel();
 		this.dtlwin =  new com.ysys.www.tabzqhyyl.dtlwin({items:this.dtlformpanel,buttons:[{
	            text:'保存',
	            handler:this.saveTabZqhyyl,
	            scope:this
	        },{
	            text:'取消',
	            handler:function(){this.dtlwin.hide();},
	            scope:this
	        }]});
	    
	    //扩展类的查询弹出窗口
	    this.queryformpanel = new com.ysys.www.tabzqhyyl.queryformpanel();
	    this.querywin =  new com.ysys.www.tabzqhyyl.querywin({items:this.queryformpanel,buttons:[{
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
				        this.dtlwin.setTitle('修改TabZqhyyl');
				        this.dtlwin.show();
				        this.dtlformpanel.form.reset();
				        this.dtlformpanel.form.loadRecord(record);
				        this.dtlformpanel.url = '../TabZqhyyl/extupdate.do';
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
						url:'../TabZqhyyl/extdelete.do?ids='+record.data.zqhyid,
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
        this.dtlwin.setTitle('修改TabZqhyyl');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
        this.dtlformpanel.form.loadRecord(record);
        this.dtlformpanel.url = '../TabZqhyyl/extupdate.do';
    }
    
    //新建窗口
    ,addTabZqhyyl : function(){
        this.dtlwin.setTitle('新建TabZqhyyl');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
	    this.dtlformpanel.url = '../TabZqhyyl/extsave.do';
	}
	
	//编辑操作
    ,editTabZqhyyl:function(){
    	var records = this.getSelectionModel().getSelections();//单选
    	
	   if (records.length!=1) {
			Ext.Msg.alert("提示", "请先选择要修改的记录");
			return;
		}
	    this.dtlwin.setTitle('修改TabZqhyyl');
	    this.dtlwin.show();
	    this.dtlformpanel.form.reset();
	    this.dtlformpanel.form.loadRecord(records[0]);
	    this.dtlformpanel.url = '../TabZqhyyl/extupdate.do';

    }
    
    //删除操作
    ,deleteTabZqhyyl:function(){
    	var records = this.getSelectionModel().getSelections();
		if (!records||records.length == 0) {
			Ext.Msg.alert("提示", "请先选择要删除的�记录");
			return;
		}
		Ext.MessageBox.confirm('确认删除','确定要删除这些记录?',function(btn){
			if (btn == 'yes'){
				Ext.Ajax.request({
					url:'../TabZqhyyl/extdelete.do?ids='+this.getRecordArrayUtils(records, 'zqhyid'),
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
    ,saveTabZqhyyl:function(){
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
    	this.getStore().baseParams['s_zqlx'] = this.queryformpanel.form.findField('s_zqlx').getRawValue();
    	this.getStore().baseParams['s_hybz'] = this.queryformpanel.form.findField('s_hybz').getRawValue();
    	this.getStore().baseParams['s_zqhyzt'] = this.queryformpanel.form.findField('s_zqhyzt').getRawValue();
    	this.getStore().baseParams['s_bmbz'] = this.queryformpanel.form.findField('s_bmbz').getRawValue();
    	this.getStore().baseParams['s_hysid'] = this.queryformpanel.form.findField('s_hysid').getRawValue();
    	this.getStore().baseParams['s_hyksrq'] = this.queryformpanel.form.findField('s_hyksrq').getRawValue();
    	this.getStore().baseParams['s_hyjsrq'] = this.queryformpanel.form.findField('s_hyjsrq').getRawValue();
    	this.getStore().baseParams['s_hykssj'] = this.queryformpanel.form.findField('s_hykssj').getRawValue();
    	this.getStore().baseParams['s_hyjssj'] = this.queryformpanel.form.findField('s_hyjssj').getRawValue();
    	this.getStore().baseParams['s_yyrid'] = this.queryformpanel.form.findField('s_yyrid').getRawValue();
    	this.getStore().baseParams['s_xmzid'] = this.queryformpanel.form.findField('s_xmzid').getRawValue();
    	this.getStore().baseParams['s_cjzrs'] = this.queryformpanel.form.findField('s_cjzrs').getRawValue();
    	this.getStore().baseParams['s_ggbz'] = this.queryformpanel.form.findField('s_ggbz').getRawValue();
    	this.getStore().baseParams['s_delflg'] = this.queryformpanel.form.findField('s_delflg').getRawValue();
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
Ext.reg('tabzqhyyl', com.ysys.www.tabzqhyylGrid);


