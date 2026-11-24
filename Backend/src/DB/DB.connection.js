import mongoose from "mongoose"

export const connectDB =async () =>
{
    try {
        await mongoose.connect(process.env.DB_URI, { retryWrites: false })
        console.log("DB Connected Successfully")
    } catch (error) {
        console.log("Connection To DB Failed",error)
        throw error
    }
}
