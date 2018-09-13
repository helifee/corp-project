package com.xinleju.platform.univ.mq;


import com.xinleju.platform.univ.mq.service.MessageConsumer;

public class MessageConsumerImpl implements MessageConsumer {

	@Override
    public Boolean doConsumer(String message) {
        System.out.println("begin consume message");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return true;
    }

	@Override
    public Boolean doValidateConsumed(String message) {
        return true;
    }


}
