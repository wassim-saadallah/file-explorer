const axios = require('axios')

axios.post('http://localhost:5000/api/file', { cwd: '', name: 'readme.md', isDirectory: true })
    .then(res => console.log(res.statusCode, res.data))
    .catch(err => console.error(err.statusCode, err.data))