package oo.list.demo2;

public class Link {
	
	class Node {
		private String name;
		private Node next;
		
		public Node(String name) {
			this.name = name;
		}
		
		public void add(Node node) {
			if(this.next == null) {
				this.next = node;
			} else {
				this.next.add(node);
			}
		}
		
		public void print() {
			System.out.print(this.name + " --> ");
			if(this.next != null) {
				this.next.print();
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
		
		public void delete(Node preNode, String name) {
			if(this.name.equals(name)) {
				preNode.next = this.next;
			} else {
				this.next.delete(this, name);
			}
		}
	}
	
	private Node root;
	
	public void add(String name) {
		Node node = new Node(name);
		if(null == root) {
			this.root = node;
		} else {
			this.root.add(node);
		}
	}
	
	public void print() {
		if(this.root != null) {
			this.root.print();
		}
	}
	
	public boolean search(String name) {
		if(null == root) {
			return false;
		} else {
			return this.root.search(name);
		}
	}
	
	public void delete(String name){
		if(this.search(name)) {
			if(this.root.name.equals(name)) {
				if(this.root.next == null) {
					this.root = null;
				} else {
					this.root = this.root.next;
				}
			} else {
				if(this.root.next != null){
					this.root.next.delete(root, name);
				}
			}
		}
	}
	
	public static void main(String[] args) {
		Link link = new Link();
		link.add("Root");
		link.add("node1");
		link.add("node2");
		link.add("node3");
		link.add("node4");
		link.print();
		System.out.println();
		link.delete("node3");
		link.delete("Root");
		link.print();
//		System.out.println(link.search("node44"));
		
	}

}
