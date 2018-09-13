package class_collection.map;

class Person {
	private String name;
	private int age;

	@Override
	public boolean equals(Object obj) {
		if(obj == this) {
			return true;
		}
		if(obj instanceof Person) {
			Person per = (Person)obj;
			if(this.getName().equals(per.getName())) {
				return true;
			}
		}
		return false;
	}

	@Override
	public int hashCode() {
		return this.getName().hashCode();
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

	public Person(String name, int age) {
		super();
		this.name = name;
		this.age = age;
	}

}
