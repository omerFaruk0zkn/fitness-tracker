import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(`MongoDB bağlantısı kuruldu`);
    })
    .catch((err) => {
      console.error(`MongoDB bağlantı hatası: ${err}`);
      process.exit(1);
    });
};
