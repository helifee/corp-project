package remoteClass
{
	import mx.collections.ArrayCollection;
	[Bindable]
	[RemoteClass(alias="com.celartem.datashow.bean.Line")]
	public class Line
	{
		public function Line()
		{
		}
		/**
		 * 支路ID
		 */
		public var bchId:int;
		
		/**
		 * 支路名称
		 */
		public var bchName:String;
		
		/**
		 * 父支路ID
		 */
		public var preId:int;
		
		/**
		 * 支路方向 true:进  false:出
		 */
		public var direction:Boolean;
		
		/**
		 * 支路相关设备集合
		 */
		public var devices:ArrayCollection;
	}
}