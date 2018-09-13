package strategy.discount;

public class PercentageDiscountStrategy extends DiscountStrategy {
	
	private double price;
	private int copies;
	private double percent;

	public PercentageDiscountStrategy(double price, int copies) {
		super();
		this.price = price;
		this.copies = copies;
	}

	@Override
	public double caculateDiscount() {
		return price * percent * copies;
	}

	public double getPercent() {
		return percent;
	}

	public void setPercent(double percent) {
		this.percent = percent;
	}

}
