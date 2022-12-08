const baseUrl = 'http://localhost:5151'

async function getNoteData() {
   const data = await fetch(`${baseUrl}/notes`)
   return data.json()
}

export { getNoteData }