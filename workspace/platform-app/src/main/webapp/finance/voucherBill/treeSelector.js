    function TreeSelector(item) {  
        this._data = new Array();  
        this._item = document.getElementById(item);  
        this._rootId = null;// 规定根节点-1  
    }  
    // 增加一个节点  
    TreeSelector.prototype.add = function(_id, _pid, _text, _url) {  
        this._data[this._data.length] = {  
            id : _id,  
            pid : _pid,  
            text : _text,  
            url : _url  
        };  
    }  
    // 创建树  
    TreeSelector.prototype.createTree = function() {  
        var len = this._data.length;  
        for ( var i = 0; i < len; i++) {  
            if (this._data[i].pid == this._rootId) {  
                this.createSubOption(1, this._data[i]);  
            }  
        }  
    }  
    // 创建子节点  
    TreeSelector.prototype.createSubOption = function(level, current) {  
        var blank = "";  
        if (level != 1) {  
            for (a = 0; a < level; a++) {  
                blank += "  ";  
            }  
            blank += "├-";  
        }  
      
        this._item.options.add(new Option(blank + current.text, current.id));// 添加Option选项  
      
        for ( var j = 0; j < this._data.length; j++) {  
            if (this._data[j].pid == current.id) {  
                this.createSubOption(level + 1, this._data[j]);//寻找子节点  
            }  
      
        }  
      
    }  