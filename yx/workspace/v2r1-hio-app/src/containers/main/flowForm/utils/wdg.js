import moment from 'moment';
import sys from './sys';

/**
 * 组件的标题属性
 * @param {*} property
 * @param {*} tagType
 */
const labelDisplay = (property, tagType='wrapper') => {
  let labelDisplay = property.labelDisplay;
  let style = {};

  // 如果是移动端，只返回100%的宽度
  let deviceType = sys.getDeviceType();
  if (deviceType == 'mobile') {
    return {'width': '100%'};
  }

  // 如果是pc端则根据相关属性，进行判断
  switch (tagType) {
  case 'wrapper':
    style['display'] =  'flex';
    labelDisplay == 'inline'? style['flex-direction'] = 'row' : null;
    labelDisplay == 'block'? style['flex-direction'] = 'column' : null;
    let dimStyle = dimension(property);
    return  Object.assign({}, style, dimStyle);

  case 'label':
    labelDisplay == 'inline'? style['text-align'] = 'right' : null;
    labelDisplay == 'block'? style['text-align'] = 'left' : null;
    return style;
  }
};

const isHiddenLabel = (property) => {
  let isHiddenLabel = property.isHiddenLabel || false;
  let style = {};
  style['display'] = isHiddenLabel ? 'none' : 'unset';
  return style;
};

const dimension = (property) => {
  let style = {};
  let dim = property.dimension;
  style['width'] = dim == 'sm'? '50%' : dim == 'md'? '70%' : dim == 'lg'? '100%' : '70%';
  return style;
};

const isRequired = (property) => {
  let style = {};
  if (property.isRequired) {
    style['display'] = 'unset';
  } else {
    style['display'] = 'none';
  }
  return style;
};

const isFlowVar = (property) => {
  let style = {};
  if (property.isFlowVar) {
    style['background-color'] = '#ff1212';
    style['color'] = 'yellow';
  } else {
    style['text-decoration'] = 'none';
    style['background-color'] = 'transparent';
    style['color'] = 'red';
  }
  return style;
};

const getValueData = (wdgType, valueData) => {
  if (wdgType == 'component') {
    let valData = {};
    // 模型中有第三方组件的情况
    for (let k in valueData) {
      valData[k] = {
        value: valueData[k].value,
        valueType: valueData[k].valueType,
        isFlowVar: valueData[k].isFlowVar,
      }
      // 转换日期
      if (k == 'endDate' || k == 'startDate' || k == 'signingDate') {
        valData[k]['value'] = moment(valData[k]['value']).format('YYYY-MM-DD');
        valData[k]['valueType'] = 'date';
      }
    }
    return valData;
  }
  return valueData;
}

const getBusinessData = (wdgType, propertyData, valueData) => {
  let wdgProps = propertyData;
  let wdgValues = valueData;

  // 排除StdIframe组件, StdContract的情况
  let bizData = [];

  if (wdgType == 'iframe') {
    // 模型中有第三方iframe的情况
    for (let k in wdgValues) {
      let biz = {
        code: k,
        value: wdgValues[k].value,
        valueType: wdgValues[k].valueType,
        isFlowVar: wdgValues[k].isFlowVar,
      }
      bizData.push(biz);
    }
  } else if (wdgType == 'component') {
    // 模型中有第三方组件的情况
    for (let k in wdgValues) {
      let biz = {
        code: k,
        value: wdgValues[k].value,
        valueType: wdgValues[k].valueType,
        isFlowVar: wdgValues[k].isFlowVar,
      }
      // 转换合同组件中的日期
      if (k == 'endDate' || k == 'startDate' || k == 'signingDate') {
        biz['value'] = moment(biz['value']).format('YYYY-MM-DD');
        biz['valueType'] = 'date';
      }
      bizData.push(biz);
    }
  } else {
    // 正常的模型，里面的组件完全是自定义的
    // code: `${wdgProps[k].key}_${wdgProps[k].wdgId}`,
    for (let k in wdgProps) {
      let value = wdgProps[k].value;
      if ( wdgProps[k].key == 'StdOptionSelect') {
        // 如果为下拉框，则用回显的值label代替value
        value = wdgProps[k].label;
      }
      let biz = {
        code: `${wdgProps[k].wdgId}`,
        value: value,
        valueType: wdgProps[k].valueType,
        isFlowVar: wdgProps[k].isFlowVar,
      }
      bizData.push(biz);
    }
  }

  return bizData || [];
}

const validIsRequired = (value) => {
  switch(typeof(value)) {
    case 'object':
      return value && value.length > 0? true : false;

    case 'string':
      return value && value.length > 0? true : false;

    case 'number':
      return value && typeof(value) == 'number'? true : false;

    default:
      return value != undefined && value != null? true : false;
  }
}

const validMaxLength = (value='', maxLength=200) => {
  let max = typeof(maxLength) == 'string'? 1*maxLength:maxLength;
  switch(typeof(value)) {
    case 'string':
      return {
        status: value.length <= max,
        value: value.substring(0, max),
      };
    case 'number':
      max = (max < 0 || null == max)? 0 : max;
      return {
        status: value <= max,
        value: (value <= max)? value : max,
      };
    default:
      return {
        status: false,
        value: value.substring(0, max),
      };
  }
}

export default {
  getValueData,
  getBusinessData,
  labelDisplay,
  isHiddenLabel,
  dimension,
  isRequired,
  isFlowVar,
  validMaxLength,
  validIsRequired,
};
