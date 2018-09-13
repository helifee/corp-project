package oo.supermarket;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class SuperMarket {

	private List<Good> allGoods;
	
	public SuperMarket() {
		this.allGoods = new ArrayList<Good>();
	}
	
	public void add(Good good) {
		this.allGoods.add(good);
	}
	
	public void delete(Good good) {
		this.allGoods.remove(good);
	}
	
	public List<Good> search(String keyWord) {
		List<Good> temp = new ArrayList<Good>();
		
		Iterator<Good> iter = this.allGoods.iterator();
		while(iter.hasNext()) {
			Good good = iter.next();
			if(good.getName().indexOf(keyWord) != -1) {
				temp.add(good);
			}
		}
		return temp;
	}
	
	public List<Good> getAllGoods() {
		return this.allGoods;
	}
}
