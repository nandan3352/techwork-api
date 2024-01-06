const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI_1)
        console.log(`mongodb connnection is successful`)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB