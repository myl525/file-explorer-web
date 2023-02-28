import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const __dirname = path.resolve();
let currentDir = process.cwd();

// middleware
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// routes
app.get('/', (req, res) => {
    res.render('index');
})

// apis
app.get('/api/upDir', (req, res) => {
    const children = getChildren(currentDir);
    res.json({ children });
    currentDir = path.dirname(currentDir);
} )

app.get('/api/childDir', (req, res) => {
    const parent = req.query.dirEntry;
    currentDir = path.dirname(parent);
    const children = getChildren(parent);
    res.json({ children });
})

// helper
const getChildren = (parent) => {
    const items = fs.readdirSync(parent);

    const dirs = items.filter((item) => {
        return item[0] !== '.' && fs.statSync(path.resolve(parent, item)).isDirectory();
    }).map((item) => {
        return path.resolve(parent, item);
    })

    return dirs;
}

app.listen(3000);