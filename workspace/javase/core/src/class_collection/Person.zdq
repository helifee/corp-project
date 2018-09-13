package class_collection;

class Person implements Cloneable {
	private String name;
	private int age;
	
	public Person() {
	}

	public Person(String name) {
		this.name = name;
	}

	public Person(String name, int age) {
		this.name = name;
		this.age = age;
	}
	
	public String toString() {
		return "Name: " + this.name + ", Age: " + this.age;
	}
	
	public void finalize() {
		System.out.println("I'm dead...(" + this +")");
	}
	
	@Override
	public Object clone() throws CloneNotSupportedException {
		return super.clone();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}
}
