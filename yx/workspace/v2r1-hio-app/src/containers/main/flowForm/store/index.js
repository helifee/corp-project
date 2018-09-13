import Vue from "vue";
import axios from "axios";
import Vuex, { Store } from "vuex";
import widgetItemConfig from "../config/widgetItem.define";
import domUtils from "../utils/dom";
import sysUtils from "../utils/sys";
import wdgUtils from "../utils/wdg";

Vue.use(Vuex);
// Vue.use(axios);
Vue.prototype.$http = axios;

const getHost = () => {
  return JZY.DEBUG_MODE
    ? "http://192.168.3.52:9999/platform-app"
    : JZY.c.xhrSetting.HOST.GLOBAL;
};

const getHeader = () => {
    let headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
    };
    headers = Object.assign(headers,JZY.c.AUTO_LOGIN.headers);
    return {
          headers: headers
      };
};

/**
 * 开始拖拽组件，并将获取的组件参数放到pickedWidget中
 * 获取布局组件，或者基本组件
 * 需要拖拽的组件标签上，div中的wdgKey表示此组件的唯一Key名
 * 例如：Text, TextArea
 * 需要拖拽的布局标签上，div中的wdgType表示此组件的唯一type名
 * 例如：12, 4*4
 * @param {*} state
 * @param {*} param
 */
const pickUpWidget = (state, event) => {
  state.pickedWidget = {};
  const domStartEle = event.srcElement;

  let key = domStartEle.getAttribute("wdgkey") || "";
  state.pickedWidget["key"] = key;

  switch (key) {
    case "ROW": {
      // 拖拽行或表格布局, 只记录行布局数据的布局类型即可
      let type = domStartEle.getAttribute("wdgtype") || "12";
      state.pickedWidget["type"] = type;
      break;
    }

    default:
      // 判断组件中是否有options属性，若有，则清空
      // 由于双向绑定的关系，options会被污染，后续可以用单向数据处理掉
      let wdgItemConfig = widgetItemConfig[key]; 
      if (typeof(wdgItemConfig['options']) != 'undefined') {
        wdgItemConfig['options'] = [];
      }

      // 是基本组件, 将组件的配置合并至新的对象，并赋值给pickedWidget
      state.pickedWidget = Object.assign(
        {},
        state.pickedWidget,
        wdgItemConfig
      );
      break;
  }
};

/**
 * 对设计区域的行进行排序中的一部分
 * 拖拽起始，将拖起来的行数据，从原数据中删除，并放到另一个变量中
 * @param {*} state 
 * @param {*} event 
 */
const eraseRowFromContainerData = (state, event) => {
  // 判断拖拽已开启
  if (state.isSortedByDragging) {
    let obj = domUtils.findColInfoByEvent(event);
    let rowNo = obj.rowNo;
    let erasedContainerData = [];
    for (let i in state.containerData) {
      if (i != rowNo) {
        erasedContainerData.push(state.containerData[i]);
      } else {
        Vue.set(state, 'movedRowFromContainerData', state.containerData[i]);
      }
    }
    Vue.set(state, 'containerData', erasedContainerData);
  }
};

/**
 * 对设计区域的行进行排序中的一部分
 * 拖拽结束，将拖起来的行数据，放到对应模型的位置中
 * @param {*} state 
 * @param {*} event 
 */
const insertRowIntoContainerData = (state, event) => {
  // 判断拖拽已开启
  if (!state.isSortedByDragging) {
    let obj = domUtils.findColInfoByEvent(event);
    if (obj.wdgId == -1) {
      // 已拖拽到了最后一行之外
      // 行数据做追加
      let sortedContainerData = [];
      for (let i in state.containerData) {
        sortedContainerData.push(state.containerData[i]);
      }
      sortedContainerData.push(state.movedRowFromContainerData);
      Vue.set(state, 'containerData', sortedContainerData);

    } else {
      // 拖拽到了模型中间某行
      if (obj.rowNo > -1) {
        let sortedContainerData = [];
        for (let i in state.containerData) {
          sortedContainerData.push(state.containerData[i]);
          if (i == obj.rowNo) {
            sortedContainerData.push(state.movedRowFromContainerData);
          }
        }
        Vue.set(state, 'containerData', sortedContainerData);
      }
    }

  }
};


/**
 * 拖拽时，获取鼠标下的, 布局操作区域中的，wdgId, 行数, 列数，type=cell
 * 并存至state.aimingTarget
 * @param {*} state
 * @param {*} param
 * @returns 该行在container中的索引
 */
const gropeAimedCellFromContainer = (state, param) => {
  let domBelow = param.event.srcElement;
  // 获得列格子, 不能通过className方式获取
  let type = domBelow.getAttribute("type");
  let aim = state.aimingTarget;
  if (null == type) {
    Vue.set(state.aimingTarget, "rowNo", state.containerData.length);
    Vue.set(state.aimingTarget, "colNo", 0);
    Vue.set(state.aimingTarget, "wdgId", -1);

  } else if (type == "cell") {
    // 获得行号, rowNo
    let obj = domUtils.findColInfoByEvent(event);
    aim["rowNo"] = aim["rowNo"] != obj.rowNo ? obj.rowNo : aim["rowNo"];
    aim["colNo"] = aim["colNo"] != obj.colNo ? obj.colNo : aim["colNo"];
    aim["wdgId"] = aim["wdgId"] != obj.wdgId ? obj.wdgId : aim["wdgId"];
  }
};

