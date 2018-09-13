package reflcetion;

import java.lang.reflect.Constructor;

public class NewInstanceDemo2 {

	public static void main(String[] args) throws Exception {
		Class<?> clazz = Class.forName("reflcetion.Person");
		Constructor<?>[] cons = clazz.getConstructors();
		Person per = (Person) cons[0].newInstance("zhangsan", 20);
		System.out.println(per);
	}

}
