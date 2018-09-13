package com.helife.command.impl;

import com.helife.command.Command;
import com.helife.command.receiver.Fan;

public class FanOnCommand implements Command {
	
	private Fan fan;
	
	private boolean change;
	
	public FanOnCommand(Fan fan) {
		this.fan = fan;
		this.change = false;
	}

	public void execute() {
		if("off".equals(fan.getState())) {
			change = true;
			fan.start();
		} else {
			change = false;
			System.out.println("The fan is aready started, no action!");
		}
	}

	public void unExecute() {
		if(change) {
			fan.stop();
			System.out.println("==>from undo command!");
		} else {
			System.out.println("The Fan has been started! Undo nothing!");
		}
	}
}
