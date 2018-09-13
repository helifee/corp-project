package strategy.discount;

public class FlatRateStrategy extends DiscountStrategy {
	
	private int copies;
	private double amount;

	public FlatRateStrategy(double amount, int copies) {
		this.amount = amount;
		this.copies = copies;
	}

	@Override
	public double caculateDiscount() {
		return amount * copies;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

}
