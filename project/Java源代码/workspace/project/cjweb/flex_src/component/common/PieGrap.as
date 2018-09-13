package component.common
{
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	
	import mx.controls.ToolTip;
	import mx.core.UIComponent;
	import mx.managers.ToolTipManager;
	
	public class PieGrap extends UIComponent
	{
		public function PieGrap()
		{
			//TODO: implement function
			super();
			addEventListener(MouseEvent.MOUSE_OVER,buildToolTip);
			addEventListener(MouseEvent.MOUSE_OUT,destroyToolTip);
		}
		//生成自定义提示
		private var newToolTip:ToolTip;
		protected function buildToolTip(event:Event):void{
			var point:Point=new Point(mouseX, mouseY);
			localToGlobal(point);
			newToolTip = ToolTipManager.createToolTip("55%", localToGlobal(point).x, localToGlobal(point).y) as ToolTip;
			
		}
		protected function destroyToolTip(event:Event):void{
			ToolTipManager.destroyToolTip(newToolTip);
		}
		
		public var stroke :uint = 0x0000FF;
		public var arccolor:uint = 0xFF0000;
		public var radius :int =10;
		public var _alphaNum :Number = 1;
		function DrawSector(mc:MovieClip,x:Number=200,y:Number=200,r:Number=100,angle:Number=27,startFrom:Number=270,color:Number=0xff0000):void {
			mc.graphics.beginFill(color,50);
			//remove this line to unfill the sector
			/* the border of the secetor with color 0xff0000 (red) , you could replace it with any color 
			* you want like 0x00ff00(green) or 0x0000ff (blue).
			*/
			mc.graphics.lineStyle(0,stroke);
			mc.graphics.moveTo(x,y);
			angle=(Math.abs(angle)>360)?360:angle;
			var n:Number=Math.ceil(Math.abs(angle)/45);
			var angleA:Number=angle/n;
			angleA=angleA*Math.PI/180;
			startFrom=startFrom*Math.PI/180;
			mc.graphics.lineTo(x+r*Math.cos(startFrom),y+r*Math.sin(startFrom));
			for (var i=1; i<=n; i++) {
				startFrom+=angleA;
				var angleMid=startFrom-angleA/2;
				var bx=x+r/Math.cos(angleA/2)*Math.cos(angleMid);
				var by=y+r/Math.cos(angleA/2)*Math.sin(angleMid);
				var cx=x+r*Math.cos(startFrom);
				var cy=y+r*Math.sin(startFrom);
				mc.graphics.curveTo(bx,by,cx,cy);
			}
			if (angle!=360) {
				mc.graphics.lineTo(x,y);
			}
			mc.graphics.endFill();// if you want a sector without filling color , please remove this line.
		}

		override protected function updateDisplayList(unscaledWidth:Number, unscaledHeight:Number):void {
			
			var stag:Sprite=new Sprite();
			addChild(stag);
			var moviec:MovieClip=new MovieClip;
			stag.addChild(moviec);
			var S_angle:int=60;
			/* S_angle is expressed as a number between 0 and 360 degrees. it will draw a 60 
			* degree sector in this example, but you could change it to what ever you want 
			*/
			
			graphics.clear();
			graphics.lineStyle(1,stroke);
			graphics.beginFill(stroke,_alphaNum);
			graphics.drawCircle(0,0,radius);
			graphics.endFill();
			DrawSector(moviec,0,0,10,S_angle,270,arccolor);

		}
	}
}
