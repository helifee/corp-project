package component.common
{
	import mx.controls.Alert;
	import mx.core.UIComponent;
	public class LineGraphic extends UIComponent
	{
		//public 
		private var leftScale:Number = 2/5;
		private var rightScale:Number = 3/5;
		
		public var _LeftLineArrows:Array;
		public var _RightLineArrows:Array;
		private var _leftWidth:Number = 0;
		public function LineGraphic()
		{
			//TODO: implement function
			super();
		}
		public function get middleLinePos() :Number {
			if(_leftWidth == 0)
				_leftWidth = this.width *leftScale;
			return _leftWidth;
		}
		public function set LeftLineArrows(lineArrows : Array) : void {
			this._LeftLineArrows = lineArrows;
			invalidateProperties();
			invalidateDisplayList();
		}
		
		
		public function set RightLineArrows(lineArrows : Array) : void {
			this._RightLineArrows = lineArrows;
			invalidateProperties();
			invalidateDisplayList();
		}
		//
		override protected function updateDisplayList(unscaledWidth:Number, unscaledHeight:Number):void {
			
			_leftWidth = this.width *leftScale;
			var rightlength:Number = this.width - _leftWidth;
			var tempheight:Number = 0;
			var intervalheight:Number 
			if(_LeftLineArrows!=null){
				tempheight = 0;
				intervalheight = this.height / (_LeftLineArrows.length + 1);
				for each(var UIComp:UIComponent in _LeftLineArrows) {
					tempheight = tempheight + intervalheight;
					UIComp.height = 8;
					UIComp.width = _leftWidth;
					UIComp.move(0,tempheight-UIComp.height/2);
				}
			}
			if(_RightLineArrows!=null){
				tempheight = 0;
				intervalheight = this.height / (_RightLineArrows.length + 1);
				for each(UIComp in _RightLineArrows) {
					tempheight = tempheight + intervalheight;
					UIComp.height = 10;
					UIComp.width = rightlength;
					UIComp.move(_leftWidth,tempheight-UIComp.height/2);
				}
			}
			
			//中间的竖线
			graphics.lineStyle(1);
			//graphics.beginFill(stroke,0);
			
			graphics.moveTo(_leftWidth,0);
			//Alert.show(""+triX1);
			graphics.lineTo(_leftWidth,this.height);
			
		}
		override protected function createChildren():void {
			//Alert.show("createChildren()");
			if(_LeftLineArrows!=null){
				//Alert.show("_LeftLineArrows"+_LeftLineArrows.length);
				for each(var UIComp:UIComponent in _LeftLineArrows) {
					addChild(UIComp); 
				}
			}
			if(_RightLineArrows!=null){
				//	Alert.show("_RightLineArrows"+_RightLineArrows.length);
				for each(UIComp in _RightLineArrows) {
					addChild(UIComp); 
				}
			}
		}
		
		override protected function commitProperties(): void {
			//Alert.show("commitProperties():"+_lineName+":"+_CompArray.length);
			super.commitProperties();
			//text.text = _lineName;
		}
	}
}