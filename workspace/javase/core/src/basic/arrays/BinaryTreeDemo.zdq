package basic.arrays;

@SuppressWarnings("unchecked")
class BinaryTree {
	class Node {
		
		private Comparable data;
		private Node left;
		private Node right;

		public Node(Comparable data) {
			this.data = data;
		}
		
		public void addNode(Node other) {
			if(other.data.compareTo(this.data) <= 0) {	//����������
				if(this.left == null) {
					this.left = other;
				} else {
					this.left.addNode(other);
				}
			}
			if(other.data.compareTo(this.data) > 0) {	//����������
				if(this.right == null) {
					this.right = other;
				} else {
					this.right.addNode(other);
				}
			}
		}
		
		public void printNode() {
			if(this.left != null) {
				this.left.printNode();
			}
			System.out.println(this.data);
			if(this.right != null) {
				this.right.printNode();
			}
		}
	}
	
	private Node root;
	
	public void add(Comparable data) {
		Node newNode = new Node(data);
		if(this.root == null) {
			this.root = newNode;
		} else {
			this.root.addNode(newNode);
		}
	}
	
	public void print() {
		if(this.root != null) {
			this.root.printNode();
		}
	}
}

public class BinaryTreeDemo {
	public static void main(String[] args) {
		BinaryTree bt = new BinaryTree();
		
		bt.add(3);
		bt.add(32);
		bt.add(3);
		bt.add(33);
		bt.add(13);
		bt.add(30);
		
		//�����Լ�String���͵Ļ����������ͣ����Ƕ�ʵ����Comparable
		Comparable<String> test = "Hello";
		System.out.println(test);
		
		bt.print();
	}
}
