package io.Serializable;

import java.io.File;
import java.io.FileOutputStream;
import java.io.ObjectOutputStream;

public class SerilizableDemo {
	
//����������һ���������л�ʱ��ֻ�������ķǾ�̬��Ա���������ܱ����κεĳ�Ա�����;�̬�ĳ�Ա������
//�����������һ������ĳ�Ա������һ��������ô����������ݳ�ԱҲ�ᱻ���档
//�����������һ�������л��Ķ�����ĳ���������л��Ķ�������ã���ô������л���������ʧ�ܣ�
//		���һ��׳�һ��NotSerializableException�����ǿ��Խ�������ñ��Ϊtransient����ô������Ȼ�������л�

	public static void main(String[] args) throws Exception{
		File file = new File("f:" + File.separator + "person.ser");
		ObjectOutputStream oos= null;
		oos = new ObjectOutputStream(new FileOutputStream(file));
		oos.writeObject(new Person("zhangsan", 20));
		oos.close();
	}

}

//1��Java��RMI(remote method invocation).RMI�������ڱ�����һ�����Զ�̻����ϵĶ��󡣵�������Ϣ��Զ�̶���ʱ������Ҫ�õ�serializaiton���������Ͳ���ͽ��շ���ֱ�� 
//
//2��Java��JavaBeans.   Bean��״̬��Ϣͨ���������ʱ���õġ�Bean��״̬��Ϣ���뱻���������Ա㵱��������ʱ�ָܻ���Щ״̬��Ϣ����Ҳ��Ҫserializaiton���ơ� 

//public interface Externalizable extends java.io.Serializable
