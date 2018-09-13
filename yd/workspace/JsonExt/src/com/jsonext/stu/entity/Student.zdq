package com.jsonext.stu.entity;

import net.sf.json.JSONObject;

public class Student {
	private Integer id;
	private String name;
	private Integer age;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	/**
	 * @date Jan 20, 2008
	 * @author kst-23
	 * @param args
	 */
	public static void main(String[] args) {
		Student stu = new Student();
		stu.setId(1);
		stu.setAge(20);
		stu.setName("linlinyu");
		JSONObject json = JSONObject.fromObject(stu);
		System.out.println(json);
	}

}
