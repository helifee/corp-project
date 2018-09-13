/**
 * [Tprjmgrs] author by $YourName$
 * @include "../../extclient/RowExpander.js"
 * @include "../../extclient/gridToExcel.js"
 * @include "../../extclient/SearchField.js"
 */
 
Ext.namespace('com.ysys.www');
Ext.namespace('com.ysys.www.tprjmgrs');

/**
 * 查询表单
 * @class com.ysys.www.tprjmgrs.queryformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.tprjmgrs.queryformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        	,{xtype:'textfield',fieldLabel:'prjName',name:'s_prjName',width:288}
	        	,{xtype:'textfield',fieldLabel:'prjDescribe',name:'s_prjDescribe',width:288}
	        	,{xtype:'textfield',fieldLabel:'prjCusname',name:'s_prjCusname',width:288}
	        	,{xtype:'textfield',fieldLabel:'prjCuscontact',name:'s_prjCuscontact',width:288}
	        	,{xtype:'textfield',fieldLabel:'prjEnvir',name:'s_prjEnvir',width:288}
	        	,{xtype:'textfield',fieldLabel:'prjDptid',name:'s_prjDptid',width:288}
	        	,{xtype:'textfield',fieldLabel:'prjPbdate',name:'s_prjPbdate',width:288}
	        	,{xtype:'textfield',fieldLabel:'prjPedate',name:'s_prjPedate',width:288}
	        	,{xtype:'textfield',fieldLabel:'prjTbdate',name:'s_prjTbdate',width:288}
	        	,{xtype:'textfield',fieldLabel:'prjTedate',name:'s_prjTedate',width:288}
	        	,{xtype:'textfield',fieldLabel:'prjDate',name:'s_prjDate',width:288}
	        	,{xtype:'textfield',fieldLabel:'prjRef',name:'s_prjRef',width:288}
	        	,{xtype:'textfield',fieldLabel:'prjCname',name:'s_prjCname',width:288}
	        	,{xtype:'textfield',fieldLabel:'prjEname',name:'s_prjEname',width:288}
	            ]
	    });
		com.ysys.www.tprjmgrs.queryformpanel.superclass.initComponent.call(this);
	}
});

/**
 * 查询窗口
 * @class com.ysys.www.tprjmgrs.querywin
 * @extends Ext.Window
 */
com.ysys.www.tprjmgrs.querywin = Ext.extend(Ext.Window,{
	initComponent:function() {
		Ext.apply(this,{
	        title:'高级查询',
	        width:455,
	        height:395,
	        modal:true,
	        closeAction:'hide',
	        layout:'fit'
	    });
		com.ysys.www.tprjmgrs.querywin.superclass.initComponent.call(this);
	}
});

/**
 * 内容表单
 * @class com.ysys.www.tprjmgrs.dtlformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.tprjmgrs.dtlformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        		,{xtype:'hidden',fieldLabel:'prjId',name:'prjId',width:288}
	        		,{xtype:'textfield',fieldLabel:'prjName',name:'prjName',width:288}
	        		,{xtype:'textfield',fieldLabel:'prjDescribe',name:'prjDescribe',width:288}
	        		,{xtype:'textfield',fieldLabel:'prjCusname',name:'prjCusname',width:288}
	        		,{xtype:'textfield',fieldLabel:'prjCuscontact',name:'prjCuscontact',width:288}
	        		,{xtype:'textfield',fieldLabel:'prjEnvir',name:'prjEnvir',width:288}
	        		,{xtype:'textfield',fieldLabel:'prjDptid',name:'prjDptid',width:288}
	        		,{xtype:'textfield',fieldLabel:'prjPbdate',name:'prjPbdate',width:288}
	        		,{xtype:'textfield',fieldLabel:'prjPedate',name:'prjPedate',width:288}
	        		,{xtype:'textfield',fieldLabel:'prjTbdate',name:'prjTbdate',width:288}
	        		,{xtype:'textfield',fieldLabel:'prjTedate',name:'prjTedate',width:288}
	        		,{xtype:'textfield',fieldLabel:'prjDate',name:'prjDate',width:288}
	        		,{xtype:'textfield',fieldLabel:'prjRef',name:'prjRef',width:288}
	        		,{xtype:'textfield',fieldLabel:'prjCname',name:'prjCname',width:288}
	        		,{xtype:'textfield',fieldLabel:'prjEname',name:'prjEname',width:288}
	        ]
	    });
	    com.ysys.www.tprjmgrs.dtlformpanel .superclass.initComponent.call(this);
	}
	
});

/**
 * 表单窗口
 * @class com.ysys.www.tprjmgrs.dtlwin
 * @extends Ext.Window
 */		
