module.exports = {
    'zh-CN': {
        menu: {
            mine: '我的项目',
            create: '我创建的',
            responsible: '我负责的',
            participate: '我参与的',
            follow: '我关注的',
            share: '共享给我的',
            set: '项目管理',
        },
        goBackButtons:{
            initName:'操作',
            update:'编辑',
            follow:'关注',
            unfollow:'取消关注',
            taskFinish:'任务完成',
            taskClose:'任务关闭',
            taskReturn:'返回',
            taskNotFinish:'任务未完成',
            taskActivation:'任务激活',
            taskDelete:'任务删除'
        	// initName:'操作',
        	// edit:'编辑',
        	// concern:['取消关注','关注'],
        	// complete:['已完成','任务完成'],
        	// close:'任务关闭',
        	// goback:'返回'
        },
        serchInputLabels: [{
            name: '任务名称：',
            placeholder: '请输入任务名称',
        },{
            name: '任务状态：',
            placeholder: '请选择任务状态',
            options: [{
                label: '未完成',
                value: '0'
            }, {
                label: '已完成',
                value: '1'
            }, {
                label: '已关闭',
                value: '2'
            }, {
                label: '超期',
                value: '3'
            }]
        }],
        serchInputButtons: {
            search: '查 询',
            reset: '重 置',
        },
        editTask: {
            buttons: {
                save: '保 存',
                goback: '返 回',
            },
        },
        createTask: {
            buttonName: '创建任务',
            create: '创建任务',
            edit: '编辑任务',
            buttons: ['保存', '关闭'],
            form: {
                taskName: '任务名称：',
                placeholder: '请输入任务名称',
                projectId: '关联项目：',
                projectIdPlaceholder: '请选择关联项目',
                projectstageId: '项目阶段：',
                projectstageIdPlaceholder: '请选择项目阶段',
                taskLiableName: '负责人：',
                joinUserName: '参与人员：',
                sharedUserName: '共享：',
                startDate: '起始日期：',
                betweenTo: '至',
                lastDate: '到期日：',
                datePlaceholder: '年/月/日',
                process: '进度：',
                describe: '描述：',
                taskUrgentFlag: '紧急程度：',
                regionSelectOptions:[{
                    name:'正常',
                    value:0
                },{
                    name:'紧急',
                    value:1
                },{
                    name:'非常紧急',
                    value:2
                }],
                advanceTime: '提醒：',
                advanceTimeDesc: '到期日前',
                advanceTimeName: '提醒',
                advanceTimeSelectOptions:[{
                    name:'当天',
                    value:0
                },{
                    name:'1天',
                    value:1
                },{
                    name:'2天',
                    value:2
                },{
                    name:'3天',
                    value:3
                },{
                    name:'4天',
                    value:4
                },{
                    name:'5天',
                    value:5
                },{
                    name:'不提醒',
                    value:6
                }],
                warmList:['创建人','负责人','参与人'],
                file: '附件：',
                createTaskByUser: '创建人：',
                createTaskTime: '创建时间：',
                comment:'评论：',
            }
        },
        task: {
            title: '',
        },
        create: {
            title: '',
        },
        own: {
            title: '',
        },
        join: {
            title: '',
        },
        concern: {
            title: '',
        },
        share: {
            title: '',
        },
        set: {
            title: '',
        }
    },
    'en': {
        menu: {
            approve: '我发起的english',
            my: '我的审批english',
            shared: '抄送我的english',
            concern: '我关注的english',
            set: '模板设置english',
            flowDesign: 'flowDesign',
        },
        task: {
            title: '我的任务english',
            createTask: {
                buttonName: '创建任务english',
                title: '创建任务english',
                buttons: ['save', 'close'],
                form: {
                    taskName: '任务名称english：',
                    placeholder: '请输入任务名称',
                    taskLiableName: '负责人：',
                    joinUserName: '参与人员：',
                    sharedUserName: '共享：',
                    startDate: '起始日期：',
                    betweenTo: 'to',
                    lastDate: '到期日：',
                    datePlaceholder: '年/月/日',
                    process: '进度：',
                    desc: '描述：',
                    region: '紧急程度：',
                    warnDate: '提醒：到期日前',
                    warnDateName: '提醒',
                    warnDateSelectOptions:[{
                        name:'1天',
                        value:1
                    },{
                        name:'2天',
                        value:2
                    },{
                        name:'3天',
                        value:3
                    },{
                        name:'4天',
                        value:4
                    },{
                        name:'5天',
                        value:5
                    },{
                        name:'不提醒',
                        value:0
                    }],
                    file: '附件：',
                    projectId: '关联项目：',
                    projectIdPlaceholder: '请选择关联项目',
                }
            },
            serchInputLabels: [{
                    name: '任务名称english：',
                    placeholder: '请输入任务名称',
                },
                {
                    name: '任务状态english：',
                    placeholder: '请选择任务状态',
                    options: [{
                        label: '未完成',
                        value: '1'
                    }, {
                        label: '已完成',
                        value: '2'
                    }, {
                        label: '已关闭',
                        value: '3'
                    }]
                }
            ],
            serchInputButtons: {
                search: 'search',
                reset: 'reset',
            },
            details: {

            },
        },
        create: {
            title: '我的审批english',
            tabs: ['all', 'pending', 'done'],
            serchInputLabels: [{
                    name: '审批主题:',
                    placeholder: '请输入文件/文件夹名称进行检索',
                },
                {
                    name: '单据类型:',
                    placeholder: '选择单据类型',
                }
            ],
            serchInputButtons: {
                search: 'search',
                reset: 'reset',
            },
        },
        shared: {
            title: '抄送我的english',
            serchInputLabels: [{
                    name: '审批主题:',
                    placeholder: '请输入文件/文件夹名称进行检索',
                },
                {
                    name: '单据类型:',
                    placeholder: '选择单据类型',
                }
            ],
            serchInputButtons: {
                search: 'search',
                reset: 'reset',
            },
        },
        concern: {
            title: '我关注的english',
            serchInputLabels: [{
                    name: '审批主题:',
                    placeholder: '请输入文件/文件夹名称进行检索',
                },
                {
                    name: '单据类型:',
                    placeholder: '选择单据类型',
                }
            ],
            serchInputButtons: {
                search: 'search',
                reset: 'reset',
            },
        },
        set: {
            flowDesign: {
                title: 'flowDesign',
                createFlowType: {
                    buttonName: 'createFlowType',
                    title: '审批分类',
                    buttons: ['save', 'close'],
                    inputName: 'categoryName',
                    inputDesc: 'categoryDesc'
                },
                listInfo: {
                    formDesignName: 'formDesign',
                    flowDesignName: 'flowDesign',
                    moreName: 'more',
                    more: [{
                        id: '001',
                        name: '预览'
                    }, {
                        id: '002',
                        name: '删除'
                    }, {
                        id: '003',
                        name: '重命名'
                    }, {
                        id: '004',
                        name: '使用范围'
                    }, {
                        id: '005',
                        name: '流水号'
                    }]
                },
            }
        }
    }
}