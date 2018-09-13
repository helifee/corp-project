package component.common
{
	import flash.geom.Rectangle;
	import flash.text.TextLineMetrics;
	
	import mx.controls.Alert;
	import mx.controls.Text;
	import mx.core.UIComponent;
	public class LineArrow extends UIComponent
	{
		public var stroke :uint;
		private var _CompArray:Array;
		private var _lineName : String;
		private var _lineArrowWidth :Number;
		private var text : Text;
		
		public function LineArrow()
		{
			super();
		}
		public function set CompArray(_compArray : Array) : void {
			this._CompArray = _compArray;
			invalidateProperties();
			invalidateDisplayList();
		}
		public function get lineName() : String {
			return _lineName;
		}
		
		public function set lineName(lineName : String) : void {
			//Alert.show(lineName);
			_lineName = lineName;
			//Alert.show("1");
			invalidateProperties();
			//Alert.show("2");
			invalidateSize();
			//Alert.show("3");
			invalidateDisplayList();
			//Alert.show("4");
		}
		
		
		override protected function updateDisplayList(unscaledWidth:Number, unscaledHeight:Number):void {
			//Alert.show("updateDisplayList()");
			super.updateDisplayList(unscaledWidth,unscaledHeight);
			//text.text = _lineName;
			var metrics : TextLineMetrics = measureText(_lineName);
			text.width = metrics.width+10;
			text.setActualSize(metrics.width+10,metrics.height+3);
			if(_lineName==null || _lineName.length == 0)
				_lineArrowWidth = this.width ;
			else
				_lineArrowWidth = this.width - text.width - 10;
			graphics.clear();
			var midY :Number =0.5*this.height; // this.y+0.5*this.height;
			var triX1 :Number=_lineArrowWidth*0.9; //this.x+this.width*0.9;
			var triX2 :Number=_lineArrowWidth; //this.x+this.width;
			var bottomY :Number= this.height;//this.y+this.height;
			graphics.lineStyle(1,stroke);
			graphics.beginFill(stroke,0);
			
			graphics.moveTo(0,midY);
			//Alert.show(""+triX1);
			graphics.lineTo(triX1,midY);
			
			//画 三角形
			graphics.moveTo(triX1,0); //第一个点
			graphics.lineTo(triX1,bottomY); //第二个点
			graphics.lineTo(triX2,midY); //第三个点
			graphics.lineTo(triX1,0); //第三个点
			
			graphics.endFill();
			if(_CompArray!=null){
				
				var intervalLength:Number = _lineArrowWidth / (_CompArray.length + 1);
				//Alert.show(intervalLength+"");
				var StartX:Number=intervalLength;
				for each(var UIComp:UIComponent in _CompArray) {
					UIComp.move(StartX,midY-(UIComp.height/2));
					StartX = StartX + intervalLength;
				}
			}
			text.move(_lineArrowWidth+10,0);
		}
		override protected function createChildren():void {
			//Alert.show("createChildren()");
			if(_CompArray!=null){
				for each(var UIComp:UIComponent in _CompArray) {
					addChild(UIComp); 
				}
			}
			text = new Text();
			addChild(text);
		}
		override protected function commitProperties(): void {
			//Alert.show("commitProperties():"+_lineName+":"+_CompArray.length);
			super.commitProperties();
			text.text = _lineName;
		}
	}
}