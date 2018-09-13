package pattern.observer;

import java.util.Observable;

public class House extends Observable {
	private float price;

	public House(float price) {
		this.price = price;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
		super.setChanged();
		super.notifyObservers(price);
	}
}
