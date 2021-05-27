let items = document.getElementById("items");
const { shell } = require('electron');
let fs = require('fs')
let readerJS

fs.readFile(`${__dirname}/reader.js`, (err, data) => {
    readerJS = data.toString();
});

window.addEventListener('message', e => {
    
    if(e.data.action === 'delete-reader-item'){
        this.delete(e.data.itemIndex)
        e.source.close();
    }
});

exports.delete = itemIndex => {
    let realIndex = itemIndex;
    items.removeChild(items.childNodes[realIndex+1]);
    this.storage.splice(realIndex, 1);
    this.save();
    if(this.storage.length){
        let newSelectedItemIndex = (realIndex === 0) ? 0 : realIndex-1;
        document.getElementsByClassName('read-item')[newSelectedItemIndex].classList.add('selected');
    }
}

exports.getSelectedItem = () => {
    let currentItem = document.getElementsByClassName('read-item selected')[0]

    let itemIndex = 0
    let child = currentItem

    while((child = child.previousElementSibling) != null){
        itemIndex++;
    }

    return {node:currentItem, index:itemIndex};
}

exports.storage = JSON.parse(localStorage.getItem('readit-items')) || [];

exports.save = () => {
    localStorage.setItem('readit-items', JSON.stringify(this.storage));
}


exports.select = e => {
    document.getElementsByClassName("read-item selected")[0].classList.remove("selected");

    e.currentTarget.classList.add("selected");
}

exports.open = () => {
    if(!this.storage.length) return;

    let selectedItem = this.getSelectedItem();

    let contentUrl = selectedItem.node.dataset.url;

    let readerWin = window.open(contentUrl, '',`
        maxWidth=2000,
        maxHeight=2000,
        width=1200,
        height=800,
        backgroundColor=#DEDEDE,
        nodeIntegration=0,
        contextIsolation=1
    `);

    readerWin.eval(readerJS.replace('{{index}}', selectedItem.index));
}

exports.changeSelection = key => {
    let current = document.getElementsByClassName("read-item selected")[0];

    if(key === 'ArrowUp' && current.previousElementSibling){
        current.classList.remove('selected');
        current.previousSibling.classList.add('selected');
    }
    else if(key === 'ArrowDown' && current.nextElementSibling){
        current.classList.remove('selected');
        current.nextSibling.classList.add('selected');
    }
}

exports.itemAdd = (item, isNew=false) => {
    let itemNode = document.createElement('div');
    itemNode.setAttribute('class', 'read-item');
    itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2>`
    itemNode.setAttribute('data-url', item.url);

    itemNode.addEventListener('dblclick', this.open);
    items.appendChild(itemNode);

    itemNode.addEventListener('click',this.select);

    if(document.getElementsByClassName('read-item').length === 1){
        itemNode.classList.add("selected");
    }

    if (isNew) {
        this.storage.push(item); 
        this.save();
    }

}

exports.openNative = () => {
    if(!this.storage.length) return;

    let selectedItem = this.getSelectedItem();

    shell.openExternal(selectedItem.node.dataset.url);
}

this.storage.forEach(item => {
    this.itemAdd(item);
})