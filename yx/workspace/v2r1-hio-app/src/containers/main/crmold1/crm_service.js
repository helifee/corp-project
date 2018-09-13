let c_service = {
    //获取产品分类列表
    getProductCategory (param,type){
        let url = type ? "/productCategory/queryCategory": "/productCategory/queryCategoryTree";
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        return  JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },
    //保存产品分类
    saveProductCategory(param){
        let url = "/productCategory/save";
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        return JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
    
    //新增产品
    saveProducts(param){
        let url = "/product/save";
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        return  JZY.xhr.request({
            type:'POST',
            url:url,
            data:param,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
    //产品详情 或 产品分类节点详情
    getProductById(id,type){
        let url = (type=='product') ? ("/product/get/") : ("productCategory/get/");
        url = url + id;
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        return  JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },
    //删除产品或分类
    operateProduct(Id,type){
        let url = (type == "p") ? "/product/delete/":"/productCategory/delete/";
        url = url + Id;
        url = JZY.xhr.transformUrl(url,'GLOBAL.XSD',true);
        return  JZY.xhr.request({
            type:'POST',
            url:url,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },
    //产品列表
    getProductByType(){
        
    }
}
export default c_service;