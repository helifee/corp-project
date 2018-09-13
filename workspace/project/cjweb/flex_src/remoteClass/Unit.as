package remoteClass
{
	import mx.collections.ArrayCollection;
	[Bindable]
	[RemoteClass(alias="com.celartem.datashow.bean.Unit")]
	public class Unit
	{
		public function Unit()
		{
		}
		private var id:int;
		
		/**
		 * 分支内容
		 */
		private var content:ArrayCollection;
	}
}