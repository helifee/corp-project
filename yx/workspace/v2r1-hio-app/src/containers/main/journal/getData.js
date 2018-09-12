/**
 * Created by gavin on 2018/3/26.
 */


let post = (url='',data={})=>{
    return JZY.xhr.post(url,data,{alertError:true,alertSuccess:false}).then((resultData)=>{
        try{
            console.info('post方法')
            return resultData;
        }catch (e){
            this.$message("role.list.vue:"+e);
            return false;
        }
    }).catch((e)=>{
        //接口失败
        console.log("接口失败",e);
        throw new Error(e)
    })
};

let get = (url='')=>{
    return JZY.xhr.request(url,false,false).then(([resultData])=>{
        try{
            console.info("get方法")
            return resultData;
        }catch (e){
            this.$message("role.list.vue:"+e);
            return false;
        }
    }).catch((e)=>{
        //接口失败
        throw new Error(e)
    })
}
//JZY.xhr.put('/test_put')"
let put = (url='',data={})=>{
    return JZY.xhr.put(url,data,{alertError:true,alertSuccess:false}).then((resultData)=>{
        try{
            console.info("put方法")
            return resultData;
        }catch (e){
            this.$message("role.list.vue:"+e);
            return false;
        }
    }).catch((e)=>{
        //接口失败
        throw new Error(e)
    })
};

/**
 * 获取后台服务器时间 /sys/common/getSysTime 1
 */
export const getSysTime = ()=>{
    return get('/sys/common/getSysTime');

};

export const postProjectInfoList = (pageNum ,pageCount)=>{
    let queryData = {
        pageNum:pageNum,
        pageCount:pageCount,
    };

    queryData = filterParams(queryData);
    return post('/project/projectInfo/page',queryData);
};

// 我的日志查看

/**
 * 我的日志查看  1
 */
export const postJournalDetail = (journalDate)=>{
    let queryData = {
        'journalDate':journalDate
    };
    return post('/journal/detail',queryData);
};

/**
 * 发表日志  2
 */
export const postJournalSave = (queryData)=>{
    // queryData = filterParams(queryData);
    return post('/journal/publish',queryData);
};
/**
 * 条件查询共享我的日志（分页）  3
 */
export const postJournalShareList = (queryData)=>{
    // queryData = filterParams(queryData);
    return post('/journal/share/list',queryData);
};


/**
 * 条件查询共享我的日志（分页）  4
 */
export const postJournalCommentList = (queryData)=>{
    // queryData = filterParams(queryData);
    return post('/journal/comment/list',queryData);
};






/**
 * 保存日志，包括计划共享范围  1
 */
// export const postJournalSave = (queryData)=>{
//     queryData = filterParams(queryData);
//     return post('/journal/journal/save',queryData,false);
// };


/**
 * 修改日志，包括计划共享范围  1
 */
// export const postJournalEdit = (id,queryData)=>{
//     queryData = filterParams(queryData);
//     return put('/journal/journal/update/'+id,queryData,false);
// };

/**
 * 返回符合条件的日志列表  1
 */
export const postJournalList = (queryData)=>{
    queryData = filterParams(queryData);
    return post('/journal/journal/page',queryData);
};

/**
 * 根据Id获取日志，包括日志共享范围 2
 */

export const getJouranl = (id)=>{
    return get('/journal/journal/get/'+id);
};
/**
 * 共享我的页面-筛选查看
 */
export const postJournalCondition = (queryData)=>{
    queryData = filterParams(queryData);
    return post('/journal/journal/selectCondition',queryData);
};



function filterParams(obj){
    let _newPar = {};
    for (let key in obj) {
        //如果对象属性的值不为空，就保存该属性（这里我做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。）
        //null值“”空值的时候，这个字段就别往后传了，要不后端查询sql的时候会带上这些的
        if ((obj[key] === null || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
            //记录属性
            _newPar[key] = obj[key];
        }
    }
    //返回对象
    return _newPar;
}

/**
 * 获取我的审批列表
 */
// export const myApproveListData = ()=>{
//     let queryData = {
//         topicName:"",
//         state:2,
//         pageNum:1,
//         pageCount:10,
//         orderby:[
//             "startDate,desc",
//             "updateDate,asc"
//         ]
//     }
//     return post('/flow/approval/getPage',queryData)
// }