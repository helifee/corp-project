package com.helifee.old;
public class Count3Quit2 {
	public static void main(String[] args) {
		KidCircle kc = new KidCircle(500);
		int counter = 0;
		Kid k = kc.first;
		
		while(kc.count > 1) {
			counter++;
			if(counter == 3) {
				counter = 0;
				kc.delete(k);
			}	
			k = k.right;
		}
		
		System.out.println(kc.first.id);
	}
}

class Kid {
	int id;
	Kid left;
	Kid right;
}

class KidCircle {
	int count = 0;
	Kid first, last;
	
	KidCircle(int n) {
		for(int i=0; i<n; i++) {
			add();
		}
	}
	
	void add() {
		Kid k = new Kid();
		k.id = count;
		if(count <= 0) {
			k.left = k;
			k.right = k;
			first = k;
			last = k;
		}
		else {
			k.left = last;
			last.right = k;
			k.right = first;
			first.left = k;
			last = k;
		}
		count++;
	}
	
	void delete(Kid k) {
		if(count <= 0) return;
		else if(count == 0) {
			first = last = null;
		}
		else {
			k.left.right = k.right;
			k.right.left = k.left;
		}
		
		if(k == first) {
			first = k.right;
		} else if(k == last) {
			last = k.left;
		}
		count--;
	}
}