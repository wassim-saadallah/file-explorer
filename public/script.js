const table = document.getElementById('table')

document.onclick = (ev) => {
    if (ev.target.nodeName === 'A') {
        ev.preventDefault()
        const value = ev.target.getAttribute('value')
        renderTable(value)
    }
}

async function getFileInfo(path = '') {
    const response = await fetch(`http://localhost:5000/api/${path}`)
    return response.json()
}

function formatSize(size) {
    const kb = 1024, mb = 1024 ** 2, gb = 1024 ** 3, tb = 1024 ** 4
    if (size > tb) return `${(size / tb).toFixed(2)} TB`
    else if (size > gb) return `${(size / gb).toFixed(2)} GB`
    else if (size > mb) return `${(size / mb).toFixed(2)} MB`
    else if (size > kb) return `${(size / kb).toFixed(2)} KB`
    else return `${size} B`
}

function renderTable(path = '') {
    console.log(path)
    getFileInfo(path).then(files => {
        console.log({ files })
        table.innerHTML = ''
        for (let { name, birthtimeMs, mtimeMs, size, isDirectory, fullpath } of files) {
            table.innerHTML += `<tr>
            <td>${isDirectory ? '📁' : '📄'}</td>
            <td>${isDirectory ? `<a href="" value="${fullpath}">` + name + '</a>' : name}</td>
            <td>${new Date(birthtimeMs).toUTCString()}</td>
            <td>${new Date(mtimeMs).toUTCString()}</td>
            <td>${formatSize(size)}</td>
            </tr>`
        }
    })
}

renderTable()

