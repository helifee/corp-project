/**
 * [TabMrhyyl] author by $YourName$
 * @include "../../extclient/RowExpander.js"
 * @include "../../extclient/gridToExcel.js"
 * @include "../../extclient/SearchField.js"
 */
 
Ext.namespace('com.ysys.www');
Ext.namespace('com.ysys.www.tabmrhyyl');

/**
 * 查询表单
 * @class com.ysys.www.tabmrhyyl.queryformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.tabmrhyyl.queryformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        	,{xtype:'textfield',fieldLabel:'会议结束时间',name:'s_hyjssj',width:288}
	        	,{xtype:'textfield',fieldLabel:'会议主题',name:'s_hyzt',width:288}
	        	,{xtype:'textfield',fieldLabel:'预约人ID',name:'s_yyrid',width:288}
	        	,{xtype:'textfield',fieldLabel:'公开标志',name:'s_bmbz',width:288}
	        	,{xtype:'textfield',fieldLabel:'参加者人数',name:'s_cjzrs',width:288}
	        	,{xtype:'textfield',fieldLabel:'周期会议区分',name:'s_zqhyqf',width:288}
	        	,{xtype:'textfield',fieldLabel:'周期会议ID',name:'s_zqhyid',width:288}
	        	,{xtype:'textfield',fieldLabel:'会议内容报告',name:'s_hysbg',width:288}
	        	,{xtype:'textfield',fieldLabel:'更新时间',name:'s_updatetime',width:288}
	            ]
	    });
		com.ysys.www.tabmrhyyl.queryformpanel.superclass.initComponent.call(this);
	}
});

/**
 * 查询窗口
 * @class com.ysys.www.tabmrhyyl.querywin
 * @extends Ext.Window
 */
com.ysys.www.tabmrhyyl.querywin = Ext.extend(Ext.Window,{
	initComponent:function() {
		Ext.apply(this,{
	        title:'高级查询',
	        width:455,
	        height:395,
	        modal:true,
	        closeAction:'hide',
	        layout:'fit'
	    });
		com.ysys.www.tabmrhyyl.querywin.superclass.initComponent.call(this);
	}
});

/**
 * 内容表单
 * @class com.ysys.www.tabmrhyyl.dtlformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.tabmrhyyl.dtlformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        		,{xtype:'hidden',fieldLabel:'会议日期',name:'hyrq',width:288}
	        		,{xtype:'hidden',fieldLabel:'会议开始时间',name:'hykssj',width:288}
	        		,{xtype:'textfield',fieldLabel:'会议结束时间',name:'hyjssj',width:288}
	        		,{xtype:'textfield',fieldLabel:'会议主题',name:'hyzt',width:288}
	        		,{xtype:'hidden',fieldLabel:'会议室ID',name:'hysid',width:288}
	        		,{xtype:'textfield',fieldLabel:'预约人ID',name:'yyrid',width:288}
	        		,{xtype:'textfield',fieldLabel:'公开标志',name:'bmbz',width:288}
	        		,{xtype:'textfield',fieldLabel:'参加者人数',name:'cjzrs',width:288}
	        		,{xtype:'textfield',fieldLabel:'周期会议区分',name:'zqhyqf',width:288}
	        		,{xtype:'textfield',fieldLabel:'周期会议ID',name:'zqhyid',width:288}
	        		,{xtype:'textfield',fieldLabel:'会议内容报告',name:'hysbg',width:288}
	        		,{xtype:'textfield',fieldLabel:'更新时间',name:'updatetime',width:288}
	        ]
	    });
	    com.ysys.www.tabmrhyyl.dtlformpanel .superclass.initComponent.call(this);
	}
	
});

/**
 * 表单窗口
 * @class com.ysys.www.tabmrhyyl.dtlwin
 * @extends Ext.Window
 */		
com.ysys.www.tabmrhyyl.dtlwin =  Ext.extend(Ext.Window,{
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
		com.ysys.www.tabmrhyyl.dtlwin.superclass.initComponent.call(this);
	}
});


/**
 * 主表格入口
 * @class com.ysys.www.tabmrhyyl
 * @extends Ext.grid.GridPanel
 */
