
var listnum1;	
var i = 1, j = 1;   
function AddRow() {
	listnum1 =document.getElementById("gk_numoftrnsctns").value;
	
	var oNewRow;   
	var oNewCell1, oNewCell2, oNewCell3, oNewCell4;   
	i = document.getElementById("gkzjjjhb_mxadd").rows.length;
	oNewRow = document.getElementById("gkzjjjhb_mxadd").insertRow(i);
	oNewRow.id = j;
	listnum1 = parseInt(listnum1) + 1;
	document.getElementById("gk_numoftrnsctns").value = listnum1;
	oNewCell1 = document.getElementById("gkzjjjhb_mxadd").rows[i].insertCell(0);
//oNewCell1.style.backgroundColor="#FFFFFF"; 
	oNewCell1.style.align = "center";
//oNewCell1.style.class="text11";
	oNewCell1.innerHTML = "<select name='po.gk_typecd' id='gk_typecd'><option value='1111111111'>\u56fd\u7a0e</option>" + "<option value='2222222222'>\u5730\u7a0e</option><option value='3333333333'>\u6d77\u5173</option>" + "<option value='4444444444'>\u8d22\u653f</option><option value='5555555555'>\u5176\u4ed6</option></select>";

	oNewCell2 = document.getElementById("gkzjjjhb_mxadd").rows[i].insertCell(1);
	oNewCell2.innerHTML = "<input type='text' name='po.gk_sbjctcd' id='gk_sbjctcd' " + j + "'" + " value=\"\">";

	oNewCell3 = document.getElementById("gkzjjjhb_mxadd").rows[i].insertCell(2);
	oNewCell3.innerHTML = "<input type='text' name='po.gk_occrrdamt' id='gk_occrrdamt" + j + "'" +"  value=\"\"  onblur=\"value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';addchange();\" >";


	oNewCell4 = document.getElementById("gkzjjjhb_mxadd").rows[i].insertCell(3);
	oNewCell4.innerHTML = "<input type='button' class='button' name=Del" + j + " value='\u5220\u9664'" + "onClick='DelCurrentRow(" + j + "); addchange();' >";
	j++;
}


function DelCurrentRow(j) {
	with (document.getElementById("gkzjjjhb_mxadd")) {
		for (var i = 0; i < rows.length; i++) {
			if (rows[i].id == j) {
				deleteRow(i);
			}
		}
	}
	listnum1 = parseInt(listnum1) - 1;
	document.getElementById("gk_numoftrnsctns").value = listnum1;
}



var listnum11;	
var k = 1, h = 1;   
function AddRowgz() {
	listnum11 =document.getElementById("gz_numoftrnsctns").value;
	
	var oNewRow;   
	var oNewCell1, oNewCell2, oNewCell3, oNewCell4,oNewCell5,oNewCell6;   
	k = document.getElementById("gkzjgzdfjjhb_mx").rows.length;
	oNewRow = document.getElementById("gkzjgzdfjjhb_mx").insertRow(k);
	oNewRow.id = h;
	listnum11 = parseInt(listnum11) + 1;
	document.getElementById("gz_numoftrnsctns").value = listnum11;
	oNewCell1 = document.getElementById("gkzjgzdfjjhb_mx").rows[k].insertCell(0);
//oNewCell1.style.backgroundColor="#FFFFFF"; 
	oNewCell1.style.align = "center";
//oNewCell1.style.class="text11";
	oNewCell1.innerHTML = "<td class='text_tablehead_b'><select name='po.gz_typecd' id='gz_typecd' style='width: 140px;'><option value='111111111111'>人行</option>" + "<option value='222222222222'>工行</option><option value='333333333333'>农行</option>" + "<option value='444444444444'>中行</option><option value='555555555555'>建行</option><option value='666666666666'>交行</option><option value='777777777777'>其他</option></select></td>";
	
	oNewCell2 = document.getElementById("gkzjgzdfjjhb_mx").rows[k].insertCell(1);
	oNewCell2.innerHTML = "<td class='text_tablehead_b'><input type='text'  style='width: 90px; ' name='po.gz_cptlcd' id='gz_cptlcd'"  + h + "'" + " value=\"\"></td>";

	oNewCell3 = document.getElementById("gkzjgzdfjjhb_mx").rows[k].insertCell(2);
	oNewCell3.innerHTML = "<td class='text_tablehead_b'><input type='text'style='width: 90px; ' name='po.gz_cptlamt' id='gz_cptlamt'" + h + "'" +"  value=\"\"  onblur=\"value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';addchange();\" ></td>";

	oNewCell4 = document.getElementById("gkzjgzdfjjhb_mx").rows[k].insertCell(3);
	oNewCell4.innerHTML = "<td class='text_tablehead_b'><input type='text' style='width: 90px; ' name='po.gz_accrlcd' id='gz_accrlcd" + h + "'" +"  value=\"\"  >";
	
	oNewCell5 = document.getElementById("gkzjgzdfjjhb_mx").rows[k].insertCell(4);
	oNewCell5.innerHTML = "<td class='text_tablehead_b'><input type='text' style='width: 90px; ' name='po.gz_accrlamt' id='gz_accrlamt" + h + "'" +"  value=\"\"  onblur=\"value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';addchange();\" ></td>";
	

	oNewCell6 = document.getElementById("gkzjgzdfjjhb_mx").rows[k].insertCell(5);
	oNewCell6.innerHTML = "<input type='button' class='button' name=Del" + h + " value='\u5220\u9664'" + "onClick='DelCurrentRow(" + h + "); addchange();' >";
	h++;
}


function DelCurrentRow(h) {
	with (document.getElementById("gkzjgzdfjjhb_mx")) {
		for (var i = 0; i < rows.length; i++) {
			if (rows[i].id == h) {
				deleteRow(i);
			}
		}
	}
	listnum11 = parseInt(listnum11) - 1;
	document.getElementById("gz_numoftrnsctns").value = listnum11;
}


