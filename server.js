const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res) => {
    const filePath = path.join(__dirname, 'public', req.url);
    const contentType = getContentType(filePath);

    res.sendFile(filePath, { headers: { 'Content-Type': contentType } }, (err) => {
        if (err) {
            res.status(404).send(`File ${req.url} not found`);
        }
    });
});

function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'application/javascript';
        default:
            return 'text/plain';
    }
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
