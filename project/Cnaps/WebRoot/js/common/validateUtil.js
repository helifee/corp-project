/*******************************************************************************
 * 王亮 2010-08-031136 VForm 通用JS表单验证
 * 只要知道需要验证的表单控件的id或name(Struts标签中property指定的名称)即可
 ******************************************************************************/
// 修改时可以先把相应的行注释掉
VForm = {
	Empty : /.+/,
	Email : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	Phone : /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/,
	Mobile : /^((\(\d{3}\))|(\d{3}\-))?1(3|5)\d{9}$/,
	IdCard : /^\d{15}(\d{2}[A-Za-z0-9])?$/,
	Currency : /^\d+(\.\d+)?$/,
	Number : /^\d+$/,
	Rate : /^[0]+(.[0-9]{1,3})?$/,// 小于1的三位小数
	Zip : /^[0-9]\d{5}$/,
	QQ : /^[1-9]\d{4,8}$/,
	Integer : /^[-\+]?\d+$/,
	Double : /^[-\+]?\d+(\.\d+)?$/,
	English : /^[A-Za-z]+$/,
	EnglishNum : /^[a-zA-Z0-9_]+$/,
	Chinese : /^[\u0391-\uFFE5]+$/,
	Url : /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
	IsSafe : function(str) {
		return !this.UnSafe.test(str);
	},
	UnSafe : /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
	SafeString : "this.IsSafe(value)",
	Limit : "this.limit(inputValue.length,getAttribute('min'), getAttribute('max'))",
	LimitB : "this.limit(this.LenB(inputValue), getAttribute('min'), getAttribute('max'))",
	Date : "this.IsDate(inputValue, getAttribute('min'), getAttribute('format'))",
	Repeat : "inputValue == document.getElementById(getAttribute('to')).value",
	Range : "getAttribute('min') < inputValue && inputValue < getAttribute('max')",
	Compare : "this.compare(inputValue,getAttribute('operator'),getAttribute('to'))",
	Custom : "this.Exec(inputValue, getAttribute('regexp'))",
	Group : "this.MustChecked(_dataName, getAttribute('min'), getAttribute('max'))",

	ErrorItem : [document.forms[0]],
	ErrorMessage : ["以下原因导致提交失败：\t\t\t\t"],

	Validate : function(spanName, mode) {
		spanName = spanName || "validate";
		if (spanName == "") {
			return false;
		}

		var obj = document.getElementsByTagName("span");
		var count = obj.length;
		var isError = false;

		this.ErrorMessage.length = 1;
		this.ErrorItem.length = 1;
		this.ErrorItem[0] = document.forms[0];

		for (var i = 0; i < count; i++) {
			if (obj[i].name != spanName) {
				continue;
			}
			with (obj[i]) {
				var _dataId = getAttribute("dataId");
				var _dataName = getAttribute("dataName");
				var _dataType = getAttribute("dataType");
				var _msg = getAttribute("msg");
				if (_dataId == null && _dataName == null) {
					continue;
				}
				var inputValue = "";
				if (_dataId != null) {
					inputValue = document.getElementById(_dataId).value;
				}
				if (_dataName != null) {
					inputValue = document.getElementsByName(_dataName)[0].value;
				}
				if (getAttribute("require") == "false" && inputValue == "")
					continue;
				switch (_dataType) {
					case "Date" :
					case "Repeat" :
					case "Range" :
					case "Compare" :
					case "Custom" :
					case "Group" :
					case "Limit" :
					case "LimitB" :
					case "SafeString" :
						if (!eval(this[_dataType])) {
							// style.color="red";
							// innerText=_msg;
							// isError=true;
							this.AddError(i, getAttribute("msg"));
						}
						// else {
						// innerText = "";
						// }
						break;
					default :
						if (!this[_dataType].test(inputValue)) {
							// style.color="red";
							// innerText=_msg;
							// isError=true;
							// alert(inputValue+">>>"+this[_dataType].test(inputValue))
							this.AddError(i, getAttribute("msg"));
						}
						// else {
						// innerText = "";
						// }
						break;
				}
			}
		}
		if (this.ErrorMessage.length > 1) {
			mode = mode || 1;
			var errCount = this.ErrorItem.length;
			switch (mode) {
				case 1 :// 测试以通过
					alert(this.ErrorMessage.join("\n"));
					this.ErrorItem[0].focus();
					break;
				case 2 :// 测试还未通过
					for (var i = 1; i < errCount; i++) {
						this.ErrorItem[i].style.color = "red";
					}
					break;
				case 3 :// 测试还未通过
					for (var i = 1; i < errCount; i++) {
						try {
							var span = document.createElement("SPAN");
							span.id = "__ErrorMessagePanel";
							span.style.color = "red";
							this.ErrorItem[i].parentNode.appendChild(span);
							span.innerHTML = this.ErrorMessage[i].replace(
									/\d+:/, "*");
						}
						catch (e) {
							alert(e.description);
						}
					}
					this.ErrorItem[1].focus();
					break;
				default :
					alert(this.ErrorMessage.join("\n"));
					break;
			}
			return false;
		}
		return !isError;
	},
	AddError : function(index, str) {
		this.ErrorItem[this.ErrorItem.length] = this.ErrorItem[0].elements[index];
		this.ErrorMessage[this.ErrorMessage.length] = this.ErrorMessage.length
				+ ": " + str;
	},
	Exec : function(op, reg) {
		return new RegExp(reg, "g").test(op);
	},

	IsDate : function(op, formatString) {
		formatString = formatString || "ymd";
		var m, year, month, day;
		switch (formatString) {
			case "ymd" :
				m = op
						.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
				if (m == null)
					return false;
				day = m[6];
				month = m[5]--;
				year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3],
						10));
				break;
			case "dmy" :
				m = op
						.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
				if (m == null)
					return false;
				day = m[1];
				month = m[3]--;
				year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6],
						10));
				break;
			default :
				break;
		}
		if (!parseInt(month))
			return false;
		month = month == 12 ? 0 : month;
		var date = new Date(year, month, day);
		return (typeof(date) == "object" && year == date.getFullYear()
				&& month == date.getMonth() && day == date.getDate());
		function GetFullYear(y) {
			return ((y < 30 ? "20" : "19") + y) | 0;
		}
	},

	limit : function(len, min, max) {
		min = min || 0;
		max = max || Number.MAX_VALUE;
		return min <= len && len <= max;
	},
	LenB : function(str) {
		return str.replace(/[^\x00-\xff]/g, "**").length;
	},
	compare : function(op1, operator, op2) {
		switch (operator) {
			case "NotEqual" :
				return (op1 != op2);
			case "GreaterThan" :
				return (op1 > op2);
			case "GreaterThanEqual" :
				return (op1 >= op2);
			case "LessThan" :
				return (op1 < op2);
			case "LessThanEqual" :
				return (op1 <= op2);
			default :
				return (op1 == op2);
		}
	},
	MustChecked : function(name, min, max) {
		var groups = document.getElementsByName(name);
		var hasChecked = 0;
		min = min || 1;
		max = max || groups.length;
		for (var i = groups.length - 1; i >= 0; i--)
			if (groups[i].checked)
				hasChecked++;
		return min <= hasChecked && hasChecked <= max;
	}
}