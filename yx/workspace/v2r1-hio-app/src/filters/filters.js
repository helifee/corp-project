import Vue from 'vue'
let myfilter_fn = {
    discount: function (value) {
        return value * .5;
    },
    toMoney: function (num) {
        var result = '', counter = 0;
        num = (num || 0).toString();
        var endstr = num.split(".")[1];
        if(endstr) endstr = "."+endstr; else endstr="";
        num = num.split(".")[0];
        for (var i = num.length - 1; i >= 0; i--) {
            counter++;
            result = num.charAt(i) + result;
            if (!(counter % 3) && i != 0) {
                result = ',' + result;
            }
        }
        return result+endstr+"元";
    },
    filterContractType:function(value){  //合同类型
        let str = "";
        switch(value){
            case 0:
                str = "直销合同"
            break;
            case 1:
                str = "代理合同"
            break;
            case 2:
                str = "采购合同"
            break;
            case 3:
                str = "服务合同"
            break;
        }
        return str;
    },
    filterPayType:function(value){  //付款类型
        let str = "";
        switch(value){
            case 1:
                str = "支票";
                break;
            case 2:
                str = "汇款";
                break;
            case 4:
                str = "现金";
                break;
            case 8:
                str = "刷卡";
                break;
            case 16:
                str = "支付宝";
                break;
            case 128:
                str = "其它"
        }
        return str;
    }
}
Object.keys(myfilter_fn).forEach(function(key){
    Vue.filter(key, myfilter_fn[key]);
});

export  default myfilter_fn;