package com.helife.command.invoker;

import java.util.Vector;

import com.helife.command.Command;

public class Dealer {

	private Vector<Command> commands = new Vector<Command>();
	
	public void deal(Command command) {
		this.commands.addElement(command);
		command.execute();
	}

	public boolean unDeal() {
		int size = this.commands.size();
		if(size > 0) {
			commands.get(size - 1).unExecute();
			commands.remove(size - 1);
			return true;
		} else {
			return false;
		}
	}
	
}
