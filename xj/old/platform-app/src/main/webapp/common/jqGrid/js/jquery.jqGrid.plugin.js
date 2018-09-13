$.jgrid.extend({
        setGridParamPostData:function(newParams){
            return this.each(function(){
        			if (this.grid && typeof newParams === 'object') {
        			    this.p.postData = newParams;
        			}
        		});
        }
});