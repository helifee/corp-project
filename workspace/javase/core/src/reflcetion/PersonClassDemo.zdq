package reflcetion;

public class PersonClassDemo {

	public static void main(String[] args) throws ClassNotFoundException {
		Person per = new Person("", 20);
		Class<?> c = per.getClass();
		System.out.println(c.getName());
		
		//���
		Class<?> c2 = Person.class;
		System.out.println(c2.getName());
		
		//���
		Class<?> c3 = Class.forName("reflcetion.Person");
		System.out.println(c3.getName());
	}

}
