package remoteClass
{
	import mx.collections.ArrayCollection;
	[Bindable]
	[RemoteClass(alias="com.celartem.datashow.bean.Group")]
	public class Group
	{
		public function Group()
		{
		}
		private  var id:int;
		private var content:ArrayCollection;
		
	}
}