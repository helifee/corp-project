package oo.supermarket;

import java.util.Iterator;
import java.util.List;

public class Client {

	public static void main(String[] args) {
		SuperMarket sm = new SuperMarket();
		sm.add(new Book("Java", 35.8, 100));
		sm.add(new Book("Jsp", 88.8, 100));
		sm.add(new Book("Python", 22.8, 100));
		
		print(sm.search("J"));
		
		sm.delete(new Book("Java", 35.8, 100));
		print(sm.search("J"));
		
	}
	
	public static void print(List<Good> all) {
		Iterator<Good> iter = all.iterator();
		while(iter.hasNext()) {
			System.out.println(iter.next());
		}
	}
}