/**
 * 增加行布局到制作区域中
 * 增加行布局后，生成一个空的组件对象
 * @param {*} type
 */
const addRowLayoutToContainer = (state, type) => {
  let len = state.containerData.length;
  let rowNo = state.aimingTarget["rowNo"] * 1 + 1;

  let newObj = {
    row: takeLayoutArray(type),
    widget: takeWidgetArray(type)
  };
  if (len <= 1 || rowNo == len) {
    // 容器中没东西，只有一行，悬浮到最后一行上
    state.containerData.push(newObj);
  } else {
    // 加到悬浮行的下一行
    state.containerData.splice(rowNo, 0, newObj);
  }
};

/**
 * 生成布局的行数据
 */
const takeLayoutArray = rowType => {
  if (rowType) {
    if (rowType.indexOf("*") > -1) {
      // 表格
    } else {
      // 行布局
      let rowArray = [];
      rowType.split(",").map((v, k) => {
        let width = Math.ceil(100 / rowType.split(",").length);
        rowArray.push({
          wdgId: takeUuid("box"),
          style: `width: ${width}%`
        });
      });
      return rowArray;
    }
  }
};

/**
 * 生成每行里面的组件初始格式
 */
const takeWidgetArray = rowType => {
  if (rowType) {
    if (rowType.indexOf("*") > -1) {
      // 表格
    } else {
      // 行布局
      let rowArray = [];
      rowType.split(",").map((v, k) => {
        rowArray.push({
          wdgId: takeUuid("wdg")
        });
      });
      return rowArray;
    }
  }
};

/**
 * 生成唯一序号, 随机数
 */
const takeUuid = (prefix = "") => {
  return `${prefix}_${Math.ceil(Math.random() * 1000000)}`;
};

/**
 * 将布局元素中的表格布局，放入编辑区域
 * @param {*} type
 */
const addTableLayoutToContainer = (state, type) => {};

/**
 * 增加布局元素
 */
const addWidgetLayoutToContainer = (state, type) => {
  if (type) {
    if (type.indexOf("*") > -1) {
      // 是表格布局
      addTableLayoutToContainer(state, type);
    } else {
      // 是行布局
      addRowLayoutToContainer(state, type);
    }
  }
};

/**
 * 增加组件元素, 到制作表单的区域中，定位并更新容器
 * 拖拽区内容不为空, 增加行
 * 拖拽区为空，直接增加组件的情况下，默认增加‘一行一列’
 */
const addWidgetItemToContainer = state => {
  rerangeContainerData(state);

  let rowNo = state.aimingTarget["rowNo"];
  let colNo = state.aimingTarget["colNo"];
  let wdgId = state.aimingTarget["wdgId"];
  let currRowCounts = state.containerData.length;

  if (currRowCounts == 0) {
    // 没有找到对应的行，于是追加
    addRowLayoutToContainer(state, "12");
    let aimedCell = state.containerData[0].widget[0];
    Vue.set(
      state.containerData[0]["widget"],
      0,
      Object.assign({}, aimedCell, state.pickedWidget)
    );
  } else if (wdgId == -1 && !state.isSortedByDragging) {
    // 不是拖拽排序模式，且没找到wdgId
    // 没有指定任何布局wdgId，所以直接增加一行
    addRowLayoutToContainer(state, "12");
    let rCount = state.containerData.length;
    let aimedCell = state.containerData[rCount - 1].widget[0];
    Vue.set(
      state.containerData[rCount - 1].widget,
      0,
      Object.assign({}, aimedCell, state.pickedWidget)
    );
  } else {
    // 找到了对应的行，于是
    let aimedCell = state.containerData[rowNo].widget[colNo];

    let objWdg = Object.assign({}, aimedCell, state.pickedWidget);

    Vue.set(state.containerData[rowNo].widget, colNo, objWdg);
  }
};

/**
 * 从containerData中获取当前最常用的组件
 * 同时更新state中的stapleWidget
 * @param {*} state 
 * @returns {Array}
 */
const calcStapleWidget = (state) => {
  let stapleWdgs = {};
  let containerData = state.containerData;
  for (let i = 0; i < containerData.length; i++) {
    for (let j = 0; j < containerData[i].widget.length; j++) {
      let wdgKey = containerData[i].widget[j]["key"];
      if (typeof(stapleWdgs[wdgKey]) == 'undefined') {
        stapleWdgs[wdgKey] = 1;
      } else {
        stapleWdgs[wdgKey] += 1;
      }
    }
  }
  state.stapleWidget = stapleWdgs;
  return stapleWdgs;
}

// 从混合数据中，查找对应属性
const gropeWidgetItemProperty = (state, param) => {
  if (param) {
    try {
      if (state.containerData[param.rowNo]["widget"]) {
        return state.containerData[param.rowNo]["widget"][param.colNo];
      }
    } catch (e) {
      console.error(e);
    }
  }
};

