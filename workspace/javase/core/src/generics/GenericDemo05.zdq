package generics;

class Info<T> {
	private T param;

	public T getParam() {
		return param;
	}

	public void setParam(T param) {
		this.param = param;
	}
}

class Person<T> {
	private T info;

	public T getInfo() {
		return info;
	}

	public void setInfo(T info) {
		this.info = info;
	}
}

public class GenericDemo05 {

	public static void main(String[] args) {
		Person<Info<String>> p = new Person<Info<String>>();
		p.setInfo(new Info<String>());
		p.getInfo().setParam("java");
		System.out.println(p.getInfo().getParam());
		
	}
	
	

}
