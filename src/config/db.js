import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MongoDB_URI);

        console.log(`MongoDB Connected Successfully..`);
    }catch(err){
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}