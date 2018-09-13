package basic.exception;

class MyException extends Exception {

	private static final long serialVersionUID = -294527828489729155L;

	MyException(String msg) {
		super(msg);
	}
}

public class MyExceptionDemo {

	public static void main(String[] args) {
		try {
			throw new MyException("自定义异常");
		} catch (MyException e) {
			e.printStackTrace();
		} finally {
		}
	}

}
