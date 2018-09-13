package com.xinleju.platform.univ.mq;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.util.BeanUtil;
import com.mysql.fabric.xmlrpc.base.Array;
import com.xinleju.platform.base.utils.DubboServiceResultInfo;
import com.xinleju.platform.tools.data.JacksonUtils;
import com.xinleju.platform.univ.mq.dto.MessageDto;
import com.xinleju.platform.univ.mq.dto.TopicDto;
import com.xinleju.platform.univ.mq.dto.service.TopicDtoServiceCustomer;
import com.xinleju.platform.univ.mq.entity.Message;
import com.xinleju.platform.univ.mq.entity.Topic;
import com.xinleju.platform.univ.mq.service.MessageSender;
import com.xinleju.platform.univ.mq.service.MessageService;
import com.xinleju.platform.univ.mq.service.TopicService;
import com.xinleju.platform.univ.mq.utils.ConfigConstant;
import com.xinleju.platform.utils.SpringContextHelper;
import com.xinleju.tend.server.dto.service.TendTopicDtoServiceCustomer;
import com.xinleju.tend.server.dto.service.TendTrialDtoServiceCustomer;

@Service
public class MessageSenderImpl implements MessageSender {

	private static Logger log = Logger.getLogger(MessageSenderImpl.class);
    
	@Autowired
	private MessageService messageService;
	
	@Autowired
	private TopicService topicService;
	@Autowired
	private TendTopicDtoServiceCustomer tendTopicDtoServiceCustomer;
										
	
	//@Autowired
	//private AmqpTemplate amqpTemplate;
	
	
	
	/**
     * 预备发布
     * @param userInfo
     * @param mqMessage     消息对应的类名称
     * @return
     */
    public String preSendMessage(String userInfo,String topic ,String mqMessage) throws Exception {//Message
    	List<Topic> list = new ArrayList<Topic>();
    	Map<String, String> map = new HashMap<String, String>();
    	map.put("topic", topic);
    	String paramaterJson = JacksonUtils.toJson(map);
    	String dubboResultInfo=tendTopicDtoServiceCustomer.queryList(userInfo, paramaterJson);
	    DubboServiceResultInfo dubboServiceResultInfo= JacksonUtils.fromJson(dubboResultInfo, DubboServiceResultInfo.class);
	    if(dubboServiceResultInfo.isSucess()){
			String resultInfo= dubboServiceResultInfo.getResult();
			list=JacksonUtils.fromJson(resultInfo, ArrayList.class,Topic.class);
	    }
        //验证topic是否存在
        Topic mqTopic = list.get(0);

        if(mqTopic == null ){
            throw  new Exception("没有查到topic");
        }
        
        //转化成类
//        Message mqMessageEntity= JacksonUtils.fromJson(userInfo, Message.class);
        Message mqMessageEntity= new Message();
        mqMessageEntity.setId( UUID.randomUUID().toString());
        mqMessageEntity.setDelflag(false);
        mqMessageEntity.setIsReSend(0);
        mqMessageEntity.setTopic(mqTopic.getTopic());
        mqMessageEntity.setTopicId(mqTopic.getId());
        mqMessageEntity.setBody(mqMessage);//保存要发布的信息
        mqMessageEntity.setState(MessageDto.MqMessageState_PreSend);
        //        类转字符串
         mqMessage= JacksonUtils.toJson(mqMessageEntity);
        messageService.save(mqMessageEntity);

        return String.valueOf(mqMessage);
    }


    public String doSendMessage(String userInfo,String messageId) throws Exception {
        DubboServiceResultInfo result=new DubboServiceResultInfo();
       
        try {
        	Message message = messageService.getObjectById(messageId);
        	
            String mpTopic = tendTopicDtoServiceCustomer.getObjectById(userInfo,"{\"id\":\""+message.getTopicId()+"\"}");
            
            Topic tempTopic = null;
			DubboServiceResultInfo dubboServiceResultInfo= JacksonUtils.fromJson(mpTopic, DubboServiceResultInfo.class);
			if(dubboServiceResultInfo.isSucess()){
				String resultInfo= dubboServiceResultInfo.getResult();
				tempTopic = JacksonUtils.fromJson(resultInfo, Topic.class);
			}
            String queueName = String.format("Queue_%s_%s",tempTopic.getTendId()==null?"":tempTopic.getTendId(),tempTopic.getTopic());
            String queueKey = String.format("%s%s",queueName,"_KEY");//这是创建rabbit:binding时约定的
            /**
             * 先置消费状态，再发送
             */
            message.setState(MessageDto.MqMessageState_PreSend);
            //为本消息封装一下用户信息
            MessageDto MessageDto = new MessageDto();
            MessageDto.setUserInfo(userInfo);
            BeanUtils.copyProperties(message, MessageDto);
            
            String mqMessage= JacksonUtils.toJson(MessageDto);
            AmqpTemplate amqpTemplate = (AmqpTemplate) SpringContextHelper.getBean(ConfigConstant.RABBIT_TEMPLATEID);

            //修改数据库状态
            messageService.update(message);

            /*
             * convertAndSend：将Java对象转换为消息发送到匹配Key的交换机中Exchange，由于配置了JSON转换，这里是将Java对象转换成JSON字符串的形式。
             */
            amqpTemplate.convertAndSend(queueKey,MessageDto);
            result.setSucess(true);
            result.setResult(JacksonUtils.toJson(mqMessage));

            result.setMsg("发送成功");
        } catch (Exception e) {
			 log.error("发送消息失败!"+e.getMessage());
			 result.setSucess(false);
			 result.setMsg("删发送消息失败!");
			 result.setExceptionMsg(e.getMessage());
		}

        return JacksonUtils.toJson(result);
    }

}
