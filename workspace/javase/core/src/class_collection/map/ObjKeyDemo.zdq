package class_collection.map;

import java.util.HashMap;
import java.util.Map;



public class ObjKeyDemo {
	public static void main(String[] args) {
		Map<Person, String> map = new HashMap<Person, String>();
		
		//Person必须实现equals, hashCode方法
		//只有==时才认为是同一对象
		map.put(new Person("zhangsan", 20), "00000");
		String value = map.get(new Person("zhangsan", 20));
		
		System.out.println(value);
	}
}
