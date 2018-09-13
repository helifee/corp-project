let contractUtil={
    //要求支持负数，千分位显示，最多显示两位小数
    transformMoneyFormat(val,tofixed){
        if(val==0){
            return tofixed==true?'0.00':0;
        }
        if(val=="" || val==undefined){return "";}
        val=val.toString();
        let first=val.substr(0,1);
        let arryVal=val.split(".");
        let number=arryVal[0].replace(/[^\d]/g,"");
        if(number.length>1){
            number=number.replace(/^[0]/,"");
        }
        let money= number.toString().replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
        if(first=="-"){money="-"+money;}  //处理第一位是负数
        //处理最后两位小数
        if(arryVal.length>1){
            let end=arryVal[1].replace(/[^\d]/g,"");
            money=money+"."+end.substr(0,2);
        }else if(tofixed){
            money=money+".00";
        }
        return money;
    },
    contractUEditConfig(){
       return {
                initialFrameWidth :null,//设置编辑器宽度
                initialFrameHeight:300,//设置编辑器高度
                // 设置不自动调整高度
                autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                elementPathEnabled : false,
                // 设置不自动调整高度
                scaleEnabled:false,//不可以拉伸
                maximumWords:5000,//字数限制
                autoSyncData:false,//自动同步编辑器要提交的数据
                autoFloatEnabled:false,//是否保持toolbar的位置不动，默认true
                enableAutoSave: false,//取消自动保存
                allowDivTransToP:false,
                zIndex:10000,//编辑器在页面上的z-index层级的基数，默认是900
                toolbars:[[
                    'undo', //撤销
                    'redo', //重做
                    'bold', //加粗
                    'indent', //首行缩进
                    'italic', //斜体
                    'underline', //下划线
                    'strikethrough', //删除线
                    'formatmatch', //格式刷
                    'blockquote', //引用
                    'horizontal', //分隔线
                    'removeformat', //清除格式
                    'fontfamily', //字体
                    'fontsize', //字号
                    'paragraph', //段落格式
                    'simpleupload', //单图上传
//                        'insertimage', //多图上传
                    'link', //超链接
                    'unlink', //取消链接
                    'justifyleft', //居左对齐
                    'justifyright', //居右对齐
                    'justifycenter', //居中对齐
                    'justifyjustify', //两端对齐
                    'forecolor', //字体颜色
                    'insertorderedlist', //有序列表
                    'insertunorderedlist', //无序列表
                    'lineheight', //行间距
                    'edittip ', //编辑提示
            ]]
        }
    }
}
export default contractUtil