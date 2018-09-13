package basic.arrays;

import java.util.Arrays;

class Student implements Comparable<Student> {
	private int id;
	private int age;
	private float score;

	public Student(int id, int age, float score) {
		super();
		this.id = id;
		this.age = age;
		this.score = score;
	}

	public String toString() {
		return "id: " + id + "; age: " + age + "; score: " + score;
	}
	
	public int compareTo(Student o) {
		if(this.score < o.score) {
			return -1;
		} else if(this.score > o.score) {
			return 1;
		} else {
			if(this.age < o.age) {
				return -1;
			} else if(this.age > o.age) {
				return 1;
			} else {
				return 0;
			}
		}
	}
}

public class ObjSort {

	public static void main(String[] args) {
		Student stu[] = {new Student(1, 23, 90.3f),
						 new Student(2, 24, 80.3f),
						 new Student(3, 23, 80.3f),
						 new Student(4, 25, 90.3f)};
		System.out.println("����֮ǰ");
		print(stu);
		
		Arrays.sort(stu);
		System.out.println("����֮��");
		print(stu);
		
	}
	
	public static void print(Student[] stu) {
		for(int i=0; i<stu.length; i++) {
			System.out.println(stu[i]);
		}
	}

}
