package class_collection.output;

import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class ListIteratorDemo {
	public static void main(String[] args) {
		List<String> allList = new ArrayList<String>();
		allList.add("A");
		allList.add("B");
		allList.add("C");
		allList.add("D");
		allList.add("E");
		
		ListIterator<String> iter = allList.listIterator();
		System.out.println("从前往后：");
		while(iter.hasNext()) {
			System.out.print(iter.next() + ",");
		}
		System.out.println("\n从后往前：");
		while(iter.hasPrevious()) {
			System.out.print(iter.previous() + ",");
		}
	}
}