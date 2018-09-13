/**
 * 
 * 一些基本的函数
 * @author walden
 *
 */
function e(domid){
	return document.getElementById(domid)||e;
}
/**
 * 将url中编码过的字符串转化成js对象
 * @param jsParamsString
 * @returns
 */
function params2Obj(paramStr){
	return JSON.parse(decodeURIComponent(paramStr||'{}'));
}
/**
 * 将js对象转化成编码过的参数对
 * @param jsParams,默认参数名称是_jsonParams
 * @returns {String}
 */
function obj2Params(jsObj,paramKey){
	return (paramKey||"_jsonParams")+"="+encodeURIComponent(JSON.stringify(jsObj));
}
