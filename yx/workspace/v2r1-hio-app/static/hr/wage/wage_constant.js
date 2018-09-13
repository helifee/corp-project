/**
 * 薪资模块常量
 */

//工资表名
var SALARY_INFO_TABLE_NAME = "hr_wage_salary_info";

//薪资项的项目类型
var SALARY_ITEM_TYPE_SALARY = "1";//固定项目
var SALARY_ITEM_TYPE_AllOWANCE = "2"; //津贴项目
var SALARY_ITEM_TYPE_BONUS = "3";//奖金项目
var SALARY_ITEM_TYPE_KQ = "4";//考勤
var SALARY_ITEM_TYPE_SI = "5";//社保
var SALARY_ITEM_TYPE_OTHER = "6";//其他项目
var SALARY_ITEM_TYPE_TAX = "7";//个税
var SALARY_ITEM_TYPE_SUM = "8";//合计项目

//薪资项目数据来源
var SALARY_ITEM_SOURCE_IMPORT = "1"; //手工输入
var SALARY_ITEM_SOURCE_FORMULA = "2"; //公式计算
var SALARY_ITEM_SOURCE_ADJUSTMENT = "3"; //调定薪
var SALARY_ITEM_SOURCE_KQ = "4"; //考勤
var SALARY_ITEM_SOURCE_SI = "5";//社保
var SALARY_ITEM_SOURCE_TAX = "6";//税率表

//工资条显示分类
var SHOW_CLASSIFY_INCOME = "1";//收入项目
var SHOW_CLASSIFY_DEDUCTION = "2";//扣减项目
var SHOW_CLASSIFY_EMP = "3";//个人缴费
var SHOW_CLASSIFY_ORG = "4";//公司缴费？
var SHOW_CLASSIFY_TOTAL = "6";//综合部分
var SHOW_CLASSIFY_OTHER = "5";//中间项目
var SHOW_CLASSIFY_TAX = "7";//个税项目


//计税规则
var TAX_RULE_PRE_TAX_ADD = "1";//税前加项
var TAX_RULE_PRE_TAX_REDUCE = "2";//税前减项
var TAX_RULE_AFTER_TAX_ADD = "3";//税后加项
var TAX_RULE_AFTER_TAX_REDUCE = "4";//税后减项
var TAX_RULE_OTHER = "5";//其他项
