package component.common
{
	import flash.display.*;
	import flash.events.MouseEvent;
	import flash.geom.*;
	
	import mx.controls.Alert;
	import mx.core.*;
	import mx.core.UIComponent;

	public class Transformer extends UIComponent
	{
		public var stroke :uint = 0x00ff00;
		public var radius :int =10;
		public function Transformer() 
		{
			super();
		}
		override protected function updateDisplayList(unscaledWidth:Number, unscaledHeight:Number):void {
			graphics.clear();
			graphics.lineStyle(1,stroke);
			//graphics.beginFill(stroke,_alphaNum);
			graphics.drawCircle(0,0,radius);
			graphics.drawCircle(radius,0,radius);
			//graphics.moveTo(-radius,radius);
			//graphics.lineTo(radius,-radius);
			//graphics.endFill();
		}
	}
}