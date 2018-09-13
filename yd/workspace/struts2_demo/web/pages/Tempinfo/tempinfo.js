/**
 * [Tempinfo] author by $YourName$
 * @include "../../extclient/RowExpander.js"
 * @include "../../extclient/gridToExcel.js"
 * @include "../../extclient/SearchField.js"
 */
 
Ext.namespace('com.ysys.www');
Ext.namespace('com.ysys.www.tempinfo');

/**
 * 查询表单
 * @class com.ysys.www.tempinfo.queryformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.tempinfo.queryformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        	,{xtype:'textfield',fieldLabel:'empName',name:'s_empName',width:288}
	        	,{xtype:'textfield',fieldLabel:'empPasswd',name:'s_empPasswd',width:288}
	        	,{xtype:'textfield',fieldLabel:'empDptid',name:'s_empDptid',width:288}
	        	,{xtype:'textfield',fieldLabel:'empJobid',name:'s_empJobid',width:288}
	        	,{xtype:'textfield',fieldLabel:'empTotid',name:'s_empTotid',width:288}
	        	,{xtype:'textfield',fieldLabel:'empNian',name:'s_empNian',width:288}
	        	,{xtype:'textfield',fieldLabel:'empMail',name:'s_empMail',width:288}
	        	,{xtype:'textfield',fieldLabel:'empPhone',name:'s_empPhone',width:288}
	        	,{xtype:'textfield',fieldLabel:'empHomepg',name:'s_empHomepg',width:288}
	        	,{xtype:'textfield',fieldLabel:'empPwdask',name:'s_empPwdask',width:288}
	        	,{xtype:'textfield',fieldLabel:'empPwdasw',name:'s_empPwdasw',width:288}
	        	,{xtype:'textfield',fieldLabel:'empCookie',name:'s_empCookie',width:288}
	        	,{xtype:'textfield',fieldLabel:'empWorkid',name:'s_empWorkid',width:288}
	        	,{xtype:'textfield',fieldLabel:'empGupid',name:'s_empGupid',width:288}
	        	,{xtype:'textfield',fieldLabel:'empOrngupid',name:'s_empOrngupid',width:288}
	        	,{xtype:'textfield',fieldLabel:'sfzh',name:'s_sfzh',width:288}
	        	,{xtype:'textfield',fieldLabel:'xb',name:'s_xb',width:288}
	        	,{xtype:'textfield',fieldLabel:'nl',name:'s_nl',width:288}
	        	,{xtype:'textfield',fieldLabel:'mzfl',name:'s_mzfl',width:288}
	        	,{xtype:'textfield',fieldLabel:'jigu',name:'s_jigu',width:288}
	        	,{xtype:'textfield',fieldLabel:'gksz',name:'s_gksz',width:288}
	        	,{xtype:'textfield',fieldLabel:'whcd',name:'s_whcd',width:288}
	        	,{xtype:'textfield',fieldLabel:'zhuz',name:'s_zhuz',width:288}
	        	,{xtype:'textfield',fieldLabel:'shji',name:'s_shji',width:288}
	        	,{xtype:'textfield',fieldLabel:'sgao',name:'s_sgao',width:288}
	        	,{xtype:'textfield',fieldLabel:'tizh',name:'s_tizh',width:288}
	        	,{xtype:'textfield',fieldLabel:'zjxy',name:'s_zjxy',width:288}
	        	,{xtype:'textfield',fieldLabel:'zhmm',name:'s_zhmm',width:288}
	        	,{xtype:'textfield',fieldLabel:'fzyt',name:'s_fzyt',width:288}
	        	,{xtype:'textfield',fieldLabel:'xiqu',name:'s_xiqu',width:288}
	        	,{xtype:'textfield',fieldLabel:'beiz',name:'s_beiz',width:288}
	        	,{xtype:'textfield',fieldLabel:'yxpc',name:'s_yxpc',width:288}
	        	,{xtype:'textfield',fieldLabel:'seat',name:'s_seat',width:288}
	        	,{xtype:'textfield',fieldLabel:'empFlag',name:'s_empFlag',width:288}
	        	,{xtype:'textfield',fieldLabel:'exphone',name:'s_exphone',width:288}
	        	,{xtype:'textfield',fieldLabel:'ldht',name:'s_ldht',width:288}
	        	,{xtype:'textfield',fieldLabel:'ljsr',name:'s_ljsr',width:288}
	        	,{xtype:'textfield',fieldLabel:'yxht',name:'s_yxht',width:288}
	        	,{xtype:'textfield',fieldLabel:'yjsr',name:'s_yjsr',width:288}
	        	,{xtype:'textfield',fieldLabel:'empJname',name:'s_empJname',width:288}
	        	,{xtype:'textfield',fieldLabel:'empMima',name:'s_empMima',width:288}
	        	,{xtype:'textfield',fieldLabel:'empDirect',name:'s_empDirect',width:288}
	        	,{xtype:'textfield',fieldLabel:'empStop',name:'s_empStop',width:288}
	        	,{xtype:'textfield',fieldLabel:'note3',name:'s_note3',width:288}
	        	,{xtype:'textfield',fieldLabel:'note1',name:'s_note1',width:288}
	        	,{xtype:'textfield',fieldLabel:'note2',name:'s_note2',width:288}
	        	,{xtype:'textfield',fieldLabel:'sfzh1',name:'s_sfzh1',width:288}
	            ]
	    });
		com.ysys.www.tempinfo.queryformpanel.superclass.initComponent.call(this);
	}
});

/**
 * 查询窗口
 * @class com.ysys.www.tempinfo.querywin
 * @extends Ext.Window
 */
