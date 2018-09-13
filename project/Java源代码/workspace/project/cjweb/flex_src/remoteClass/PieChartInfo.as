package remoteClass
{
	import mx.collections.ArrayCollection;

	[Bindable]
	[RemoteClass(alias="com.celartem.datashow.bean.PieChartInfo")]
	public class PieChartInfo
	{
		public function PieChartInfo()
		{
		}
		public var eleList:ArrayCollection;
		public var heatList:ArrayCollection;
		public var coolList:ArrayCollection;
		public var coldWaterList:ArrayCollection;
		public var hotWaterList:ArrayCollection;
	}
}