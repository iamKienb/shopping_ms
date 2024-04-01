import * as amqp from "amqplib";
import config from "../config";
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
const publicMessage = async (channel:amqp.Channel, binding_key:string, message:string) =>{
    try{
        console.log("START PUBLISH");
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message))
        console.log("Message has been seen" + message)
    }catch(err){
        throw err
    }
}

//subscribe message 


export {
    createChannel,
    publicMessage,
   
}