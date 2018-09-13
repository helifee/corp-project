package class_collection.output;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class IteratorDemo01 {
	public static void main(String[] args) {
		List<String> allList = new ArrayList<String>();
		allList.add("A");
		allList.add("B");
		allList.add("C");
		allList.add("D");
		allList.add("E");
		
		Iterator<String> iter = allList.iterator();
		while(iter.hasNext()) {
			String str = iter.next();
			if("C".equals(str)) {
				iter.remove();
			}
		}
		System.out.println(allList);
	}
}
