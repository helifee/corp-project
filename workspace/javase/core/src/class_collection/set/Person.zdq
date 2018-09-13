package class_collection.set;

public class Person implements Comparable<Person>{
	private String name;
	private int age;
	public Person(String name, int age) {
		super();
		this.name = name;
		this.age = age;
	}
	
	public String toString() {
		return "Name: " + this.name + "; Age: " + this.age; 
	}

	public int compareTo(Person o) {
		if(this.age > o.age) {
			return 1;
		} else if(this.age < o.age) {
			return -1;
		} else {
			return this.name.compareTo(o.name);
		}
	}

	@Override
	public boolean equals(Object obj) {
		if(this == obj) {
			return true;
		}
		if(!(obj instanceof Person)) {
			return false;
		}
		
		Person p = (Person)obj;
		if(this.name.equals(p.name) && (this.age == p.age)) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public int hashCode() {
		return this.name.hashCode() * this.age;
	}

}
