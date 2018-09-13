package com.xinleju.platform.sys.res.utils;
public class InvalidCustomException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	private int code;
	private String msg;
	
	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	

	public InvalidCustomException() {
		super();
	}
	
	public InvalidCustomException(String s) {		
		super(s);
		this.msg=s;
	}
	
	public InvalidCustomException(int code,String s) {		
		super(s);
		this.code=code;
		this.msg=s;
	}
	
	public InvalidCustomException(Throwable t) {
		super(t);
	}
	
	public InvalidCustomException(String msg, Throwable t) {
		super(msg, t);
		this.msg=msg;
	}
	

}
