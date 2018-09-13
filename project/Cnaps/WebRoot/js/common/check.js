function fmoney(s, n) {
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r;
}
function rmoney(s) {
	if (s == null || s == "NaN.undefined" || s == "") {
		return 0;
	}
	return parseFloat(s.replace(/[^\d\.-]/g, ""));
}
function limitLength(value, byteLength, title, attribute) {
	var newvalue = value.replace(/[^\x00-\xff]/g, "**");
	var length = newvalue.length;
	if (length * 1 <= byteLength * 1) {
		return;
	}
	var limitDate = newvalue.substr(0, byteLength);
	var count = 0;
	var limitvalue = "";
	for (var i = 0; i < limitDate.length; i++) {
		var flat = limitDate.substr(i, 1);
		if (flat == "*") {
			count++;
		}
	}
	var size = 0;
	var istar = newvalue.substr(byteLength * 1 - 1, 1);
	if (count % 2 == 0) {
		size = count / 2 + (byteLength * 1 - count);
		limitvalue = value.substr(0, size);
	} else {
		size = (count - 1) / 2 + (byteLength * 1 - count);
		limitvalue = value.substr(0, size);
	}
	alert(title + "最大输入" + byteLength + "个字节(相当于" + byteLength / 2 + "个汉字)!");//document.getElementById(attribute).value = limitvalue;
	document.getElementById(attribute).value = "";
	return;
}
	
