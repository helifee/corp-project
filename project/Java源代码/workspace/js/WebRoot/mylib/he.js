(function(){
	window['he'] = {};

	function $() {
		var elements = new Array();
		for(var i=0; i<arguments.length; i=i+1) {
			var element = arguments[i];
			if(typeof arguments[i] =='string') {
				element = document.getElementById(element);
			}

			if(arguments.length == 1) {
				return element;
			}

			elements.push(element);
		}
		return elements;
	}
	window['he']['$'] = $;

})();