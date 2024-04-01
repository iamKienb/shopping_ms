import dotenv from "dotenv";
dotenv.config();

export default{
    app:{
        port:process.env.PORT!,
        private_key:process.env.KEY_SECRET!,
        MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL!,
        EXCHANGE_NAME: process.env.EXCHANGE_NAME!,
        USER_BINDING_KEY: process.env.USER_BINDING_KEY!,
        SHOPPING_BINDING_KEY: process.env.SHOPPING_BINDING_KEY!,
        QUEUE_NAME: process.env.QUEUE_NAME!,

    },
    db:{
        url: process.env.DB_URL!,
    }

}
