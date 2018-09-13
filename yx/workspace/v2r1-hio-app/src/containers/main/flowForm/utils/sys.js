const notify = (res, vm) => {
  let status = res.data.status;
  switch (status) {
    case 200:
      vm.$notify({
        title: "成功",
        message: "保存完成",
        type: "success"
      });
      break;

    case 1000:
      // 这个是新建表单模型
      break;

    default:
      break;
      // vm.$notify({
      //   title: "失败",
      //   message: JSON.stringify(res.data),
      //   type: "error"
      // });
  }
};

// 将url中的参数部分转成json
const parseUrlParams = url => {
  var obj = {};
  var keyvalue = [];
  var key = "",
    value = "";
  var linkString = url.substring(0, url.indexOf("?"));
  var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
  for (var i in paraString) {
    keyvalue = paraString[i].split("=");
    key = keyvalue[0];
    value = keyvalue[1];
    obj[key] = value;
  }
  return {
    href: linkString,
    params: obj
  }
};

// 将json转成url的queryString
const stringifyParams = (param, prefix = null, encode = true) => {
  if (param == null) return "";
  var paramStr = "";
  var t = typeof param;
  if (t == "string" || t == "number" || t == "boolean") {
    paramStr += "&" + prefix + "=" + (encode == null || encode ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = prefix == null ? i : prefix + (param instanceof Array ? "[" + i + "]" : "." + i);
      paramStr += stringifyParams(param[i], k, encode);
    }
  }
  return paramStr;
};

// 判断设备类型
const getDeviceType = () => {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  
    return 'mobile';

  } else if (/(Android)/i.test(navigator.userAgent)) {  
    return 'mobile';

  } else {  
    return 'pc';
  };  
}

const filterSpecStr = (value = '') => {
  if (value && typeof(value) == 'string') {
    return value.replace(/[#\*%&\<\>{}\\`'"\/]/g, '');  
  } else if (value && typeof(value) == 'object') {
    return value;
  } else if (value && typeof(value) == 'number') {
    return value;  
  } else {
    return '';
  }
}

const cleanFaceEmoji = (value = '') => {
    // 能禁止所有表情，但会出现某些表情输入后，无法输入文字的情况
    // let regFace=/([\u00A9\u00AE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9-\u21AA\u231A-\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA-\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614-\u2615\u2618\u261D\u2620\u2622-\u2623\u2626\u262A\u262E-\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665-\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B-\u269C\u26A0-\u26A1\u26AA-\u26AB\u26B0-\u26B1\u26BD-\u26BE\u26C4-\u26C5\u26C8\u26CE-\u26CF\u26D1\u26D3-\u26D4\u26E9-\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733-\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934-\u2935\u2B05-\u2B07\u2B1B-\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70-\uDD71\uDD7E-\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01-\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50-\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96-\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF])|(\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F-\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95-\uDD96\uDDA4-\uDDA5\uDDA8\uDDB1-\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB-\uDEEC\uDEF0\uDEF3-\uDEF6])|(\uD83E[\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0])/g;

    // 只能过滤部分表情符号
    // let regFace = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;

    // 同移动端保持一致
    let regFace = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
    return value.replace(regFace, '');
}

export default {
  notify,
  parseUrlParams,
  stringifyParams,
  getDeviceType,
  filterSpecStr,
  cleanFaceEmoji,
};
