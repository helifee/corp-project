package class_collection.map;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

public class TreeMapDemo {

	public static void main(String[] args) {
		Map<String, String> map = new TreeMap<String, String>();
		map.put("zhangsan", "123456");
		map.put("lisi", "000000");
		
		Set<Map.Entry<String, String>> set = map.entrySet();
		Iterator<Map.Entry<String, String>> iter = set.iterator();
		while(iter.hasNext()) {
			Map.Entry<String, String> me = iter.next();
			System.out.println(me.getKey() + "-->" + me.getValue());
		}
		
		for(Map.Entry<String, String> me : map.entrySet()) {
			System.out.println(me.getKey() + "-->" + me.getValue());
		}
	}

}
