package reflcetion;


import java.lang.reflect.Method;

public class PrintMethod {

	public static void main(String[] args) throws Exception {
	
		Class<?> classType = Class.forName(args[0]);

		Method methods[] = classType.getDeclaredMethods();

		for(int i = 0; i < methods.length; i++) {
			System.out.println("--" + i + "--" + methods[i].toString());
		}
	}
}