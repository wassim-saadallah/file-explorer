
async function getFileInfo(path = '') {
  const response = await fetch(`http://localhost:5000/api/${path}`)
  return response.json()
}

const table = document.getElementById('table')
getFileInfo().then(files => {
  console.log({ files })
  table.innerHTML = ''
  for (let { name, birthtimeMs, mtimeMs, size } of files) {
    table.innerHTML += `<tr>
                        <td>${name}</td>
                        <td>${new Date(birthtimeMs).toUTCString()}</td>
                        <td>${new Date(mtimeMs).toDateString()}</td>
                        <td>${size}</td>
                      </tr>`
  }
})
