/**
 * [PerUser] author by $YourName$
 * @include "../../extclient/RowExpander.js"
 * @include "../../extclient/gridToExcel.js"
 * @include "../../extclient/SearchField.js"
 */
 
Ext.namespace('com.ysys.www');
Ext.namespace('com.ysys.www.peruser');

/**
 * 查询表单
 * @class com.ysys.www.peruser.queryformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.peruser.queryformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        	,{xtype:'textfield',fieldLabel:'社员姓名(拼音)',name:'s_empPnm',width:288}
	        	,{xtype:'textfield',fieldLabel:'社员姓名(汉字)',name:'s_empCnm',width:288}
	        	,{xtype:'textfield',fieldLabel:'社员姓名(日文)',name:'s_empJnm',width:288}
	        	,{xtype:'textfield',fieldLabel:'密码',name:'s_password',width:288}
	        	,{xtype:'textfield',fieldLabel:'所属部门ID',name:'s_deptId',width:288}
	        	,{xtype:'textfield',fieldLabel:'入社日期',name:'s_startDate',width:288}
	        	,{xtype:'textfield',fieldLabel:'口令提示问题',name:'s_empPwdask',width:288}
	        	,{xtype:'textfield',fieldLabel:'口令提示答案',name:'s_empPwdasw',width:288}
	        	,{xtype:'textfield',fieldLabel:'记住口令',name:'s_empCookie',width:288}
	        	,{xtype:'textfield',fieldLabel:'考勤编码',name:'s_empWorkid',width:288}
	        	,{xtype:'textfield',fieldLabel:'考勤密码',name:'s_empWorkpwd',width:288}
	        	,{xtype:'textfield',fieldLabel:'上级ID',name:'s_higherId',width:288}
	        	,{xtype:'textfield',fieldLabel:'原上级ID',name:'s_ohigherId',width:288}
	        	,{xtype:'textfield',fieldLabel:'劳动合同',name:'s_contractId',width:288}
	        	,{xtype:'textfield',fieldLabel:'劳动结束日',name:'s_endDate',width:288}
	        	,{xtype:'textfield',fieldLabel:'研修批次',name:'s_yxNo',width:288}
	        	,{xtype:'textfield',fieldLabel:'研修合同',name:'s_yxContractId',width:288}
	        	,{xtype:'textfield',fieldLabel:'研修结束日',name:'s_yjsr',width:288}
	        	,{xtype:'textfield',fieldLabel:'备注',name:'s_empDesp',width:288}
	        	,{xtype:'textfield',fieldLabel:'社员标志',name:'s_empFlag',width:288}
	        	,{xtype:'textfield',fieldLabel:'更新时间',name:'s_updatetime',width:288}
	            ]
	    });
		com.ysys.www.peruser.queryformpanel.superclass.initComponent.call(this);
	}
});

/**
 * 查询窗口
 * @class com.ysys.www.peruser.querywin
 * @extends Ext.Window
 */
com.ysys.www.peruser.querywin = Ext.extend(Ext.Window,{
	initComponent:function() {
		Ext.apply(this,{
	        title:'高级查询',
	        width:455,
	        height:395,
	        modal:true,
	        closeAction:'hide',
	        layout:'fit'
	    });
		com.ysys.www.peruser.querywin.superclass.initComponent.call(this);
	}
});

/**
 * 内容表单
 * @class com.ysys.www.peruser.dtlformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.peruser.dtlformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        		,{xtype:'hidden',fieldLabel:'社员ID',name:'empId',width:288}
	        		,{xtype:'textfield',fieldLabel:'社员姓名(拼音)',name:'empPnm',width:288}
	        		,{xtype:'textfield',fieldLabel:'社员姓名(汉字)',name:'empCnm',width:288}
	        		,{xtype:'textfield',fieldLabel:'社员姓名(日文)',name:'empJnm',width:288}
	        		,{xtype:'textfield',fieldLabel:'密码',name:'password',width:288}
	        		,{xtype:'textfield',fieldLabel:'所属部门ID',name:'deptId',width:288}
	        		,{xtype:'textfield',fieldLabel:'入社日期',name:'startDate',width:288}
	        		,{xtype:'textfield',fieldLabel:'口令提示问题',name:'empPwdask',width:288}
	        		,{xtype:'textfield',fieldLabel:'口令提示答案',name:'empPwdasw',width:288}
	        		,{xtype:'textfield',fieldLabel:'记住口令',name:'empCookie',width:288}
	        		,{xtype:'textfield',fieldLabel:'考勤编码',name:'empWorkid',width:288}
	        		,{xtype:'textfield',fieldLabel:'考勤密码',name:'empWorkpwd',width:288}
	        		,{xtype:'textfield',fieldLabel:'上级ID',name:'higherId',width:288}
	        		,{xtype:'textfield',fieldLabel:'原上级ID',name:'ohigherId',width:288}
	        		,{xtype:'textfield',fieldLabel:'劳动合同',name:'contractId',width:288}
	        		,{xtype:'textfield',fieldLabel:'劳动结束日',name:'endDate',width:288}
	        		,{xtype:'textfield',fieldLabel:'研修批次',name:'yxNo',width:288}
	        		,{xtype:'textfield',fieldLabel:'研修合同',name:'yxContractId',width:288}
	        		,{xtype:'textfield',fieldLabel:'研修结束日',name:'yjsr',width:288}
	        		,{xtype:'textfield',fieldLabel:'备注',name:'empDesp',width:288}
	        		,{xtype:'textfield',fieldLabel:'社员标志',name:'empFlag',width:288}
	        		,{xtype:'textfield',fieldLabel:'更新时间',name:'updatetime',width:288}
	        ]
	    });
	    com.ysys.www.peruser.dtlformpanel .superclass.initComponent.call(this);
	}
	
});

/**
 * 表单窗口
 * @class com.ysys.www.peruser.dtlwin
 * @extends Ext.Window
 */		
