package com.test.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

public class RegisterAction extends ActionSupport
{
	private String username;

	private String password;

	private String repassword;

	private int age;

	private Date birthday;

	private Date graduation;

	public String getUsername()
	{
		return username;
	}

	public void setUsername(String username)
	{
		this.username = username;
	}

	public String getPassword()
	{
		return password;
	}

	public void setPassword(String password)
	{
		this.password = password;
	}

	public String getRepassword()
	{
		return repassword;
	}

	public void setRepassword(String repassword)
	{
		this.repassword = repassword;
	}

	public int getAge()
	{
		return age;
	}

	public void setAge(int age)
	{
		this.age = age;
	}

	public Date getBirthday()
	{
		return birthday;
	}

	public void setBirthday(Date birthday)
	{
		this.birthday = birthday;
	}

	public Date getGraduation()
	{
		return graduation;
	}

	public void setGraduation(Date graduation)
	{
		this.graduation = graduation;
	}

	@Override
	public String execute() throws Exception
	{
		return SUCCESS;
	}
	
	public String test() throws Exception
	{
		return SUCCESS;
	}
	
	
//	public String abc() throws Exception
//	{
//		System.out.println("abc method invoked");
//		
//		return SUCCESS;
//	}
//	
//	public void validateAbc()
//	{
//		System.out.println("validateAbc() invoked");
//	}
//	

	@Override
	@SuppressWarnings("unchecked")
	public void validate()
	{
		System.out.println("validate~~~~~~~~~~~~~~~~~~~");
		
		
		//this.addFieldError("username","aaaaaaaaaaaaaaaa");
		
		
		//this.getFieldErrors().put("username","bbbbbbbbbbbbb");
		

		if (null == username || username.length() < 6 || username.length() > 10)
		{
			List list = new ArrayList();
			
			list.add(username);
			
			this.addActionError(this.getText("username.invalid",new String[]{username}));
		}
//		if (null == password || password.length() < 6 || password.length() > 10)
//		{
//			this.addActionError("password invalid");
//		}
//		else if (null == repassword || repassword.length() < 6
//				|| repassword.length() > 10)
//		{
//			this.addActionError("re-password invalid");
//		}
//		else if (!password.equals(repassword))
//		{
//			this.addActionError("two passwords not the same");
//		}
//		if (age <= 0 || age > 150)
//		{
//			this.addActionError("age should be between 1 and 150");
//		}
//
//		if (null != birthday && null != graduation)
//		{
//			Calendar c1 = Calendar.getInstance();
//			c1.setTime(birthday);
//
//			Calendar c2 = Calendar.getInstance();
//			c2.setTime(graduation);
//
//			if (!c1.before(c2))
//			{
//				this.addActionError("birthday should be before graduation");
//			}
//		}

	}
}