const clickedWidgetItemOnCell = (state, param) => {
  let rowNo = param.rowNo;
  let colNo = param.colNo;
  // let prop = gropeWidgetItemProperty(state, { rowNo, colNo });

  Vue.set(state.clickedWidgetItem, "wdgId", param.wdgId);
  Vue.set(state.clickedWidgetItem, "type", param.type);
  Vue.set(state.clickedWidgetItem, "property", param.prop);
  Vue.set(state.clickedWidgetItem, "rowNo", rowNo);
  Vue.set(state.clickedWidgetItem, "colNo", colNo);
};

const rerangeContainerData = state => {
  if (state.containerData && state.containerData.length > 0) {
    let newContainerData = [];
    for (let i in state.containerData) {
      if (state.containerData[i]) {
        newContainerData.push(state.containerData[i]);
      }
    }
    Vue.set(state, 'containerData', newContainerData);
  }
};


const cleanStateParams = (state) => {
  // Vue.set(state, 'containerData', []);
  // Vue.set(state, 'layoutData', {});
  state.containerData = [];
  state.layoutData = {};
  state.propertyData = {};
  state.valueData = {};
  state.businessData = {};
  state.validation = true;
  // state.extInfo.sid = "";
  // state.extInfo.instanceId = '';
  // state.extInfo.customFormId = '';
  cleanWidgetItemProperty(state);
}

const cleanWidgetItemProperty = (state) => {
  if (state.clickedWidgetItem) {
    Vue.set(state.clickedWidgetItem, "wdgId", '');
    Vue.set(state.clickedWidgetItem, "type", '');
    Vue.set(state.clickedWidgetItem, "property", {});
    Vue.set(state.clickedWidgetItem, "rowNo", 0);
    Vue.set(state.clickedWidgetItem, "colNo", 0);
  }
};

const findWidgetCoorByWdgid = (state, wdgId) => {
  let containerData = state.containerData;
  for (let i = 0; i < containerData.length; i++) {
    for (let j = 0; j < containerData[i].widget.length; j++) {
      if (containerData[i].widget[j]["wdgId"] == wdgId) {
        return { row: i, col: j };
      }
    }
  }
  return { row: -1, col: -1 };
};

// state.propertyData 为保存用的属性，里面包括wdgInfo和extInfo两部分
// 使用时，
// 需要将其中的wdgInfo部分合并至state.containerData中
// 将其中的extInfo信息保存至state.extInfo中
const mergeContainerData = state => {
  let containerData = [];
  let layoutData = state.layoutData;
  let valueData = state.valueData;

  // 从propertyData抽出wdgInfo
  let wdgPropertyData = state.propertyData["wdgInfo"];

  // 从state.propertyData抽出extInfo，并放入state.extInfo
  state.extInfo.title = state.propertyData["extInfo"]["title"];
  state.extInfo.description = state.propertyData["extInfo"]["description"];

  // 将值们和属性进行混合
  for (let k in valueData) {
    wdgPropertyData[k] = Object.assign({}, wdgPropertyData[k], valueData[k]);
  }

  // 根据设备类型进行转换
  let newlayoutData = translateLayoutByDevice(layoutData);

  // 处理布局数据，做成容器数据
  // 根据组件ID，合并赋值相应属性
  newlayoutData.map((v, k) => {
    containerData.push(v);
    v.widget.map((w, j) => {
      containerData[k]["widget"][j] = wdgPropertyData[w.wdgId];
    });
  });

  Vue.set(state, 'containerData', containerData);

  calcStapleWidget(state);
};

/**
 * 依据不同的设备，转换对应的布局
 * @param {*} layoutData 
 */
const translateLayoutByDevice = layoutData => {
  let device = sysUtils.getDeviceType();
  if (device == "pc") {
    return layoutData;
  }

  let mobileLayoutData = [];
  // 将所有布局转化成单列布局
  layoutData.map((v, k) => {
    v.row.map((r, j) => {
      let singleColLine = {
        row: [],
        widget: []
      };
      r.style = "width: 100%";
      singleColLine["row"].push(r);
      singleColLine["widget"].push(v.widget[j]);
      mobileLayoutData.push(singleColLine);
    });
  });
  return mobileLayoutData;
};

/**
 * 抽取模型中的指定数据，例如抽取属性值propertyData，布局值layoutData
 * @param {*} containerData
 * @param {*} extractType
 */
const extractModelByType = (containerData, extractType) => {
  switch (extractType) {
    case "propertyData":
      let propertyData = {};
      containerData.map((v, k) => {
        let rowDatum = {};
        v.widget.map((w, n) => {
          propertyData[w.wdgId] = w;
        });
      });
      return propertyData;
      break;

    case "layoutData":
      let layoutData = [];
      containerData.map((v, k) => {
        let rowDatum = {};
        rowDatum["row"] = v.row;
        rowDatum["widget"] = [];
        v.widget.map((w, n) => {
          rowDatum["widget"].push({ wdgId: w.wdgId });
        });
        layoutData.push(rowDatum);
      });
      return layoutData;
      break;

    default:
  }
};

/**
 * 生成后端需要的businessData，与valueData同时生成
 * @param {*} state 
 */
