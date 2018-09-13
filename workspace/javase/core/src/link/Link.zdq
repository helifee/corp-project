package link;

public class Link {

	private Node root;
	
	public void add(String name) {
		Node newNode = new Node(name);
		if(root == null) {
			root = newNode;
		} else {
			root.addNode(newNode);
		}
	}
	
	public void print() {
		if(root != null) {
			this.root.print();
		}
	}
	
	public boolean search(String name) {
		if(this.root != null) {
			return this.root.search(name);
		} else {
			return false;
		}
	}
	
	public void delete(String name) {
		if(this.search(name)) {
			if(this.root.getName().equals(name)) {
				if(this.root.getNext() != null) {
					this.root = this.root.getNext();
				} else {
					this.root = null;
				}
			} else {
				this.root.getNext().deleteNode(root, name);
			}
		}
	}

	public Node getRoot() {
		return root;
	}

	public void setRoot(Node root) {
		this.root = root;
	}
}
