/**
 * Created by gavin on 2018/3/26.
 */


let post = (url='',data={})=>{
    return JZY.xhr.post(url,data,{alertError:true,alertSuccess:false}).then((resultData)=>{
        try{
            // console.info('post方法')
            return resultData;
        }catch (e){
            this.$message("role.list.vue:"+e);
            return false;
        }
    }).catch((e)=>{
        //接口失败
        // console.log("接口失败",e);
        throw new Error(e)
    })
};

let get = (url='')=>{
    return JZY.xhr.request(url,false,true).then(([resultData])=>{
        try{
            // console.info("get方法")
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
}

/**
 * 保存办公用品类别  1
 */
export const postOfficeHouseSave = (queryData)=>{
    queryData = filterParams(queryData);
    return post('/office/officeHouse/save',queryData);
};

/**
 * 多条件查询物品分类树 2
 */

export const postOfficeHouseSelectTree = (queryData)=>{
    // let queryData = {};
    return post('/office/officeHouse/selectTree',queryData);
};



/**
 * 编辑办公用品类别 /office/officeHouse/update/{id}  3
 */

export const putOfficeHouseUpdate = (id,queryData)=>{
    return put('/office/officeHouse/update/'+id,queryData);
};

/**
 * 根据Id获取办公用品类别 /office/officeHouse/get/{id} 4
 */
export const getOfficeHouseGet = (id)=>{
    return get('/office/officeHouse/get/'+id);
};
/**
 * 启用禁用办公用品类别 /office/officeHouse/enableOrNot/{id}  5
 */

export const putOfficeHouseEnableOrNot = (id,queryData)=>{
    return put('/office/officeHouse/enableOrNot/'+id,queryData);
};




/**
 * 返回符合条件的用品类别列表 6
 */

export const getOfficeHouseQueryList = (queryData)=>{
    // let queryData = {};
    queryData = filterParams(queryData);
    return post('/office/officeHouse/queryList',queryData);
};


/**
 *  分页返回符合条件的用品详情列表 7
 */


export const postOfficeHouseQueryList = (fuzzy,houseId ,stockName ,state='',pageNum=1 ,pageCount=10,queryType='2')=>{
    let queryData = {
        fuzzy:fuzzy,
        houseId:houseId,
        stockName:stockName,
        state:state,
        pageNum:pageNum,
        pageCount:pageCount,
        queryType:queryType
    };
    queryData = filterParams(queryData);
    return post('/office/officeInfo/page',queryData);
};



/**
 *  根据Id获取入库，包含物品详情列表 8
 */

export const getGoodsIn = (id)=>{
    return  get('/office/officeIn/get/'+id);
};


/**
 *  根据Id获取出库，包含物品详情列表 9
 */

export const getGoodsOut = (id)=>{
    return  get('/office/officeOut/get/'+id);
};



/**
 *  根据Id获取物品详情，包含物品详情列表 10
 */

export const getofficeInfo = (id)=>{
    return  get('/office/officeInfo/get/'+id);
};


// /office/officeHouse/delete/{id}
/**
 *  启用禁用物品详情 11
 */
export const putOfficeInfoEnableOrNot = (id,queryData)=>{
    return put('/office/officeInfo/enableOrNot/'+id,queryData);
};

/**
 *  修改物品详情 12
 */
export const putOfficeInfoUpdate = (id,queryData)=>{
    return put('/office/officeInfo/update/'+id,queryData);
};


/**
 *  分页返回符合条件的物品入库列表 13
 */

export const postGoodsQueryList = (theme='',createDate='',orderBy='',pageNum=1 ,pageCount=10)=>{
    let queryData = {
        fuzzy:'theme',
        theme:theme,
        createDate:createDate,
        orderBy:orderBy,
        pageNum:pageNum,
        pageCount:pageCount,
    }
    // console.log(queryData,'queryDataqueryDataqueryData');
    queryData = filterParams(queryData);
    // console.log(queryData,"queryDataqueryDataqueryData")
    return post('/office/officeIn/page',queryData);
};
/**
 *  分页返回符合条件的物品出库列表 14
 */

export const postGoodsOutList = (theme='',getUserPersonName='',createDate='',orderBy='',pageNum=1 ,pageCount=10)=>{
    let queryData = {
        fuzzy:'theme',
        theme:theme,
        getUserPersonName:getUserPersonName,
        createDate:createDate,
        orderBy:orderBy,
        pageNum:pageNum,
        pageCount:pageCount,
    };
    queryData = filterParams(queryData);
    // console.log(queryData,"queryDataqueryDataqueryData")
    return post('/office/officeOut/page',queryData);
};


// office/officeIn/createOfficeInCode

/**
 *  生成入库单编号 15
 */

export const getOfficeInCode = ()=>{
    return  get('/office/officeIn/createOfficeInCode');
};
/**
 *  生成出库单编号 16
 */

export const getOfficeOutCode = ()=>{
    return  get('/office/officeOut/createOfficeOutCode');
};

/**
 *  返回符合条件的用品详情列表 17
 */


export const postOfficeInfoList = (stockName ,houseId ,stockSpecifications,stockBrand,pageNum=1 ,pageCount=10)=>{
    let queryData = {
        stockName:stockName,
        houseId:houseId,
        stockSpecifications:stockSpecifications,
        stockBrand:stockBrand,
        pageNum:pageNum,
        pageCount:pageCount,
    }
    queryData = filterParams(queryData);
    return post('/office/officeInfo/queryList',queryData);
};


/**
 *  保存单个入库表，包含入库详单表  18
 */

export const postOfficeInSave = (queryData)=>{
    queryData = filterParams(queryData);
    return post('/office/officeIn/save',queryData);
};
/**
 *  保存单个出库表，包含出库详单表  19
 */

export const postOfficeOutSave = (queryData)=>{
    queryData = filterParams(queryData);
    // console.log(queryData,"queryDataqueryData")
    return post('/office/officeOut/save',queryData);
};




function filterParams(obj){
    let _newPar = {};
    for (let key in obj) {
        //如果对象属性的值不为空，就保存该属性（这里我做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。）
        //null值“”空值的时候，这个字段就别往后传了，要不后端查询sql的时候会带上这些的
        if ((obj[key] == '0' || obj[key] === null || obj[key]) || obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
            //记录属性
            _newPar[key] = obj[key];
        }
    }
    //返回对象
    return _newPar;
}