const setBusinessData = state => {
  // 排除StdIframe组件, StdContract的情况
  let bizData = [];

  let wdgValues = state.valueData;
  let wdgProps = state.propertyData["wdgInfo"];
  let embdInfo = getWdgEmbeddedInfo(state);

  // 转化propertyData或者valueData中的数据为businessData
  return wdgUtils.getBusinessData(embdInfo.embeddedType, wdgProps, wdgValues);
};

 
/**
 * 针对不同的组件方式，有不同的设置valueData的方法
 * 分为三种：iframe，类HR/component，类合同/标准组件
 * 从state中的propertyData，获取valueData
 * @param {*} state 
 * @param {*} data 
 */
const setValueData = (state, data = {}) => {
  let embdInfo = getWdgEmbeddedInfo(state);
  let embeddedType = embdInfo.embeddedType;

  let valueData = {};
  if (embeddedType == "iframe") {
    // 当组件以嵌入页面的方式呈现
    // 则需要调用嵌入页中的固定方法ehrApplyData()手机valueData
    // 如果有提交方法submitAddForm(), 也需要调用
    valueData = getValueDataByBiztype(state, embdInfo.bizType);
  } else if (embeddedType == "component") {
    // 属于其他的嵌入表单，比如合同
    // 直接使用state中的valueData，不做特殊抽取处理
    // 因为已经从相应的组件内，处理过了
    valueData = data;
  } else {
    // 标准自定义表单， 从属性中获得valueData
    let wdgPropertyData = state.propertyData["wdgInfo"];
    for (let k in wdgPropertyData) {
      let wdg = wdgPropertyData[k];
      if (wdg.key == 'StdOptionSelect') {
        let text = sysUtils.filterSpecStr(wdg.text);
        valueData[k] = {
          value: wdg.value,
          text
        };

      } else {
        let value = sysUtils.filterSpecStr(wdg.value);
        valueData[k] = {
          value
        };
      }
    }
  }

  // state.valueData = valueData;
  return valueData;
};

/**
 * 根据业务类型，获取相关的值对象
 * 这里只针对HR，或者说针对iframe的第三方组件
 * @param {} state 
 * @param {*} bizType 
 */
const getValueDataByBiztype = (state, bizType) => {
  switch (bizType) {
    case "YGZZ":
    case "RYLZ":
    case "RYDD":
    case "TDX":
    case "KQBDK":
    case "KQQJ":
    case "KQCC":
    case "KQGC":
      if (document.querySelector("iframe")) {
        let ifmWnd = document.querySelector(`iframe[formMode="${state.formMode}"]`).contentWindow;
        // let ifmWnd = document.querySelector("iframe").contentWindow;
        if (typeof ifmWnd.ehrApplyData == "function") {
          // 获取嵌入表单内的固定方法，获取valueData
          let ehrResult = {};
          if (state.formMode == "design") {
            ehrResult = ifmWnd.getData();
            return ehrResult;
          } else {
            ehrResult = ifmWnd.ehrApplyData();
            if (ehrResult.success) {
              state.validation = true;
              return ehrResult.data;
            } else {
              state.validation = false;
            }
          }
        }
        // if (typeof ifmWnd.submitAddForm == "function") {
        // 执行表单内的固定保存
        //ifmWnd.submitAddForm();
        // }
      }
      return {};

    default:
      return {};
  }
};

/**
 * 为了后端的方便，根据后端要求写的返回指定回调方法的函数
 * 这些方法最好不要写到前端, 不仅增加前端代码量和复杂度
 * 而且暴露业务给前端代码，永远不是好办法
 */
const setCallBackParam = (state, bizType = "") => {
  // 指定回调方法
  let tmp = {
    contentType: "standard",
    callback: {}
  };

  switch (bizType) {
    case "YGZZ":
    case "RYLZ":
    case "RYDD":
    case "TDX":
    case "KQBDK":
    case "KQQJ":
    case "KQCC":
    case "KQGC":
      tmp["callback"] = {
        dataSaveUrl: `${getHost()}/hr/sys/sysApply/startFlowTask`,
        dataDeleteUrl: `${getHost()}/hr/sys/sysApply/deleteBatchFlowTask`,
        dataStatusUrl: `${getHost()}/hr/sys/sysApply/queryStatusCallBack`
      };
      tmp["contentType"] = "embedded";
      tmp["keyParam"] = bizType;
      break;

    case "OA_CONTRACT_INFO":
      tmp["contentType"] = "embedded";
      tmp["callback"] = {
        dataSaveUrl: `${getHost()}/oa/contract/contractInfo/saveForApprove`,
        dataDeleteUrl: `${getHost()}/oa/contract/contractInfo/delete`,
        dataStatusUrl: `${getHost()}/oa/contract/contractInfo/updateApproveStatus`
      };
      break;

    case "OA_CONTRACT_CHANGE":
      tmp["contentType"] = "embedded";
      tmp["callback"] = {
        dataSaveUrl: `${getHost()}/oa/contract/contractChange/saveForApprove`,
        dataDeleteUrl: `${getHost()}/oa/contract/contractChange/delete`,
        dataStatusUrl: `${getHost()}/oa/contract/contractChange/updateApproveStatus`
      };
      break;

    case "OA_CONTRACT_PAYMENT":
      tmp["contentType"] = "embedded";
      tmp["callback"] = {
        dataSaveUrl: `${getHost()}/oa/contract/contractPayment/saveForApprove`,
        dataDeleteUrl: `${getHost()}/oa/contract/contractPayment/delete`,
        dataStatusUrl: `${getHost()}/oa/contract/contractPayment/updateApproveStatus`
      };
      break;

    default:
      break;
  }

  state.propertyData["extInfo"]["contentType"] = tmp["contentType"];
  state.propertyData["extInfo"]["keyParam"] = tmp["keyParam"] || "";
  state.propertyData["callback"] = tmp["callback"];

  return;
};

