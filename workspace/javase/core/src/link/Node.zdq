package link;

public class Node {

	private String name;
	
	private Node next;

	public Node(String name) {
		super();
		this.name = name;
	}
	
	public void addNode(Node node) {
		if(this.next == null) {
			this.next = node;
		} else {
			this.next.addNode(node);
		}
	}

	public void deleteNode(Node preNode, String name) {
		if(this.name.equals(name)) {
			preNode.next = this.next;
		} else {
			this.next.deleteNode(this, name);
		}
	}

	public boolean search(String name) {
		if(this.name.equals(name)) {
			return true;
		} else {
			if(this.next != null) {
				return this.next.search(name);				
			} else {
				return false;
			}
		}
	}

	public void print() {
		System.out.print(this.getName() + "-->");
		if(this.next != null) {
			this.next.print();
		}
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Node getNext() {
		return next;
	}

	public void setNext(Node next) {
		this.next = next;
	}
}
