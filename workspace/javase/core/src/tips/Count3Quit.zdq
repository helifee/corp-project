package tips;

public class Count3Quit {
	public static void main(String[] args) {
		boolean[] arr = new boolean[1000];
		for(int i=0; i<arr.length; i++) {
			arr[i] = true;
		}
		
		int leftCount = arr.length;
		int count = 0;
		int index = 0;
		
		while(leftCount > 1) {
			if(arr[index] == true) {
				count++;
				if(count ==3) {
					count = 0;
					arr[index] = false;
					leftCount--;
				}
			}
			index++;
			if(index == arr.length) {
				index = 0;
			}
		}
		for(index=0; index<arr.length; index++) {
			if(arr[index] == true)
				System.out.println(index + 1);
		}
	}
}