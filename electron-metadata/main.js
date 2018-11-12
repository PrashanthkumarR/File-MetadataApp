// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const { ipcMain } = require('electron')

const path = require('path')

//load util and fs from node
const util = require('util')
const fs = require('fs')

//make fs.stat able to use promisess
const stat = util.promisify(fs.stat)

//listen for files event by browser
ipcMain.on('files',async(event,filesArr)=>{
    try{
        //asynchronously get the data for all the files
        const data =await Promise.all(
            filesArr.map(async ({name,pathName})=>({
                ...await stat(pathName),
                name,
                pathName
            }))
        )
        //remember we decaared main window
        //when we created a new browser window
        mainWindow.webContentes.send('metadata', data)
        }catch(error){
            //send an error event if 
            mainWindow.webContentes.send('metadata:error',error)
        }
    
})


let mainWindow;

app.on('ready',() =>{
    //path to our html
    const htmlPath = path.join('src','index.html')

    //create a browser window
    mainWindow = new BrowserWindow()

    //load the html file 
    mainWindow.loadFile(htmlPath)

})