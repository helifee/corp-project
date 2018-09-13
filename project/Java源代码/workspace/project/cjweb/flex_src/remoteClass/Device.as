package remoteClass
{
	import mx.collections.ArrayCollection;
	[Bindable]
	[RemoteClass(alias="com.celartem.datashow.bean.Device")]
	public class Device
	{
		public function Device()
		{
		}
		/**
		 * 设备ID
		 */
		public var id:int;
		
		/**
		 * 设备名称
		 */
		public var name:String;
		
		/**
		 * 设备类型（1:电表, 2:热表, 3:冷水表, 4:热水表, 5:变压器）
		 */
		public var type:int;
		
		/**
		 * 横坐标位置
		 */
		public var map_x:Number;
		
		/**
		 * 纵坐标位置
		 */
		public var map_y:Number;
	}
}