package io.outputstream;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class Test {

	public static void main(String[] args) throws Exception {

		String s = "Hello world";
		byte[] arr = s.getBytes();
		
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ObjectOutputStream oos = new ObjectOutputStream(baos);
		oos.writeObject(arr);
		arr = baos.toByteArray();

		ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(
				arr));
		
		Object obj = ois.readObject();
	}
}
