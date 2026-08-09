// const path = require('path');
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');

// connectDB();

// const app = express();

// app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
// app.use(express.json({ limit: '5mb' }));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.get('/api/health', (req, res) => res.json({ ok: true, message: 'API is running' }));

// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/settings', require('./routes/settings.routes'));
// app.use('/api/sections', require('./routes/sections.routes'));
// app.use('/api/work', require('./routes/work.routes'));
// app.use('/api/testimonials', require('./routes/testimonials.routes'));
// app.use('/api/contact', require('./routes/contact.routes'));
// app.use('/api/upload', require('./routes/upload.routes'));

// app.use('/api', (req, res) => res.status(404).json({ message: 'Not found' }));

// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(err.status || 500).json({ message: err.message || 'Server error' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const path = require('path');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || '*'
}));

app.use(express.json({ limit: '5mb' }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.json({
        ok: true,
        message: 'API is running'
    });
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/settings', require('./routes/settings.routes'));
app.use('/api/sections', require('./routes/sections.routes'));
app.use('/api/work', require('./routes/work.routes'));
app.use('/api/testimonials', require('./routes/testimonials.routes'));
app.use('/api/contact', require('./routes/contact.routes'));
app.use('/api/upload', require('./routes/upload.routes'));

app.use('/api', (req, res) => {
    res.status(404).json({
        message: 'Not found'
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        message: err.message || 'Server error'
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
    }
};

startServer();
