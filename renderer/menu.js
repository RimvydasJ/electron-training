//Modules

const { remote } = require('electron')

const template = [
    {
        label: "Items",
        submenu: []
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