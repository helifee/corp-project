package com.jsonext.stu.dao;

import java.util.ArrayList;
import java.util.List;

import com.jsonext.stu.entity.Student;

public class StudentDao {
	public List<Student> studentList = new ArrayList<Student>();

	private static StudentDao instance = new StudentDao();

	public static StudentDao getStudentDao() {
		return instance;
	}

	private StudentDao() {
		Student stu = new Student();
		stu.setId(1);
		stu.setName("linlinyu");
		stu.setAge(25);
		studentList.add(stu);

		stu = new Student();
		stu.setId(2);
		stu.setName("jianglinyu");
		stu.setAge(22);
		studentList.add(stu);
	}

	public Student add(Student stu) {
		stu.setId(this.getList().size() + 1);
		getList().add(stu);
		return stu;
	}

	public Student update(Student stu) {
		Student entity = find(stu.getId());
		entity.setAge(stu.getAge());
		entity.setName(stu.getName());
		return entity;
	}

	public void remove(int id) {
		getList().remove(find(id));
	}

	public Student find(int id) {
		for (Student stu : getList()) {
			if (stu.getId() == id) {
				return stu;
			}
		}
		return null;
	}

	public List<Student> getList() {
		return studentList;
	}
}
