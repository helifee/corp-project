package generics;

//��ʶ����
interface Info2 {
}

//����
class Car<T extends Info2> {
	private T info;

	public T getInfo() {
		return info;
	}

	public void setInfo(T info) {
		this.info = info;
	}
}

class Basic implements Info2 {
	private String name;
	private int age;

	public Basic() {
		super();
	}

	public Basic(String name, int age) {
		super();
		this.name = name;
		this.age = age;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}
	
	public String toString() {
		return "Name: " + this.getName() + ", " + this.getAge();
	}

}

class Contact implements Info2 {
	private String address;
	private String zipcode;

	public Contact() {
		super();
	}

	public Contact(String address, String zipcode) {
		super();
		this.address = address;
		this.zipcode = zipcode;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}
	
	public String toString() {
		return "address: " + this.getAddress() + ", " + this.getZipcode();
	}
}

public class GenericDemo06 {

	public static void main(String[] args) {
		Car<Basic> car = new Car<Basic>();
		car.setInfo(new Basic("��Ʒ�", 20));
		System.out.println(car.getInfo());
		
		Car<Contact> car2 = new Car<Contact>();
		car2.setInfo(new Contact("��ǰվ", "110200"));
		System.out.println(car2.getInfo());

	}

}
