
const { ipcRenderer } = require('electron')

const submitListener = document
.querySelector('form')
.addEventListener('submit',(event)=>{
    //prevent  page refresh
    event.preventDefault()

    //an array of files with some metadata
    const files = [...document.getElementById('filepicker').files]
    console.log(files);

   //format the file data to only path and name
   const fileFormatted = files.map(({name, path: pathName}) =>({
       name,
       pathName
   }))

   //send the data to the main process
   ipcRenderer.send('files'  ,fileFormatted)
    
})
//metadata from the main process
ipcRenderer.on('metadata',(event , metadata) =>{
    const pre = document.getElementById('data')
    pre.innerText = JSON.stringify(metadata , null,2)
    
    
})

//error event from catch block in main process
ipcRenderer.on('metadata:error' ,(event ,error) =>{
    console.error(error)
})