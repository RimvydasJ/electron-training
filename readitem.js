const { BrowserWindow } = require('electron')

var offscreenWindow

module.exports = (url, callback) => {
    offscreenWindow = new BrowserWindow({
        width: 500,
        height: 500,
        show:false,
        webPreferences: {
            nodeIntegration: false,
            offscreen:true
        }
    });

    try{
        offscreenWindow.loadURL(url);
    }
    catch(e) {
        console.log(e);
    }
    
    
    offscreenWindow.webContents.on('did-finish-load', e => {
        let title = offscreenWindow.getTitle();
        try {
            offscreenWindow.capturePage().then(image => {
                let screenshot = image.toDataURL();
                callback({ title, screenshot, url });

                offscreenWindow.close();
                offscreenWindow = null;
            })
        }catch (e){
            console.log(e);
        }
       
    });
}