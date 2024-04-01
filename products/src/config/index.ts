import dotenv from "dotenv";
dotenv.config();

export default{
    app:{
        port:process.env.PORT!,
        private_key:process.env.KEY_SECRET!,
        MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL!,
        EXCHANGE_NAME: process.env.EXCHANGE_NAME!,
        SHOPPING_BINDING_KEY: process.env.SHOPPING_BINDING_KEY!,
        USER_BINDING_KEY: process.env.USER_BINDING_KEY!
    },
    db:{
        url: process.env.DB_URL!,
    }

}
