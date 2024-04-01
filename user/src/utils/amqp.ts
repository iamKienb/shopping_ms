import * as amqp from "amqplib";
import config from "../config";
import UserService from "../services/user.service";
// =============================== message broker  ==========================//
//create channel
const MESSAGE_BROKER_URL = config.app.MESSAGE_BROKER_URL
const EXCHANGE_NAME = config.app.EXCHANGE_NAME

const createChannel = async () =>{
    try{
        const connection = await amqp.connect(MESSAGE_BROKER_URL)
        const channel = await  connection.createChannel()
        await channel.assertExchange(EXCHANGE_NAME, 'direct', {
            durable: false,
        })
        return channel
    }catch(err){
        throw err
    }

}

//publish message
const publicMessage = async (channel:amqp.Channel, binding_key:string, message:any) =>{
    try{
        console.log("START PUBLISH");
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message))
    }catch(err){
        throw err
    }
}

//subscribe message 

const subscribeMessage = async (channel: amqp.Channel, service: typeof UserService  ) =>{
    console.log("START CONSUME");
    const appQueue = await channel.assertQueue(config.app.QUEUE_NAME)
    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, config.app.USER_BINDING_KEY)
    channel.consume(appQueue.queue, (data) =>{
        if(data){
            console.log('received data')
            service.subscribeEvents(data.content.toString());
            channel.ack(data);
        }else{
            console.log("Consume fail");
        }
    })
}

export {
    createChannel,
    publicMessage,
    subscribeMessage
}