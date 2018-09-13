/**
 * [TabHysyl] author by $YourName$
 * @include "../../extclient/RowExpander.js"
 * @include "../../extclient/gridToExcel.js"
 * @include "../../extclient/SearchField.js"
 */
 
Ext.namespace('com.ysys.www');
Ext.namespace('com.ysys.www.tabhysyl');

/**
 * 查询表单
 * @class com.ysys.www.tabhysyl.queryformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.tabhysyl.queryformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        	,{xtype:'textfield',fieldLabel:'会议室名称',name:'s_hysmc',width:288}
	        	,{xtype:'textfield',fieldLabel:'容纳人数',name:'s_rnrs',width:288}
	        	,{xtype:'textfield',fieldLabel:'电话',name:'s_dh',width:288}
	        	,{xtype:'textfield',fieldLabel:'设备',name:'s_sb',width:288}
	        	,{xtype:'textfield',fieldLabel:'会议报告标志',name:'s_hybgbz',width:288}
	        	,{xtype:'textfield',fieldLabel:'网络接口',name:'s_wxjk',width:288}
	        	,{xtype:'textfield',fieldLabel:'排列顺序',name:'s_sortid',width:288}
	        	,{xtype:'textfield',fieldLabel:'图像起点像素横坐标',name:'s_imagefromx',width:288}
	        	,{xtype:'textfield',fieldLabel:'图像起点像素纵坐标',name:'s_imagefromy',width:288}
	        	,{xtype:'textfield',fieldLabel:'图像终点像素横坐标',name:'s_imagetox',width:288}
	        	,{xtype:'textfield',fieldLabel:'图像终点像素纵坐标',name:'s_imagetoy',width:288}
	        	,{xtype:'textfield',fieldLabel:'更新时间',name:'s_updatetime',width:288}
	            ]
	    });
		com.ysys.www.tabhysyl.queryformpanel.superclass.initComponent.call(this);
	}
});

/**
 * 查询窗口
 * @class com.ysys.www.tabhysyl.querywin
 * @extends Ext.Window
 */
com.ysys.www.tabhysyl.querywin = Ext.extend(Ext.Window,{
	initComponent:function() {
		Ext.apply(this,{
	        title:'高级查询',
	        width:455,
	        height:395,
	        modal:true,
	        closeAction:'hide',
	        layout:'fit'
	    });
		com.ysys.www.tabhysyl.querywin.superclass.initComponent.call(this);
	}
});

/**
 * 内容表单
 * @class com.ysys.www.tabhysyl.dtlformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.tabhysyl.dtlformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        		,{xtype:'hidden',fieldLabel:'会议室ID',name:'hysid',width:288}
	        		,{xtype:'textfield',fieldLabel:'会议室名称',name:'hysmc',width:288}
	        		,{xtype:'textfield',fieldLabel:'容纳人数',name:'rnrs',width:288}
	        		,{xtype:'textfield',fieldLabel:'电话',name:'dh',width:288}
	        		,{xtype:'textfield',fieldLabel:'设备',name:'sb',width:288}
	        		,{xtype:'textfield',fieldLabel:'会议报告标志',name:'hybgbz',width:288}
	        		,{xtype:'textfield',fieldLabel:'网络接口',name:'wxjk',width:288}
	        		,{xtype:'textfield',fieldLabel:'排列顺序',name:'sortid',width:288}
	        		,{xtype:'textfield',fieldLabel:'图像起点像素横坐标',name:'imagefromx',width:288}
	        		,{xtype:'textfield',fieldLabel:'图像起点像素纵坐标',name:'imagefromy',width:288}
	        		,{xtype:'textfield',fieldLabel:'图像终点像素横坐标',name:'imagetox',width:288}
	        		,{xtype:'textfield',fieldLabel:'图像终点像素纵坐标',name:'imagetoy',width:288}
	        		,{xtype:'textfield',fieldLabel:'更新时间',name:'updatetime',width:288}
	        ]
	    });
	    com.ysys.www.tabhysyl.dtlformpanel .superclass.initComponent.call(this);
	}
	
});

/**
 * 表单窗口
 * @class com.ysys.www.tabhysyl.dtlwin
 * @extends Ext.Window
 */		
com.ysys.www.tabhysyl.dtlwin =  Ext.extend(Ext.Window,{
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
		com.ysys.www.tabhysyl.dtlwin.superclass.initComponent.call(this);
	}
});


/**
 * 主表格入口
 * @class com.ysys.www.tabhysyl
 * @extends Ext.grid.GridPanel
 */
