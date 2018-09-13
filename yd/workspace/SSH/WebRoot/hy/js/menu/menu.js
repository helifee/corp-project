
/**
 * 导航菜单树形结构.
 * @param {Object} numB
 * @param {Object} thisObj
 */
function show_menuB(numB,thisObj){
	for(j=0;j<100;j++){
		 if(j!=numB){
			if($('Bli0'+j)){
		  $('Bli0'+j).style.display='none';
		  //$('Bf0'+j).style.background='url(images/01.gif) no-repeat';
		  //thisObj.style.background='url(images/nav02.gif)';
		}
		 }
	}
	if($('Bli0'+numB)){   
		if($('Bli0'+numB).style.display=='block'){
		  $('Bli0'+numB).style.display='none';
		 //$('Bf0'+numB).style.background='url(images/01.gif) no-repeat';
		 //thisObj.style.background='url(images/nav02.gif)';
		}else {
		  $('Bli0'+numB).style.display='block';
		  //$('Bf0'+numB).style.background='url(images/02.gif)';
		  //thisObj.style.background='url(images/nav03.gif)';
		}
	}
}

function show_menu(num){
	for(i = 0; i < 100; i++){
		if($('f0'+i)){
			$('f0'+i).style.background = 'none';
		}
	}
	$('f0'+num).style.backgroundColor = '#6AB2BD';
	$('nav01').update($('f0'+num).up('div').previous(0).innerHTML.stripTags());
	$('nav02').update($('f0'+num).innerHTML.stripTags().substr(1,20));
}

/**
 * 隐藏/展开 左侧导航栏.
 */
function show_menuC(){
	if($('LeftBox').hasClassName('none')) {
		$('LeftBox').toggleClassName('none');
		$('RightBox').setStyle({marginLeft:208+'px'});
		$('ImgArrow').src="images/switch_right.gif";
		$('ImgArrow').alt="打开左侧导航栏";
	} else {
		$('LeftBox').toggleClassName('none');
		$('RightBox').setStyle({marginLeft:0});
		$('ImgArrow').src="images/switch_left.gif";
		$('ImgArrow').alt="隐藏左侧导航栏";
	}
}
