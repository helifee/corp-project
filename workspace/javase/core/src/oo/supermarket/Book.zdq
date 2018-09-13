package oo.supermarket;

public class Book implements Good{

	private String name;
	private double price;
	private int count;

	public Book() {
		super();
	}

	public Book(String name, double price, int count) {
		super();
		this.name = name;
		this.price = price;
		this.count = count;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	@Override
	public int hashCode() {
		return this.name.hashCode() + new Integer(this.count).hashCode()
				+ new Double(this.price).hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}

		if (!(obj instanceof Book)) {
			return false;
		}

		Book b = (Book) obj;
		if (this.getName().equals(b.getName())
				&& this.getPrice() == b.getPrice()
				&& this.getCount() == b.getCount()) {
			return true;
		} else {
			return false;
		}
	}

	public String toString() {
		return "书名：" + this.name + "; 价格：" + this.price + "; 数量：" + this.count;
	}
}
