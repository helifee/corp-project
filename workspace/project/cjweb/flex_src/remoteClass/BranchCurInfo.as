package remoteClass
{
	import mx.collections.ArrayCollection;
	[Bindable]
	[RemoteClass(alias="com.celartem.datashow.bean.BranchCurInfo")]
	public class BranchCurInfo
	{
		public function BranchCurInfo()
		{
		}
		public var groupList:ArrayCollection;
		public var curInfo:ArrayCollection;
	}
}