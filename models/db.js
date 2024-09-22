const mongoose = require("mongoose")


// MongoDB connection
 /*
mongoose.createConnection('mongodb://0.0.0.0:27017/Bajaj', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


    */

const conn = mongoose.createConnection('mongodb://0.0.0.0:27017/Bajaj');
conn.on('connected', () => {
  console.log('Mongoose connected mongodb');
});
conn.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});



const userSchema = new mongoose.Schema({
    full_name: String,
    dob: String,
    email: String,
    roll_number: String
});

const User = conn.model('User', userSchema);


module.exports = {User, conn}