com.ysys.www.tempinfo.querywin = Ext.extend(Ext.Window,{
	initComponent:function() {
		Ext.apply(this,{
	        title:'高级查询',
	        width:455,
	        height:395,
	        modal:true,
	        closeAction:'hide',
	        layout:'fit'
	    });
		com.ysys.www.tempinfo.querywin.superclass.initComponent.call(this);
	}
});

/**
 * 内容表单
 * @class com.ysys.www.tempinfo.dtlformpanel
 * @extends Ext.form.FormPanel
 */
com.ysys.www.tempinfo.dtlformpanel = Ext.extend(Ext.form.FormPanel,{
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
	        		,{xtype:'hidden',fieldLabel:'empId',name:'empId',width:288}
	        		,{xtype:'textfield',fieldLabel:'empName',name:'empName',width:288}
	        		,{xtype:'textfield',fieldLabel:'empPasswd',name:'empPasswd',width:288}
	        		,{xtype:'textfield',fieldLabel:'empDptid',name:'empDptid',width:288}
	        		,{xtype:'textfield',fieldLabel:'empJobid',name:'empJobid',width:288}
	        		,{xtype:'textfield',fieldLabel:'empTotid',name:'empTotid',width:288}
	        		,{xtype:'textfield',fieldLabel:'empNian',name:'empNian',width:288}
	        		,{xtype:'textfield',fieldLabel:'empMail',name:'empMail',width:288}
	        		,{xtype:'textfield',fieldLabel:'empPhone',name:'empPhone',width:288}
	        		,{xtype:'textfield',fieldLabel:'empHomepg',name:'empHomepg',width:288}
	        		,{xtype:'textfield',fieldLabel:'empPwdask',name:'empPwdask',width:288}
	        		,{xtype:'textfield',fieldLabel:'empPwdasw',name:'empPwdasw',width:288}
	        		,{xtype:'textfield',fieldLabel:'empCookie',name:'empCookie',width:288}
	        		,{xtype:'textfield',fieldLabel:'empWorkid',name:'empWorkid',width:288}
	        		,{xtype:'textfield',fieldLabel:'empGupid',name:'empGupid',width:288}
	        		,{xtype:'textfield',fieldLabel:'empOrngupid',name:'empOrngupid',width:288}
	        		,{xtype:'textfield',fieldLabel:'sfzh',name:'sfzh',width:288}
	        		,{xtype:'textfield',fieldLabel:'xb',name:'xb',width:288}
	        		,{xtype:'textfield',fieldLabel:'nl',name:'nl',width:288}
	        		,{xtype:'textfield',fieldLabel:'mzfl',name:'mzfl',width:288}
	        		,{xtype:'textfield',fieldLabel:'jigu',name:'jigu',width:288}
	        		,{xtype:'textfield',fieldLabel:'gksz',name:'gksz',width:288}
	        		,{xtype:'textfield',fieldLabel:'whcd',name:'whcd',width:288}
	        		,{xtype:'textfield',fieldLabel:'zhuz',name:'zhuz',width:288}
	        		,{xtype:'textfield',fieldLabel:'shji',name:'shji',width:288}
	        		,{xtype:'textfield',fieldLabel:'sgao',name:'sgao',width:288}
	        		,{xtype:'textfield',fieldLabel:'tizh',name:'tizh',width:288}
	        		,{xtype:'textfield',fieldLabel:'zjxy',name:'zjxy',width:288}
	        		,{xtype:'textfield',fieldLabel:'zhmm',name:'zhmm',width:288}
	        		,{xtype:'textfield',fieldLabel:'fzyt',name:'fzyt',width:288}
	        		,{xtype:'textfield',fieldLabel:'xiqu',name:'xiqu',width:288}
	        		,{xtype:'textfield',fieldLabel:'beiz',name:'beiz',width:288}
	        		,{xtype:'textfield',fieldLabel:'yxpc',name:'yxpc',width:288}
	        		,{xtype:'textfield',fieldLabel:'seat',name:'seat',width:288}
	        		,{xtype:'textfield',fieldLabel:'empFlag',name:'empFlag',width:288}
	        		,{xtype:'textfield',fieldLabel:'exphone',name:'exphone',width:288}
	        		,{xtype:'textfield',fieldLabel:'ldht',name:'ldht',width:288}
	        		,{xtype:'textfield',fieldLabel:'ljsr',name:'ljsr',width:288}
	        		,{xtype:'textfield',fieldLabel:'yxht',name:'yxht',width:288}
	        		,{xtype:'textfield',fieldLabel:'yjsr',name:'yjsr',width:288}
	        		,{xtype:'textfield',fieldLabel:'empJname',name:'empJname',width:288}
	        		,{xtype:'textfield',fieldLabel:'empMima',name:'empMima',width:288}
	        		,{xtype:'textfield',fieldLabel:'empDirect',name:'empDirect',width:288}
	        		,{xtype:'textfield',fieldLabel:'empStop',name:'empStop',width:288}
	        		,{xtype:'textfield',fieldLabel:'note3',name:'note3',width:288}
	        		,{xtype:'textfield',fieldLabel:'note1',name:'note1',width:288}
	        		,{xtype:'textfield',fieldLabel:'note2',name:'note2',width:288}
	        		,{xtype:'textfield',fieldLabel:'sfzh1',name:'sfzh1',width:288}
	        ]
	    });
	    com.ysys.www.tempinfo.dtlformpanel .superclass.initComponent.call(this);
	}
	
});

