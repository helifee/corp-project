//jquery.xjTreegrid.js-树型表格控件。
/*插件使用：
  1。调用：$xtg=$obj.xjTreegrid(options)，返回一个xjTreegrid对象
  2。方法：$xtg.fun(params)，通过xjTreegrid对象调用相应的方法
*/
;(function($){
    //模型的默认值
    var defaultOptions={
        rownumbers:true,//是否自动显示行号，暂未实现该功能
        rowHeight:30,//默认行高，用户可在options.rowHeight中指定行高
        IdColumn:"id",//id列名
        PidColumn:"pid",//父id列名
        FullidColumn:"fullid",//全路径id列名，本字段（连同FullidSep）至关重要，级次、是否叶子节点、寻找祖先节点、寻找子孙节点均根据该字段来实现
        FullidSep:"/",//全路径id中，各id的分隔符
        //LevelColumn:"level",//未使用
        //LeafColumn:"leaf",//未使用
        //SelectColumn:"select",//选择列，在某一行中单击该列对应的单元格时，将选中该行，暂未实现
        ExpandColumn:"name",//树型列，在该列显示树型结构，单击该列对应的单元格时，将打开或关闭该节点的直接下级
        //ExpandColClick: true,//未使用，本插件总是支持在单击整个单元格时打开或关闭节点
        ExpandLevel:0//加载时，默认打开的级次，从0开始
    };
    //字段的默认值（即colModel内的对象）
    var defaultColOption={
        width:200,//默认列宽
        align:"center",//列对齐方式（仅指内容，表头总是居中对齐）
        hidden:false//本列是否隐藏
    };

    //var checkStr="&nbsp;<i class='fa fa-check-square-o' aria-hidden='true'>&nbsp</i>";//"<span class='glyphicon glyphicon-check'></span>";
    //var uncheckStr="&nbsp;<i class='fa fa-square-o' aria-hidden='true'>&nbsp</i>";//<span class='glyphicon glyphicon-unchecked'></span>";
    var closeIcon="&nbsp;<i class='fa fa-caret-right fa' aria-hidden='true'>&nbsp</i>";//<span class='glyphicon glyphicon-triangle-right'></span>&nbsp;";
    var closeClass="fa fa-caret-right fa";
    var openIcon="&nbsp;<i class='fa fa-caret-down fa' aria-hidden='true'>&nbsp</i>";//"<span class='glyphicon glyphicon-triangle-bottom'></span>&nbsp;";
    var openClass="fa fa-caret-down fa";
    var leafIcon="&nbsp;<i class='fa fa-genderless' aria-hidden='true'>&nbsp</i>";//<span class='glyphicon glyphicon-minus'></span>&nbsp;";

    //插件定义，
    $.fn.xjTreegrid=function(options){
        //创建xjTreegrid对象
        $.xjTreegrid=$.xjTreegrid||{};
        console.log($.xjTreegrid);
        $.extend($.xjTreegrid,{
            containerid:this.attr("id")||"",
            container:this,
            options: $.extend(true,{},defaultOptions,options),
            init:function(){//初始化，绘制表格，加载事件
                //校验参数
                if(!this.containerid){
                    console.error("调用者的id不能为空.");
                    return false;
                }
                if(!this.options.colNames||typeof this.options.colNames!="object"||this.options.colNames.length<=0){
                    console.error("colNames参数有误.");
                    return false;
                }
                if(!this.options.colModel||typeof this.options.colModel!="object"||this.options.colModel.length<=0){
                    console.error("colModel参数有误.");
                    return false;
                }
                if(this.options.colModel.length!=this.options.colNames.length){
                    console.error("colModel和colNames的长度必须相等。");
                    return false;
                }
                //设置列模型的默认值
                for(var i=0;i<this.options.colModel.length;i++) {
                    this.options.colModel[i] = $.extend(true, {}, defaultColOption, this.options.colModel[i]);
                }
                //加载事件
                events();
            },
            loadJsonData:function(datas){//加载数据，参数为一个数组，数组中的每一个元素是一个行数据对象，类似{f1:v1,f2:v2...}
                var beginTime=new Date().getTime();
                if(!datas||typeof datas!="object"||datas.length<=0){
                    console.error("参数错误，必须是一个数组。");
                    paintTreegrid(this,datas);
                }else{
                    //------------------渲染界面----------------------
                    paintTreegrid(this,datas);
                }
                var endTime=new Date().getTime();
                console.log("加载数据完成，消费时间："+(endTime-beginTime)*1+" ms");
                return this;
            },
            getRowData:function(id){//得到行数据，参数类型如果为数值型，则指的是行号（从0开始），如果为字符型，则指的是id
                var row=new Object();
                if(typeof id=="number"){
                    row=$("div.xjtreegrid-row:eq("+id+")");
                }else{
                    row=$("#"+id);
                }
                var result={};
                for(var i=0;i<this.options.colModel.length;i++){
                    var cm=this.options.colModel[i];
                    var colname=cm.name;
                    result[colname]=row.find("div.xjtreegrid-cell[colname="+colname+"] span.xjtreegrid-value").html();
                }
                return result;
            },
            setRowData:function(id,data){//更新行数据，第一个参数为id（字符型）或行号（从0开始，数值型），第二个参数为键值对
                var row=new Object();
                if(typeof id=="number"){
                    row=$("div.xjtreegrid-row:eq("+id+")");
                }else{
                    row=$("#"+id);
                }
                for(colname in data){
                    row.find("div.xjtreegrid-cell[colname="+colname+"] span.xjtreegrid-value").html(data[colname]);
                }
            },
            getCellData:function(id,colname){
                var node=document.getElementById(id+"_"+colname);
                return node.innerHTML;
                //var $cellname=$("#"+id+"  div[colname="+colname+"] span.xjtreegrid-value");
                //return $cellname.html();
            },
            setCellData:function(id,colname,value){
                var node=document.getElementById(id+"_"+colname);
                node.innerHTML=value;
                //var $cellname=$("#"+id+"  div[colname="+colname+"] span.xjtreegrid-value");
                //$cellname.html(value);
            },
            getParentsIds:function(id){
                var row=$("#"+id);
                var fullid=row.attr("fullid");
                var ids=fullid.split(this.options.FullidSep);
                ids.pop();
                return ids;
            },
            getChildrenIds:function(id){
                var row=$("#"+id);
                var fullid=row.attr("fullid");
                var children=row.nextAll("[fullid^='"+fullid+"']");
                var ids=[];
                for(var i=0;i<children.length;i++){
                    ids.push($(children[i]).attr("id"));
                }
                return ids;
            },
            getSonIds:function(id){
                var row=$("#"+id);
                var fullid=row.attr("fullid");
                var level=parseInt(row.attr("level"))+1;
                var sons=row.nextAll("[fullid^='"+fullid+"'][level="+level+"]");//所有直接下级
                var ids=[];
                for(var i=0;i<sons.length;i++){
                    ids.push($(sons[i]).attr("id"));
                }
                return ids;
            }
        });
        $.xjTreegrid.init();
        return $.xjTreegrid;
    };


    function paintTreegrid($xtg,datas){
        var ops=$xtg.options;
        //获取每列的样式
        var styles=[];
        for(var i=0;i<ops.colModel.length;i++){
            var cm=ops.colModel[i];
            var style="";
            if(cm.hidden){
                style+="display:none;";
            }else{
                style+="width:"+cm.width+"px;";//列宽
                style+="height:"+ops.rowHeight+"px;";//行高
                style+="line-height:"+ops.rowHeight+"px;";//行高
            }
            styles.push(style);
        }
        //------------------------开始绘制界面---------------------------------------
        var html="<div class='xjtreegrid'>";//最外层div
        //绘制表头
        html+="<div class='xjtreegrid-head'>";//表头
        var otherCols = false;
        for(var i=0;i<ops.colModel.length;i++){
            if(i>1) otherCols = true;
            html+="<div class='xjtreegrid-cell' otherCols='"+otherCols+"' col='"+i+"' colname='"+ops.colModel[i].name+"' style='"+styles[i]+"text-align:center;'>";
            html+=ops.colNames[i];
            html+="</div>";
        }
        html+="</div>";//表头
        html+="<div class='xjtreegrid-body'>";//body
        //绘制表体
        for(var j=0;j<datas.length;j++){
            var data=datas[j];
            //计算本行数据的级次、是否叶子节点、图标、内容缩进等
            var fullid=data[ops.FullidColumn];
            var level=(fullid.split(ops.FullidSep)).length-1;
            var leaf=1;
            if(j<datas.length-1){
                var nextFullid=(datas[j+1])[ops.FullidColumn];
                if(nextFullid.indexOf(fullid)>=0){
                    leaf=0;
                }
            }
            var classStr=" class='xjtreegrid-row";
            if(level>ops.ExpandLevel){
                classStr+=" xjtreegrid-hide ";
            }else{
            	if(data.isShow){
            		classStr+=" xjtreegrid-show ";
            	}else{
            		classStr+=" xjtreegrid-hide ";
            	}
                
            }
            classStr+="' ";
            //行对象
            html+="<div "
                + classStr
                + " id='"+data[ops.IdColumn]+"' "
                + " pid='"+data[ops.PidColumn]+"' "
                + " fullid='"+data[ops.FullidColumn]+"' "
                + " level="+level
                + " leaf="+leaf
                + " row="+j
                + " >";//每一行表体的开始
            //循环生成每个单元格的内容
            var otherCols = false;
            for(var k=0;k<ops.colModel.length;k++){
                var cm=ops.colModel[k];
                var v=data[cm.name];
                if(cm.name=='url'||cm.name=='remark'){
                	var L=cm.width/6.5;
                	if(v&& v.length*6.6 > L){
                		v=v.substring(0,L-4)+"...";
                	}
                }
                var nameStr="<span class='xjtreegrid-value' title='"+(data[cm.name]||"")+"' id='"+(data[ops.IdColumn]+"_"+cm.name)+"'>"+(v||"")+"</span>";//内容
                var levelStr="";//根据级次，在名称前面缩进的空格
                var iconStr="";//根据是否叶子节点，以及是否打开，在名称前面显示的图标
                var cellClass=" class='xjtreegrid-cell";//单元格样式
                if(cm.name==ops.ExpandColumn){
                    for(var p=0;p<level;p++){
                        levelStr+="&nbsp;&nbsp;";
                    }
                    if(leaf){
                        iconStr="<span class='xjtreegrid-icon'>"+leafIcon+"</span>";
                    }else{
                        if(level>=ops.ExpandLevel){
                            iconStr="<span class='xjtreegrid-icon'>"+closeIcon+"</span>";
                        }else{
                            iconStr="<span class='xjtreegrid-icon'>"+openIcon+"</span>";
                        }
                        cellClass+=" xjtreegrid-expandcell";
                    }
                    nameStr=levelStr+iconStr+nameStr;
                }
                cellClass+="' ";
                if(k>1) otherCols  = true;
                //单元格对象
                html+="<div "
                    + cellClass
                    + "otherCols="+otherCols
                    + " row="+j
                    + " col="+k
                    + " colname='"+cm.name+"' "
                    + " style='"+styles[k]+"text-align:"+cm.align+"'"
                    + " >"
                    + nameStr
                    + "</div>";
            }
            html+="</div>";//每一行表体的结束
        }
        html+="</div>";//body
        html+="</div>";//最外层div
        ($xtg.container)[0].innerHTML=html;
    }



    //关闭某结点
    function close(obj){
        //(obj).hide();
    }

    function events(){
    	$.xjTreegrid.container.undelegate( "click" );
        $.xjTreegrid.container.delegate(".xjtreegrid-expandcell","click",function(){
            var $this=$(this);
            var $p=$this.parent();
            if(isOpen($this)){
                close($p,$this);
            }else{
                open($p,$this);
            }
        });

        $.xjTreegrid.container.delegate(".xjtreegrid-cell","click",function(){
            var func=$.xjTreegrid.options.click;
            if(typeof func=="function"){
                var $this=$(this);
                var id=$this.parent().attr("id");
                var row=parseInt($this.attr("row"));
                var col=parseInt($this.attr("col"));
                var colname=$this.attr("colname");
                var value=$this.find("span.xjtreegrid-value").html();
                func.call(this,id,row,col,colname,value);//抛出单击事件
            }
        });
    }

    //当前单元格所在的行是打开还是关闭的
    function isOpen(cell){
        var iconStr=cell.find("span.xjtreegrid-icon").html();
        //console.log("iconStr="+iconStr+";"+iconStr.indexOf(openClass));
        return iconStr.indexOf(openClass)>0;
    }

    //打开当前行
    function open(row,cell){
        if(!row){
            if(!cell){
                return false;
            }else{
                row=cell.parent();
            }
        }else{
            if(!cell){
                cell=row.find("div.xjtreegrid-expandcell");
            }
        }
        if(isOpen(cell)){
            return false;
        }else{
            cell.find("span.xjtreegrid-icon").html(openIcon);//被打开的节点改变图标
            var fullid=row.attr("fullid");
            var level=parseInt(row.attr("level"));
            var children=row.nextAll("[fullid^='"+fullid+"']");//得到所有下级
            for(var i=0;i<children.length;i++){
                var child=$(children[i]);
                var levelA=parseInt(child.attr("level"));//下级的级次
                var leaf=child.attr("leaf");//下级是否叶子节点
                if(levelA==level+1){//显示直接下级，但直接下级都处于关闭状态
                    if(child.hasClass("xjtreegrid-hide")){
                        child.removeClass("xjtreegrid-hide").addClass("xjtreegrid-show");
                    }
                    if(!leaf){
                        child.find("span.xjtreegrid-icon").html(closeIcon);
                    }
                }else{//隐藏所有间接下级
                    if(child.hasClass("xjtreegrid-show")){
                        child.removeClass("xjtreegrid-show").addClass("xjtreegrid-hide");
                    }
                    if(!leaf){
                        child.find("span.xjtreegrid-icon").html(closeIcon);
                    }
                }
            }
            $.xljUtils.addGridScroll("xjtreegrid-body");
            $.xljUtils.treeResizeFn("xjtreegrid-body");
        }
    }



    //关闭当前行
    function close(row,cell){
        if(!row){
            if(!cell){
                return false;
            }else{
                row=cell.parent();
            }
        }else{
            if(!cell){
                cell=row.find("div.xjtreegrid-expandcell");
            }
        }
        if(isOpen(cell)){
            cell.find("span.xjtreegrid-icon").html(closeIcon);//被打开的节点改变图标
            var fullid=row.attr("fullid");
            var children=row.nextAll("[fullid^='"+fullid+"']");//得到所有下级
            for(var i=0;i<children.length;i++){//// 隐藏所有下级
                var child=$(children[i]);
                var leaf=parseInt(child.attr("leaf"));//下级是否叶子节点
                if(child.hasClass("xjtreegrid-show")){
                    child.removeClass("xjtreegrid-show").addClass("xjtreegrid-hide");
                }
                var childCell=child.find("div.xjtreegrid-expandcell");
                if(!leaf){
                    child.find("span.xjtreegrid-icon").html(closeIcon);
                }
            }
            $.xljUtils.addGridScroll("xjtreegrid-body");
            $.xljUtils.treeResizeFn("xjtreegrid-body");
        }else {
            return false;
        }
    }


})(jQuery);
