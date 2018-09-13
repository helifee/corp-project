package com.jsonext.stu.web.action;

import java.util.List;
import java.util.StringTokenizer;

import net.sf.json.JSONObject;

import com.jsonext.stu.dao.StudentDao;
import com.jsonext.stu.entity.Student;
import com.jsonext.util.ListRange;
import com.jsonext.web.action.BaseAction;

/**
 * 
 * yulinlincom@gmail.com
 * @author linlin yu
 * @version 1.0
 */
public class StudentAction extends BaseAction {
	private Integer id;
	private String name;
	private Integer age;
	StudentDao studentDao = StudentDao.getStudentDao();

	public void doDelete() {
		String ids = getRequest().getParameter("ids");
		StringTokenizer st = new StringTokenizer(ids, ",");
		while (st.hasMoreElements()) {
			String id = (String) st.nextElement();
			studentDao.remove(Integer.valueOf(id));

		}
		ListRange result = new ListRange();
		//result.setSuccess(false);
		//result.setMessage("delete failure");
		result.setSuccess(true);//try set false
		outJson(result);
	}

	public void doSave() {
		ListRange<Student> stuList = new ListRange<Student>();
		Student stu = new Student();
		stu.setId(this.id);
		stu.setAge(this.age);
		stu.setName(this.name);
		if (stu.getId() == null) {
			studentDao.add(stu);
		} else {
			studentDao.update(stu);
		}
		stuList.getList().add(stu);
		stuList.setSuccess(true);//try set false
		outJson(stuList);
	}

	public void doGetStudent() {
		ListRange<Student> stuList = new ListRange<Student>();
		Student stu = studentDao.find(this.id);
		stuList.getList().add(stu);
		stuList.setSuccess(true);//try set false
		outJson(stuList);
	}

	public void doGetStudentList() {
		ListRange<Student> stuList = new ListRange<Student>();
		List<Student> list = studentDao.getList();
		stuList.setList(list);
		stuList.setTotalSize(list.size());
		outJson(stuList);
	}

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
	 * @author linlinyu
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
