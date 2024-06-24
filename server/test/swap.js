import { log } from 'console';
import fs from 'fs'
var obj = JSON.parse(fs.readFileSync('../Jsons/countries.json', 'utf8'));
function swapValues(o) {
    const res = {};
    Object.keys(o).forEach(key => {
        res[o[key]] = key;
    });
    return res;
}
function GFG_Fun() {
    console.log(JSON.stringify(swapValues(obj)));
}
GFG_Fun()