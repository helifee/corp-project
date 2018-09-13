/**
 * Created by gavin on 2018/3/26.
 */


let post = (url='',data={},alertSuccess)=>{
    return JZY.xhr.r([{type:'post',url:url,data:data}],'GLOBAL.MA_CHANG_XI',false,alertSuccess).then((resultData)=>{
      try{
          return resultData;
      }catch (e){
          this.$message("role.list.vue:"+e);
          return false;
      }
    }).catch((e)=>{
      //接口失败
      throw new Error(e)
    })
    // return JZY.xhr.post(url,data,{alertSuccess:alertSuccess}).then((resultData)=>{
    //     try{
    //         console.info('post方法')
    //         return resultData;
    //     }catch (e){
    //         this.$message("role.list.vue:"+e);
    //         return false;
    //     }
    // }).catch((e)=>{
    //     //接口失败
    //     console.log("接口失败",e);
    //     throw new Error(e)
    // })
};

let get = (url='')=>{
    return JZY.xhr.request(url,false,true).then(([resultData])=>{
        try{
            // console.info("get方法")
            return resultData;
        }catch (e){
            // this.$message("role.list.vue:"+e);
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
            // console.info("put方法")
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
// JZY.xhr.drop('/test_delete')
let drop = (url='',data={},alertSuccess)=>{
    return JZY.xhr.drop(url,data,{alertSuccess:alertSuccess}).then((resultData)=>{
        try{
            // console.info("delete方法")
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
 * 保存新闻栏目 newsType/save 1
 */

// export const postNewsTypeSave = (queryData)=>{
//     // queryData = filterParams(queryData);
//     return post('/newsType/save',queryData,false);
// };
/**
 * 修改新闻栏目  2
 */
// export const postNewsTypeEdit = (id,queryData)=>{
//     // queryData = filterParams(queryData);
//     return put('/newsType/update/'+id,queryData,true);
// };
/**
 * 返回符合条件的新闻栏目列表  3
 */
export const getNewsTypeList = ()=>{
    return get('/newsType/queryList');
};
/**
* 删除新闻栏目  4
*/
export const dropNewsTypeList = (id)=>{
    return drop('/newsType/delete/'+id,{},true);
};
/**
 * 拖拽新闻栏目  5
 */
export const putNewsTypeUpdateOrder = (originId,targetId)=>{
    return put('/newsType/updateOrder/'+originId+'/'+targetId,{},false);
};

/**
 * 保存新闻  6
 */
export const postNewsSave = (queryData)=>{
    // queryData = filterParams(queryData);
    // console.log(queryData);
    // console.log(JSON.stringify(queryData));
    return post('/news/save',queryData,true);
};

/**
 * 发布新闻  7
 */
export const postNewsPublish = (queryData)=>{
    // queryData = filterParams(queryData);
    // console.log(queryData);
    // console.log(JSON.stringify(queryData));
    return post('/news/publish',queryData,true);
};

/**
 * 新闻列表  8
 */

export const postNewsList = (newsTitle='',newsTypeId='',newsStatus='',pageNum=1 ,pageCount=10)=>{
    let queryData = {
        pageNum:pageNum,
        pageCount:pageCount,
        newsTitle:newsTitle,
        newsTypeId:newsTypeId,
        newsStatus:newsStatus
    };
    // queryData = filterParams(queryData);
    // console.log(queryData);
    // console.log(JSON.stringify(queryData));
    return post('/news/list',queryData,false);
};




/**
 * 根据Id获取新闻栏目  9
 */

export const getNewsTypeName = (id)=>{
    return get('/newsType/get/'+id);
};



/**
 * 查看新闻  10
 */

export const getNewsRead = (id)=>{
    return get('/news/read/'+id);
};


/**
 * 编辑新闻  11
 */

export const getNewsEdit = (id)=>{
    return get('/news/edit/'+id);
};


/**
 * 删除新闻栏目  12
 */
export const dropNews = (id)=>{
    return drop('/news/delete/'+id,{},true);
};
/**
 * 取消置顶  13
 */
export const putNewsTopCancel = (id)=>{
    return put('/news/top/cancel/'+id,{},false);
};

/**
 * 置顶  14
 */
export const putNewsTop = (id)=>{
    return put('/news/top/'+id,{},false);
};
/**
 * 取消发布  15
 */
export const putNewsCancel = (id)=>{
    return put('/news/cancel/'+id,{},false);
};
/**
 * 判断新闻是否允许评论  3
 */
export const getNewsComment = (id)=>{
    return get('/news/comment/'+id);
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
