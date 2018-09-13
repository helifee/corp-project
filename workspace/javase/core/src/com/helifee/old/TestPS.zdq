package com.helifee.old;
class Person {
	private String name;
	private String location;
	
	Person (String name) {
		this.name = name;
		this.location = "Beijing";
	}
	
	Person(String name, String location) {
		this.name = name;
		this.location = location;
	}
	
	public String getName() {
		return name;
	}
	
	public String getLocation() {
		return location;
	}
	
	public String info() {
		return name + " " + location;
	}
	
	public String toString() {
		return name;
	}
	
	public boolean equals(Object obj) {
		if(obj == null) return false;
		else {
			if(obj instanceof Person) {
				Person p = (Person)obj;
				if(p.getName() == this.getName() && p.getLocation() == this.getLocation() ) {
					return true;
				}
			}
		}
		
		return false;
	}
}

class Student extends Person {
	private String school;
	
	Student(String n, String l, String s) {
		super(n,l);
		school = s;
	}
	
	Student(String n, String s) {
		this(n, "Beijing", s);
	}
	
	public String getSchool() {
		return school;
	}
	
	public String info() {
		return super.info() + " " + school;
	}
	
	public String toString() {
		return super.toString() + school;
	}
	
	public boolean equals(Object obj) {
		if(obj == null) return false;
		else {
			if(obj instanceof Student) {
				Student s = (Student)obj;
				if(s.getName() == this.getName() && s.getLocation() == this.getLocation() && s.getSchool() == this.getSchool()) {
					return true;
				}
			}
		}
		
		return false;
	}
}

public class TestPS {
	public static void main(String[] args) {
		Person p1 = new Person("A");
		Person p2 = new Person("B", "Shanghai");
		Student s1 = new Student("C", "�廪");
		Student s2 = new Student("D", "Shanghai", "fudan");
		
		System.out.println(p1.info());
		System.out.println(p2.info());
		System.out.println(s1.info());
		System.out.println(s2.info());
		
		System.out.println(p1);
		System.out.println(p2);
		System.out.println(s1);
		System.out.println(s2);
		
		Person p3 = new Person("A");
		Person p4 = new Person("B","Shanghai");
		System.out.println(p3.equals(p1));
		System.out.println(p4.equals(p2));
		System.out.println(p4.equals(p3));
		
		Student s3 = new Student("C", "�廪");
		Student s4 = new Student("D", "Shanghai", "fudan");
		System.out.println(s3.equals(s1));
		System.out.println(s4.equals(s2));
		System.out.println(s4.equals(s3));
	}
}











