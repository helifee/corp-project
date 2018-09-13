module.exports= {
    'zh-CN':{
    	menu:{
            myPlan:'我的计划',
            share:'共享我的',
            comment:'我评论的'
    	},
		approve:{
			title:'我发起的',
			button:'发起审批',
			tabs:['全部','审批中','通过','驳回','草稿'],
			serchInputLabels:[
				{
					name:'审批主题：',
					placeholder:'请输入文件/文件夹名称进行检索',
				},
				{
					name:'单据类型：',
					placeholder:'选择单据类型',
				}
			],
			serchInputButtons:{
				search:'查 询',
				reset:'重 置',
			},
		},
		my:{
			title:'我的审批',
			tabs:['全部','待办','已办'],
			serchInputLabels:[
				{
					name:'审批主题：',
					placeholder:'请输入文件/文件夹名称进行检索',
				},
				{
					name:'单据类型：',
					placeholder:'选择单据类型',
				}
			],
			serchInputButtons:{
				search:'查 询',
				reset:'重 置',
			},
		},
		shared:{
			title:'抄送我的',
			serchInputLabels:[
				{
					name:'审批主题：',
					placeholder:'请输入文件/文件夹名称进行检索',
				},
				{
					name:'单据类型：',
					placeholder:'选择单据类型',
				}
			],
			serchInputButtons:{
				search:'查 询',
				reset:'重 置',
			},
		},
		concern:{
			title:'我关注的',
			serchInputLabels:[
				{
					name:'审批主题：',
					placeholder:'请输入文件/文件夹名称进行检索',
				},
				{
					name:'单据类型：',
					placeholder:'选择单据类型',
				}
			],
			serchInputButtons:{
				search:'查 询',
				reset:'重 置',
			},
		},
		set:{
			flowDesign:{
				title:'流程设计',
				button:'创建分类',
				listInfo:{
					formDesignName:'表单设计',
					flowDesignName:'流程设计',
					moreName:'更多',
					more:[{
						id:'001',
						name:'预览'
					},{
						id:'002',
						name:'删除'
					},{
						id:'003',
						name:'重命名'
					},{
						id:'004',
						name:'使用范围'
					},{
						id:'005',
						name:'流水号'
					}]
				},
				rightModel:{
					title:'审批分类',
					inputName:'分类名称',
					inputDesc:'分类描述'
				},
			}
		}
    },
    'en':{
    	menu:{
            myPlan:'我的计划e',
            share:'共享我的e',
            comment:'我评论的e'
    	},
        approve:{
			title:'我发起的english',
			button:'发起审批english',
			tabs:['all','approving','approved','rejected','draft'],
			serchInputLabels:[
				{
					name:'审批主题:',
					placeholder:'请输入文件/文件夹名称进行检索',
				},
				{
					name:'单据类型:',
					placeholder:'选择单据类型',
				}
			],
			serchInputButtons:{
				search:'search',
				reset:'reset',
			},
		},
		my:{
			title:'我的审批english',
			tabs:['all','pending','done'],
			serchInputLabels:[
				{
					name:'审批主题:',
					placeholder:'请输入文件/文件夹名称进行检索',
				},
				{
					name:'单据类型:',
					placeholder:'选择单据类型',
				}
			],
			serchInputButtons:{
				search:'search',
				reset:'reset',
			},
		},
		shared:{
			title:'抄送我的english',
			serchInputLabels:[
				{
					name:'审批主题:',
					placeholder:'请输入文件/文件夹名称进行检索',
				},
				{
					name:'单据类型:',
					placeholder:'选择单据类型',
				}
			],
			serchInputButtons:{
				search:'search',
				reset:'reset',
			},
		},
		concern:{
			title:'我关注的english',
			serchInputLabels:[
				{
					name:'审批主题:',
					placeholder:'请输入文件/文件夹名称进行检索',
				},
				{
					name:'单据类型:',
					placeholder:'选择单据类型',
				}
			],
			serchInputButtons:{
				search:'search',
				reset:'reset',
			},
		},
		set:{
			flowDesign:{
				title:'flowDesign',
				button:'createFlowType',
				listInfo:{
					formDesignName:'formDesign',
					flowDesignName:'flowDesign',
					moreName:'more',
					more:[{
						id:'001',
						name:'预览'
					},{
						id:'002',
						name:'删除'
					},{
						id:'003',
						name:'重命名'
					},{
						id:'004',
						name:'使用范围'
					},{
						id:'005',
						name:'流水号'
					}]
				},
				rightModel:{
					title:'approveCategory',
					inputName:'categoryName',
					inputDesc:'categoryDesc'
				},
			}
		}
    }
}