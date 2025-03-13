const fs = require('fs');
const path = require('path');
const filepath = path.join(__dirname, 'counters.json');

function writeInfo(page, counter) {
    let data = {};
    if (fs.existsSync(filepath)) {
        data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    }
    data[page] = counter;
    try {
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Ошибка при записи файла:', err);
    }
}

function readInfo(page) {
    if (fs.existsSync(filepath)) {
        const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
        if (data[page]) {
            return data[page];
        }
        return 0;
    } else {
        writeInfo(page, 0);
    }
}

function changeInfo(page, counter) {
    let data = {};
    if (fs.existsSync(filepath)) {
        data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    }
    data[page] = (data[page] || 0) + counter;
    try {
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Ошибка при записи файла:', err);
    }
}

module.exports = { changeInfo, readInfo, writeInfo };