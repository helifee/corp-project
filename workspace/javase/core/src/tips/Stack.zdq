package tips;

class Stack {
	int[] a = new int[100];
	int top;
	
	Stack() {
		top = 0;
	}
	void reset() {
		top = 0;
	}
	void push(int c) {
		if(top == 100) {
			System.out.println("Error : Stackflow!");
			return;
		}
		a[top] = c;
		top++;
	}
	int pop() {
		top--;
		if(top < 0) {
			System.out.println("Error : No element!");
			return -1;
		}
		return a[top];
	}
	boolean full() {
		if(top == 100)
			return true;
		else
			return false;
	}
	
	public static void main(String[] args) {
		Stack s = new Stack();
		
		for(int i=0; i<100; i++) {
			s.push(i);
		}
		System.out.println(s.full());
		System.out.println(s.top);
		while(s.top > 0) {
			System.out.print(s.pop() + " ");
		}
	}
}