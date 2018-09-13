
(function(){

    function selectMenuListFn(option){
        var my = this;

        this.opt = {
            title : option.title || "请选择",
            url : option.url,
            type : option.type || "GET",
            selectionMethod : option.selectionMethod || "single",  //multi多选
            rootName : option.rootName ||  [ {name: '鑫苑集团'} ],
            open : option.open || true
        }
        $.extend(this.opt, option);

    }
    selectMenuListFn.prototype = {
        isMobile : function(){
            if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
                return true
            }
            return false;
        },
        init : function(){
            var my = this;
            var $input = my.opt.$input;
            $input.attr("select-pop-modal",1);
            my._resultList = {};
            my._havePicDataList = {};
            //已选择的项
            if(this.opt.selectList){
                var str = this.opt.selectList
                if(str instanceof Array){ //数组
                    for(var i = 0; i < str.length; i++){
                        my._resultList[str[i]] = "";
                    }
                }else{  //字符串
                    my._resultList[str] = "";
                }
            }
            if(this.opt.searchSelectedList){
                $.extend(my._resultList,this.opt.searchSelectedList);
            }
            my._initHtml();
        },
        loadingTemplate : function(){
            var html  = $(`<div style="width: 100%;left:0; top:0; z-index: 99999; position: absolute;z-index: 999999;background: rgba(0,0,0,.2);height: 100%;">
                <div style="text-align: center;width: 100px;top: 50%;background: rgba(0,0,0,.5);color:#fff; font-size:16px;
                border-radius: 4px;position: absolute;left: 50%;padding:10px;margin-left: -50px;margin-top: 20px;">
                <img class="load" src="../../../mobile/myimg/load.gif" style="width:46px;height:46px;"><br/>正在加载中</div>
            </div>`);
            return html;
        },
        headTopTemplateFn : function(data){
            var my = this;
            var headTopTemplate = $(`
            <div class="head-top">
                <div class="left arrow-box back-page" >
                </div>
                <h2>
                    ${data}
                </h2>
            </div>
            <div class="head-search">
                <input class="search-input-box" placeholder="搜索">
            </div>
            `);
            var $input = this._searchInput = headTopTemplate.find("input");
            this._searchInput.on("focus",function(e){
                // my._selectNode = {};
                // $.extend(my._selectNode,my._resultList);
                // if(my.selectModel && my.selectModel.data()== 1){
                //     my.searchOpen();
                //     return;
                // }
                // my._render();
                my._searchFocusOpen();

            })
            return headTopTemplate;
        },
        _searchFocusOpen : function(){
            var my = this;
            my._selectNode = {};
            $.extend(my._selectNode,my._resultList);
            if(my.selectModel && my.selectModel.data()== 1){
                my.searchOpen();
                return;
            }
            my._render();
        },
        bottomTemplateFn : function(data){
            var html = $(`<div class="bottom-fit">
                <div class="select_result_num">
                    <span class="icon_eye"></span>已选择 <span>${data || 0}</span>/<span>${data || 0}</span>
                </div>
                <div>
                    <button class="select_btn_sure sure-page">确定</button>
                </div>
                </div>`);
            return html;
        },
        headSearchLocationTemplateFn : function(data){

            var ct = $(`<div class="ct">
                        </div>`);
            if(data){
                var len = data.length;
                for(var i = 0; i < len; i ++){
                    var item = $(`<span>${data[i].name}</span>`);
                    if(i != len-1){
                        item = $(`<span>${data[i].name}</span> >`);
                    }else{
                        item.addClass("current");
                    }
                    item.data("pageIndex",i);
                    ct = ct.append(item);
                }

                return ct;
            }
        },
        allSelectBoxFn : function(data){
            return $(`<div class="head-all-select" data-all-page="${data}">
            <input type="checkbox" id="allSelect_${data}" class="selectTypeInput">
            <label for="allSelect_${data}" class="selectType"></label> <span>全选</span>
            </div>`);
        },
        templeteListFn : function (res, cb) {
            if(res && res.length){
                $.each(res,function(index,item){
                    cb && cb(item,index)
                })
            }
        },
        _getGender : function(id){
            var imgUrl = "";
            var my = this;
            if(my._havePicDataList && my._havePicDataList[id] && my._havePicDataList[id].headPortrait ){
                var temp = my._havePicDataList[id].headPortrait;
                imgUrl = temp;
            }
            else if(my._havePicDataList && my._havePicDataList[id] && my._havePicDataList[id].gender ){
                var gender = my._havePicDataList[id].gender;
                switch (gender){
                    case "1":  //男
                        imgUrl = "../../../common/utils/selectMobile/person1@2x.png"
                        break;
                    case "0":  //女
                        imgUrl = "../../../common/utils/selectMobile/female.png"
                        break;
                    default :  //未知
                        imgUrl = "../../../common/utils/selectMobile/person@2x.png"
                        break;
                }
            }
            return imgUrl;
        },

        _getErrorPic : function(id){
            var my = this;
            var imgUrl = "";
            if(my._havePicDataList && my._havePicDataList[id] && my._havePicDataList[id].gender ){
                var gender = my._havePicDataList[id].gender;
                switch (gender){
                    case "1":  //男
                        imgUrl = "../../../common/utils/selectMobile/person1@2x.png"
                        break;
                    case "0":  //女
                        imgUrl = "../../../common/utils/selectMobile/female.png"
                        break;
                    default :  //未知
                        imgUrl = "../../../common/utils/selectMobile/person@2x.png"
                        break;
                }
            }else{
                imgUrl = "../../../common/utils/selectMobile/person@2x.png";
            }
            return imgUrl;
        },
        pageTempLateFn : function(bd,list,parent){
            var my = this;
            // var html = `<div class="content-list">
            //     <ul class="list_tree_box">`;
            var res = my._resultList;
            var showTypeName = my.opt.showTypeName;
            my.templeteListFn(list,function(data,index){
                // if(!my._resultList[data.id]){
                //     data.mySelected = false
                // }else{
                //     data.mySelected = true;
                //     my._resultList[data.id] = data;
                // }

                for(key in my._resultList){
                    if(key && key == data.id){
                        data.mySelected = true;
                        my._resultList[data.id] = data;
                    }else{
                        data.mySelected = false;
                    }
                }
                var select_bg = "";
                if(my.opt.selectKey && ( (data[my.opt.selectKey.key] == my.opt.selectKey.val) || my.opt.selectKey.val == "" )){
                    select_bg  = "select_bg";
                }
                var itemType ;
                var imgUrl = "",errorImgUrl = "";
                switch (data.type){
                    case "company":
                        itemType = 'cor1';
                        break;
                    case "dept":
                        itemType = 'cor2';
                        break;
                    case "user":
                        itemType = 'cor3';
                        //所有用户的图片地址 my._havePicDataList
                        imgUrl = my._getGender(data.id);
                        errorImgUrl = my._getErrorPic(data.id);
                        break;
                    default:
                        itemType = 'cor1';
                        break;
                }
                var temp = $(`
                <li data-listid="${data.id}" data-index="${index}" data-parent-id="${parent.id || 0}">
                    <span class="arrow-box-s" style="display:${data.children && data.children.length ? 'block': 'none'}"></span>
                    <span class="s_statu" data-isselect="${data.mySelected ? '1': '0'}">
                            <input type="checkbox" id="${data.id}" class="selectTypeInput">
                            <label for="${data.id}" class="selectType ${select_bg}"></label>
                        </span>
                    <div class="s_ct">
                            <span class="s_img">
                                <span class="${itemType}">
                                    <img src="${imgUrl}?imgType=0" onerror="this.src='${errorImgUrl}'" style="display:${data.type == "user" ? 'block': 'none' }">
                                </span>
                            </span>
                        <div class="s_txt">
                            <h2>${data.name}</h2>
                            <!--<p>4人</p>-->
                        </div>
                    </div>
                </li>
                `).data(data);
                if(showTypeName && data.type != showTypeName){
                    temp.css("display","none");
                }
                bd.append(temp);
                // html += temp;
            });
            // html += `</ul></div>`;
            // return html;
        },
        popTemptelete : function(data){
            var html = $(`
                <div class="background-wrap">
                <div class="pop-content">
                    <div class="text">确定将“${data.name}”删除？</div>
                    <div class="btn-pop-box">
                        <button class="btn-pop-no">取消</button>
                        <button class="btn-pop-sure" data-del-sure="${data.id}" data-del-parent="${data.parentId}">确定</button>
                    </div>
                </div>
                    
                </div>
            `);
            return html;
        },
        getRes : function(data){
            var my = this;
            var list = my._resultList;
            var arr = [];
            if(list && my.opt.selectionMethod == "multi"){
                var index = 0;
                for(i in list){
                    index ++;
                    if(list[i]){
                        if(my.opt.selectKey){
                            if(list[i][my.opt.selectKey.key] == my.opt.selectKey.val){
                                arr.push(list[i]);
                            }
                        }else{
                            arr.push(list[i]) ;
                        }
                    }else{
                        //在全部数据中查找
                        var t = my._filterNode(data,i);
                        list[i] = t;
                        arr.push(t);
                    }
                }
            }else if(list && my.opt.selectionMethod == "single"){
                for(i in list){
                    var tempRes ;
                    if(!list[i]){
                        var t = my._filterNode(data,i);
                        list[i] = t;
                        arr.push(t);
                        // arr = t;
                    }else{

                        arr.push(list[i]);

                        //tempRes = list[i]
                    }
                    //if(tempRes){
                    //    if(my.opt.selectKey){
                    //        if(tempRes[my.opt.selectKey.key] == my.opt.selectKey.val){
                    //            arr.push(tempRes);
                    //        }
                    //    }else{
                    //        arr.push(tempRes) ;
                    //    }
                    //}
                }
            }
            return arr;
        },
        _filterNode : function(data,id){
            var my = this;
            var res = {};
            var fn = function(item){
                for(var i = 0; i< item.length; i ++){
                    if(item[i].id == id){
                        res = item[i];
                    }
                    if(item[i].children){
                        fn(item[i].children)
                    }
                }
            }
            fn(data);
            return res;
        },
        _setBottomHtml : function(data){  //data为全部
            var my = this;
            var arr = this.getRes(data);
            if(my.bottomHtml){
                my.bottomHtml.remove();
            }
            my.bottomHtml = my.bottomTemplateFn(arr.length);
            this.modalSelectHtml.append(my.bottomHtml);
        },
        resultShowTemplateFn : function(type){
            var my = this;
            var res = my.getRes();
            my.close();
            my.opt.close&& my.opt.close(my.modalSelectHtml);
            my.opt.callback && my.opt.callback(res);
            return;
            var my = this;
            var list = my.getRes();
            var arr = [];
            var bd = $("<ul class='list_tree_box'></ul>")
            if(list && list.length){
                for(var i = 0; i< list.length; i++){
                    var data = list[i];
                    var itemType ;
                    var imgUrl = "",errorImgUrl = "";
                    switch (data.type){
                        case "company":
                            itemType = 'cor1';
                            break;
                        case "dept":
                            itemType = 'cor2';
                            break;
                        case "user":
                            itemType = 'cor3';
                            imgUrl = my._getGender(data.id);
                            errorImgUrl = my._getErrorPic(data.id);
                            break;
                        default:
                            itemType = 'cor1';
                            break;
                    }
                    var temp = $(`
                <li data-listid="${data.id}" data-index="${data.id}">
                    <span class="closeList hairline del-node" data-del-index="${data.id}"></span>
                    <div class="s_ct">
                            <span class="s_img">
                                <span class="${itemType}">
                                    <img src="${imgUrl}?imgType=0" onerror="this.src='${errorImgUrl}'" style="display:${data.type == "user" ? 'block': 'none' }">
                            </span>
                            </span>
                        <div class="s_txt">
                            <h2>${data.name}</h2>
                            <!--<p>4人</p>-->
                        </div>
                    </div>
                </li>
                `).data(data);
                    bd.append(temp);
                }
                var scrollBox = $("<div class='s-list'></div>");
                scrollBox.append(bd);
                my._resultWrapList = $(`<div class='result-wrap '>
                <div class="head-top">
                    <div class="left arrow-box close-result" >
                    </div>
                    <h2>
                        已选择
                    </h2>
                </div>
            </div>`);
                my._resultWrapList.append(scrollBox);
                my._resultWrapList.append(`<div class="bottom-fit">
                        <div class="select_result_num"></div>
                        <div>
                            <button class="select_btn_sure result-get">确定</button>
                        </div>
                </div>`);
                my.modalSelectHtml.append(my._resultWrapList);
            }

        },
        _initHtml : function(){
            var my = this;
            var $body = $("body");

            this.modalSelectHtml = $("<div class='select-common-body'></div>");
            $body.append(this.modalSelectHtml);
            //头部
            this.modalSelectHtml.append(my.headTopTemplateFn(my.opt.title));
            //当前节点定位
            this.searchLocation = my.headSearchLocationTemplateFn(my.opt.rootName);
            var $location = this.searchLocationOver = $(`<div class="over"></div>`).append(this.searchLocation);
            $location = $(`<div class="head-search-location">
                </div>`).append($location);
            this.modalSelectHtml.append($location);
            //中间内容
            my.pageHtmlTemp = `<div class='page'><div class="content-list">
                     <ul class="list_tree_box"></ul></div></div>`;
            var tempPage = $(my.pageHtmlTemp).attr("data-page",0);
            this.modalSelectHtml.append(tempPage);

            my.pageBox = this.modalSelectHtml.find("[data-page='0']");
            // //底部
            // my._setBottomHtml();
            my._currentIndex = my._currentIndex || 0;
            //初始化数据
            if( (my.opt.param && !my.opt.singSearch) || !my.opt.singSearch){
                my.getAjaxData(function(data){
                    my._allSelectBoxFn(my.pageBox);
                    //底部
                    my._setBottomHtml(data);
                    // var tArr = my.getRes(data);
                    // if(tArr.length){
                    //     my.resultShowTemplateFn();
                    // }
                });
            }else{
                my._searchFocusOpen();
            }
            my.bindEvent();

        },
        _ajax : function(cb){
            var my = this;
            my.opt.param = my.opt.param ? my.opt.param : {};
            var paramData = my.opt.param.param || {};
            var loadingTemp = my.loadingTemplate();
            my.modalSelectHtml.append(loadingTemp);
            var majax = {
                type: my.opt.param.type || 'GET',
                url: my.opt.param.url,
                data : JSON.stringify(paramData),
                success : function(msg){
                    if(msg.success == true && msg.result && msg.result.length){
                        try{
                            loadingTemp.remove();
                            // var uidList = my._getPicId(msg.result);
                            // if(my.isMobile()){
                            //     my.getPic(msg.result);
                            // }
                            cb && cb(msg.result);
                        } catch (e) {}
                    }
                },
                complete : function(){
                    loadingTemp.remove();
                }
            };
            $.extend(majax, my.opt.param);
            $.ajax(majax);
        },
        _allSelectBoxFn : function(bd){
            var my = this;
            if(my.opt.selectionMethod == "single"){
                return;
            }
            my._currentIndex = my._currentIndex || 0;
            bd.prepend(my.allSelectBoxFn(my._currentIndex));
        },
        delFn: function(e){
            var my = this,
                target = $(e.target);
            var data = target.data();

            if(data){
                delete my._resultList[data.delSure];
                //删除结果列表中的li
                my._resultWrapList.find("[data-listid='"+ data.delSure + "']").remove();
                //列表状态改变
                my._changeStatutePage(data.delSure,data);
                my._setBottomHtml();
            }
            my._popWrap.remove();
        },
        _changeStatutePage : function(id,data){
            var my = this;
            var temp = my.modalSelectHtml.find("li[data-listid='"+ id + "']") ;
            //有节点
            if(temp.length){
                //修改当前节点
                var span = temp.find(".s_statu");
                var nodeData = temp.data();
                nodeData.mySelected = !nodeData.mySelected;
                var statute = nodeData.mySelected ? "1" : "0";
                span.attr("data-isselect", statute);
                //修改当前节点的父元素
                // my._editParentData(data.delParent,nodeData);
            }
        },
        //修改当前节点父元素数据
        _editParentData : function(parentId,node){
            var my = this;
            var parentNode = my.modalSelectHtml.find("li[data-listid='"+ parentId + "']");
            if(parentNode.length){
                var parentData = parentNode.data();
                var tempParentData = parentData.children;
                tempParentData[node.index] = node;
                parentNode.data(parentData);
            }
        },
        getAjaxData : function(cb,data){
            var my = this;
            if(data && data.children && data.children.length){
                var box = my.pageBox.find("ul");
                if(my.isMobile()){
                    my.getPic(data.children);
                }
                my.pageTempLateFn(box,data.children,data);
                cb && cb(data);
                return;
            }
            my._ajax(function(data){
                my._allGetList = data;
                //当前路径
                my._currentIndex = 0;
                var box = my.pageBox.find("ul");
                if(my.isMobile()){
                    my.getPic(data);
                }
                my.pageTempLateFn(box,data,0);
                // my.pageBox.append(html);
                cb && cb(data);
            });

        },
        ergodicNode : function(data,statue){//获取当前节点下的所有子节点
            var my = this;
            var fn = function(items){
                if(items && items.length){
                    for(var i = 0; i< items.length;i++){
                        items[i].mySelected = statue;
                            if(statue == true){
                                my._resultList[items[i].id] = items[i];
                            }else{
                                delete my._resultList[items[i].id];
                            }
                        if(items[i].children ){
                            fn(items[i].children)
                        }
                    }
                }
            }
            fn(data,statue)
        },
        //全选当前节点
        nodeChildrenStatuFn : function(data,type){
            var my = this;
            if(type){
                data.mySelected = true;
            }
            my.ergodicNode(data.children,data.mySelected);
        },
        //单选
        _findPreElement : function(){
            var my = this,data = my._resultList;
            var temp = my.modalSelectHtml.find("[data-listid='"+ data.id + "']");
            if(temp.length){
                var nodeData = temp.data();
                nodeData.mySelected = false;
                var span = temp.find(".s_statu");
                span.attr("data-isselect","0");
                // my._editParentData(nodeData.parentId,nodeData);
            }
        },
        remove : function(){
            var my = this;
            my.opt.$input.removeAttr("select-pop-modal");
            my._resultList = {};
            my._havePicDataList = {};
            my.modalSelectHtml.remove();
        },
        close : function(){
            var my = this;
            my.modalSelectHtml.hide();
        },
        open : function(){
            var my = this;
            my.modalSelectHtml.show();
        },
        bindEvent : function(){
            var my = this;
            //翻页 元素下级
            my.modalSelectHtml.on("click",".list_tree_box li .s_ct",function(e){
                e.stopPropagation();
                e.preventDefault();
                var target = $(e.currentTarget).parent("li"),
                    data = target.data();
                if(data.children && data.children.length){
                    //父节点
                    my.parentNode = false;
                    my.parentNode = {
                        target : target,
                        data : target.data()
                    };
                    my._currentIndex ++;
                    my.pageBox.hide();
                    var tempPage = my.modalSelectHtml.find("[data-page='"+ my._currentIndex +"']");
                    if(tempPage.length){
                        tempPage.remove();
                    }
                    var tempBox = $(my.pageHtmlTemp).attr("data-page",my._currentIndex);
                    my.pageBox.after(tempBox);
                    my.pageBox =  my.modalSelectHtml.find("[data-page='"+ my._currentIndex +"']");
                    my.getAjaxData(function(){
                        my._allSelectBoxFn(my.pageBox);
                    },data);
                    // my.pageBox =  my.modalSelectHtml.find("[data-page='"+ my._currentIndex +"']");
                    my.pageBox.show();

                    my.opt.rootName.push({name:data.name});
                    my.searchLocation.remove();
                    my.searchLocation = my.headSearchLocationTemplateFn(my.opt.rootName);
                    my.searchLocationOver.append(my.searchLocation);
                }
            })
            // //选择多选
            my.modalSelectHtml.on("click",".list_tree_box li .s_statu",function(e){
                e.stopPropagation();
                e.preventDefault();
                var target = $(e.currentTarget),
                      li = target.parent("li"),
                    data = li.data(),
                    input = target.find("input"),
                    index = li.attr("data-index"); //选中列的序列号
                var isSelect = "0";
                if(my.opt.selectionMethod == "single"){
                    data.mySelected = !data.mySelected;
                    if(data.mySelected){

                        //isSelect = "1";
                        //my._findPreElement();
                        //my._resultList = data;
                        // if(my.opt.selectKey && !data[my.opt.selectKey.key]) data[my.opt.selectKey.key] = "";

                        if(my.opt.selectKey && ((data[my.opt.selectKey.key] == my.opt.selectKey.val) || my.opt.selectKey.val == "")){
                            isSelect = "1";
                            my._findPreElement();
                            my._resultList = data;
                            my.close();
                            my.opt.close && my.opt.close(my.modalSelectHtml);
                            my.opt.callback && my.opt.callback([data]);
                        }else{
                            //my.close();
                            //my.opt.close && my.opt.close(my.modalSelectHtml);
                            //my.opt.callback && my.opt.callback(data);
                        }
                    }else{
                        isSelect = "0";
                        my._resultList = {};
                    }
                    target.attr("data-isselect",isSelect);
                    return;
                }
                if(my.opt.selectionMethod == "multi"){
                    if(data.mySelected == true ){
                        isSelect = "0";
                        data.mySelected = false;
                            delete my._resultList[data.id];
                    }else{
                        isSelect = "1";
                        data.mySelected = true;
                        my._resultList[data.id] = data;
                    }
                }

                target.attr("data-isselect",isSelect);
                //多选时遍历当前节点里的所有子节点
                if(my.opt.selectionMethod == "multi"){
                    my.nodeChildrenStatuFn(data);
                }
                //二级节点以后的节点
                //将修改后的数据重新绑定到父级节点上
                // if(my.parentNode){
                //     var tempParentData = my.parentNode.data.children;
                //     tempParentData[index] = data;
                //     my.parentNode.target.data(my.parentNode.data);
                // }
                my._setBottomHtml();
            })
            //翻页
            my.modalSelectHtml.on("click",".back-page",function(e){
                my.parentNode = false;
                my._currentIndex --;
                if(my._currentIndex < 0){
                    my.close();
                    my.opt.close && my.opt.close(my.modalSelectHtml);
                    return;
                }
                my.pageBox.hide();
                my.pageBox =  my.modalSelectHtml.find("[data-page='"+ my._currentIndex +"']");
                my.pageBox.show();

                my.opt.rootName.pop();
                my.searchLocation.remove();
                my.searchLocation = my.headSearchLocationTemplateFn(my.opt.rootName);
                my.searchLocationOver.append(my.searchLocation);
            })
            $//全选当前页的所有节点
            my.modalSelectHtml.on("click",".head-all-select",function(e){
                e.stopPropagation();
                e.preventDefault();
                var target = $(e.currentTarget),
                    box = target.parent(),
                    list = box.find("ul li");
                var statute = target.attr("data-all-statute");
                target.attr("data-all-statute","1");
                $.each(list,function(index,item){
                    var temp = $(item),
                        data = temp.data();
                    data.mySelected = true;
                    temp.find(".s_statu").attr("data-isselect","1");
                    my._resultList[data.id] = data;
                    // if(my.parentNode){
                    //     var tempParentData = my.parentNode.data.children;
                    //     tempParentData[index] = data;
                    //     my.parentNode.target.data(my.parentNode.data);
                    // }
                    if(my.opt.selectionMethod == "multi"){
                        my.nodeChildrenStatuFn(data,"all");
                    }
                    my._setBottomHtml();
                })

            })
            //查看结果
            my.modalSelectHtml.on("click",".sure-page",function(e){
                my.resultShowTemplateFn();
            })
            //删除选中节点
            my.modalSelectHtml.on("click",".s-list li .del-node",function(e){
                var target = $(e.currentTarget),
                    li = target.parent(),
                    data = li.data();
                my._selectDelNode = li;
                my._popWrap = my.popTemptelete(data);
                my.modalSelectHtml.append(my._popWrap);
            })
            //删除（弹出窗口）
            my.modalSelectHtml.on("click",".btn-pop-box button",function(e){
                my.delFn(e);
            })
            my.modalSelectHtml.on("click",".result-wrap .close-result",function(e){
                my._resultWrapList.remove();
                if(my.opt.searchParam && !my.opt.param){
                    my.remove();
                }
            })
            //获取已选择节点列表
            // my.modalSelectHtml.on("click",".result-wrap .result-get",function(e){
            //     var res = my.getRes();
            //     my.close();
            //     my.opt.close&& my.opt.close(my.modalSelectHtml);
            //     my.opt.callback && my.opt.callback(res);
            // })
            //菜单tab标题切换
            my.modalSelectHtml.on("click",".head-search-location .ct span",function(e){
                var $item = $(this),
                    $itemData = $item.data("pageIndex");
                if($item.hasClass("current")){
                    return;
                }
                my._currentIndex = $itemData;
                $item.addClass("current");
                var rootName = my.opt.rootName;
                var arr = [];
                if(rootName && rootName.length){
                    for(i=0; i<rootName.length; i ++){
                        if(i <= $itemData){
                            arr.push(rootName[i])
                        }
                    }
                }
                my.opt.rootName = arr;
                my.searchLocation.remove();
                my.searchLocation = my.headSearchLocationTemplateFn(my.opt.rootName);
                my.searchLocationOver.append(my.searchLocation);

                my.pageBox.hide();
                my.pageBox = $(".page[data-page='" + $itemData + "']");
                my.pageBox.show();
            })
        },
        //搜索
        _listRender : function(searchData){
            var my = this;
            var _data = my._allGetList;
            my.menu.empty();

            var bd = $(`<ul class="list_tree_box select_list_ul"></ul>`);
            if(my.opt.searchHtml){
                my.opt.searchHtml(searchData,bd,my.menu,my);
                my.menu.append(bd);
                return;
            }
            var fn = function(list,box){
                var t = list;
                if(t && t.length){
                    var boxData = box.data("select-node");
                    if(!boxData){
                        boxData = [];
                    }
                    var _select = my._selectNode;
                    for(var i = 0; i< t.length; i++){
                        var data = t[i];

                        data.mySelected = false;

                        for(j in _select){
                            if(j == data.id){
                                data.mySelected = true;
                                _select[data.id] = data;
                            }
                        }

                        var select_bg = "";
                        if(my.opt.selectKey && ((data[my.opt.selectKey.key] == my.opt.selectKey.val) || my.opt.selectKey.val == "")){
                            select_bg  = "select_bg";
                        }

                        var itemType ,imgUrl = "",errorImgUrl = "";
                        switch (data.type){
                            case "company":
                                itemType = 'cor1';
                                break;
                            case "dept":
                                itemType = 'cor2';
                                break;
                            case "user":

                                itemType = 'cor3';
                                imgUrl = my._getGender(data.id);
                                errorImgUrl = my._getErrorPic(data.id);
                                break;
                            default:
                                itemType = 'cor1';
                                break;
                        }
                            var $li = $(`
                        <li data-listid="${data.id || data.uId}" data-index="${data.id || data.uId}" style="display:${data.open?'block':'none'}">
                            <div class="select_list ${data.titleNode ? 's-title-node':''}">
                                <span class="s_statu" data-isselect="${data.mySelected ? '1': '0'}">
                                <input type="checkbox" id="${data.id}" class="selectTypeInput">
                                <label for="${data.id}" class="selectType ${select_bg}"></label>
                            </span>
                            <div class="s_ct">
                                    <span class="s_img">
                                        <span class="${itemType}">
                                            <img src="${imgUrl}?imgType=0" onerror="this.src='${errorImgUrl}'" style="display:${data.type == "user" ? 'block': 'none' }">
                                            </span>
                                    </span>
                                <div class="s_txt">
                                    <h2>${data.name}</h2>
                                    <!--<p>4人</p>-->
                                </div>
                            </div>
                            </div>
                        </li>
                        `);
                            $li.data(data);
                            box.append($li);
                            if(data.open){
                                box.parents("li").show();
                                boxData.push(data);
                                box.data("select-node",boxData);
                            }
                            if(data.children){
                                var temp = $('<ul></ul>');
                                $li.append(temp);
                                fn(data.children,temp);
                            }


                    }
                }
            }
            fn(_data,bd);
            my.menu.append(bd);
            my.searchLoadingTemp && my.searchLoadingTemp.remove();
            my.searchLoadingTemp = null;
        },
        _bottomRender : function(){
            return $(`<div class="bottom-fit">
                                 <div class="select_result_num"></div>
                <div>
                    <button class="select_btn_sure sure-page">确定</button>
                </div>
                </div>`);
        },
        _render : function(){
            var my = this;
            my.selectModel = $(`<div class="search-common"></div>`);
            $("body").append(my.selectModel);
            my.selectModel.data(1);
            var $searchTopHtml = $(`<div class="top-search">
                        <div class="top-search-input">
                            <span class="clearInput"></span>
                            <input class="input-s searchfiled" type="text">
                        </div>
                        <span class="input-sure-search">搜索</span>
                        <span class="input-close">取消</span>
                    </div>
                    <div class="top-search-result">
                        <ul class="s_r_list"></ul>
                    </div>
                    
                    `);
            // <div class="top-search-title">
            //     <h2>最佳匹配</h2>
            //     </div>
            my.selectModel.append($searchTopHtml);
            my.menu = $(`<div class="content-list"></div>`);
            // my.menu = $(`<!--<ul class="list_tree_box select_list_ul"></ul>-->`);
            // $list.append(my.menu);

            my.selectModel.append($("<div class='page'></div>").append(my.menu));
            my.selectModel.append(my._bottomRender());
            var $input = my.selectModel.find("input.searchfiled");
            $input[0].focus();
            //显示结果
            if(my.opt.selectionMethod == "multi"){
                my._resultSelectShow();
            }
            my.searchEvent();
        },
        searchClose : function(){
            var my = this;
            my.selectModel.hide();
        },
        searchRemove : function(){
            var my = this;
            my.selectModel.data(0);
            my._selectNode = {};
            my.selectModel.remove();
        },
        searchOpen : function(){
            var my = this;
            my.selectModel.show();
        },
        _filterData : function(val,res){
            var my = this;
            var _data = my._allGetList;
            var _arr = [];
            var fn = function(item,parent){
                if(item && item.length){
                    for(var i = 0; i< item.length; i ++){
                        var d = item[i];
                        if(d && d.name && d.name.match(val)){
                            d.open = true;
                            if(parent){
                                parent.open = true;
                                parent.titleNode = true;
                            }
                            _arr.push(d);
                        }
                        else{
                            d.open = false;
                        }
                        if(d.children){
                            fn(d.children,d)
                        }
                    }
                }
            }
            fn(_data);
            if(my.isMobile()){
                my.getPic(_arr);
            }
        },

        searchData : function(val){
            var my = this;
            my.searchLoadingTemp = my.loadingTemplate();
            my.selectModel.append(my.searchLoadingTemp);
            if(my.opt.searchParam){
                var param = {keyword: val};
                $.extend(param,(my.opt.searchParam.param || {}));
                var majax = {
                    type: my.opt.searchParam.type || 'GET',
                    data : JSON.stringify(param),
                    success : function(msg){
                        // my.searchLoadingTemp.remove();
                        if(msg.success == true && msg.result && msg.result.length){
                            my._allGetList = msg.result;
                            try{
                                if(my.isMobile()){
                                    my.getPic(msg.result);
                                }
                                cb && cb(msg.result);
                            } catch (e) {}
                            my._listRender(msg.result);
                        }
                    },
                    complete : function(){
                        my.searchLoadingTemp.remove();
                    }
                };
                $.extend(majax, my.opt.searchParam);
                $.ajax(majax);
                return;
            }
            this._filterData(val);
            this._listRender();
        },
        _selectChildNode: function(target){
            var my = this;
            var li = target.parent().parent(),
                box = target.parent().next();
            var list = box.data("select-node");
            var lidata = li.data();
            // if(my.opt.selectKey && ((lidata[my.opt.selectKey.key] != my.opt.selectKey.val) || my.opt.selectKey.val == "")){
            //     return;
            // }
            if(my.opt.selectKey &&  (my.opt.selectKey.val == "" || (lidata[my.opt.selectKey.key] == my.opt.selectKey.val))){
                if(lidata.mySelected){
                    lidata.mySelected = false;
                    target.attr("data-isselect",0);
                    delete my._selectNode[lidata.id];
                }else{
                    lidata.mySelected = true;
                    target.attr("data-isselect",1);
                    my._selectNode[lidata.id] = lidata;
                }
                li.data(lidata);

                if(my.opt.selectionMethod == "multi"){
                    this._getSelectNode(list,my._selectNode);
                    var $childLi = box.find("li");
                    this._ergodicLi($childLi,lidata.mySelected);
                    //显示结果
                    my._resultSelectShow();
                }
                else if(my.opt.selectionMethod == "single"){
                    this._singleSelect(lidata);
                }

                my._changeStatutePage(lidata.id);
            }

        },
        _resultSelectShow: function(){
            var my = this;
            var bd = my.selectModel.find(".top-search-result ul");
            bd.empty();
            if(my._selectNode){
                var index = 1;
                for(key in my._selectNode){
                    if(key){
                        if(index == 1){
                            bd.append("<span>已选：</span>");
                        }
                        var data = my._selectNode[key];
                        var temp = $(`<li>${data.realName || data.name}</li>`);
                        bd.append(temp);
                    }
                    index ++;
                }
            }

        },
        _singleSelect : function(data){
            var my = this;
            for(i in my._selectNode){
                if(i != data.id){
                    var $li = my.menu.find("[data-listid='"+ i + "']");
                    if($li.length){
                        var dataLi = $li.data();
                        dataLi.mySelected = false;
                        $li.data(dataLi);
                        var $span = $li.find(".s_statu");
                        $span.attr("data-isselect",0);
                        delete my._selectNode[dataLi.id];
                    }
                }
            }
            my._selectNode[data.id] = data;
        },
        _getSelectNode : function(list,res){
            if(list){
                var fn = function(arr){
                    for(var i = 0; i< arr.length; i++){
                        if(arr[i].open){
                            // res.push(arr[i]);
                            res[arr[i].id] = arr[i];
                        }
                        if(arr[i].children){
                            fn(arr[i].children)
                        }
                    }
                }
                fn(list);
            }
        },
        _ergodicLi : function($li,selected){
            var my = this;
            $.each($li,function(index,item){
                var bd = $(this),
                    data = bd.data();
                var statuteBd = bd.find(".s_statu");
                if(data.open){
                    data.mySelected = selected ;
                    var temp = data.mySelected ? "1" : "0";
                    statuteBd.attr("data-isselect",temp);
                    if(temp == "0"){
                        delete my._selectNode[data.id];
                    }else{
                        my._selectNode[data.id] = data;
                    }
                }
                bd.data(data);
            })
        },
        searchEvent : function(){
            var my = this;
            //搜索
            var sFn = function(e,selectBd){
                var $input =  selectBd,
                    val = $input.val();
                my.menu.empty();
                if($.trim(val) == '') {
                    my.menu.hide();
                }else{
                    my.menu.show();
                    // 查找
                    my.searchData(val);
                }
            }
            // my.selectModel.on("keyup input",".searchfiled",function(e){
            //     var $input =  $(this);
            //     // setTimeout(function(){
            //         sFn(e,$input);
            //     // },500);
            // })
            my.selectModel.on("click",".input-sure-search",function(e){
                var $input = $(".searchfiled");
                sFn(e,$input);
            })
            my.selectModel.on("click",".clearInput",function(e){
                var $input = my.selectModel.find(".searchfiled");
                $input.val("");
                my.menu.empty();
            })

            my.selectModel.on("click",".input-close",function(e){
                my.searchRemove();
                if(!my.opt.param){
                    my.remove();
                }

            })
            my.selectModel.on("click",".list_tree_box li .s_statu",function(e){
                e.stopPropagation();
                e.preventDefault();
                var target = $(e.currentTarget);
                my._selectChildNode(target);
            })
            my.selectModel.on("click",".list_tree_box li .s_ct",function(e){
                var target = $(e.currentTarget);
                target.parent().next().toggle();
            })
            my.selectModel.on("click",".bottom-fit .sure-page",function(e){
                var target = $(e.currentTarget);

                // if(my.opt.selectionMethod == "multi"){
                //
                //     $.extend(my._resultList,my._selectNode);
                // }
                my._resultList = my._selectNode;
                // for(i in my._resultList){
                //     if(i && my._resultList[i]){
                //         my._changeStatutePage(i,my._resultList[i]);
                //     }
                // }
                my.searchRemove();
                // my._setBottomHtml();
                my.resultShowTemplateFn();

            })
        },
        connectRyJsBridge: function(callback){
            var my = this;
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isAndroid){
                my.device = "isAndroid";
                if (window.RyJsBridge) {
                    callback(RyJsBridge);
                } else {
                    document.addEventListener(
                        'RyJsBridgeReady'
                        , function() {
                            callback(RyJsBridge)
                        },
                        false
                    );
                }

            }else if(isIOS){
                my.device = "isIOS";
                if (window.RyJsBridge) { return callback(RyJsBridge); }
                if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
                window.WVJBCallbacks = [callback];
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'https://__bridge_loaded__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
            }
        },
        _getPicId : function(data){
            var my = this;
            var arr = [];
            var fn = function(list){
                for(var i = 0; i< list.length; i++){
                    // obj.push(data[i].uId);
                    if(list[i].type == "user"){
                        var uid = list[i].id ? list[i].id : list[i].uId;
                        arr.push(uid);
                    }
                    // if(list[i].children){
                    //     fn(list[i].children);
                    // }
                }
            }
            fn(data);
            return arr;
        },
        _getPicObjList : function(data){
            var my = this;
            // my._havePicDataList = {
            //     "55109dca3fdf49d2ae6ce45fcd6b6c53" : {
            //         gender : "0"
            //     }
            // }
            // my._findNode("55109dca3fdf49d2ae6ce45fcd6b6c53",my._havePicDataList["55109dca3fdf49d2ae6ce45fcd6b6c53"]);
            // return;
            if(data && data.length){

                for(var i = 0; i< data.length; i++){
                    console.log(data[i].headPortrait);
                    my._havePicDataList[data[i].thirdUserId] = data[i];
                    //查找节点
                    console.log(my._havePicDataList[data[i].thirdUserId].headPortrait)
                    my._findNode(data[i].thirdUserId,data[i]);
                }
            }
        },
        _findNode : function(id,data){
            var my = this;
            var $element = $("[data-listid='" + id + "']");
            $element.each(function(){
                var $this = $(this);
                var imgUrl = my._getGender(id);
                var errorImgUrl = my._getErrorPic(data.id);
                var $img = $this.find("span.s_img .cor3 img");
                $img.attr({"src":imgUrl}).show();
                // if($img.error){
                //     $img.error(function () {
                //         $(this).attr('src', errorImgUrl);
                //     });
                // }else{
                    if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                        this.src = errorImgUrl;
                    }
                // }
            })
        },
        getPic : function(list,cb){
            var my = this;
            var arr = my._getPicId(list);
            if(arr && arr.length){
                my.connectRyJsBridge(function(bridge) {

                    bridge.callHandler(
                        'jzyJsHandlers' , // 此参数为方法名称（为了方便封装，此处为固定值，通过下面参数中的method来判断调用的是什么方法）
                        {
                            'method':5,
                            'params':{
                                thirdUserIdList:arr
                            }
                        }, // 此参数为上面方法需要传递的参数，可为空（method：方法名称，params：方法参数）
                        function(responseData) {  // 此参数为调用函数的返回值，返回值为json字符串
                            //将数据转化成全局对象
                            if(my.device == "isIOS"){
                                my._getPicObjList(responseData);
                            }else if(my.device == "isAndroid"){
                                try{
                                    var json = eval('('+responseData+')')
                                    my._getPicObjList(json);
                                } catch (e) {
                                }
                            }
                            cb && cb();
                        });
                })
            }
        }
    }

    $.extend({
        selectModal : function(opt){
            var obj = {
                input : opt.$input
            }
            $.extend(obj,opt);

            var t = new selectMenuListFn(obj);
            // if(opt.$input.attr("select-pop-modal") == "1"){
            //     t.open();
            // }else{
            //
            // }
            t.init();
            return t;
        }
    })
})()


