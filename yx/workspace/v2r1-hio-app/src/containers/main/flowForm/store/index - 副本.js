import Vue from 'vue';
import axios from 'axios';
import Vuex, { Store } from 'vuex';
import widgetItemConfig from '../config/widgetItem.define';
import domUtils from '../utils/dom';

Vue.use(Vuex);
Vue.use(axios);


const getHost = () => {
  // return JZY.DEBUG_MODE? 'http://127.0.0.1:9696' : '/platform-app';
  return JZY.DEBUG_MODE? 'http://127.0.0.1:9999/platform-app' : '/platform-app';
};

const getHeader = () => {
          // 'Authorization': ' bearer 0e454d4f-f6b4-419d-a199-df5a0bd3b207'
  if (JZY.DEBUG_MODE) {
    return {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'd4760f9a-8366-4524-b20c-b59494252919'
          // 'Authorization': 'd4760f9a-8366-4524-b20c-b59494252919'
        }
      }
  }
  return {};
}

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

  let key = domStartEle.getAttribute('wdgkey') || '';
  state.pickedWidget['key'] = key;

  switch(key) {
  case 'ROW': {
    // 拖拽行或表格布局, 只记录行布局数据的布局类型即可
    let type = domStartEle.getAttribute('wdgtype') || '12';
    state.pickedWidget['type'] = type;
    break;
  }

  default:
    // 是基本组件, 将组件的配置合并至新的对象，并赋值给pickedWidget
    state.pickedWidget = Object.assign({}, state.pickedWidget, widgetItemConfig[key]);
    break;
  }
};


/**
 * 拖拽时，获取鼠标下的布局操作区域中的行数
 * 并存至state.aimingTarget
 * @param {*} state
 * @param {*} param
 * @returns 该行在container中的索引
 */
const gropeAimedCellFromContainer = (state, param) => {
  let domBelow = param.event.srcElement;
  // 获得列格子, 不能通过className方式获取
  let type = domBelow.getAttribute('type');
  let aim = state.aimingTarget;
  if (null == type) {
    Vue.set(state.aimingTarget, 'rowNo', state.containerData.length);
    Vue.set(state.aimingTarget, 'colNo', 0);
    Vue.set(state.aimingTarget, 'wdgId', -1);

  } else if (type == 'cell') {
    // 获得行号, rowNo
    let obj = domUtils.findColInfoByEvent(event);
    aim['rowNo'] = aim['rowNo'] != obj.rowNo? obj.rowNo : aim['rowNo'];
    aim['colNo'] = aim['colNo'] != obj.colNo? obj.colNo : aim['colNo'];
    aim['wdgId'] = aim['wdgId'] != obj.wdgId? obj.wdgId : aim['wdgId'];
  }
  // console.info('aim: ', aim.wdgId, aim.rowNo, aim.colNo, type);
};

/**
 * 增加行布局到制作区域中
 * 增加行布局后，生成一个空的组件对象
 * @param {*} type
 */
