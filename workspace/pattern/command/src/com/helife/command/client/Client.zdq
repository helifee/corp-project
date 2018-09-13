package com.helife.command.client;

import com.helife.command.Command;
import com.helife.command.impl.FanOnCommand;
import com.helife.command.invoker.Dealer;
import com.helife.command.receiver.Fan;

public class Client {

	public static void main(String[] args) {
		Fan fan = new Fan();
		
		Dealer dealer = new Dealer();
		
		Command command = new FanOnCommand(fan);
		
		dealer.deal(command);
		
		while(dealer.unDeal());
	}

}