/**
 * HR 
 * 根据对应的业务类型，返回相对应的流程分支名
 * @param {*} state 
 */
const getFlowVarInfo = state => {
  const embdInfo = getWdgEmbeddedInfo(state);

  var tmp = [];
  switch (embdInfo.bizType) {
    case "YGZZ":
    case "RYLZ":
    case "RYDD":
    case "TDX":
    case "KQBDK":
    case "KQQJ":
    case "KQCC":
    case "KQGC":
      let valueData = getValueDataByBiztype(state, embdInfo.bizType);
      for (let code in valueData) {
        tmp.push({
          code,
          name: valueData[code].name,
          valueType: valueData[code].valueType,
          isFlowVar: valueData[code].isFlowVar
        });
      }
      break;

    case "OA_CONTRACT_INFO":
      tmp = [
        {
          code: "contractTypeName",
          name: "类型",
          valueType: "str",
          isFlowVar: true
        },
        {
          code: "money",
          name: "金额",
          valueType: "float",
          isFlowVar: true
        },
        {
          code: "firstParty",
          name: "甲方",
          valueType: "str",
          isFlowVar: true
        },
        {
          code: "secondParty",
          name: "乙方",
          valueType: "str",
          isFlowVar: true
        }
      ];
      break;

    case "OA_CONTRACT_CHANGE":
      tmp = [
        {
          code: "contractType",
          name: "合同类型",
          valueType: "str",
          isFlowVar: true
        },
        {
          code: "changeMoney",
          name: "变更金额",
          valueType: "float",
          isFlowVar: true
        },
        {
          code: "changeType",
          name: "变更类型",
          valueType: "str",
          isFlowVar: true
        },
        {
          code: "newMoney",
          name: "变更后金额",
          valueType: "float",
          isFlowVar: true
        }
      ];
      break;

    case "OA_CONTRACT_PAYMENT":
      tmp = [
        {
          code: "contractTypeName",
          name: "类型",
          valueType: "str",
          isFlowVar: true
        },
        {
          code: "money",
          name: "合同金额",
          valueType: "float",
          isFlowVar: true
        },
        {
          code: "paymentMoney",
          name: "付款金额",
          valueType: "float",
          isFlowVar: true
        },
        {
          code: "sumPaymentMoney",
          name: "累计付款金额",
          valueType: "float",
          isFlowVar: true
        }
      ];
      break;

    default:
      break;
  }

  return {
    flowVar: tmp,
    bizType: embdInfo.bizType
  };
};

/**
 * 获得嵌入组件的状态信息
 * iframe需要知道其src，合同组件需要知道其类型contractType
 * @param {*} state
 */
const getWdgEmbeddedInfo = state => {
  const wdgProps = state.propertyData.wdgInfo;
  let iframeLink = "",
    contractType = "",
    embeddedType = "",
    EXT_IFRAME = "iframe",
    EXT_COMPONENT = "component";
  let EMBEDDED_TYPE = {};
  EMBEDDED_TYPE[EXT_IFRAME] = "StdIframe";
  EMBEDDED_TYPE[EXT_COMPONENT] = "StdContract";

  for (let k in wdgProps) {
    if (
      wdgProps[k].key == EMBEDDED_TYPE[EXT_IFRAME] &&
      wdgProps[k].link != ""
    ) {
      iframeLink = wdgProps[k].link;
      embeddedType = EXT_IFRAME;
      break;
    } else if (wdgProps[k].key == EMBEDDED_TYPE[EXT_COMPONENT]) {
      embeddedType = EXT_COMPONENT;
      contractType = wdgProps[k].wdgContractType || wdgProps[k].contractType;
      break;
    }
  }

  let bizType = "",
    data = {};
  if (embeddedType == EXT_IFRAME && iframeLink.length > 0) {
    data = sysUtils.parseUrlParams(iframeLink);
    bizType = data["params"]["bizType"] || "";
  } else if (embeddedType == EXT_COMPONENT) {
    bizType = contractType;
  }

  return {
    embeddedType,
    iframeLink,
    contractType,
    bizType
  };
};

// 查找并更新当前的对象数组，没有返回值
// 直接更新入参ary
const updateObjArryByObj = (ary, obj) => {
  // 查找当前
  let idx = -1;
  ary.map((datum, key) => {
    if (datum.value == obj.value) {
      idx = key;
    }
  });

  if (idx == -1) {
    ary.push({
      value: obj.value,
      text: obj.text
    });
  } else {
    ary[idx]['text'] = obj.text;
  }
};

// 删除对象数组中的指定对象
// 返回处理完的对象数组
const eraseObjectFromArray = (ary, obj) => {
  let idx = -1;
  let newAry = [];
  ary.map((datum, key) => {
    if (datum.value == obj.value) {
      idx = key;
    } else {
      newAry.push(datum);
    }
  });
  return newAry;
};