com.ysys.www.tabmrhyylGrid = Ext.extend(Ext.grid.GridPanel,{
    initComponent:function() {
    	this.pageSize=10;
    	this.ds = new Ext.data.Store({
	        url:'../TabMrhyyl/extlist.do',
	        reader:new Ext.data.JsonReader({
	            root:'list',
	            totalProperty:'totalSize',
	            id:'id'
		        }
		        ,['hyrq','hykssj','hyjssj','hyzt','hysid','yyrid','bmbz','cjzrs','zqhyqf','zqhyid','hysbg','updatetime',]
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
	        ,{header:'会议结束时间',width:100,sortable:true,dataIndex:'hyjssj'}
	        ,{header:'会议主题',width:100,sortable:true,dataIndex:'hyzt'}
	        ,{header:'预约人ID',width:100,sortable:true,dataIndex:'yyrid'}
	        ,{header:'公开标志',width:100,sortable:true,dataIndex:'bmbz'}
	        ,{header:'参加者人数',width:100,sortable:true,dataIndex:'cjzrs'}
	        ,{header:'周期会议区分',width:100,sortable:true,dataIndex:'zqhyqf'}
	        ,{header:'周期会议ID',width:100,sortable:true,dataIndex:'zqhyid'}
	        ,{header:'会议内容报告',width:100,sortable:true,dataIndex:'hysbg'}
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
	        	{text:'新增',cls:'x-btn-text-icon',iconCls:'addicon',handler:this.addTabMrhyyl,scope:this},'-'
	        	,{text:'修改',cls:'x-btn-text-icon',iconCls:'editicon',handler:this.editTabMrhyyl,scope:this},'-'
	        	,{text:'删除',cls:'x-btn-text-icon',iconCls:'deleteicon',handler:this.deleteTabMrhyyl,scope:this},'-'
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
        			data: [['会议结束时间', 'hyjssj'],['会议主题', 'hyzt'],['预约人ID', 'yyrid'],['公开标志', 'bmbz'],['参加者人数', 'cjzrs'],['周期会议区分', 'zqhyqf'],['周期会议ID', 'zqhyid'],['会议内容报告', 'hysbg'],['更新时间', 'updatetime']]
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
        com.ysys.www.tabmrhyylGrid.superclass.initComponent.call(this);
        //加载数据
        this.store.load({params:{start:0}});
        
 		//扩展类的详细弹出窗口
 		this.dtlformpanel = new com.ysys.www.tabmrhyyl.dtlformpanel();
 		this.dtlwin =  new com.ysys.www.tabmrhyyl.dtlwin({items:this.dtlformpanel,buttons:[{
	            text:'保存',
	            handler:this.saveTabMrhyyl,
	            scope:this
	        },{
	            text:'取消',
	            handler:function(){this.dtlwin.hide();},
	            scope:this
	        }]});
	    
	    //扩展类的查询弹出窗口
	    this.queryformpanel = new com.ysys.www.tabmrhyyl.queryformpanel();
	    this.querywin =  new com.ysys.www.tabmrhyyl.querywin({items:this.queryformpanel,buttons:[{
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
				        this.dtlwin.setTitle('修改TabMrhyyl');
				        this.dtlwin.show();
				        this.dtlformpanel.form.reset();
				        this.dtlformpanel.form.loadRecord(record);
				        this.dtlformpanel.url = '../TabMrhyyl/extupdate.do';
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
						url:'../TabMrhyyl/extdelete.do?ids='+record.data.hyrq,
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
        this.dtlwin.setTitle('修改TabMrhyyl');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
        this.dtlformpanel.form.loadRecord(record);
        this.dtlformpanel.url = '../TabMrhyyl/extupdate.do';
    }
    
    //新建窗口
    ,addTabMrhyyl : function(){
        this.dtlwin.setTitle('新建TabMrhyyl');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
	    this.dtlformpanel.url = '../TabMrhyyl/extsave.do';
	}
	
	//编辑操作
    ,editTabMrhyyl:function(){
    	var records = this.getSelectionModel().getSelections();//单选
    	
	   if (records.length!=1) {
			Ext.Msg.alert("提示", "请先选择要修改的记录");
			return;
		}
	    this.dtlwin.setTitle('修改TabMrhyyl');
	    this.dtlwin.show();
	    this.dtlformpanel.form.reset();
	    this.dtlformpanel.form.loadRecord(records[0]);
	    this.dtlformpanel.url = '../TabMrhyyl/extupdate.do';

    }
    
    //删除操作
    ,deleteTabMrhyyl:function(){
    	var records = this.getSelectionModel().getSelections();
		if (!records||records.length == 0) {
			Ext.Msg.alert("提示", "请先选择要删除的�记录");
			return;
		}
		Ext.MessageBox.confirm('确认删除','确定要删除这些记录?',function(btn){
			if (btn == 'yes'){
				Ext.Ajax.request({
					url:'../TabMrhyyl/extdelete.do?ids='+this.getRecordArrayUtils(records, 'hyrq'),
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
    ,saveTabMrhyyl:function(){
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
    	this.getStore().baseParams['s_hyjssj'] = this.queryformpanel.form.findField('s_hyjssj').getRawValue();
    	this.getStore().baseParams['s_hyzt'] = this.queryformpanel.form.findField('s_hyzt').getRawValue();
    	this.getStore().baseParams['s_yyrid'] = this.queryformpanel.form.findField('s_yyrid').getRawValue();
    	this.getStore().baseParams['s_bmbz'] = this.queryformpanel.form.findField('s_bmbz').getRawValue();
    	this.getStore().baseParams['s_cjzrs'] = this.queryformpanel.form.findField('s_cjzrs').getRawValue();
    	this.getStore().baseParams['s_zqhyqf'] = this.queryformpanel.form.findField('s_zqhyqf').getRawValue();
    	this.getStore().baseParams['s_zqhyid'] = this.queryformpanel.form.findField('s_zqhyid').getRawValue();
    	this.getStore().baseParams['s_hysbg'] = this.queryformpanel.form.findField('s_hysbg').getRawValue();
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
Ext.reg('tabmrhyyl', com.ysys.www.tabmrhyylGrid);


