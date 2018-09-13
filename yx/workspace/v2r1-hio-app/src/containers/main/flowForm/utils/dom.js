/**
 * 规范用户点击后捕捉到的组件
 * 只获取row，cell，widget类型的节点
 * 获得规范后的类型和组件id: wdgId, type
 * @param {*} event
 */
const findNodeByEvent = event => {
  // 点击表单编辑器中的，行/列/组件/组件中的dom子元素
  let wdgId = event.srcElement.getAttribute("wdgId");
  let type = event.srcElement.getAttribute("type");

  if (["row", "cell", "widget"].indexOf(type) == -1) {
    // 获取对应元素，并上溯查找父节点，直到节点为widget
    let curNode = event.srcElement;
    while (curNode && curNode.getAttribute("type") != "widget") {
      curNode = curNode.parentElement;
    }
    if (curNode) {
      wdgId = curNode.getAttribute("wdgId");
      type = curNode.getAttribute("type");
    }
  }

  // 不是指定的type，即不是row/widget/widget
  // 直接返回
  return {
    wdgId,
    type
  };
};

/**
 * 获得点击后的组件所在的列信息
 * @param {*} event
 */
const findColInfoByEvent = event => {
  let domBelow = event.srcElement;
  // 获得列格子, 不能通过className方式获取
  let type = domBelow.getAttribute("type");
  // 没有点到指定的元素上，所以通过方法上溯到指定的widget，cell， row元素上
  if (null == type) {
    let specWdg = findNodeByEvent(event);
    type = specWdg.type;
    domBelow = document.querySelector(`[wdgId="${specWdg.wdgId}"]`);
  }

  let wdgId, rowNo, colNo;
  if (type == "cell") {
    // 获得行号, rowNo
    let domRow = domBelow.parentElement;
    rowNo = [].indexOf.call(
      document.querySelectorAll("div.form-container > div.row"),
      domRow
    );

    // 获得列号，colNo
    colNo = [].indexOf.call(
      domRow.querySelectorAll(`div[type=${type}]`),
      domBelow
    );

    // 获得列的wdgId
    wdgId = domBelow.getAttribute("wdgId");
    return { wdgId, rowNo, colNo };

  } else if (type == "widget") {
    // 如果event是
    let domRow = domBelow.parentElement.parentElement;
    let domCell = domBelow.parentElement;
    rowNo = [].indexOf.call(
      document.querySelectorAll("div.form-container > div.row"),
      domRow
    );

    // 获得列号，colNo
    colNo = [].indexOf.call(
      domRow.querySelectorAll('div[type="cell"]'),
      domCell
    );

    // 获得列的wdgId
    wdgId = domCell.getAttribute("wdgId");
    return { wdgId, rowNo, colNo };
  } else if (type == null) {
    // let testEle = findNodeByEvent(event);
    let rowNo = document.querySelectorAll('[type="row"]').length;
    return { wdgId: -1, rowNo, colNo: 0};
  }
};

/**
 * 通过wdgId切换指定的className
 * @param {*} wdgId
 * @param {*} className
 * @param {*} clearAll
 */
const toggleClassNameByWdgid = (wdgId, className, clearAll = false) => {
  if (wdgId) {
    let domEle = document.querySelector(`[wdgId="${wdgId}"]`);
    if (domEle) {
      let type = domEle.getAttribute("type");
      if (className) {
        if (clearAll) {
          clearAllElesByClassName(className);
        }
        domEle.classList.toggle(className);
      }
    }
  }
};

/**
 * 清理页面上所有的className引用
 * @param {*} className
 */
const clearAllElesByClassName = className => {
  if (className) {
    let allRows = document.getElementsByClassName(className);
    for (let i = 0; i < allRows.length; i++) {
      allRows[i].classList.remove(className);
    }
  }
};

/**
 * resize iframe width & padding as its htmlcontent is loaded
 */
const resizeEmbeddedView = param => {
  if (param && param.event && param.property) {
    let event = param.event,
      property = param.property;

    // 自适应宽度,高度
    if (property.key == "StdIframe") {
      try {
        if (document.getElementsByTagName("iframe").length > 0) {
          let domIfm = document.getElementsByTagName("iframe")[0];
          let docIfm = window.frames[0].document.documentElement;

          if (domIfm && docIfm) {
            let appendOffset = 50;
            domIfm.style.height = docIfm.scrollHeight + appendOffset + "px";
            let mainDiv = docIfm.querySelector("div");
            mainDiv.style.width = domIfm.scrollWidth + "px";
            mainDiv.style.padding = "0";
            mainDiv.style.margin = "0";
          }
        }
      } catch (e) {
      }
    } else if (property.key == "StdContract") {
      // 自适应组件类的嵌入视图
      let domWdg = document.querySelector(`#${property.wdgId}`);
      domWdg.style["height"] = domWdg.scrollHeight;
      domWdg.style["overflow-y"] = "initial";
    }
  }
};

export default {
  findNodeByEvent,
  findColInfoByEvent,
  toggleClassNameByWdgid,
  resizeEmbeddedView
};
