package tips;

//???

class BinTree {
	String data;
	BinTree left = null;
	BinTree right = null;
	
	BinTree(String s) {
		data = s;
		left = null;
		right = null;
	}
	
	BinTree(String s, BinTree l, BinTree r) {
		data = s;
		left = l;
		right = r;
	}
	void preorder() {  //pre-order traversal
		if(this != null) {
			System.out.print(" " + data);
			if(left != null)
				left.preorder();
			if(right != null)
				right.preorder();
		}
	}
	void middleOrder() {
		if(this != null) {
			if(this.left != null) {
				this.left.middleOrder();
			}
			System.out.print(" " + data);
			if(this.right != null) {
				this.right.middleOrder();
			}
		}
	}
	void postorder() {  //post-order traversal
		if(this != null) {
			if(left != null)
				left.postorder();
			if(right != null)
				right.postorder();
			System.out.print(" " + data);
		}
	}
	public static void main(String[] args) {
		BinTree a = new BinTree("X");
		BinTree b = new BinTree("12");
		BinTree c = new BinTree("Y");
		BinTree d = new BinTree("+", a, b);
		BinTree e = new BinTree("/", d, c);
		
		e.preorder();
		System.out.println();
		e.postorder();
		System.out.println();
		e.middleOrder();
		
	}
}