package tips;

import java.util.Scanner;

abstract class AbstractGuessGame {
	private int number;
	
	public void setNumber(int number) {
		this.number = number;
	}
	
	public void start() {
		showMessage("Welcome!");
		int guess = 0;
		
		do {
			guess = getUserInput();
			if(guess > number) {
				showMessage("��������ֽϴ�");
			}
			else if(guess < number) {
				showMessage("��������ֽ�С");
			}
			else {
				showMessage("�������");
			}
		} while(guess != number);
	}	
		
		protected abstract void showMessage(String message);
		protected abstract int getUserInput();
}

class TextModeGame extends AbstractGuessGame {
	private Scanner scanner;
	
	public TextModeGame() {
		scanner = new Scanner(System.in);
	}
	
	protected void showMessage(String message) {
		for(int i=0; i<message.length(); i++) {
			System.out.print("*");
		}
		System.out.println("\n" + message);
		for(int i=0; i<message.length(); i++) {
			System.out.print("*");
		}
	}
	
	protected int getUserInput() {
		System.out.print("\n��������: ");
		return scanner.nextInt();
	}
}

public class GuessGame {
	public static void main(String[] args) {
		AbstractGuessGame guessGame = new TextModeGame();
		guessGame.setNumber(50);
		guessGame.start();
	}
}