package com.xinleju.platform.univ.mq.service;

/**
 * 消息发送处理接口
 * @author hao
 *
 */
public interface MessageSender {
    
    
    /**
     * 预发布某个消息
     * @param userInfo
     * @param topic
     * @param mqMessage     消息对应的类名称
     * @return
     */
    public String preSendMessage(String userInfo, String topic, String mqMessage) throws Exception;

    /**
     * 实际发送某个消息
     * @param messageId
     * @return
     */
    public String doSendMessage(String userInfo, String messageId) throws Exception;
}