com.ysys.www.tabhysylGrid = Ext.extend(Ext.grid.GridPanel,{
    initComponent:function() {
    	this.pageSize=10;
    	this.ds = new Ext.data.Store({
	        url:'../TabHysyl/extlist.do',
	        reader:new Ext.data.JsonReader({
	            root:'list',
	            totalProperty:'totalSize',
	            id:'id'
		        }
		        ,['hysid','hysmc','rnrs','dh','sb','hybgbz','wxjk','sortid','imagefromx','imagefromy','imagetox','imagetoy','updatetime',]
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
	        ,{header:'会议室名称',width:100,sortable:true,dataIndex:'hysmc'}
	        ,{header:'容纳人数',width:100,sortable:true,dataIndex:'rnrs'}
	        ,{header:'电话',width:100,sortable:true,dataIndex:'dh'}
	        ,{header:'设备',width:100,sortable:true,dataIndex:'sb'}
	        ,{header:'会议报告标志',width:100,sortable:true,dataIndex:'hybgbz'}
	        ,{header:'网络接口',width:100,sortable:true,dataIndex:'wxjk'}
	        ,{header:'排列顺序',width:100,sortable:true,dataIndex:'sortid'}
	        ,{header:'图像起点像素横坐标',width:100,sortable:true,dataIndex:'imagefromx'}
	        ,{header:'图像起点像素纵坐标',width:100,sortable:true,dataIndex:'imagefromy'}
	        ,{header:'图像终点像素横坐标',width:100,sortable:true,dataIndex:'imagetox'}
	        ,{header:'图像终点像素纵坐标',width:100,sortable:true,dataIndex:'imagetoy'}
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
	        	{text:'新增',cls:'x-btn-text-icon',iconCls:'addicon',handler:this.addTabHysyl,scope:this},'-'
	        	,{text:'修改',cls:'x-btn-text-icon',iconCls:'editicon',handler:this.editTabHysyl,scope:this},'-'
	        	,{text:'删除',cls:'x-btn-text-icon',iconCls:'deleteicon',handler:this.deleteTabHysyl,scope:this},'-'
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
        			data: [['会议室名称', 'hysmc'],['容纳人数', 'rnrs'],['电话', 'dh'],['设备', 'sb'],['会议报告标志', 'hybgbz'],['网络接口', 'wxjk'],['排列顺序', 'sortid'],['图像起点像素横坐标', 'imagefromx'],['图像起点像素纵坐标', 'imagefromy'],['图像终点像素横坐标', 'imagetox'],['图像终点像素纵坐标', 'imagetoy'],['更新时间', 'updatetime']]
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
        com.ysys.www.tabhysylGrid.superclass.initComponent.call(this);
        //加载数据
        this.store.load({params:{start:0}});
        
 		//扩展类的详细弹出窗口
 		this.dtlformpanel = new com.ysys.www.tabhysyl.dtlformpanel();
 		this.dtlwin =  new com.ysys.www.tabhysyl.dtlwin({items:this.dtlformpanel,buttons:[{
	            text:'保存',
	            handler:this.saveTabHysyl,
	            scope:this
	        },{
	            text:'取消',
	            handler:function(){this.dtlwin.hide();},
	            scope:this
	        }]});
	    
	    //扩展类的查询弹出窗口
	    this.queryformpanel = new com.ysys.www.tabhysyl.queryformpanel();
	    this.querywin =  new com.ysys.www.tabhysyl.querywin({items:this.queryformpanel,buttons:[{
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
				        this.dtlwin.setTitle('修改TabHysyl');
				        this.dtlwin.show();
				        this.dtlformpanel.form.reset();
				        this.dtlformpanel.form.loadRecord(record);
				        this.dtlformpanel.url = '../TabHysyl/extupdate.do';
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
						url:'../TabHysyl/extdelete.do?ids='+record.data.hysid,
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
        this.dtlwin.setTitle('修改TabHysyl');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
        this.dtlformpanel.form.loadRecord(record);
        this.dtlformpanel.url = '../TabHysyl/extupdate.do';
    }
    
    //新建窗口
    ,addTabHysyl : function(){
        this.dtlwin.setTitle('新建TabHysyl');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
	    this.dtlformpanel.url = '../TabHysyl/extsave.do';
	}
	
	//编辑操作
    ,editTabHysyl:function(){
    	var records = this.getSelectionModel().getSelections();//单选
    	
	   if (records.length!=1) {
			Ext.Msg.alert("提示", "请先选择要修改的记录");
			return;
		}
	    this.dtlwin.setTitle('修改TabHysyl');
	    this.dtlwin.show();
	    this.dtlformpanel.form.reset();
	    this.dtlformpanel.form.loadRecord(records[0]);
	    this.dtlformpanel.url = '../TabHysyl/extupdate.do';

    }
    
    //删除操作
    ,deleteTabHysyl:function(){
    	var records = this.getSelectionModel().getSelections();
		if (!records||records.length == 0) {
			Ext.Msg.alert("提示", "请先选择要删除的�记录");
			return;
		}
		Ext.MessageBox.confirm('确认删除','确定要删除这些记录?',function(btn){
			if (btn == 'yes'){
				Ext.Ajax.request({
					url:'../TabHysyl/extdelete.do?ids='+this.getRecordArrayUtils(records, 'hysid'),
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
    ,saveTabHysyl:function(){
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
    	this.getStore().baseParams['s_hysmc'] = this.queryformpanel.form.findField('s_hysmc').getRawValue();
    	this.getStore().baseParams['s_rnrs'] = this.queryformpanel.form.findField('s_rnrs').getRawValue();
    	this.getStore().baseParams['s_dh'] = this.queryformpanel.form.findField('s_dh').getRawValue();
    	this.getStore().baseParams['s_sb'] = this.queryformpanel.form.findField('s_sb').getRawValue();
    	this.getStore().baseParams['s_hybgbz'] = this.queryformpanel.form.findField('s_hybgbz').getRawValue();
    	this.getStore().baseParams['s_wxjk'] = this.queryformpanel.form.findField('s_wxjk').getRawValue();
    	this.getStore().baseParams['s_sortid'] = this.queryformpanel.form.findField('s_sortid').getRawValue();
    	this.getStore().baseParams['s_imagefromx'] = this.queryformpanel.form.findField('s_imagefromx').getRawValue();
    	this.getStore().baseParams['s_imagefromy'] = this.queryformpanel.form.findField('s_imagefromy').getRawValue();
    	this.getStore().baseParams['s_imagetox'] = this.queryformpanel.form.findField('s_imagetox').getRawValue();
    	this.getStore().baseParams['s_imagetoy'] = this.queryformpanel.form.findField('s_imagetoy').getRawValue();
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
Ext.reg('tabhysyl', com.ysys.www.tabhysylGrid);