com.ysys.www.tprjmgrs.dtlwin =  Ext.extend(Ext.Window,{
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
		com.ysys.www.tprjmgrs.dtlwin.superclass.initComponent.call(this);
	}
});


/**
 * 主表格入口
 * @class com.ysys.www.tprjmgrs
 * @extends Ext.grid.GridPanel
 */
com.ysys.www.tprjmgrsGrid = Ext.extend(Ext.grid.GridPanel,{
    initComponent:function() {
    	this.pageSize=10;
    	this.ds = new Ext.data.Store({
	        url:'../Tprjmgrs/extlist.do',
	        reader:new Ext.data.JsonReader({
	            root:'list',
	            totalProperty:'totalSize',
	            id:'id'
		        }
		        ,['prjId','prjName','prjDescribe','prjCusname','prjCuscontact','prjEnvir','prjDptid','prjPbdate','prjPedate','prjTbdate','prjTedate','prjDate','prjRef','prjCname','prjEname',]
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
	        ,{header:'prjName',width:100,sortable:true,dataIndex:'prjName'}
	        ,{header:'prjDescribe',width:100,sortable:true,dataIndex:'prjDescribe'}
	        ,{header:'prjCusname',width:100,sortable:true,dataIndex:'prjCusname'}
	        ,{header:'prjCuscontact',width:100,sortable:true,dataIndex:'prjCuscontact'}
	        ,{header:'prjEnvir',width:100,sortable:true,dataIndex:'prjEnvir'}
	        ,{header:'prjDptid',width:100,sortable:true,dataIndex:'prjDptid'}
	        ,{header:'prjPbdate',width:100,sortable:true,dataIndex:'prjPbdate'}
	        ,{header:'prjPedate',width:100,sortable:true,dataIndex:'prjPedate'}
	        ,{header:'prjTbdate',width:100,sortable:true,dataIndex:'prjTbdate'}
	        ,{header:'prjTedate',width:100,sortable:true,dataIndex:'prjTedate'}
	        ,{header:'prjDate',width:100,sortable:true,dataIndex:'prjDate'}
	        ,{header:'prjRef',width:100,sortable:true,dataIndex:'prjRef'}
	        ,{header:'prjCname',width:100,sortable:true,dataIndex:'prjCname'}
	        ,{header:'prjEname',width:100,sortable:true,dataIndex:'prjEname'}
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
	        	{text:'新增',cls:'x-btn-text-icon',iconCls:'addicon',handler:this.addTprjmgrs,scope:this},'-'
	        	,{text:'修改',cls:'x-btn-text-icon',iconCls:'editicon',handler:this.editTprjmgrs,scope:this},'-'
	        	,{text:'删除',cls:'x-btn-text-icon',iconCls:'deleteicon',handler:this.deleteTprjmgrs,scope:this},'-'
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
        			data: [['prjName', 'prjName'],['prjDescribe', 'prjDescribe'],['prjCusname', 'prjCusname'],['prjCuscontact', 'prjCuscontact'],['prjEnvir', 'prjEnvir'],['prjDptid', 'prjDptid'],['prjPbdate', 'prjPbdate'],['prjPedate', 'prjPedate'],['prjTbdate', 'prjTbdate'],['prjTedate', 'prjTedate'],['prjDate', 'prjDate'],['prjRef', 'prjRef'],['prjCname', 'prjCname'],['prjEname', 'prjEname']]
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
        com.ysys.www.tprjmgrsGrid.superclass.initComponent.call(this);
        //加载数据
        this.store.load({params:{start:0}});
        
 		//扩展类的详细弹出窗口
 		this.dtlformpanel = new com.ysys.www.tprjmgrs.dtlformpanel();
 		this.dtlwin =  new com.ysys.www.tprjmgrs.dtlwin({items:this.dtlformpanel,buttons:[{
	            text:'保存',
	            handler:this.saveTprjmgrs,
	            scope:this
	        },{
	            text:'取消',
	            handler:function(){this.dtlwin.hide();},
	            scope:this
	        }]});
	    
	    //扩展类的查询弹出窗口
	    this.queryformpanel = new com.ysys.www.tprjmgrs.queryformpanel();
	    this.querywin =  new com.ysys.www.tprjmgrs.querywin({items:this.queryformpanel,buttons:[{
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
				        this.dtlwin.setTitle('修改Tprjmgrs');
				        this.dtlwin.show();
				        this.dtlformpanel.form.reset();
				        this.dtlformpanel.form.loadRecord(record);
				        this.dtlformpanel.url = '../Tprjmgrs/extupdate.do';
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
						url:'../Tprjmgrs/extdelete.do?ids='+record.data.prjId,
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
        this.dtlwin.setTitle('修改Tprjmgrs');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
        this.dtlformpanel.form.loadRecord(record);
        this.dtlformpanel.url = '../Tprjmgrs/extupdate.do';
    }
    
    //新建窗口
    ,addTprjmgrs : function(){
        this.dtlwin.setTitle('新建Tprjmgrs');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
	    this.dtlformpanel.url = '../Tprjmgrs/extsave.do';
	}
	
	//编辑操作
    ,editTprjmgrs:function(){
    	var records = this.getSelectionModel().getSelections();//单选
    	
	   if (records.length!=1) {
			Ext.Msg.alert("提示", "请先选择要修改的记录");
			return;
		}
	    this.dtlwin.setTitle('修改Tprjmgrs');
	    this.dtlwin.show();
	    this.dtlformpanel.form.reset();
	    this.dtlformpanel.form.loadRecord(records[0]);
	    this.dtlformpanel.url = '../Tprjmgrs/extupdate.do';

    }
    
    //删除操作
    ,deleteTprjmgrs:function(){
    	var records = this.getSelectionModel().getSelections();
		if (!records||records.length == 0) {
			Ext.Msg.alert("提示", "请先选择要删除的�记录");
			return;
		}
		Ext.MessageBox.confirm('确认删除','确定要删除这些记录?',function(btn){
			if (btn == 'yes'){
				Ext.Ajax.request({
					url:'../Tprjmgrs/extdelete.do?ids='+this.getRecordArrayUtils(records, 'prjId'),
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
    ,saveTprjmgrs:function(){
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
    	this.getStore().baseParams['s_prjName'] = this.queryformpanel.form.findField('s_prjName').getRawValue();
    	this.getStore().baseParams['s_prjDescribe'] = this.queryformpanel.form.findField('s_prjDescribe').getRawValue();
    	this.getStore().baseParams['s_prjCusname'] = this.queryformpanel.form.findField('s_prjCusname').getRawValue();
    	this.getStore().baseParams['s_prjCuscontact'] = this.queryformpanel.form.findField('s_prjCuscontact').getRawValue();
    	this.getStore().baseParams['s_prjEnvir'] = this.queryformpanel.form.findField('s_prjEnvir').getRawValue();
    	this.getStore().baseParams['s_prjDptid'] = this.queryformpanel.form.findField('s_prjDptid').getRawValue();
    	this.getStore().baseParams['s_prjPbdate'] = this.queryformpanel.form.findField('s_prjPbdate').getRawValue();
    	this.getStore().baseParams['s_prjPedate'] = this.queryformpanel.form.findField('s_prjPedate').getRawValue();
    	this.getStore().baseParams['s_prjTbdate'] = this.queryformpanel.form.findField('s_prjTbdate').getRawValue();
    	this.getStore().baseParams['s_prjTedate'] = this.queryformpanel.form.findField('s_prjTedate').getRawValue();
    	this.getStore().baseParams['s_prjDate'] = this.queryformpanel.form.findField('s_prjDate').getRawValue();
    	this.getStore().baseParams['s_prjRef'] = this.queryformpanel.form.findField('s_prjRef').getRawValue();
    	this.getStore().baseParams['s_prjCname'] = this.queryformpanel.form.findField('s_prjCname').getRawValue();
    	this.getStore().baseParams['s_prjEname'] = this.queryformpanel.form.findField('s_prjEname').getRawValue();
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
Ext.reg('tprjmgrs', com.ysys.www.tprjmgrsGrid);