/**
 * 表单窗口
 * @class com.ysys.www.tempinfo.dtlwin
 * @extends Ext.Window
 */		
com.ysys.www.tempinfo.dtlwin =  Ext.extend(Ext.Window,{
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
		com.ysys.www.tempinfo.dtlwin.superclass.initComponent.call(this);
	}
});


/**
 * 主表格入口
 * @class com.ysys.www.tempinfo
 * @extends Ext.grid.GridPanel
 */
com.ysys.www.tempinfoGrid = Ext.extend(Ext.grid.GridPanel,{
    initComponent:function() {
    	this.pageSize=10;
    	this.ds = new Ext.data.Store({
	        url:'../Tempinfo/extlist.do',
	        reader:new Ext.data.JsonReader({
	            root:'list',
	            totalProperty:'totalSize',
	            id:'id'
		        }
		        ,['empId','empName','empPasswd','empDptid','empJobid','empTotid','empNian','empMail','empPhone','empHomepg','empPwdask','empPwdasw','empCookie','empWorkid','empGupid','empOrngupid','sfzh','xb','nl','mzfl','jigu','gksz','whcd','zhuz','shji','sgao','tizh','zjxy','zhmm','fzyt','xiqu','beiz','yxpc','seat','empFlag','exphone','ldht','ljsr','yxht','yjsr','empJname','empMima','empDirect','empStop','note3','note1','note2','sfzh1',]
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
	        ,{header:'empName',width:100,sortable:true,dataIndex:'empName'}
	        ,{header:'empPasswd',width:100,sortable:true,dataIndex:'empPasswd'}
	        ,{header:'empDptid',width:100,sortable:true,dataIndex:'empDptid'}
	        ,{header:'empJobid',width:100,sortable:true,dataIndex:'empJobid'}
	        ,{header:'empTotid',width:100,sortable:true,dataIndex:'empTotid'}
	        ,{header:'empNian',width:100,sortable:true,dataIndex:'empNian'}
	        ,{header:'empMail',width:100,sortable:true,dataIndex:'empMail'}
	        ,{header:'empPhone',width:100,sortable:true,dataIndex:'empPhone'}
	        ,{header:'empHomepg',width:100,sortable:true,dataIndex:'empHomepg'}
	        ,{header:'empPwdask',width:100,sortable:true,dataIndex:'empPwdask'}
	        ,{header:'empPwdasw',width:100,sortable:true,dataIndex:'empPwdasw'}
	        ,{header:'empCookie',width:100,sortable:true,dataIndex:'empCookie'}
	        ,{header:'empWorkid',width:100,sortable:true,dataIndex:'empWorkid'}
	        ,{header:'empGupid',width:100,sortable:true,dataIndex:'empGupid'}
	        ,{header:'empOrngupid',width:100,sortable:true,dataIndex:'empOrngupid'}
	        ,{header:'sfzh',width:100,sortable:true,dataIndex:'sfzh'}
	        ,{header:'xb',width:100,sortable:true,dataIndex:'xb'}
	        ,{header:'nl',width:100,sortable:true,dataIndex:'nl'}
	        ,{header:'mzfl',width:100,sortable:true,dataIndex:'mzfl'}
	        ,{header:'jigu',width:100,sortable:true,dataIndex:'jigu'}
	        ,{header:'gksz',width:100,sortable:true,dataIndex:'gksz'}
	        ,{header:'whcd',width:100,sortable:true,dataIndex:'whcd'}
	        ,{header:'zhuz',width:100,sortable:true,dataIndex:'zhuz'}
	        ,{header:'shji',width:100,sortable:true,dataIndex:'shji'}
	        ,{header:'sgao',width:100,sortable:true,dataIndex:'sgao'}
	        ,{header:'tizh',width:100,sortable:true,dataIndex:'tizh'}
	        ,{header:'zjxy',width:100,sortable:true,dataIndex:'zjxy'}
	        ,{header:'zhmm',width:100,sortable:true,dataIndex:'zhmm'}
	        ,{header:'fzyt',width:100,sortable:true,dataIndex:'fzyt'}
	        ,{header:'xiqu',width:100,sortable:true,dataIndex:'xiqu'}
	        ,{header:'beiz',width:100,sortable:true,dataIndex:'beiz'}
	        ,{header:'yxpc',width:100,sortable:true,dataIndex:'yxpc'}
	        ,{header:'seat',width:100,sortable:true,dataIndex:'seat'}
	        ,{header:'empFlag',width:100,sortable:true,dataIndex:'empFlag'}
	        ,{header:'exphone',width:100,sortable:true,dataIndex:'exphone'}
	        ,{header:'ldht',width:100,sortable:true,dataIndex:'ldht'}
	        ,{header:'ljsr',width:100,sortable:true,dataIndex:'ljsr'}
	        ,{header:'yxht',width:100,sortable:true,dataIndex:'yxht'}
	        ,{header:'yjsr',width:100,sortable:true,dataIndex:'yjsr'}
	        ,{header:'empJname',width:100,sortable:true,dataIndex:'empJname'}
	        ,{header:'empMima',width:100,sortable:true,dataIndex:'empMima'}
	        ,{header:'empDirect',width:100,sortable:true,dataIndex:'empDirect'}
	        ,{header:'empStop',width:100,sortable:true,dataIndex:'empStop'}
	        ,{header:'note3',width:100,sortable:true,dataIndex:'note3'}
	        ,{header:'note1',width:100,sortable:true,dataIndex:'note1'}
	        ,{header:'note2',width:100,sortable:true,dataIndex:'note2'}
	        ,{header:'sfzh1',width:100,sortable:true,dataIndex:'sfzh1'}
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
	        	{text:'新增',cls:'x-btn-text-icon',iconCls:'addicon',handler:this.addTempinfo,scope:this},'-'
	        	,{text:'修改',cls:'x-btn-text-icon',iconCls:'editicon',handler:this.editTempinfo,scope:this},'-'
	        	,{text:'删除',cls:'x-btn-text-icon',iconCls:'deleteicon',handler:this.deleteTempinfo,scope:this},'-'
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
        			data: [['empName', 'empName'],['empPasswd', 'empPasswd'],['empDptid', 'empDptid'],['empJobid', 'empJobid'],['empTotid', 'empTotid'],['empNian', 'empNian'],['empMail', 'empMail'],['empPhone', 'empPhone'],['empHomepg', 'empHomepg'],['empPwdask', 'empPwdask'],['empPwdasw', 'empPwdasw'],['empCookie', 'empCookie'],['empWorkid', 'empWorkid'],['empGupid', 'empGupid'],['empOrngupid', 'empOrngupid'],['sfzh', 'sfzh'],['xb', 'xb'],['nl', 'nl'],['mzfl', 'mzfl'],['jigu', 'jigu'],['gksz', 'gksz'],['whcd', 'whcd'],['zhuz', 'zhuz'],['shji', 'shji'],['sgao', 'sgao'],['tizh', 'tizh'],['zjxy', 'zjxy'],['zhmm', 'zhmm'],['fzyt', 'fzyt'],['xiqu', 'xiqu'],['beiz', 'beiz'],['yxpc', 'yxpc'],['seat', 'seat'],['empFlag', 'empFlag'],['exphone', 'exphone'],['ldht', 'ldht'],['ljsr', 'ljsr'],['yxht', 'yxht'],['yjsr', 'yjsr'],['empJname', 'empJname'],['empMima', 'empMima'],['empDirect', 'empDirect'],['empStop', 'empStop'],['note3', 'note3'],['note1', 'note1'],['note2', 'note2'],['sfzh1', 'sfzh1']]
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
        com.ysys.www.tempinfoGrid.superclass.initComponent.call(this);
        //加载数据
        this.store.load({params:{start:0}});
        
 		//扩展类的详细弹出窗口
 		this.dtlformpanel = new com.ysys.www.tempinfo.dtlformpanel();
 		this.dtlwin =  new com.ysys.www.tempinfo.dtlwin({items:this.dtlformpanel,buttons:[{
	            text:'保存',
	            handler:this.saveTempinfo,
	            scope:this
	        },{
	            text:'取消',
	            handler:function(){this.dtlwin.hide();},
	            scope:this
	        }]});
	    
	    //扩展类的查询弹出窗口
	    this.queryformpanel = new com.ysys.www.tempinfo.queryformpanel();
	    this.querywin =  new com.ysys.www.tempinfo.querywin({items:this.queryformpanel,buttons:[{
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
				        this.dtlwin.setTitle('修改Tempinfo');
				        this.dtlwin.show();
				        this.dtlformpanel.form.reset();
				        this.dtlformpanel.form.loadRecord(record);
				        this.dtlformpanel.url = '../Tempinfo/extupdate.do';
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
						url:'../Tempinfo/extdelete.do?ids='+record.data.empId,
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
        this.dtlwin.setTitle('修改Tempinfo');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
        this.dtlformpanel.form.loadRecord(record);
        this.dtlformpanel.url = '../Tempinfo/extupdate.do';
    }
    
    //新建窗口
    ,addTempinfo : function(){
        this.dtlwin.setTitle('新建Tempinfo');
        this.dtlwin.show();
        this.dtlformpanel.form.reset();
	    this.dtlformpanel.url = '../Tempinfo/extsave.do';
	}
	
	//编辑操作
    ,editTempinfo:function(){
    	var records = this.getSelectionModel().getSelections();//单选
    	
	   if (records.length!=1) {
			Ext.Msg.alert("提示", "请先选择要修改的记录");
			return;
		}
	    this.dtlwin.setTitle('修改Tempinfo');
	    this.dtlwin.show();
	    this.dtlformpanel.form.reset();
	    this.dtlformpanel.form.loadRecord(records[0]);
	    this.dtlformpanel.url = '../Tempinfo/extupdate.do';

    }
    
    //删除操作
    ,deleteTempinfo:function(){
    	var records = this.getSelectionModel().getSelections();
		if (!records||records.length == 0) {
			Ext.Msg.alert("提示", "请先选择要删除的�记录");
			return;
		}
		Ext.MessageBox.confirm('确认删除','确定要删除这些记录?',function(btn){
			if (btn == 'yes'){
				Ext.Ajax.request({
					url:'../Tempinfo/extdelete.do?ids='+this.getRecordArrayUtils(records, 'empId'),
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
    ,saveTempinfo:function(){
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
    	this.getStore().baseParams['s_empName'] = this.queryformpanel.form.findField('s_empName').getRawValue();
    	this.getStore().baseParams['s_empPasswd'] = this.queryformpanel.form.findField('s_empPasswd').getRawValue();
    	this.getStore().baseParams['s_empDptid'] = this.queryformpanel.form.findField('s_empDptid').getRawValue();
    	this.getStore().baseParams['s_empJobid'] = this.queryformpanel.form.findField('s_empJobid').getRawValue();
    	this.getStore().baseParams['s_empTotid'] = this.queryformpanel.form.findField('s_empTotid').getRawValue();
    	this.getStore().baseParams['s_empNian'] = this.queryformpanel.form.findField('s_empNian').getRawValue();
    	this.getStore().baseParams['s_empMail'] = this.queryformpanel.form.findField('s_empMail').getRawValue();
    	this.getStore().baseParams['s_empPhone'] = this.queryformpanel.form.findField('s_empPhone').getRawValue();
    	this.getStore().baseParams['s_empHomepg'] = this.queryformpanel.form.findField('s_empHomepg').getRawValue();
    	this.getStore().baseParams['s_empPwdask'] = this.queryformpanel.form.findField('s_empPwdask').getRawValue();
    	this.getStore().baseParams['s_empPwdasw'] = this.queryformpanel.form.findField('s_empPwdasw').getRawValue();
    	this.getStore().baseParams['s_empCookie'] = this.queryformpanel.form.findField('s_empCookie').getRawValue();
    	this.getStore().baseParams['s_empWorkid'] = this.queryformpanel.form.findField('s_empWorkid').getRawValue();
    	this.getStore().baseParams['s_empGupid'] = this.queryformpanel.form.findField('s_empGupid').getRawValue();
    	this.getStore().baseParams['s_empOrngupid'] = this.queryformpanel.form.findField('s_empOrngupid').getRawValue();
    	this.getStore().baseParams['s_sfzh'] = this.queryformpanel.form.findField('s_sfzh').getRawValue();
    	this.getStore().baseParams['s_xb'] = this.queryformpanel.form.findField('s_xb').getRawValue();
    	this.getStore().baseParams['s_nl'] = this.queryformpanel.form.findField('s_nl').getRawValue();
    	this.getStore().baseParams['s_mzfl'] = this.queryformpanel.form.findField('s_mzfl').getRawValue();
    	this.getStore().baseParams['s_jigu'] = this.queryformpanel.form.findField('s_jigu').getRawValue();
    	this.getStore().baseParams['s_gksz'] = this.queryformpanel.form.findField('s_gksz').getRawValue();
    	this.getStore().baseParams['s_whcd'] = this.queryformpanel.form.findField('s_whcd').getRawValue();
    	this.getStore().baseParams['s_zhuz'] = this.queryformpanel.form.findField('s_zhuz').getRawValue();
    	this.getStore().baseParams['s_shji'] = this.queryformpanel.form.findField('s_shji').getRawValue();
    	this.getStore().baseParams['s_sgao'] = this.queryformpanel.form.findField('s_sgao').getRawValue();
    	this.getStore().baseParams['s_tizh'] = this.queryformpanel.form.findField('s_tizh').getRawValue();
    	this.getStore().baseParams['s_zjxy'] = this.queryformpanel.form.findField('s_zjxy').getRawValue();
    	this.getStore().baseParams['s_zhmm'] = this.queryformpanel.form.findField('s_zhmm').getRawValue();
    	this.getStore().baseParams['s_fzyt'] = this.queryformpanel.form.findField('s_fzyt').getRawValue();
    	this.getStore().baseParams['s_xiqu'] = this.queryformpanel.form.findField('s_xiqu').getRawValue();
    	this.getStore().baseParams['s_beiz'] = this.queryformpanel.form.findField('s_beiz').getRawValue();
    	this.getStore().baseParams['s_yxpc'] = this.queryformpanel.form.findField('s_yxpc').getRawValue();
    	this.getStore().baseParams['s_seat'] = this.queryformpanel.form.findField('s_seat').getRawValue();
    	this.getStore().baseParams['s_empFlag'] = this.queryformpanel.form.findField('s_empFlag').getRawValue();
    	this.getStore().baseParams['s_exphone'] = this.queryformpanel.form.findField('s_exphone').getRawValue();
    	this.getStore().baseParams['s_ldht'] = this.queryformpanel.form.findField('s_ldht').getRawValue();
    	this.getStore().baseParams['s_ljsr'] = this.queryformpanel.form.findField('s_ljsr').getRawValue();
    	this.getStore().baseParams['s_yxht'] = this.queryformpanel.form.findField('s_yxht').getRawValue();
    	this.getStore().baseParams['s_yjsr'] = this.queryformpanel.form.findField('s_yjsr').getRawValue();
    	this.getStore().baseParams['s_empJname'] = this.queryformpanel.form.findField('s_empJname').getRawValue();
    	this.getStore().baseParams['s_empMima'] = this.queryformpanel.form.findField('s_empMima').getRawValue();
    	this.getStore().baseParams['s_empDirect'] = this.queryformpanel.form.findField('s_empDirect').getRawValue();
    	this.getStore().baseParams['s_empStop'] = this.queryformpanel.form.findField('s_empStop').getRawValue();
    	this.getStore().baseParams['s_note3'] = this.queryformpanel.form.findField('s_note3').getRawValue();
    	this.getStore().baseParams['s_note1'] = this.queryformpanel.form.findField('s_note1').getRawValue();
    	this.getStore().baseParams['s_note2'] = this.queryformpanel.form.findField('s_note2').getRawValue();
    	this.getStore().baseParams['s_sfzh1'] = this.queryformpanel.form.findField('s_sfzh1').getRawValue();
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
Ext.reg('tempinfo', com.ysys.www.tempinfoGrid);