const addRowLayoutToContainer = (state, type) => {
  let len = state.containerData.length;
  let rowNo = state.aimingTarget['rowNo'] * 1 + 1;

  let newObj = {
    row: takeLayoutArray(type),
    widget: takeWidgetArray(type),
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
const takeLayoutArray = (rowType) => {
  if (rowType) {
    if (rowType.indexOf('*') > -1) {
      // 表格

    } else {
      // 行布局
      let rowArray = [];
      rowType.split(',').map((v, k)=>{
        let width = Math.ceil(100 / rowType.split(',').length);
        rowArray.push({
          wdgId: takeUuid('box'),
          style: `width: ${width}%`,
        });
      });
      return rowArray;
    }
  }
};

/**
 * 生成每行里面的组件初始格式
 */
const takeWidgetArray = (rowType) => {
  if (rowType) {
    if (rowType.indexOf('*') > -1) {
      // 表格

    } else {
      // 行布局
      let rowArray = [];
      rowType.split(',').map((v, k)=>{
        rowArray.push({
          wdgId: takeUuid('wdg')
        });
      });
      return rowArray;
    }
  }
};

/**
 * 生成唯一序号, 随机数
 */
const takeUuid = (prefix='') => {
  return `${prefix}_${Math.ceil(Math.random() * 1000000)}`;
};

/**
 * 将布局元素中的表格布局，放入编辑区域
 * @param {*} type
 */
const addTableLayoutToContainer = (state, type) => {
};

/**
 * 增加布局元素
 */
const addWidgetLayoutToContainer = (state, type) => {
  if (type) {
    if (type.indexOf('*') > -1) {
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
const addWidgetItemToContainer = (state) => {
  let rowNo = state.aimingTarget['rowNo'];
  let colNo = state.aimingTarget['colNo'];
  let wdgId = state.aimingTarget['wdgId'];
  let currRowCounts = state.containerData.length;

  if (currRowCounts == 0) {
    // 没有找到对应的行，于是追加
    addRowLayoutToContainer(state, '12');
    let aimedCell = state.containerData[0].widget[0];
    Vue.set(state.containerData[0]['widget'], 0, Object.assign({}, aimedCell, state.pickedWidget));

  } else if ( wdgId == -1 ) {
    // 没有指定任何布局wdgId，所以直接增加一行
    addRowLayoutToContainer(state, '12');
    let rCount = state.containerData.length;
    let aimedCell = state.containerData[rCount - 1].widget[0];
    Vue.set(state.containerData[rCount - 1].widget, 0, Object.assign({}, aimedCell, state.pickedWidget));

  } else {
    // 找到了对应的行，于是
    let aimedCell = state.containerData[rowNo].widget[colNo];
    Vue.set(state.containerData[rowNo].widget, colNo, Object.assign({}, aimedCell, state.pickedWidget));
  }
};

// 从混合数据中，查找对应属性
const gropeWidgetItemProperty = (state, param) => {
  if (param) {
    try {
      if (state.containerData[param.rowNo]['widget']) {
        return state.containerData[param.rowNo]['widget'][param.colNo];
      }
    } catch (e) {console.error(e);}
  }
};

// 从本地取数据
// const getContainerDataFromLocalStorge = (state) => {
//   // TODO: 是否需要修改为其他方式的本地保存
//   if (localStorage) {
//     state.containerData = JSON.parse(localStorage.containerData);
//   }
// };

// state.propertyData 为保存用的属性，里面包括wdgInfo和extInfo两部分
// 使用时，
// 需要将其中的wdgInfo部分合并至state.containerData中
// 将其中的extInfo信息保存至state.extInfo中
const mergeContainerData = (state) => {
  let containerData = [];
  let layoutData = state.layoutData;
  let valueData = state.valueData;
  // // fake data
  // valueData = {
  //   46623280: {
  //     value: 'fake data 123'
  //   }
  // };

  // 从propertyData抽出wdgInfo
  let wdgPropertyData = state.propertyData['wdgInfo'];

  // 从state.propertyData抽出extInfo，并放入state.extInfo
  state.extInfo.title = state.propertyData['extInfo']['title'];
  state.extInfo.description = state.propertyData['extInfo']['description'];

  // 将值们和属性进行混合
  for(let k in valueData) {
    wdgPropertyData[k] = Object.assign({}, wdgPropertyData[k], valueData[k]) 
  } 

  // 处理布局数据，做成容器数据
  // 根据组件ID，合并赋值相应属性
  layoutData.map((v, k) => {
    containerData.push(v);
    v.widget.map((w, j) => {
      containerData[k]['widget'][j] = wdgPropertyData[w.wdgId];
    });
  });

  state.containerData = containerData;
};

/**
 * 抽取模型
 * @param {*} containerData
 * @param {*} extractType
 */
const extractModel = (containerData, extractType) => {
  switch(extractType) {
  case 'propertyData':
    let propertyData = {};
    containerData.map((v, k) => {
      let rowDatum = {};
      v.widget.map((w, n) => {
        propertyData[w.wdgId]  = w;
      });
    });
    return propertyData;
    break;

  case 'layoutData':
    let layoutData = [];
    containerData.map((v, k) => {
      let rowDatum = {};
      rowDatum['row'] = v.row;
      rowDatum['widget'] = [];
      v.widget.map((w, n) => {
        rowDatum['widget'].push({wdgId: w.wdgId});
      });
      layoutData.push(rowDatum);
    });
    return layoutData;
    break;

  default:
  }
};

// 生成后端需要的businessData，与valueData同时生成
const setBusinessData = (state) => {
  const wdgProps = state.propertyData['wdgInfo'];
  let bizData = [];
  for (let k in wdgProps) {
    let biz = {
      code: `${wdgProps[k].key}_${wdgProps[k].wdgId}`,
      value: wdgProps[k].value,
      valueType: wdgProps[k].valueType,
    }
    bizData.push(biz);
  } 
  return bizData || [];
}

// 针对后台
const setCallBackParam = (state, bizKey='') => {
  // 指定常量,
  const callbackByBizKey = {
    'kq': {
      dataSaveUrl: `${getHost()}/sys/sysApply/startFlowTask`,
      dataDeleteUrl: `${getHost()}/sys/sysApply/startFlowTask`,
      dataStatusUrl: `${getHost()}/sys/sysApplyqueryStatusCallBack`,
    }
  };
  const CBParams = {
    'iframe': {
      keyStr: '/hr/',
      extInfo: {
        contentType: 'iframe',
        keyParam: bizKey
      },
      callback: callbackByBizKey[bizKey]
    },
    'standard': {
      extInfo: {
        contentType: 'standard',
      },
    }
  };

  // TODO: 不要写S组件名
  // 判断当前属性propertyData.wdgInfo中是否有iframe
  // 并获得link
  let iframeLink = getWdgIframeLinkIfExistOne(state);;

  // const wdgProps = state.propertyData.wdgInfo;
  // let iframeLink = '';
  // for (let k in wdgProps) {
  //   if ( wdgProps[k].key == 'StdIframe' && wdgProps[k].link != '') {
  //     iframeLink = wdgProps[k].link;
  //     break;
  //   }
  // }

  // 判断该iframe中的link，是否为专门制定的url
  if ( iframeLink.indexOf(CBParams['iframe'].keyStr) > -1) {
    state.propertyData['extInfo'] = Object.assign(state.propertyData.extInfo, CBParams['iframe'].extInfo);
    state.propertyData['callback'] = Object.assign({}, CBParams['iframe'].callback);
  } else {
    state.propertyData['extInfo'] = Object.assign(state.propertyData.extInfo, CBParams['standard'].extInfo);
  }
  // // 加入相应的参数
  // return false;
}

const getWdgIframeLinkIfExistOne = (state) => {
  const wdgProps = state.propertyData.wdgInfo;
  let iframeLink = '';
  for (let k in wdgProps) {
    if ( wdgProps[k].key == 'StdIframe' && wdgProps[k].link != '') {
      iframeLink = wdgProps[k].link;
      break;
    }
  }
  return iframeLink || '';
}

// const activeSaveBtnOnIframe = (ifmWnd) => {
//   if (ifmWnd && ifmWnd.querySelector('#saveBtn')) {
//     // ifmDoc.querySelector('#saveBtn').click();
//     ifmWnd.submitAddForm();
//   }
// }

const customForm = {
  namespaced: true,
  state: {
    pickedWidget: {},
    clickedWidgetItem: {},
    aimingTarget: {wdgId: -1, rowNo: 0, colNo: 0},
    overTarget: {},
    containerData: [],
    layoutData: [],
    propertyData: {},
    valueData: {},
    businessData: [],
    formMode: '',
    isDesign: false,
    isInstance: false,
    isPreview: false,
    extInfo: {title: '无标题', description: '无描述', sid: '', customFormId: ''},
  },
  mutations: {
    DRAG_START (state, param) {
      pickUpWidget(state, param.event);
    },

    DRAG_OVER (state, param) {
      gropeAimedCellFromContainer(state, param);
    },

    DROP_END (state, param) {
      if (state.pickedWidget.key == 'ROW') {
        let type = state.pickedWidget.type;
        addWidgetLayoutToContainer(state, type);

      } else {
        addWidgetItemToContainer(state);
      }
    },

    MOUSE_OVER (state, param) {
      let obj = domUtils.findNodeByEvent(param.event);
      let wdgId = obj.wdgId;
      let type = obj.type;

      Vue.set(state.overTarget, 'wdgId', wdgId);
      Vue.set(state.overTarget, 'type', type);
    },

    SELECTED_WIDGET_ITEM (state, param) {
      let obj = domUtils.findNodeByEvent(param.event);
      let wdgId = obj.wdgId;
      let type = obj.type;

      if (type == 'widget') {
        let cellInfo = domUtils.findColInfoByEvent(param.event);
        if (cellInfo) {
          let rowNo = cellInfo.rowNo;
          let colNo = cellInfo.colNo;
          let prop = gropeWidgetItemProperty(state, {rowNo, colNo});

          Vue.set(state.clickedWidgetItem, 'wdgId', wdgId);
          Vue.set(state.clickedWidgetItem, 'type', type);
          Vue.set(state.clickedWidgetItem, 'rowNo', rowNo);
          Vue.set(state.clickedWidgetItem, 'colNo', colNo);
          Vue.set(state.clickedWidgetItem, 'property', prop);
        }
      }
    },

    SAVE_VALUE_DATA (state) {
      let valueData = {};
      let wdgPropertyData = state.propertyData['wdgInfo'];
      for (let k in wdgPropertyData) {
        let wdg = wdgPropertyData[k];
        valueData[k] = {
          value: wdg.value
        }
      }

      if (state.propertyData['extInfo']['contentType'] == 'iframe') {
        let ifmWnd = document.querySelector('iframe').contentWindow;
        // 获取嵌入表单内的固定方法，获取valueData
        valueData = ifmWnd.ehrApplyData();
        // 执行表单内的固定保存
        ifmWnd.submitAddForm();
        // activeSaveBtnOnIframe(ifmWnd);
      }

      // let ifmDoc = document.querySelector('iframe').contentDocument;

      state.valueData = valueData;
      state.businessData = setBusinessData(state);
      console.info('valueData: ', state.valueData, state.businessData);
    },

    SAVE_MODEL_DATA (state) {
      // 通过混合的模型数据
      // 提炼出布局
      state.layoutData = extractModel(state.containerData, 'layoutData');
      // 提炼属性
      state.propertyData['wdgInfo'] = extractModel(state.containerData, 'propertyData');
      // 将表格属性，标题描述等信息放入属性, 其他sid等属性，不需要存入
      state.propertyData['extInfo'] = {};
      state.propertyData['extInfo']['title'] = state.extInfo.title;
      state.propertyData['extInfo']['description'] = state.extInfo.description;

      // 布局中有iframe, 则需要修改['extInfo']['contentType'] = 'iframe'
      let iframeLink = getWdgIframeLinkIfExistOne(state) || '';
      if (iframeLink.length > 0) {
        state.propertyData['extInfo']['contentType'] = 'iframe';
      }

      setCallBackParam(state, 'kq');

      // TODO: 保存至本地
      // if (localStorage) {
      //   localStorage['containerData'] = JSON.stringify(state.containerData);
      //   localStorage['propertyData'] = JSON.stringify(state.propertyData);
      //   localStorage['layoutData'] = JSON.stringify(state.layoutData);
      // }
    },

    INIT_FORM_MODE (state, param) {
      let DESIGN = 'design';
      let INSTANCE = 'instance';
      let PREVIEW = 'preview';

      if (param.formMode) {
        state.formMode = param.formMode;
        state.isDesign = param.formMode == DESIGN;
        state.isInstance = param.formMode == INSTANCE;
        state.isPreview = param.formMode == PREVIEW;
      }
    },

    UPDATE_PROPERTY (state, param) {
      state.containerData[param.item.rowNo][param.item.type][param.item.colNo][param.key] = param.value;
    },

    UPDATE_PROPERTY_DATA (state, param) {
      state.propertyData['wdgInfo'][param.wdgId][param.key] = param.value;
    },
    
    UPDATE_EXT_INFO (state, param) {
      switch(param.key) {
      case 'title':
        state.extInfo.title = param.value;
      break;
      case 'description':
        state.extInfo.description = param.value;
      break;
      }
    },

  },
  actions: {
    getModelData({commit, state}, flowTemplateCode) {
      return new Promise((resolve, reject) => {
        let url = `${getHost()}/flow/customForm/getCustomForm?flowTemplateCode=${flowTemplateCode}`;
        axios.get(
          url,
          getHeader()
        ).then(function(res){
          if (res.data.status == 200 && res.data.result) {
            state.layoutData = JSON.parse(res.data.result.layoutData) || {};
            state.propertyData = JSON.parse(res.data.result.propertyData) || {};
            state.extInfo.sid = res.data.result.sid || '';
            mergeContainerData(state);
          } else if (res.data.status == 1000) {
            state.layoutData = {};
            state.propertyData = {};
            state.extInfo.sid = '';
          } else {
            resolve(res);
          }
        });
      });

    },
    saveModelData({ commit, state }, flowTemplateCode) {
      commit('SAVE_MODEL_DATA');
      let url = `${getHost()}/flow/customForm/saveCustomForm`;
      let layoutData = JSON.stringify(state.layoutData);
      let propertyData = JSON.stringify(state.propertyData);
      let data = {
        sid: state.extInfo.sid || '',
        flowTemplateCode: `${flowTemplateCode}`,
        layoutData,
        propertyData
      };
      return new Promise((resolve, reject) => {
        axios.post(
          url,
          data,
          getHeader()
        ).then(function(res){
          if (res.data.status == 200) {
            state.extInfo.sid = res.data.result;
          }
          resolve(res);
        });
      });
    },
    getValueDataWithModel({commit, state}, id) {
      return new Promise((resolve, reject) => {
        let url = `${getHost()}/flow/customFormInstance/${id}`;
        axios.get(
          url,
          getHeader()
        ).then(function(res){
          console.info(res)
          if (res.data.status == 200 && res.data.result) {
            let result = res.data.result;
            if (result.layoutData && result.propertyData) {
              state.layoutData = JSON.parse(result.layoutData) || {};
              state.propertyData = JSON.parse(result.propertyData) || {};
              state.valueData = JSON.parse(result.valueData) || {};
              state.extInfo.sid = result.sid;
              state.extInfo.customFormId = result.customFormId;
              mergeContainerData(state);
            } else {
              resolve(res);
            }
          }
        });
      });
    },
    saveValueData({ commit, state }, param) {
      commit('SAVE_VALUE_DATA');
      console.log(state.valueData)
      // let url = `${getHost()}/flow/customFormInstance/save`;
      // let valueData = JSON.stringify(state.valueData);
      // let businessId = param.businessId;
      // let instanceId = param.instanceId;

      // let data = {
      //   businessId,
      //   instanceId,
      //   valueData
      // };

      // return new Promise((resolve, reject) => {
      //   axios.post(
      //     url,
      //     data,
      //     getHeader(),
      //   ).then(function(res){
      //     resolve(res);
      //   });
      // });
    },
  }
};

export default customForm;

/**
 * * * * * * * * * * * * * * * * * * * * * * * * *
 * 
 * DRAG_START: 拖拽开始，拿起来的元素，可能是布局，也可能是组件
   DRAG_OVER: 悬浮在制作表单的区域，随着移动，根据不同的元素执行不同的交互动作
   DROP_END: 拖拽结束，放置布局或者放置元素
   MOUSE_OVER: 鼠标在制作区上空盘旋移动
   SELECTED_WIDGET_ITEM: 选中组件区域
   SAVE_VALUE_DATA: 保存表单的值对象
   SAVE_MODEL_DATA: 保存表单的模型，包括布局对象和属性对象
   INIT_FORM_MODE: 初始化表单模式，设计模式，实例模式，预览模式
   UPDATE_PROPERTY: 更新属性 
   UPDATE_EXT_INFO: 更新表单名称和详细说明
 *
 * * * * * * * * * * * * * * * * * * * * * * * * *
    pickedWidget: 拖拽开始，点中并拖起来的元素
    clickedWidgetItem: 点击编辑表单的区域，获得点击的组件元素
    aimingTarget: 拖着拽起的元素，瞄准编辑表单的区域，获得鼠标指着下的目标
    overTarget: 鼠标悬浮通过编辑表单的区域，瞄准编辑表单的区域，获得鼠标指着下的目标
    containerData: {}, 编辑表单区域的json数据, 混合数据, 用于渲染
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
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */