package reflcetion;

import java.lang.reflect.Method;

public class Demo01 {

	public static void main(String[] args) throws ClassNotFoundException {
		
		Class<?> classType = Class.forName(args[0]);
		
		Method methods[] = classType.getDeclaredMethods();
		
		for(int i = 0; i < methods.length; i++) {
			System.out.println(methods[i].toString());
		}
	}
}
