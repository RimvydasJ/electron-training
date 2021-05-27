//Modules

const { remote,shell } = require('electron')


const template = [
    {
        label: "Items",
        submenu: [
            {
                label:'Add New',
                click: window.newItem,
                accelerator: 'CmdOrCtrl+O'
            },
            {
                label:'Read Item',
                accelerator:'CmdOrCtrl+Enter',
                click: window.openItem
            },
            {
                label:'Delete Item',
                accelerator:'CmdOrCtrl+Backspace',
                click: window.deleteItem
            },
            {
                label:'Open in browser',
                accelerator:'CmdOrCtrl+Shift+O',
                click: window.native
            },
            {
                label:'Search Items',
                accelerator:'CmdOrCtrl+S',
                click: window.search
            }
        ]
    },
    {
        role: 'editMenu'
    },
    {
        role: "windowMenu"
    },
    {
        role: 'help',
        submenu: [
            {
                label:'Learn more',
                click: () =>{
                    shell.openExternal("https://github.com/RimvydasJ/electron-training");
                }
            }
        ]
    }
]

if (process.platform === 'darwin') {
    template.unshift({
        label: remote.app.getName(),
        submenu: [{
            role: 'about',
        },
        { type: "seperator" },
        { role: "services" },
        { type: "seperator" },
        { role: "hide" },
        { role: "hideothers" },
        { role: "unhide" },
        { type: "seperator" },
        { role: "quit" },
        ]

    })
}

const menu = remote.Menu.buildFromTemplate(template);

remote.Menu.setApplicationMenu(menu);