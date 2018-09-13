/**
 * [Pjinfo] author by $YourName$
 * @include "../../extclient/RowExpander.js"
 * @include "../../extclient/gridToExcel.js"
 * @include "../../extclient/SearchField.js"
 */
 
Ext.namespace('com.ysys.www');
Ext.namespace('com.ysys.www.pjinfo');

/**
 * 查询表单
 * @class com.ysys.www.pjinfo.queryformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.pjinfo.queryformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        	,{xtype:'textfield',fieldLabel:'enddate',name:'s_enddate',width:288}
	        	,{xtype:'textfield',fieldLabel:'startdate',name:'s_startdate',width:288}
	        	,{xtype:'textfield',fieldLabel:'prjmei',name:'s_prjmei',width:288}
	        	,{xtype:'textfield',fieldLabel:'kyakuname',name:'s_kyakuname',width:288}
	        	,{xtype:'textfield',fieldLabel:'cancelflag',name:'s_cancelflag',width:288}
	        	,{xtype:'textfield',fieldLabel:'intimestp',name:'s_intimestp',width:288}
	        	,{xtype:'textfield',fieldLabel:'uptimestp',name:'s_uptimestp',width:288}
	        	,{xtype:'textfield',fieldLabel:'projecttyuname',name:'s_projecttyuname',width:288}
	        	,{xtype:'textfield',fieldLabel:'projecteiname',name:'s_projecteiname',width:288}
	        	,{xtype:'textfield',fieldLabel:'muserid',name:'s_muserid',width:288}
	        	,{xtype:'textfield',fieldLabel:'ystartdate',name:'s_ystartdate',width:288}
	        	,{xtype:'textfield',fieldLabel:'yenddate',name:'s_yenddate',width:288}
	        	,{xtype:'textfield',fieldLabel:'usernum',name:'s_usernum',width:288}
	        	,{xtype:'textfield',fieldLabel:'pjgaiyou',name:'s_pjgaiyou',width:288}
	        	,{xtype:'textfield',fieldLabel:'pjem',name:'s_pjem',width:288}
	        	,{xtype:'textfield',fieldLabel:'statusflg',name:'s_statusflg',width:288}
	        	,{xtype:'textfield',fieldLabel:'supuserid',name:'s_supuserid',width:288}
	        	,{xtype:'textfield',fieldLabel:'biko',name:'s_biko',width:288}
	            ]
	    });
		com.ysys.www.pjinfo.queryformpanel.superclass.initComponent.call(this);
	}
});

/**
 * 查询窗口
 * @class com.ysys.www.pjinfo.querywin
 * @extends Ext.Window
 */
com.ysys.www.pjinfo.querywin = Ext.extend(Ext.Window,{
	initComponent:function() {
		Ext.apply(this,{
	        title:'高级查询',
	        width:455,
	        height:395,
	        modal:true,
	        closeAction:'hide',
	        layout:'fit'
	    });
		com.ysys.www.pjinfo.querywin.superclass.initComponent.call(this);
	}
});

/**
 * 内容表单
 * @class com.ysys.www.pjinfo.dtlformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.pjinfo.dtlformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        		,{xtype:'hidden',fieldLabel:'projectid',name:'projectid',width:288}
	        		,{xtype:'textfield',fieldLabel:'enddate',name:'enddate',width:288}
	        		,{xtype:'textfield',fieldLabel:'startdate',name:'startdate',width:288}
	        		,{xtype:'textfield',fieldLabel:'prjmei',name:'prjmei',width:288}
	        		,{xtype:'textfield',fieldLabel:'kyakuname',name:'kyakuname',width:288}
	        		,{xtype:'textfield',fieldLabel:'cancelflag',name:'cancelflag',width:288}
	        		,{xtype:'textfield',fieldLabel:'intimestp',name:'intimestp',width:288}
	        		,{xtype:'textfield',fieldLabel:'uptimestp',name:'uptimestp',width:288}
	        		,{xtype:'textfield',fieldLabel:'projecttyuname',name:'projecttyuname',width:288}
	        		,{xtype:'textfield',fieldLabel:'projecteiname',name:'projecteiname',width:288}
	        		,{xtype:'textfield',fieldLabel:'muserid',name:'muserid',width:288}
	        		,{xtype:'textfield',fieldLabel:'ystartdate',name:'ystartdate',width:288}
	        		,{xtype:'textfield',fieldLabel:'yenddate',name:'yenddate',width:288}
	        		,{xtype:'textfield',fieldLabel:'usernum',name:'usernum',width:288}
	        		,{xtype:'textfield',fieldLabel:'pjgaiyou',name:'pjgaiyou',width:288}
	        		,{xtype:'textfield',fieldLabel:'pjem',name:'pjem',width:288}
	        		,{xtype:'textfield',fieldLabel:'statusflg',name:'statusflg',width:288}
	        		,{xtype:'textfield',fieldLabel:'supuserid',name:'supuserid',width:288}
	        		,{xtype:'textfield',fieldLabel:'biko',name:'biko',width:288}
	        ]
	    });
	    com.ysys.www.pjinfo.dtlformpanel .superclass.initComponent.call(this);
	}
	
});

/**
 * 表单窗口
 * @class com.ysys.www.pjinfo.dtlwin
 * @extends Ext.Window
 */		