function actkeyPress() {
	var i = event.keyCode;
	if (((i <= 47) && (!((i >= 43) && (i <= 46))) && (i != 41) && (i != 40) && (i == 32) && (i != 35)) || (((i >= 58) && (i <= 64)) && (i <= 62) && (i != 59)) || (((i >= 91) && (i <= 96)) && (i != 95)) || (i == 123) || (i == 125)) {
		event.keyCode = 0;
	}
}
	
	
function charPress() {
	var i = event.keyCode;
	if (((i <= 47) && (!((i >= 43) && (i <= 46))) && (i != 41) && (i != 40) && (i != 32) && (i != 35)) || (((i >= 58) && (i <= 64)) && (i <= 62) && (i != 59)) || (((i >= 91) && (i <= 96)) && (i != 95)) || (i == 123) || (i == 125)) {
		event.keyCode = 0;
	}
}
function numPress() {
	var i = event.keyCode;
	if ((i <= 48) || (i >= 57)) {
		event.keyCode = 0;
	}
}
function ckeckwethornull() {
	var business_name = this.document.getElementById("business_name").value;
	var lelm = this.document.forms[0].elements;
	var len = lelm.length;
	var re = /\bpo\./;
	var flag = 0;
	if (business_name == "sendfreemessage") {
		for (var i = 0; i < len; i++) {
			if (re.test(lelm.item(i).name)) {		// 	
				if (lelm.item(i).value.replace(/(^\s*)|(\s*$)/g, "") == "") {
					lelm.item(i).focus();
					flag = 1;
					break;
				}
			}
		}
	} else {
		if (business_name == "Hvpsdigitalsignapply") {
			if (this.document.getElementById("instgdrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
				flag = 1;
			}
		} else {
			if (business_name == "hvpsdigsigdownreqinfo") {
				for (var i = this.document.getElementsByName("mmbcd").length; i > 0; i--) {
					if (this.document.getElementsByName("mmbcd")[i - 1].value.replace(/(^\s*)|(\s*$)/g, "") == "") {
						flag = 1;
						break;
					}
				}
			} else {
				if (business_name == "generalDebit") {
					if (this.document.getElementById("rcptltd").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("pmttp").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("pmtkd").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("currencycd").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("amount").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("dbtracct").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("dbtrnm").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("dbtrbrnchid").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("dbtrbrnchnm").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("dbtrmmbid").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("dbtrissuer").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("cdtracct").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("cdtrnm").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("cdtrmmbid").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("cdtrbrnchid").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("cdtrbrnchnm").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("cdtrissuer").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("totalamt").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
						flag = 1;
					}
					if (flag == 0 && this.document.getElementById("pmttp").value.replace(/(^\s*)|(\s*$)/g, "") == "B104") {
						if (this.document.getElementById("gk_dtlsmmryamt").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("gk_rprtcd").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("gk_rcvcd").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("gk_rprtforms").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("gk_rprtnum").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("gk_budgetlevel").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("gk_indicator").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("gk_budgettp").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("gk_numoftrnsctns").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
							flag = 1;
						}
						for (var i = this.document.getElementsByName("po.xh").length; i > 0; i--) {
							if (this.document.getElementsByName("po.xh")[i - 1].value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementsByName("po.gk_typecd")[i - 1].value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementsByName("po.gk_sbjctcd")[i - 1].value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementsByName("po.gk_occrrdamt")[i - 1].value.replace(/(^\s*)|(\s*$)/g, "") == "") {
								flag = 1;
								break;
							}
						}
					}
					if (flag == 0 && this.document.getElementById("pmttp").value.replace(/(^\s*)|(\s*$)/g, "") == "B307") {
						if (this.document.getElementById("gz_dtlsmmryamt").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("gz_rprtcd").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("gz_rcvcd").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("gz_rprtforms").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("gz_rprtnum").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("gz_numoftrnsctns").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
							flag = 1;
						}
						for (var i = this.document.getElementsByName("po.gz_typecd").length; i > 0; i--) {
							if (this.document.getElementsByName("po.gz_typecd")[i - 1].value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementsByName("po.gz_cptlcd")[i - 1].value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementsByName("po.gz_cptlamt")[i - 1].value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementsByName("po.gz_accrlcd")[i - 1].value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementsByName("po.gz_accrlamt")[i - 1].value.replace(/(^\s*)|(\s*$)/g, "") == "") {
								flag = 1;
								break;
							}
						}
					}
					if (flag == 0) {
						var ywlxbm_tmp = this.document.getElementById("pmttp").value.replace(/(^\s*)|(\s*$)/g, "");
						if (ywlxbm_tmp == "" || ywlxbm_tmp == "B100") {
							this.document.getElementById("gk_numoftrnsctns").value = "";
							this.document.getElementById("gz_numoftrnsctns").value = "";
						}
					}
				} else {
					if (business_name == "regularDebitSigned") {
						if (this.document.getElementById("skrdm").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("skrmc").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("skrkhhhh").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("skrkhhhm").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("ywlxbm").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("ywzlbm").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("fkrzh").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("fkrmc").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("fkrkhhhh").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("fkrkhhmc").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("htbh").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
							flag = 1;
						}
					} else {
						if (business_name == "checkearmarkmanage") {
							if (this.document.getElementById("instgpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("instdpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("instgdrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("instddrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("orgnlinstddrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("orgnlmsgid").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("orgnlmsgtpcd").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("applyorccltp").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("issuedt").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("notesno").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("drawerbrnchid").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("draweracct").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("amount").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("chckmd").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
								flag = 1;
							}
						} else {
							if (business_name == "businesscancle") {
								if (this.document.getElementById("orimsgid").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
									flag = 1;
								}
							} else {
								if (business_name == "businessStatusQuery") {
									if (this.document.getElementById("orimsgid").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
										flag = 1;
									}
								} else {
									if (business_name == "generalSignInfo") {
										if (this.document.getElementById("recvdrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("systemcode").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("transactiontypecode").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("title").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("content").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
											flag = 1;
										}
									} else {
										if (business_name == "generalNotSignInfo") {
											if (this.document.getElementById("recvdrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("systemcode").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("transactiontypecode").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("title").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("content").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
												flag = 1;
											}
										} else {
											if (business_name == "returnquest") {
												if (this.document.getElementById("senddrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("sendindrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("recvdrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("recvindrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("originalmessageid").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("originalmessagetype").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("originalinstructingparty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("backtype").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
													flag = 1;
												} else {
													if (flag == 0 && this.document.getElementById("backtype").value.replace(/(^\s*)|(\s*$)/g, "") == "RP01") {
														if (this.document.getElementById("oritransactionid").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("orisenddrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("orisendindrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("orirecvdrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("orirecvindrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
															flag = 1;
														}
													}
												}
											} else {
												if (business_name == "querybook") {
													if (this.document.getElementById("instdPty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("querytype").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("pmtgrpid").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("querycontent").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("systemcd").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
														flag = 1;
													}
													if (flag == 0) {
														if (this.document.getElementById("querytype").value.replace(/(^\s*)|(\s*$)/g, "") == "QT01" || this.document.getElementById("querytype").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
															if (this.document.getElementById("instructingindirectparty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("instructedindirectparty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("oritransactionid").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("oritransactiontypecode").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
																flag = 1;
															}
														}
													}
												} else {
													if (business_name == "queryreturnbook") {
														if (this.document.getElementById("senddrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("sendindrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("recvdrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("recvindrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("replycontent").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
															flag = 1;
														}
													} else {
														if (business_name == "RegularDebitPayer") {
															if (this.document.getElementById("dbtracct").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("dbtrnm").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("dbtrissuer").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("dbtrissuernm").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("dbtrmmbid").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("dbtrbrnchnm").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("dbtrbrnchid").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("pmtkd").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("snglamt").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
																flag = 1;
															}
														} else {
															if (business_name == "RegularDebitLdeger") {
																if (this.document.getElementById("pmtgrpid").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("rcptltd").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("currencycd").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("cdtracct").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("cdtrnm").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("cdtrbrnchid").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("cdtrbrnchnm").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("cdtrmmbid").value.replace(/(^\s*)|(\s*$)/g, "") == "" || this.document.getElementById("cdtrissuer").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
																	flag = 1;
																}
															} else {
																if (business_name == "RegularDebitMsg") {
																	if (this.document.getElementById("amount").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
																		flag = 1;
																	}
																} else {
																	if (business_name == "partystatusreques") {
																		if (this.document.getElementById("instgdrctpty").value.replace(/(^\s*)|(\s*$)/g, "") == "") {
																			flag = 1;
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	if (flag == 0) {
		nullsubmit();
	} else {
			alert("要素输入不完整！");	
	}
}
function nullsubmit() {
	var rm = this.document.getElementById("repeatmark").value;
	if (rm == "0") {
		this.document.getElementById("repeatmark").value = "1";
		this.document.forms[0].submit();
	} else {
		if (rm == "-1") {
			this.document.forms[0].submit();
		} else {
			alert("请勿重复提交!");
		}
	}
}

function amountformat(obj) {
 
	var tmp = this.document.getElementById("business_name").value;
	fun_kd(obj);
	var amount =   obj.value ;
	var am = amount.split(".");
	var yz = 0;
	if (am.length == 1) {
		if (obj.value == 0 || obj.value == "") {
			if (tmp == "RegularDebitMsg") {
				obj.value = "";
			} else {
				obj.value = "0.00";
			}
		} else {
			obj.value = obj.value.replace(/(^0*)/g, "");
			if (obj.value.length > 16) {
				yz = 1;
				alert("金额格式错误!");
				obj.focus();
			} else {
				obj.value += ".00";
				///////
				obj.value=fmoney(obj.value ,2)
			}
		}
	} else {
		if (am.length != 2 || am[0].length > 16 || am[1].length > 2) {
			yz = 1;
			alert("金额格式错误!");
			obj.focus();
		}
		if (yz == 0) {
			if (am[0] == "" || am[0] == 0) {
				obj.value = "0." + am[1];
			} else {
				obj.value = obj.value.replace(/(^0*)/g, "");
			}
			for (var i = 2; i > am[1].length; i--) {
				obj.value += "0";
			}
			///////
				obj.value=fmoney(obj.value ,2)
		}
	}
	if (yz == 0) {
		if (tmp == "generalDebit" || tmp == "RegularDebitLdeger") {
			if (obj.name == "po.gk_occrrdamt") {
				summxhzje( this.document.getElementById("gk_dtlsmmryamt") );
				amountformat(this.document.getElementById("gk_dtlsmmryamt"));
			}
			if (obj.name == "po.gz_cptlamt" || obj.name == "po.gz_accrlamt") {
				summxhzje( this.document.getElementById("gz_dtlsmmryamt") );
				amountformat(this.document.getElementById("gz_dtlsmmryamt"));
			}
			if (obj.name == "po.amount" || obj.name == "po.outstationcharge" || obj.name == "po.postage" || obj.name == "po.servicecharge") {
				summxhzje(this.document.getElementById("totalamt"));
				amountformat(this.document.getElementById("totalamt"));
			}
			if (obj.value == "0.00") {
				if (obj.name == "po.gk_dtlsmmryamt" || obj.name == "po.gz_dtlsmmryamt" || obj.name == "po.totalamt") {
					obj.value = "";
				}
			}
		}
	}
}


function fun_kd(obj) {
	var rg_exp = /[^0-9\.]/g;
	obj.value = obj.value.replace(rg_exp, "");
}

function fun_number(obj) {
	var rg_exp = /[^0-9]/g;
	obj.value = obj.value.replace(rg_exp, "");
}

function fun_date(obj) {
	var str1 = obj.value.substring(0, 4);
	var str2 = obj.value.substring(4, 6);
	var str3 = obj.value.substring(6, 8);
	var str = str1 + "-" + str2 + "-" + str3;
	return str;
}


function jsxxcd(obj, len) {
	if (obj.value.length > len) {
		obj.value = obj.value.substr(0, len);
	}
}
function amountPress() {
	var i = event.keyCode;
	if ((((i >= 48) && (i <= 58)) || i == 46) || i == 44) {
	} else {
		event.keyCode = 0;
	}
}
function createRequest() {
	try {
		request = new XMLHttpRequest();
	}
	catch (trymicrosoft) {
		try {
			request = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (othermicrosoft) {
			try {
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (failed) {
				request = false;
			}
		}
	}
}



// JavaScript Document

function isNull(val) {
	var boo = false;
	if (trim(val) == "") {
		boo = true;
	}
	return boo;
}
	

function ltrim(s) {
	return s.replace(/^\s*/, "");
}
function rtrim(s) {
	return s.replace(/\s*$/, "");
}
function trim(s) {
	return rtrim(ltrim(s));
}
	

var hhlength = /\d{12}/;
function validatehh(val) {
	var boo = false;
	if (!hhlength.exec(val)) {
		boo = true;
	}
	return boo;
}

function msgSplit(val) {
	var msg = val.split("@");
	var msgs = "";
	var boo = true;
	for (var i = 0; i < msg.length; i++) {
		if (trim(msg[i]) != "") {
			msgs += i + "." + msg[i] + "\n";
		}
	}
	if (trim(msgs) != "") {
		window.alert(msgs);
		boo = false;
	}
	return boo;
}

document.onkeydown = function keydown() {
	if (window.event.keyCode == "13") {
		if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "SELECT" || document.activeElement.tagName == "TEXTAREA") {
			if (document.activeElement.type != "button") {
				window.event.keyCode = "9";
			}
		}
	}
};
/* -------------------------------------------------------------------------------- */

