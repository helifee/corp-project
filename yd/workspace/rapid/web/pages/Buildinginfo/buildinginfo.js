/**
 * [Buildinginfo] author by $YourName$
 * @include "../../extclient/RowExpander.js"
 * @include "../../extclient/gridToExcel.js"
 * @include "../../extclient/SearchField.js"
 */
 
Ext.namespace('com.ysys.www');
Ext.namespace('com.ysys.www.buildinginfo');

/**
 * 查询表单
 * @class com.ysys.www.buildinginfo.queryformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.buildinginfo.queryformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        	,{xtype:'textfield',fieldLabel:'市代号',name:'s_cityid',width:288}
	        	,{xtype:'textfield',fieldLabel:'区代号',name:'s_distid',width:288}
	        	,{xtype:'textfield',fieldLabel:'楼盘名称',name:'s_buildname',width:288}
	        	,{xtype:'textfield',fieldLabel:'楼盘地址',name:'s_address',width:288}
	        	,{xtype:'textfield',fieldLabel:'剩余套数',name:'s_surplusNumber',width:288}
	        	,{xtype:'textfield',fieldLabel:'起价',name:'s_startingPrice',width:288}
	        	,{xtype:'textfield',fieldLabel:'均价',name:'s_evenPrice',width:288}
	        	,{xtype:'textfield',fieldLabel:'开盘公告',name:'s_notice',width:288}
	        	,{xtype:'textfield',fieldLabel:'效果图路径',name:'s_imagePath',width:288}
	        	,{xtype:'textfield',fieldLabel:'销售公司',name:'s_salesCompany',width:288}
	        	,{xtype:'textfield',fieldLabel:'详细介绍',name:'s_detailIntroduction',width:288}
	        	,{xtype:'textfield',fieldLabel:'可见标志',name:'s_flag',width:288}
	        	,{xtype:'textfield',fieldLabel:'更新时间',name:'s_updatetime',width:288}
	            ]
	    });
		com.ysys.www.buildinginfo.queryformpanel.superclass.initComponent.call(this);
	}
});

/**
 * 查询窗口
 * @class com.ysys.www.buildinginfo.querywin
 * @extends Ext.Window
 */
com.ysys.www.buildinginfo.querywin = Ext.extend(Ext.Window,{
	initComponent:function() {
		Ext.apply(this,{
	        title:'高级查询',
	        width:455,
	        height:395,
	        modal:true,
	        closeAction:'hide',
	        layout:'fit'
	    });
		com.ysys.www.buildinginfo.querywin.superclass.initComponent.call(this);
	}
});

/**
 * 内容表单
 * @class com.ysys.www.buildinginfo.dtlformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.buildinginfo.dtlformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        		,{xtype:'hidden',fieldLabel:'楼盘代号',name:'buildid',width:288}
	        		,{xtype:'textfield',fieldLabel:'市代号',name:'cityid',width:288}
	        		,{xtype:'textfield',fieldLabel:'区代号',name:'distid',width:288}
	        		,{xtype:'textfield',fieldLabel:'楼盘名称',name:'buildname',width:288}
	        		,{xtype:'textfield',fieldLabel:'楼盘地址',name:'address',width:288}
	        		,{xtype:'textfield',fieldLabel:'剩余套数',name:'surplusNumber',width:288}
	        		,{xtype:'textfield',fieldLabel:'起价',name:'startingPrice',width:288}
	        		,{xtype:'textfield',fieldLabel:'均价',name:'evenPrice',width:288}
	        		,{xtype:'textfield',fieldLabel:'开盘公告',name:'notice',width:288}
	        		,{xtype:'textfield',fieldLabel:'效果图路径',name:'imagePath',width:288}
	        		,{xtype:'textfield',fieldLabel:'销售公司',name:'salesCompany',width:288}
	        		,{xtype:'textfield',fieldLabel:'详细介绍',name:'detailIntroduction',width:288}
	        		,{xtype:'textfield',fieldLabel:'可见标志',name:'flag',width:288}
	        		,{xtype:'textfield',fieldLabel:'更新时间',name:'updatetime',width:288}
	        ]
	    });
	    com.ysys.www.buildinginfo.dtlformpanel .superclass.initComponent.call(this);
	}
	
});

/**
 * 表单窗口
 * @class com.ysys.www.buildinginfo.dtlwin
 * @extends Ext.Window
 */		
