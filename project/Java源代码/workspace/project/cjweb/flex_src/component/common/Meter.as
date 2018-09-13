package component.common
{
	import flash.display.*;
	import flash.events.MouseEvent;
	import flash.geom.*;
	
	import mx.controls.Alert;
	import mx.core.*;
	import mx.core.UIComponent;
	
	public class Meter extends UIComponent
	{
		public var radius :int =10;
		public var stroke :uint = 0x00ff00;
		public var _alphaNum :Number = 0;
		
		public function Meter()
		{
			super();
			this.addEventListener(MouseEvent.MOUSE_OVER,showHandCursor);
		}
		public function get alphaNum():Number{
			return _alphaNum;
		}
		public function set alphaNum(value:Number):void{
			if(value!=_alphaNum)
			{
				_alphaNum=value;
				this.invalidateDisplayList();
			}
		}
		override protected function updateDisplayList(unscaledWidth:Number, unscaledHeight:Number):void {
			graphics.clear();
			graphics.lineStyle(1,stroke);
			graphics.beginFill(stroke,_alphaNum);
			graphics.drawCircle(0,0,radius);
			graphics.moveTo(-radius,radius);
			graphics.lineTo(radius,-radius);
			graphics.endFill();
		}
		
		public function showHandCursor(evnet:MouseEvent):void
		{
			this.useHandCursor=true;
			this.buttonMode=true;
		}
	}
}