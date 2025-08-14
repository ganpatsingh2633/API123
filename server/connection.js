const mongoose = require('mongoose');


const uri = 'mongodb+srv://ganpat123:UwDfcv98jCAGiw19@cluster0.qr2xvhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas!'))
.catch((err) => console.error('Connection error:', err));
};

module.exports = connectDB;