com.ysys.www.pjinfo.dtlwin =  Ext.extend(Ext.Window,{
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
		com.ysys.www.pjinfo.dtlwin.superclass.initComponent.call(this);
	}
});


/**
 * 主表格入口
 * @class com.ysys.www.pjinfo
 * @extends Ext.grid.GridPanel
 */
com.ysys.www.pjinfoGrid = Ext.extend(Ext.grid.GridPanel,{
    initComponent:function() {
    	this.pageSize=10;
    	this.ds = new Ext.data.Store({
	        url:'../Pjinfo/extlist.do',
	        reader:new Ext.data.JsonReader({
	            root:'list',
	            totalProperty:'totalSize',
	            id:'id'
		        }
		        ,['projectid','enddate','startdate','prjmei','kyakuname','cancelflag','intimestp','uptimestp','projecttyuname','projecteiname','muserid','ystartdate','yenddate','usernum','pjgaiyou','pjem','statusflg','supuserid','biko',]
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
	        ,{header:'enddate',width:100,sortable:true,dataIndex:'enddate'}
	        ,{header:'startdate',width:100,sortable:true,dataIndex:'startdate'}
	        ,{header:'prjmei',width:100,sortable:true,dataIndex:'prjmei'}
	        ,{header:'kyakuname',width:100,sortable:true,dataIndex:'kyakuname'}
	        ,{header:'cancelflag',width:100,sortable:true,dataIndex:'cancelflag'}
	        ,{header:'intimestp',width:100,sortable:true,dataIndex:'intimestp'}
	        ,{header:'uptimestp',width:100,sortable:true,dataIndex:'uptimestp'}
	        ,{header:'projecttyuname',width:100,sortable:true,dataIndex:'projecttyuname'}
	        ,{header:'projecteiname',width:100,sortable:true,dataIndex:'projecteiname'}
	        ,{header:'muserid',width:100,sortable:true,dataIndex:'muserid'}
	        ,{header:'ystartdate',width:100,sortable:true,dataIndex:'ystartdate'}
	        ,{header:'yenddate',width:100,sortable:true,dataIndex:'yenddate'}
	        ,{header:'usernum',width:100,sortable:true,dataIndex:'usernum'}
	        ,{header:'pjgaiyou',width:100,sortable:true,dataIndex:'pjgaiyou'}
	        ,{header:'pjem',width:100,sortable:true,dataIndex:'pjem'}
	        ,{header:'statusflg',width:100,sortable:true,dataIndex:'statusflg'}
	        ,{header:'supuserid',width:100,sortable:true,dataIndex:'supuserid'}
	        ,{header:'biko',width:100,sortable:true,dataIndex:'biko'}
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
	        	{text:'新增',cls:'x-btn-text-icon',iconCls:'addicon',handler:this.addPjinfo,scope:this},'-'
	        	,{text:'修改',cls:'x-btn-text-icon',iconCls:'editicon',handler:this.editPjinfo,scope:this},'-'
	        	,{text:'删除',cls:'x-btn-text-icon',iconCls:'deleteicon',handler:this.deletePjinfo,scope:this},'-'
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
        			data: [['enddate', 'enddate'],['startdate', 'startdate'],['prjmei', 'prjmei'],['kyakuname', 'kyakuname'],['cancelflag', 'cancelflag'],['intimestp', 'intimestp'],['uptimestp', 'uptimestp'],['projecttyuname', 'projecttyuname'],['projecteiname', 'projecteiname'],['muserid', 'muserid'],['ystartdate', 'ystartdate'],['yenddate', 'yenddate'],['usernum', 'usernum'],['pjgaiyou', 'pjgaiyou'],['pjem', 'pjem'],['statusflg', 'statusflg'],['supuserid', 'supuserid'],['biko', 'biko']]
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
        com.ysys.www.pjinfoGrid.superclass.initComponent.call(this);
        //加载数据
        this.store.load({params:{start:0}});
        
 		//扩展类的详细弹出窗口
 		this.dtlformpanel = new com.ysys.www.pjinfo.dtlformpanel();
 		this.dtlwin =  new com.ysys.www.pjinfo.dtlwin({items:this.dtlformpanel,buttons:[{
	            text:'保存',
	            handler:this.savePjinfo,
	            scope:this
	        },{
	            text:'取消',
	            handler:function(){this.dtlwin.hide();},
	            scope:this
	        }]});
	    
	    //扩展类的查询弹出窗口
	    this.queryformpanel = new com.ysys.www.pjinfo.queryformpanel();
	    this.querywin =  new com.ysys.www.pjinfo.querywin({items:this.queryformpanel,buttons:[{
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
				        this.dtlwin.setTitle('修改Pjinfo');
				        this.dtlwin.show();
				        this.dtlformpanel.form.reset();
				        this.dtlformpanel.form.loadRecord(record);
				        this.dtlformpanel.url = '../Pjinfo/extupdate.do';
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
						url:'../Pjinfo/extdelete.do?ids='+record.data.projectid,
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
        this.dtlwin.setTitle('修改Pjinfo');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
        this.dtlformpanel.form.loadRecord(record);
        this.dtlformpanel.url = '../Pjinfo/extupdate.do';
    }
    
    //新建窗口
    ,addPjinfo : function(){
        this.dtlwin.setTitle('新建Pjinfo');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
	    this.dtlformpanel.url = '../Pjinfo/extsave.do';
	}
	
	//编辑操作
    ,editPjinfo:function(){
    	var records = this.getSelectionModel().getSelections();//单选
    	
	   if (records.length!=1) {
			Ext.Msg.alert("提示", "请先选择要修改的记录");
			return;
		}
	    this.dtlwin.setTitle('修改Pjinfo');
	    this.dtlwin.show();
	    this.dtlformpanel.form.reset();
	    this.dtlformpanel.form.loadRecord(records[0]);
	    this.dtlformpanel.url = '../Pjinfo/extupdate.do';

    }
    
    //删除操作
    ,deletePjinfo:function(){
    	var records = this.getSelectionModel().getSelections();
		if (!records||records.length == 0) {
			Ext.Msg.alert("提示", "请先选择要删除的�记录");
			return;
		}
		Ext.MessageBox.confirm('确认删除','确定要删除这些记录?',function(btn){
			if (btn == 'yes'){
				Ext.Ajax.request({
					url:'../Pjinfo/extdelete.do?ids='+this.getRecordArrayUtils(records, 'projectid'),
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
    ,savePjinfo:function(){
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
    	this.getStore().baseParams['s_enddate'] = this.queryformpanel.form.findField('s_enddate').getRawValue();
    	this.getStore().baseParams['s_startdate'] = this.queryformpanel.form.findField('s_startdate').getRawValue();
    	this.getStore().baseParams['s_prjmei'] = this.queryformpanel.form.findField('s_prjmei').getRawValue();
    	this.getStore().baseParams['s_kyakuname'] = this.queryformpanel.form.findField('s_kyakuname').getRawValue();
    	this.getStore().baseParams['s_cancelflag'] = this.queryformpanel.form.findField('s_cancelflag').getRawValue();
    	this.getStore().baseParams['s_intimestp'] = this.queryformpanel.form.findField('s_intimestp').getRawValue();
    	this.getStore().baseParams['s_uptimestp'] = this.queryformpanel.form.findField('s_uptimestp').getRawValue();
    	this.getStore().baseParams['s_projecttyuname'] = this.queryformpanel.form.findField('s_projecttyuname').getRawValue();
    	this.getStore().baseParams['s_projecteiname'] = this.queryformpanel.form.findField('s_projecteiname').getRawValue();
    	this.getStore().baseParams['s_muserid'] = this.queryformpanel.form.findField('s_muserid').getRawValue();
    	this.getStore().baseParams['s_ystartdate'] = this.queryformpanel.form.findField('s_ystartdate').getRawValue();
    	this.getStore().baseParams['s_yenddate'] = this.queryformpanel.form.findField('s_yenddate').getRawValue();
    	this.getStore().baseParams['s_usernum'] = this.queryformpanel.form.findField('s_usernum').getRawValue();
    	this.getStore().baseParams['s_pjgaiyou'] = this.queryformpanel.form.findField('s_pjgaiyou').getRawValue();
    	this.getStore().baseParams['s_pjem'] = this.queryformpanel.form.findField('s_pjem').getRawValue();
    	this.getStore().baseParams['s_statusflg'] = this.queryformpanel.form.findField('s_statusflg').getRawValue();
    	this.getStore().baseParams['s_supuserid'] = this.queryformpanel.form.findField('s_supuserid').getRawValue();
    	this.getStore().baseParams['s_biko'] = this.queryformpanel.form.findField('s_biko').getRawValue();
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
Ext.reg('pjinfo', com.ysys.www.pjinfoGrid);


