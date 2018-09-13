package com.helife.pattern.factory.abstractfactory;

public class MainClass {
	public static void main(String[] args) throws Exception {
		FruitFactory ff = new NorthFruitFactory();
		Fruit apple = ff.getApple();
		apple.get();
		Fruit banana = ff.getBanana();
		banana.get();
		
		FruitFactory ff2 = new SouthFruitFactory();
		Fruit apple2 = ff2.getApple();
		apple2.get();
		Fruit banana2 = ff2.getBanana();
		banana2.get();
	}
}
