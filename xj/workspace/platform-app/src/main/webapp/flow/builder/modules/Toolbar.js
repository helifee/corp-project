console.info('>> module "toolbar" is loaded');
/**
 * 显示工具栏
 */
define(['utils', 'actions'], function (utils, actions) {
  var ICON_PATH = 'images/editor/toolbar/';

  var renderToolbar = function (graphStage, container) {
    var tbContainer = document.createElement('div');
    tbContainer.className = 'toolbar';
    container.appendChild(tbContainer);
    gs = graphStage.gridSize;

    var btns = [{
        name: 'baseInfo',
        tip: '基本信息'
      },
      {
        name: 'emulation',
        tip: '流程仿真'
      },
      /*{
        name: 'properties',
        tip: '属性'
      },*/
      {
        name: 'duplication',
        tip: '引入其他流程'
      },
      /*{
        name: 'save',
        tip: '保存'
      },
      {
        name: 'saveas',
        tip: '另存为'
      },
      {
        name: 'print',
        tip: '打印'
      },
      {
        name: 'preview',
        tip: '预览'
      },
      {
        name: 'refresh',
        tip: '待开发...'
      },*/
      {
        name: 'cut',
        tip: '剪切'
      },
      {
        name: 'copy',
        tip: '复制'
      },
      {
        name: 'paste',
        tip: '粘贴'
      },
      {
        name: 'delete',
        tip: '删除'
      },
      /*{
        name: 'group',
        tip: '分组'
      },
      {
        name: 'alignleft',
        tip: '靠左'
      },
      {
        name: 'aligncenter',
        tip: '居中'
      },
      {
        name: 'alignright',
        tip: '靠右'
      },
      {
        name: 'alignmiddle',
        tip: '中间'
      },
      {
        name: 'alignbottom',
        tip: '靠下'
      },
      {
        name: 'aligntop',
        tip: '靠上'
      },*/
      {
        name: 'undo',
        tip: '撤回'
      },
      {
        name: 'redo',
        tip: '恢复'
      },
      {
        name: 'zoomin',
        tip: '放大'
      },
      {
        name: 'zoomout',
        tip: '缩小'
      },
      {
        name: 'zoomactual',
        tip: '还原'
      }
    ];

    _.map(btns, function (v, k) {
      tbContainer.appendChild(setAction(graphStage, v.name, v.tip));
    });

    var toolbar = new mxToolbar(tbContainer);
    toolbar.enabled = false;
    toolbar.addLine();

    actions.init(graphStage);
  };

  // 统一处理按钮的动作和样式
  var setAction = function (graphStage, oprType, descTip) {
    var btn = getAction(graphStage, oprType);
    btn.className = 'btn-toolbar';
    btn.title = descTip;

    setStyle(btn, getIconStyle('btnToolbar', oprType));
    setStyle(btn, getIconStyle('btnToolbar', oprType));
    return btn;
  };

  // 定义每个按钮的动作
  var getAction = function (graphStage, oprType) {
    var btn = mxUtils.button('', function (evt) {
      actions.getAction(graphStage, oprType);
    });
    return btn;
  };

  // 设置按钮的css
  var setStyle = function (ele, styleObj) {
    _.forEach(styleObj, function (v, k) {
      ele.style[k] = v;
    });
  };

  // 统一设置按钮的css内容
  var getIconStyle = function (styleType, iconType) {
    if (styleType == 'btnToolbar') {
      var icon = utils.getBaseImgByBtnType(iconType);
      if (icon == '') {
        icon = [ICON_PATH, iconType, '.png'].join('');
      }
      return {
        background: 'url(' + icon + ') no-repeat'
      }
    }
  };

  return {
    renderToolbar: renderToolbar
  };
});