com.ysys.www.peruser.dtlwin =  Ext.extend(Ext.Window,{
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
		com.ysys.www.peruser.dtlwin.superclass.initComponent.call(this);
	}
});


/**
 * 主表格入口
 * @class com.ysys.www.peruser
 * @extends Ext.grid.GridPanel
 */
com.ysys.www.peruserGrid = Ext.extend(Ext.grid.GridPanel,{
    initComponent:function() {
    	this.pageSize=10;
    	this.ds = new Ext.data.Store({
	        url:'../PerUser/extlist.do',
	        reader:new Ext.data.JsonReader({
	            root:'list',
	            totalProperty:'totalSize',
	            id:'id'
		        }
		        ,['empId','empPnm','empCnm','empJnm','password','deptId','startDate','empPwdask','empPwdasw','empCookie','empWorkid','empWorkpwd','higherId','ohigherId','contractId','endDate','yxNo','yxContractId','yjsr','empDesp','empFlag','updatetime',]
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
	        ,{header:'社员姓名(拼音)',width:100,sortable:true,dataIndex:'empPnm'}
	        ,{header:'社员姓名(汉字)',width:100,sortable:true,dataIndex:'empCnm'}
	        ,{header:'社员姓名(日文)',width:100,sortable:true,dataIndex:'empJnm'}
	        ,{header:'密码',width:100,sortable:true,dataIndex:'password'}
	        ,{header:'所属部门ID',width:100,sortable:true,dataIndex:'deptId'}
	        ,{header:'入社日期',width:100,sortable:true,dataIndex:'startDate'}
	        ,{header:'口令提示问题',width:100,sortable:true,dataIndex:'empPwdask'}
	        ,{header:'口令提示答案',width:100,sortable:true,dataIndex:'empPwdasw'}
	        ,{header:'记住口令',width:100,sortable:true,dataIndex:'empCookie'}
	        ,{header:'考勤编码',width:100,sortable:true,dataIndex:'empWorkid'}
	        ,{header:'考勤密码',width:100,sortable:true,dataIndex:'empWorkpwd'}
	        ,{header:'上级ID',width:100,sortable:true,dataIndex:'higherId'}
	        ,{header:'原上级ID',width:100,sortable:true,dataIndex:'ohigherId'}
	        ,{header:'劳动合同',width:100,sortable:true,dataIndex:'contractId'}
	        ,{header:'劳动结束日',width:100,sortable:true,dataIndex:'endDate'}
	        ,{header:'研修批次',width:100,sortable:true,dataIndex:'yxNo'}
	        ,{header:'研修合同',width:100,sortable:true,dataIndex:'yxContractId'}
	        ,{header:'研修结束日',width:100,sortable:true,dataIndex:'yjsr'}
	        ,{header:'备注',width:100,sortable:true,dataIndex:'empDesp'}
	        ,{header:'社员标志',width:100,sortable:true,dataIndex:'empFlag'}
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
	        	{text:'新增',cls:'x-btn-text-icon',iconCls:'addicon',handler:this.addPerUser,scope:this},'-'
	        	,{text:'修改',cls:'x-btn-text-icon',iconCls:'editicon',handler:this.editPerUser,scope:this},'-'
	        	,{text:'删除',cls:'x-btn-text-icon',iconCls:'deleteicon',handler:this.deletePerUser,scope:this},'-'
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
        			data: [['社员姓名(拼音)', 'empPnm'],['社员姓名(汉字)', 'empCnm'],['社员姓名(日文)', 'empJnm'],['密码', 'password'],['所属部门ID', 'deptId'],['入社日期', 'startDate'],['口令提示问题', 'empPwdask'],['口令提示答案', 'empPwdasw'],['记住口令', 'empCookie'],['考勤编码', 'empWorkid'],['考勤密码', 'empWorkpwd'],['上级ID', 'higherId'],['原上级ID', 'ohigherId'],['劳动合同', 'contractId'],['劳动结束日', 'endDate'],['研修批次', 'yxNo'],['研修合同', 'yxContractId'],['研修结束日', 'yjsr'],['备注', 'empDesp'],['社员标志', 'empFlag'],['更新时间', 'updatetime']]
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
        com.ysys.www.peruserGrid.superclass.initComponent.call(this);
        //加载数据
        this.store.load({params:{start:0}});
        
 		//扩展类的详细弹出窗口
 		this.dtlformpanel = new com.ysys.www.peruser.dtlformpanel();
 		this.dtlwin =  new com.ysys.www.peruser.dtlwin({items:this.dtlformpanel,buttons:[{
	            text:'保存',
	            handler:this.savePerUser,
	            scope:this
	        },{
	            text:'取消',
	            handler:function(){this.dtlwin.hide();},
	            scope:this
	        }]});
	    
	    //扩展类的查询弹出窗口
	    this.queryformpanel = new com.ysys.www.peruser.queryformpanel();
	    this.querywin =  new com.ysys.www.peruser.querywin({items:this.queryformpanel,buttons:[{
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
				        this.dtlwin.setTitle('修改PerUser');
				        this.dtlwin.show();
				        this.dtlformpanel.form.reset();
				        this.dtlformpanel.form.loadRecord(record);
				        this.dtlformpanel.url = '../PerUser/extupdate.do';
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
						url:'../PerUser/extdelete.do?ids='+record.data.empId,
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
        this.dtlwin.setTitle('修改PerUser');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
        this.dtlformpanel.form.loadRecord(record);
        this.dtlformpanel.url = '../PerUser/extupdate.do';
    }
    
    //新建窗口
    ,addPerUser : function(){
        this.dtlwin.setTitle('新建PerUser');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
	    this.dtlformpanel.url = '../PerUser/extsave.do';
	}
	
	//编辑操作
    ,editPerUser:function(){
    	var records = this.getSelectionModel().getSelections();//单选
    	
	   if (records.length!=1) {
			Ext.Msg.alert("提示", "请先选择要修改的记录");
			return;
		}
	    this.dtlwin.setTitle('修改PerUser');
	    this.dtlwin.show();
	    this.dtlformpanel.form.reset();
	    this.dtlformpanel.form.loadRecord(records[0]);
	    this.dtlformpanel.url = '../PerUser/extupdate.do';

    }
    
    //删除操作
    ,deletePerUser:function(){
    	var records = this.getSelectionModel().getSelections();
		if (!records||records.length == 0) {
			Ext.Msg.alert("提示", "请先选择要删除的�记录");
			return;
		}
		Ext.MessageBox.confirm('确认删除','确定要删除这些记录?',function(btn){
			if (btn == 'yes'){
				Ext.Ajax.request({
					url:'../PerUser/extdelete.do?ids='+this.getRecordArrayUtils(records, 'empId'),
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
    ,savePerUser:function(){
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
    	this.getStore().baseParams['s_empPnm'] = this.queryformpanel.form.findField('s_empPnm').getRawValue();
    	this.getStore().baseParams['s_empCnm'] = this.queryformpanel.form.findField('s_empCnm').getRawValue();
    	this.getStore().baseParams['s_empJnm'] = this.queryformpanel.form.findField('s_empJnm').getRawValue();
    	this.getStore().baseParams['s_password'] = this.queryformpanel.form.findField('s_password').getRawValue();
    	this.getStore().baseParams['s_deptId'] = this.queryformpanel.form.findField('s_deptId').getRawValue();
    	this.getStore().baseParams['s_startDate'] = this.queryformpanel.form.findField('s_startDate').getRawValue();
    	this.getStore().baseParams['s_empPwdask'] = this.queryformpanel.form.findField('s_empPwdask').getRawValue();
    	this.getStore().baseParams['s_empPwdasw'] = this.queryformpanel.form.findField('s_empPwdasw').getRawValue();
    	this.getStore().baseParams['s_empCookie'] = this.queryformpanel.form.findField('s_empCookie').getRawValue();
    	this.getStore().baseParams['s_empWorkid'] = this.queryformpanel.form.findField('s_empWorkid').getRawValue();
    	this.getStore().baseParams['s_empWorkpwd'] = this.queryformpanel.form.findField('s_empWorkpwd').getRawValue();
    	this.getStore().baseParams['s_higherId'] = this.queryformpanel.form.findField('s_higherId').getRawValue();
    	this.getStore().baseParams['s_ohigherId'] = this.queryformpanel.form.findField('s_ohigherId').getRawValue();
    	this.getStore().baseParams['s_contractId'] = this.queryformpanel.form.findField('s_contractId').getRawValue();
    	this.getStore().baseParams['s_endDate'] = this.queryformpanel.form.findField('s_endDate').getRawValue();
    	this.getStore().baseParams['s_yxNo'] = this.queryformpanel.form.findField('s_yxNo').getRawValue();
    	this.getStore().baseParams['s_yxContractId'] = this.queryformpanel.form.findField('s_yxContractId').getRawValue();
    	this.getStore().baseParams['s_yjsr'] = this.queryformpanel.form.findField('s_yjsr').getRawValue();
    	this.getStore().baseParams['s_empDesp'] = this.queryformpanel.form.findField('s_empDesp').getRawValue();
    	this.getStore().baseParams['s_empFlag'] = this.queryformpanel.form.findField('s_empFlag').getRawValue();
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
Ext.reg('peruser', com.ysys.www.peruserGrid);


