const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;

// Variable references
let mainWindow;
let childId;
let directory;
let filesCopy = [];
const childWindows = []
let foldersCopy = [];

// Check if config file exists
const checkForHomeDir = async () => {
   const checkDir = app.getPath('home')
   const dirContents = await fs.readdir(checkDir, { withFileTypes: true })
   for (const item of dirContents) {
      if (item.isFile()) {
         if (item.name === '.hoverconfig.txt') {
            const configFileContents = await fs.readFile(path.join(checkDir, item.name), 'utf-8')
            directory = configFileContents
            console.log(directory)
            mainWindow.webContents.send('home-directory', directory)
         }
      }
   }
}

// Initial window render
function createWindow() {
   mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      frame: false,
      minWidth: 800,
      minHeight: 550,
      icon: '../public/favicon.ico',
      webPreferences: {
         nodeIntegration: false,
         contextIsolation: true,
         preload: path.join(__dirname, 'preload.js'),
      },
   });

   mainWindow.loadURL('http://localhost:5173');
   mainWindow.maximize();
   mainWindow.webContents.openDevTools({ mode: 'detach' });
}
app.whenReady().then(() => {
   createWindow()
   checkForHomeDir()
});

// Close app when all windows are closed
app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit();
   }
});
app.on('activate', () => {
   if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
   }
});

// Title bar controls
ipcMain.on('maximize', () => {
   if (mainWindow.isMaximized()) {
      mainWindow.restore();
   } else {
      mainWindow.maximize();
   }
});
ipcMain.on('minimize', () => {
   mainWindow.minimize();
});
ipcMain.on('quit', (event, win) => {
   if (win !== undefined) {
      event.preventDefault()
      childWindows[win].close()
      childWindows[win] = null
   } else {
      app.quit();
   }
});

ipcMain.on('new-child-window', (event, noteId) => {
   childId = noteId
   let child = new BrowserWindow({
      width: 400,
      height: 400,
      frame: false,
      minHeight: 200,
      minWidth: 200,
      webPreferences: {
         nodeIntegration: false,
         contextIsolation: true,
         preload: path.join(__dirname, 'preload.js'),
      },
   });
   childWindows.push(child)
   child.loadURL(`http://localhost:5173/sticky/${noteId}`);
   child.setAlwaysOnTop(true, 'screen')
});

ipcMain.on('get-child-data', () => {
   const childFile = filesCopy.find(file => file.id === childId)
   const childDataRef = {
      winId: childWindows.length - 1,
      data: childFile
   }
   childWindows[childWindows.length - 1].webContents.send('return-child-data', childDataRef)
})

const readFileContents = async (file, index) => {
   const fileContent = await fs.readFile(path.join(directory, file), 'utf-8');
   const fileObject = {
      id: index,
      name: file,
      content: fileContent,
   };
   return fileObject
}

ipcMain.on('open-dialog', () => {
   dialog.showOpenDialog(mainWindow, {
      properties: ['openFile', 'openDirectory'],
   })
      .then((result) => {
         if (result.canceled) return null;
         mainWindow.webContents.send('return-path', result.filePaths.toString());
         directory = result.filePaths.toString();
         fs.writeFile(path.join(app.getPath('home'), '.hoverconfig.txt'), directory, (err) => {
            if (err) {
               console.log(err)
            } else {
               console.log('success')
            }
         })
         console.log('Directory: ', directory);
      });
});

const isIgnored = (item) => {
   return item.split('')[0] !== '.'
}

const isValid = (item) => {
   return ['.md', '.txt'].includes(path.extname(item))
}

const getDirContents = async () => {
   let filesCounter = 1
   if (directory === undefined) return;
   const directoryContents = await fs.readdir(directory, { withFileTypes: true });
   for (const item of directoryContents) {
      if (isIgnored(item.name)) {
         if (item.isFile()) {
            if (isValid(item.name)) {
               const fileContents = await readFileContents(item.name, filesCounter)
               filesCopy.push(fileContents)
               filesCounter++
            }
         }
         else if (item.isDirectory()) {
            foldersCopy.push(item.name)
         } else {
            console.log('Unsupported type: ', item.name)
         }
      }
   }
   mainWindow.webContents.send('return-files', filesCopy);
   mainWindow.webContents.send('return-folders', foldersCopy)
}

ipcMain.on('get-dir-contents', getDirContents);

ipcMain.on('set-dir', (event, dir) => {
   directory = dir
   filesCopy.length = 0
   foldersCopy.length = 0
})

ipcMain.on('write-file', (event, args) => {
   const { file, content } = args
   fs.writeFile(path.join(directory, file), content, (err) => {
      if (err) {
         console.log(err)
      } else {
         console.log('Success!')
      }
   })
})

ipcMain.on('delete-file', (event, file) => {
   fs.unlink(path.join(directory, file), (err) => {
      if (err) {
         console.log(err)
      } else {
         console.log('success!')
      }
   })
})

ipcMain.on('create-file', (event, name) => {
   const newFileDir = path.join(directory, `${name}.md`)
   fs.stat(newFileDir, (err) => {
      if (err) {
         console.log('Writing file!')
         fs.writeFile(newFileDir, '# Hello File!', (err) => {
            if (err) {
               console.log(err)
            } else {
               console.log('Success!')
            }
         })
      } else {
         console.log('file already exists!')
      }

   })
})

ipcMain.on('rename-file', (event, args) => {
   const { currName, newName } = args
   console.log(currName)
   console.log(newName)
   fs.rename(path.join(directory, currName), path.join(directory, `${newName}.md`), (err) => {
      if (err) {
         console.log(err)
      } else {
         console.log('File renamed')
      }
   })
})