com.ysys.www.buildinginfo.dtlwin =  Ext.extend(Ext.Window,{
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
		com.ysys.www.buildinginfo.dtlwin.superclass.initComponent.call(this);
	}
});


/**
 * 主表格入口
 * @class com.ysys.www.buildinginfo
 * @extends Ext.grid.GridPanel
 */
com.ysys.www.buildinginfoGrid = Ext.extend(Ext.grid.GridPanel,{
    initComponent:function() {
    	this.pageSize=10;
    	this.ds = new Ext.data.Store({
	        url:'../Buildinginfo/extlist.do',
	        reader:new Ext.data.JsonReader({
	            root:'list',
	            totalProperty:'totalSize',
	            id:'id'
		        }
		        ,['buildid','cityid','distid','buildname','address','surplusNumber','startingPrice','evenPrice','notice','imagePath','salesCompany','detailIntroduction','flag','updatetime',]
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
	        ,{header:'市代号',width:100,sortable:true,dataIndex:'cityid'}
	        ,{header:'区代号',width:100,sortable:true,dataIndex:'distid'}
	        ,{header:'楼盘名称',width:100,sortable:true,dataIndex:'buildname'}
	        ,{header:'楼盘地址',width:100,sortable:true,dataIndex:'address'}
	        ,{header:'剩余套数',width:100,sortable:true,dataIndex:'surplusNumber'}
	        ,{header:'起价',width:100,sortable:true,dataIndex:'startingPrice'}
	        ,{header:'均价',width:100,sortable:true,dataIndex:'evenPrice'}
	        ,{header:'开盘公告',width:100,sortable:true,dataIndex:'notice'}
	        ,{header:'效果图路径',width:100,sortable:true,dataIndex:'imagePath'}
	        ,{header:'销售公司',width:100,sortable:true,dataIndex:'salesCompany'}
	        ,{header:'详细介绍',width:100,sortable:true,dataIndex:'detailIntroduction'}
	        ,{header:'可见标志',width:100,sortable:true,dataIndex:'flag'}
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
	        	{text:'新增',cls:'x-btn-text-icon',iconCls:'addicon',handler:this.addBuildinginfo,scope:this},'-'
	        	,{text:'修改',cls:'x-btn-text-icon',iconCls:'editicon',handler:this.editBuildinginfo,scope:this},'-'
	        	,{text:'删除',cls:'x-btn-text-icon',iconCls:'deleteicon',handler:this.deleteBuildinginfo,scope:this},'-'
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
        			data: [['市代号', 'cityid'],['区代号', 'distid'],['楼盘名称', 'buildname'],['楼盘地址', 'address'],['剩余套数', 'surplusNumber'],['起价', 'startingPrice'],['均价', 'evenPrice'],['开盘公告', 'notice'],['效果图路径', 'imagePath'],['销售公司', 'salesCompany'],['详细介绍', 'detailIntroduction'],['可见标志', 'flag'],['更新时间', 'updatetime']]
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
        com.ysys.www.buildinginfoGrid.superclass.initComponent.call(this);
        //加载数据
        this.store.load({params:{start:0}});
        
 		//扩展类的详细弹出窗口
 		this.dtlformpanel = new com.ysys.www.buildinginfo.dtlformpanel();
 		this.dtlwin =  new com.ysys.www.buildinginfo.dtlwin({items:this.dtlformpanel,buttons:[{
	            text:'保存',
	            handler:this.saveBuildinginfo,
	            scope:this
	        },{
	            text:'取消',
	            handler:function(){this.dtlwin.hide();},
	            scope:this
	        }]});
	    
	    //扩展类的查询弹出窗口
	    this.queryformpanel = new com.ysys.www.buildinginfo.queryformpanel();
	    this.querywin =  new com.ysys.www.buildinginfo.querywin({items:this.queryformpanel,buttons:[{
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
				        this.dtlwin.setTitle('修改Buildinginfo');
				        this.dtlwin.show();
				        this.dtlformpanel.form.reset();
				        this.dtlformpanel.form.loadRecord(record);
				        this.dtlformpanel.url = '../Buildinginfo/extupdate.do';
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
						url:'../Buildinginfo/extdelete.do?ids='+record.data.buildid,
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
        this.dtlwin.setTitle('修改Buildinginfo');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
        this.dtlformpanel.form.loadRecord(record);
        this.dtlformpanel.url = '../Buildinginfo/extupdate.do';
    }
    
    //新建窗口
    ,addBuildinginfo : function(){
        this.dtlwin.setTitle('新建Buildinginfo');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
	    this.dtlformpanel.url = '../Buildinginfo/extsave.do';
	}
	
	//编辑操作
    ,editBuildinginfo:function(){
    	var records = this.getSelectionModel().getSelections();//单选
    	
	   if (records.length!=1) {
			Ext.Msg.alert("提示", "请先选择要修改的记录");
			return;
		}
	    this.dtlwin.setTitle('修改Buildinginfo');
	    this.dtlwin.show();
	    this.dtlformpanel.form.reset();
	    this.dtlformpanel.form.loadRecord(records[0]);
	    this.dtlformpanel.url = '../Buildinginfo/extupdate.do';

    }
    
    //删除操作
    ,deleteBuildinginfo:function(){
    	var records = this.getSelectionModel().getSelections();
		if (!records||records.length == 0) {
			Ext.Msg.alert("提示", "请先选择要删除的�记录");
			return;
		}
		Ext.MessageBox.confirm('确认删除','确定要删除这些记录?',function(btn){
			if (btn == 'yes'){
				Ext.Ajax.request({
					url:'../Buildinginfo/extdelete.do?ids='+this.getRecordArrayUtils(records, 'buildid'),
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
    ,saveBuildinginfo:function(){
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
    	this.getStore().baseParams['s_cityid'] = this.queryformpanel.form.findField('s_cityid').getRawValue();
    	this.getStore().baseParams['s_distid'] = this.queryformpanel.form.findField('s_distid').getRawValue();
    	this.getStore().baseParams['s_buildname'] = this.queryformpanel.form.findField('s_buildname').getRawValue();
    	this.getStore().baseParams['s_address'] = this.queryformpanel.form.findField('s_address').getRawValue();
    	this.getStore().baseParams['s_surplusNumber'] = this.queryformpanel.form.findField('s_surplusNumber').getRawValue();
    	this.getStore().baseParams['s_startingPrice'] = this.queryformpanel.form.findField('s_startingPrice').getRawValue();
    	this.getStore().baseParams['s_evenPrice'] = this.queryformpanel.form.findField('s_evenPrice').getRawValue();
    	this.getStore().baseParams['s_notice'] = this.queryformpanel.form.findField('s_notice').getRawValue();
    	this.getStore().baseParams['s_imagePath'] = this.queryformpanel.form.findField('s_imagePath').getRawValue();
    	this.getStore().baseParams['s_salesCompany'] = this.queryformpanel.form.findField('s_salesCompany').getRawValue();
    	this.getStore().baseParams['s_detailIntroduction'] = this.queryformpanel.form.findField('s_detailIntroduction').getRawValue();
    	this.getStore().baseParams['s_flag'] = this.queryformpanel.form.findField('s_flag').getRawValue();
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
Ext.reg('buildinginfo', com.ysys.www.buildinginfoGrid);


