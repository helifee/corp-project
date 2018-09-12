module.exports= {
    'zh-CN':{
    	menu:{
    		approve:'我发起的',
    		my:'我的审批',
    		shared:'抄送我的',
    		concern:'我关注的',
    		set:'审批管理',
    		flowDesign:'流程设计',
    		flowManage:'流程监控',
    	},
    	// menu:[{
    	// 	module:'/approve'
    	// 	name:'我发起的',
    	// },{
    	// 	module:'/approve/my'
    	// 	name:'我的审批',
    	// },{
    	// 	module:'/approve/shared'
    	// 	name:'抄送我的',
    	// },{
    	// 	module:'/approve/concern'
    	// 	name:'我关注的',
    	// },{
    	// 	module:'/approve/set'
    	// 	name:'模板设置',
    	// 	children:[{
    	// 		module:'/approve/set/flowDesign',
    	// 		name:'流程设计'
    	// 	}]
    	// }],
		serchInputLabels:[{
			name:'流程名称：',
			placeholder:'选择流程名称',
		},{
			name:'发起时间：',
			placeholder:'请输入文件/文件夹名称进行检索',
		},{
			name:'发起人：',
			startDate: '起始日期：',
            betweenTo: '至',
            lastDate: '到期日：',
			placeholder:'请选择发起人',
		}],
		serchInputButtons:{
			search:'查 询',
			reset:'重 置',
		},
		flowType:{
			buttonName:'发起审批',
			title:'选择审批类型',
			buttons:['关闭']
		},
		createApprove:{
			title:'创建流程',
			buttons:['保存','提交','关闭']
		},
		editApprove:{
			title:'编辑流程',
			buttons:['保存','提交','关闭']
		},
		tabs_buttons:{'all':'全部','approving':'审批中','pass':'通过','reject':'驳回','untread':'退回','draft':'草稿','skip':'跳过','pend':'待办','done':'已办'},
		details_buttons:{'pass':'通 过','skip':'跳 过','reject':'驳 回','untread':'退 回'},
		// details_buttons:{'pass':'通 过','skip':'跳 过','reject':'驳 回','reject1':'退 回','goback':'返 回'},
		details_operate:{
			name:'操作',
			childrens:{'withdraw':'撤回','front_add_label':'前加签','after_add_label':'后加签','cc':'抄送','follow':'关注','unfollow':'取消关注','deleteForm':'删除','editorForm':'编辑','submitForm':'提交','saveForm':'保存'},
			goback:'返 回'
			// childrens:{'edit':'编辑','save':'保存','refer':'提交','delete':'删除','concern':'关注','unconcern':'取消关注','revoke':'撤回','shared':'抄送','addUserBefore':'前加签','addUserAfter':'后加签'},
			
		},
		tableData:{
			// topicName:'审批主题',
			templateName:'流程名称',
			approvalPerson:'当前审批人',
			createPerson:'发起人',
			startDate:'发起时间',
			updateDate:'最后时间',
			approveState:[//流程状态，table列表里显示的
			{//无
				value:0,
				name:'xxx'
			},{//审批中
				value:1,
				name:'批'
			},{//已审批
				value:2,
				name:'√'
			},{//驳回
				value:3,
				name:'驳'
			},{//草稿
				value:4,
				name:'草'
			},{//跳过
				value:5,
				name:'跳'
			},{//退回
				value:6,
				name:'退'
			},{//驳回已处理
				value:7,
				name:'驳'
			},{//退回已处理
				value:8,
				name:'退'
			}],
		},
		// details_buttons:[{
		// 	type:'pass',
		// 	name:'通 过'
		// },{
		// 	type:'skip',
		// 	name:'跳 过'
		// },{
		// 	type:'reject',
		// 	name:'驳 回'
		// },{
		// 	type:'revoke',
		// 	name:'撤 回'
		// },{
		// 	type:'goback',
		// 	name:'返 回'
		// }],
		// details_operate:{
		// 	name:'操作',
		// 	childrens:[{
		// 		type:'edit',
		// 		name:'编辑'
		// 	},{
		// 		type:'save',
		// 		name:'保存'
		// 	},{
		// 		type:'refer',
		// 		name:'提交'
		// 	},{
		// 		type:'delete',
		// 		name:'删除'
		// 	},{
		// 		type:'concern',
		// 		name:'关注'
		// 	},{
		// 		type:'shared',
		// 		name:'抄送'
		// 	},{
		// 		type:'addUserBefore',
		// 		name:'前加签'
		// 	},{
		// 		type:'addUserAfter',
		// 		name:'后加签'
		// 	}]
		// },
		approve:{
			detail:{
				dialog:{
					textareaPlaceholder:'请输入审批意见说明',
				},
				rejectType:['驳回','退回'],
			}
		},
		my:{
			
		},
		shared:{
			
		},
		concern:{
			
		},
		set:{
			flowDesign:{
				buttonName:['创建审批','创建分类'],
				createFlowType:{
					title:'审批分类',
					showTitle:'流程预览',
					buttons:['保存','关闭'],
					inputName:'分类名称',
					inputDesc:'分类描述'
				},
				listInfo:{
					formDesignName:'表单设计',
					flowDesignName:'流程设计',
					moreName:'更多',
					more:[{
						id:'0',
						name:'预览'
					},{
						id:'1',
						name:'删除'
					},{
						id:'2',
						name:'编辑'
					},{
						id:'3',
						name:'使用范围'
					}]
				},
				createApproveType:{
					steps:['基本设置','表单设计','流程配置','权限设置'],
					prevButton:'上一步',
					nextButton:['完成','保存并下一步'],
					modalButtons:['保存','关闭'],
					title:'测试',
					step_1:{
						skipRepeatUser:{
							label:'审批环节人员重复是否跳过：',
							radio:['否','是']
						},
						flowType:{
							label:'流程类型：',
							placeholder:'请选择流程类型',
						},
						freeFlow:{
							label:'是否是自由流程：',
							radio:['否','是']
						},
						flowName:{
							label:'流程名称：',
							placeholder:'请输入流程名称',
						},
						flowDesc:{
							label:'流程描述：',
							placeholder:'请输入流程说明',
						}
					},
					step_3:{
						newNode:{
							title:'审批环节信息',
							form:{
								name:'名称：',
								namePlaceholder:'请输入审批环节名称',
								approveType:'审批类型：',
								approveTypePlaceholder:'请选择审批类型',
								approveTypeSelects:{
									1:"审核",
									2:"会签"
								},
								setApprover:'审批人设置',
								approver:'审批人员：',
								approverSelects:[{
									name:"直属上级",
									value:1
								}
								// ,
								// {
								// 	name:"部门+角色",
								// 	value:2
								// }
								,{
									name:"用户",
									value:3
								},{
									name:"角色+部门",
									value:4
								},{
									name:"发起人",
									value:5
								}
									// '直属上级','用户','角色 + 部门','发起人'
								],
								setUserShared:'抄送人设置',
								userShared:'抄送人员：'
							}
						},
						conditionGateway:{
							title:'条件网关'
						},
						conditionExpression:{
							title:'条件表达式',
							form:{
								fromName:'流向环节名称：',
								name:'显示名称：',
								namePlaceholder:'请输入显示名称',
								selectVar:'选择变量：',
								selectVars:['字段','运算符','阈值'],
								selectVarButton:'添加',
								// approveTypeSelects:['审核','会签'],
								approveTypeSelects:{
									1:"审核",
									2:"会签"
								},
								setApprover:'审批人设置',
								formula:'条件公式：',
								// formulaButtons:['(',')','并且','或者'],
								formulaButtons:[{name:'(',value:"("},{name:')',value:")"},{name:'并且',value:"and"},{name:'或者',value:"or"}],
								validationFormula:'验证公式',
							}

						},
					},
					step_4:{
						permission:{
							label:'流程提交权限：',
							permissionTypeSelects:['部门','角色','用户'],
						}
					},
				}
			},
			flowManage:{
				serchInputLabels:{
					name:'当前审批人：',
					placeholder:'请输入当前审批人',
				}

			}
		}
    },
    'en':{
    	menu:{
    		approve:'我发起的english',
    		my:'我的审批english',
    		shared:'抄送我的english',
    		concern:'我关注的english',
    		set:'模板设置english',
    		flowDesign:'flowDesign',
    	},
    	// menu:[{
    	// 	module:'/approve'
    	// 	name:'我发起的english',
    	// },{
    	// 	module:'/approve/my'
    	// 	name:'我的审批english',
    	// },{
    	// 	module:'/approve/shared'
    	// 	name:'抄送我的english',
    	// },{
    	// 	module:'/approve/concern'
    	// 	name:'我关注的english',
    	// },{
    	// 	module:'/approve/set'
    	// 	name:'模板设置english',
    	// 	children:[{
    	// 		module:'/approve/set/flowDesign',
    	// 		name:'flowDesign'
    	// 	}]
    	// }],
        approve:{
			title:'我发起的english',
			createApprove:{
				buttonName:'发起审批english',
				title:'选择审批类型english',
				buttons:['save','发布','置顶','goback']
			},
			tabs:['all','approving','approved','rejected','draft'],
			serchInputLabels:[
				{
					name:'审批主题:',
					placeholder:'请输入文件/文件夹名称进行检索',
				},
				{
					name:'流程名称:',
					placeholder:'选择流程名称',
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
					name:'流程名称:',
					placeholder:'选择流程名称',
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
					name:'流程名称:',
					placeholder:'选择流程名称',
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
					name:'流程名称:',
					placeholder:'选择流程名称',
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
				createFlowType:{
					buttonName:'createFlowType',
					title:'审批分类',
					buttons:['save','close'],
					inputName:'categoryName',
					inputDesc:'categoryDesc'
				},
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
					}]
				},
			}
		}
    }
}
