/**
 * Created by gavin on 2018/3/26.
 */


let post = (url='',data={})=>{
    return JZY.xhr.post(url,data,{alertError:true,alertSuccess:false}).then((resultData)=>{
        try{
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
let put = (url='',data={},alertSuccess)=>{
    return JZY.xhr.put(url,data,{alertSuccess:alertSuccess}).then((resultData)=>{
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


/**
 * 发布计划  1
 */
export const postPlanPublish = (queryData)=>{
    // queryData = filterParams(queryData);
    return post('/plan/publish',queryData);
};

/**
 * 我的计划查看  2
 */
export const postPlanDetail = (queryData)=>{
    // queryData = filterParams(queryData);
    return post('/plan/detail',queryData);
};


/**
 * 保存计划，包括计划共享范围  3
 */
export const postPlanSave = (queryData)=>{
    // queryData = filterParams(queryData);
    return post('/plan/plan/save',queryData);
};


/**
 * 条件查询共享我的计划（分页）  4
 */
export const postPlanList = (queryData)=>{
    queryData = filterParams(queryData);
    return post('/plan/plan/page',queryData);
};

/**
 * 条件查询共享我的计划（分页）1
 */
export const postPlanShareList = (planType='',userIdList='',pageNum=1 ,pageCount=20)=>{
    let queryData = {
        pageNum:pageNum,
        pageCount:pageCount,
        planType:planType,
        userIdList:userIdList
    };
    return post('/plan/share/list',queryData);
};


// postPlanCommentList

/**
 * 条件查询我评论的计划（分页） 1
 */
export const postPlanCommentList = (planType='',userIdList='',pageNum=1 ,pageCount=20)=>{
    let queryData = {
        pageNum:pageNum,
        pageCount:pageCount,
        planType:planType,
        userIdList:userIdList
    };
    return post('/plan/comment/list',queryData);
};

/**
 * 根据Id获取计划 /sys/common/getSysTime 1
 */
export const getPlan = (id)=>{
    return get('/plan/get/'+id);

};

// journal/share/list






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