package reflcetion;

public class NewInstanceDemo {

	public static void main(String[] args) {
		Class<?> clazz = null;
		try {
			clazz = Class.forName("reflcetion.Person");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		try {
			//�������޲ι���
			Person per = (Person) clazz.newInstance();
			System.out.println(per);
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
	}

}