// 将指定对象追加进相应的数组
const appendObjectIntoArray = (ary, obj) => {
  ary.push({
    value: Math.ceil(Math.random()*1000000),
    text: '',
  });
};

const customForm = {
  namespaced: true,
  state: {
    pickedWidget: {},
    clickedWidgetItem: {},
    aimingTarget: { wdgId: -1, rowNo: 0, colNo: 0 },
    overTarget: {},
    containerData: [],
    layoutData: [],
    propertyData: {},
    valueData: {},
    businessData: [],
    formMode: "",
    isDesign: false,
    isInstance: false,
    isPreview: false,
    extInfo: {
      title: "无标题",
      description: "无描述",
      sid: "",
      customFormId: "",
      instanceId: ""
    },
    businessId: "",
    validation: true,
    stapleWidget: {},
    isSortedByDragging: false,
  },
  mutations: {
    DRAG_WIDGET_START(state, param) {
      pickUpWidget(state, param.event);
    },

    DRAG_ROW_START(state, param) {
      state.isSortedByDragging = true;
      eraseRowFromContainerData(state, param.event);
    },

    DROP_ROW_END(state, param) {
      state.isSortedByDragging = false;
      insertRowIntoContainerData(state, param.event);
    },

    DRAG_OVER(state, param) {
      gropeAimedCellFromContainer(state, param);
    },

    DROP_END(state, param) {
      if (!state.isSortedByDragging) {
        // 非排序方式
        if (state.pickedWidget.key == "ROW") {
          let type = state.pickedWidget.type;
          addWidgetLayoutToContainer(state, type);
        } else {
          addWidgetItemToContainer(state);
        }

        calcStapleWidget(state);
      } else {
        // 排序方式
        state.isSortedByDragging = false;
        insertRowIntoContainerData(state, param.event);
      }

      rerangeContainerData(state);
    },

    MOUSE_OVER(state, param) {
      let obj = domUtils.findNodeByEvent(param.event);
      let wdgId = obj.wdgId;
      let type = obj.type;

      Vue.set(state.overTarget, "wdgId", wdgId);
      Vue.set(state.overTarget, "type", type);
    },

    DELETE_WIDGET(state, param) {
      // TODO: 更新容器中的组件为空组件
      let coor = findWidgetCoorByWdgid(state, param.wdgId);
      let row = coor["row"];
      let col = coor["col"];
      if (row == -1 && col == -1) {
        // nothing to do :-)
      } else {
        // assign the widget value to the object: {wdgId: xxx},
        // that is default widget value for containerData
        // Vue.set(state.containerData[row].widget, col, { wdgId: param.wdgId });
        // re-assign the new widget id
        let wdgId = takeUuid('wdg');
        // let options = null;
        // 判断是否需要清除options
        // if (typeof(state.containerData[row].widget[col]['options']) != 'undefined') {
          // options = [];
          // state.pickedWidget = {};
          // debugger;
        // }
        Vue.set(state.containerData[row].widget, col, { wdgId});

        let rowNo = row;
        let colNo = col;
        let prop = {};
        let type = 'widget';
        clickedWidgetItemOnCell(state, { wdgId, type, prop, rowNo, colNo });
      }
    },

    SELECTED_WIDGET_ITEM(state, param) {
      let obj = domUtils.findNodeByEvent(param.event);
      let wdgId = obj.wdgId;
      let type = obj.type;

      /**
       * 点中组件，或者点中组件外侧的框，会找到组件在containerData中的
       * 位置
       */
      if (type == "widget" || type == "cell") {
        let cellInfo = domUtils.findColInfoByEvent(param.event);
        if (cellInfo) {
          let rowNo = cellInfo.rowNo;
          let colNo = cellInfo.colNo;
          let prop = gropeWidgetItemProperty(state, { rowNo, colNo });
          clickedWidgetItemOnCell(state, { wdgId, type, rowNo, colNo, prop });
        }
      }
    },

    // data是额外提供的valueData数据
    SAVE_VALUE_DATA(state, data = {}) {
      // 生成valueData
      state.valueData = setValueData(state, data);

      // 生成一份businessData
      state.businessData = setBusinessData(state);
    },

    SAVE_MODEL_DATA(state) {
      // 通过混合的模型数据
      // 提炼出布局
      state.layoutData = extractModelByType(state.containerData, "layoutData");

      // 提炼属性
      state.propertyData["wdgInfo"] = extractModelByType(
        state.containerData,
        "propertyData"
      );

      // 将表格属性，标题描述等信息放入属性, 其他sid等属性，不需要存入
      state.propertyData["extInfo"] = {};
      state.propertyData["extInfo"]["title"] = state.extInfo.title;
      state.propertyData["extInfo"]["description"] = state.extInfo.description;

      // 判断当前有嵌入页面iframe
      let embdInfo = getWdgEmbeddedInfo(state);
      let bizType = "",
        data = {};
      if (embdInfo.embeddedType == "iframe" && embdInfo.iframeLink.length > 0) {
        data = sysUtils.parseUrlParams(embdInfo.iframeLink);
        bizType = data["params"]["bizType"] || "";

      } else if (embdInfo.embeddedType == "component") {
        bizType = embdInfo.contractType;
      }

      // 保存为后端提交所用的参数, 包括contentType, callback
      setCallBackParam(state, bizType);
    },

    INIT_FORM_MODE(state, param) {
      let DESIGN = "design";
      let INSTANCE = "instance";
      let DRAFT = "draft";
      let RE_INSTANCE = "reInstance";
      let RE_PREVIEW = "rePreview";
      let DUPLICATION = "duplication";
      let PREVIEW = "preview";

      if (param.formMode) {
        state.formMode = param.formMode;
        state.isDesign = param.formMode == DESIGN;
        state.isInstance =
          param.formMode == INSTANCE ||
          param.formMode == RE_INSTANCE ||
          param.formMode == DUPLICATION ||
          param.formMode == DRAFT;
        state.isPreview =
          param.formMode == PREVIEW || param.formMode == RE_PREVIEW;
      }

      // clear all data
      cleanStateParams(state);
    },

    CLEAN_ALL_DATA(state) {
      // clear all data
      cleanStateParams(state);
    },

    UPDATE_WIDGET_PROPERTY(state, param) {
      // 更新属性值
      let type = param.item.type ==  'cell'? 'widget' : param.item.type;
      let rowNo = param.item.rowNo;
      let colNo = param.item.colNo;
      let key = param.key;
      let val = param.value;
      switch (typeof(val)) {
        case 'string':
          val = (val == 'true' || val == 'TRUE')? true : (val == 'false' || val == 'FALSE')? false : val;
          break;

        default:
          break;
      }
      
      Vue.set(state.containerData[rowNo][type][colNo], key, val)
      // state.containerData[rowNo][type][colNo][key] = val;
    },

    UPDATE_PROPERTY_DATA(state, param) {
      // 更新剥离出来的属性对象 propertyData
      Vue.set(state.propertyData["wdgInfo"][param.wdgId], param.key, param.value);
      Vue.set(state, 'businessData', setBusinessData(state));
      // state.propertyData["wdgInfo"][param.wdgId][param.key] = param.value;
      // state.businessData = setBusinessData(state);
    },

    UPDATE_PROPERTY_OPTION(state, param) {
      // 如果item.type为cell，说明点中了组件的外围框
      // 需要赋值为widget
      let item = param.item;
      let type = (item.type == 'cell')? 'widget' : item.type;
      let wdgProp = state.containerData[item.rowNo][type][item.colNo];

      updateObjArryByObj(wdgProp.options, param);
    },

    ERASE_PROPERTY_OPTION(state, param) {
      let item = param.item;
      // 如果item.type为cell，说明点中了组件的外围框
      // 需要赋值为widget
      if (item.type == 'cell') {
        item.type = 'widget';
      }
      let wdgProp = state.containerData[item.rowNo][item.type][item.colNo];
      let erased = eraseObjectFromArray(wdgProp.options, param);
      wdgProp['options'] = erased;
    },

    ADD_PROPERTY_OPTION(state, param) {
      let item = param.item;
      // 如果item.type为cell，说明点中了组件的外围框
      // 需要赋值为widget
      if (item.type == 'cell') {
        item.type = 'widget';
      }
      let wdgProp = state.containerData[item.rowNo][item.type][item.colNo];
      if (!wdgProp['options']) {
        wdgProp['options'] = [];
      }
      appendObjectIntoArray(wdgProp.options, param);
    },

    UPDATE_EXT_INFO(state, param) {
      switch (param.key) {
        case "title":
          state.extInfo.title = param.value;
          break;
        case "description":
          state.extInfo.description = param.value;
          break;
      }
    },

    SAVE_BUSINESS_ID(state, businessId) {
      state.businessId = businessId;
    },

    IMPORT_MODEL_DATA(state, param) {
      // 导入模型数据
      let result = param.res.data.result;
      if (result) {
        Vue.set(state, 'layoutData', JSON.parse(result.layoutData) || {});
        Vue.set(state, 'propertyData', JSON.parse(result.propertyData) || {});
        Vue.set(state.extInfo, 'customFormId', result.sid || "");
        mergeContainerData(state);
      }
    },

    IMPORT_ALL_DATA(state, param) {
      // 导入所有数据
      let result = param.res.data.result;
      Vue.set(state, 'layoutData', JSON.parse(result.layoutData) || {});
      Vue.set(state, 'propertyData', JSON.parse(result.propertyData) || {});
      Vue.set(state, 'valueData', JSON.parse(result.valueData) || {});
      Vue.set(state, 'valueData', JSON.parse(result.valueData) || {});
      Vue.set(state.extInfo, 'instanceId', result.sid);
      Vue.set(state.extInfo, 'customFormId', result.customFormId);
      mergeContainerData(state);
    }
  },
  actions: {
    getModelData({ commit, state }, flowTemplateCode) {
      // 清除旧数据
      // cleanStateParams(state);

      // 保存进state
      state.flowTemplateCode = flowTemplateCode;

      //  获得模型数据
      return new Promise((resolve, reject) => {
        let url = `${getHost()}/flow/customForm/getCustomForm?flowTemplateCode=${flowTemplateCode}`;
        axios.get(url, getHeader()).then(function(res) {
          if (res.data.status == 200 && res.data.result) {
            resolve(res);

          } else if (res.data.status == 1000) {
            resolve(res);

          } else {
            // resolve(res);
          }
        });
      });
    },

    saveModelData({ commit, state }, flowTemplateCode, wdgkey) {
      // 保存模型数据
      commit("SAVE_MODEL_DATA");
      let url = `${getHost()}/flow/customForm/saveCustomForm`;
      let layoutData = JSON.stringify(state.layoutData);

      let objFlowVar = getFlowVarInfo(state);
      state.propertyData.extInfo["flowVar"] = objFlowVar.flowVar;
      state.propertyData.extInfo["keyParam"] = objFlowVar.bizType;

      let propertyData = JSON.stringify(state.propertyData);

      let data = {
        sid: state.extInfo.customFormId || "",
        flowTemplateCode: flowTemplateCode,
        layoutData,
        propertyData
      };

      if (state.validation) {
        return new Promise((resolve, reject) => {
          axios.post(url, data, getHeader()).then(function(res) {
            if (res.data.status == 200) {
              state.extInfo.customFormId = res.data.result;
            }
            resolve(res);
          });
        });
      }
    },

    getValueDataWithModel({ commit, state }, param) {
      // 获得模型的全量数据
      let id = param.businessId, customFormId = param.customFormId;
      return new Promise((resolve, reject) => {
        // let url = `${getHost()}/flow/customFormInstance/${id}`;
        let url = `${getHost()}/flow/customFormInstance/getCustomFormInstance?businessId=${id}&customFormId=${customFormId}`;
        axios.get(url, getHeader()).then(function(res) {
          if (res.data.status == 200 && res.data.result) {
            let result = res.data.result;
            if (result.layoutData && result.propertyData) {
              resolve(res);
            } else {
              resolve(res);
            }
          }
        });
      });
    },
    saveValueData({ commit, state }, param) {
      commit("SAVE_VALUE_DATA");
    },
    getUniqueId({ commit, state }) {
      return new Promise((resolve, reject) => {
        let url = `${getHost()}/flow/customFormInstance/generateId?_=${Math.random()}`;
        axios.get(url, getHeader()).then(function(res) {
          if (res.data.status == 200 && res.data.result) {
            state.businessId = res.data.result;
          }
        });
      });
    },
    deleteFlowVarByWdgId({commit, state}, param) {
      let url = `${getHost()}/flow/customForm/getExpression`;
      let templateCode = state.flowTemplateCode, code = param.wdgId;
      let data = {
        templateCode: templateCode,
        code: code
      };

      return new Promise((resolve, reject) => {
        axios.post(url, data, getHeader()).then(function(res) {
          // if (res.data.status == 200) {
          //   state.extInfo.customFormId = res.data.result;
          // }
          resolve(res);
        });
      });

    },
  }
};

