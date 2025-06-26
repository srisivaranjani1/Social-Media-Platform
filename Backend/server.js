require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('./config/passport'); 

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/auth'));          
app.use('/api/auth', require('./routes/googleAuth')); 

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});