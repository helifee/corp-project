package io.Serializable;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class ArrSerDemo {

	public static void main(String[] args) throws Exception {
		Person[] arr = { new Person("zhangsan", 20), new Person("lisi", 21),
				new Person("wangwu", 22) };
		ser(arr);
		Person[] p = (Person[])unser();
		print(p);
		
	}
	
	public static void ser(Object obj) throws Exception {
		File file = new File("f:" + File.separator + "person.ser");
		ObjectOutputStream oos= null;
		oos = new ObjectOutputStream(new FileOutputStream(file));
		oos.writeObject(obj);
		oos.close();
	}
	
	public static Object unser() throws Exception {
		File file = new File("f:" + File.separator + "person.ser");
		ObjectInputStream ois= null;
		ois = new ObjectInputStream(new FileInputStream(file));
		Object temp = ois.readObject();
		return  temp;
	}
	
	public static void print(Person[] arr) {
		for(Person per : arr) {
			System.out.println(per);
		}
	}

}