export default customForm;

/**
 * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * DRAG_WIDGET_START: 拖拽开始，拿起来的元素，可能是布局，也可能是组件
   DRAG_ROW_START: 拖拽开始，拿起来的元素，只能是行
   DRAG_OVER: 悬浮在制作表单的区域，随着移动，根据不同的元素执行不同的交互动作
   DROP_END: 拖拽结束，放置布局或者放置元素
   DRAG_ROW_START: 拖拽开始，排序布局或者放置元素
   DROP_ROW_END: 拖拽结束，排序布局或者放置元素
   MOUSE_OVER: 鼠标在制作区上空盘旋移动
   SELECTED_WIDGET_ITEM: 选中组件区域
   SAVE_VALUE_DATA: 保存表单的值对象
   SAVE_MODEL_DATA: 保存表单的模型，包括布局对象和属性对象
   INIT_FORM_MODE: 初始化表单模式，设计模式，实例模式，预览模式
   UPDATE_WIDGET_PROPERTY: 更新属性
   UPDATE_EXT_INFO: 更新表单名称和详细说明
 *
 * * * * * * * * * * * * * * * * * * * * * * * * *
 * 
 *  flowTemplateCode: 模型code
    pickedWidget: 拖拽开始，点中并拖起来的元素
    clickedWidgetItem: 点击编辑表单的区域，获得点击的组件元素
    aimingTarget: 拖着拽起的元素，瞄准编辑表单的区域，获得鼠标指着下的目标
    overTarget: 鼠标悬浮通过编辑表单的区域，瞄准编辑表单的区域，获得鼠标指着下的目标
    containerData: [], 编辑表单区域的json数据, 混合数据, 用于渲染
    layoutData: {}, 布局的json数据, 用于保存
    propertyData: {}, 属性的json数据, 包括wdgInfo:{}, extInfo:{}两个部分, 用于保存
    valueData: 值们的json数据, 用于保存
    businessData: 值们的数组版本数据, 用于保存, 特别给流程使用
    formMode: 表单的显示模式，分为'design', 'instance', 'preview'
    isDesign: 是否为设计页面
    isInstance: 是否为填写表单的实例页面
    isPreview: 是否为预览页面
    extInfo: 表单其他参数，例如标题和相关描述, "sid": 表单的唯一id，数据库中对应唯一一个数据
             其中的title，description需要保存，其他扔掉(不理会)
    businessId: 由系统分配
    validation: true/false, 是否校验通过
    stapleWidget: 常用的组件, {}
    isSortedByDragging: 拖拽排序开关，初始为false，开始拖拽为true，结束后重置为false
    movedRowFromContainerData: 拖拽时，拽起来的行数据
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
