const router = require('express').Router()
const fs = require('fs').promises
const path = require('path')

const dirname = process.cwd()

router.get('/*', async (req, res) => {
    const fullpath = req.params[0] ? path.resolve(path.join(dirname, req.params[0])) : dirname
    try {
        const filenames = await fs.readdir(fullpath)
        const fileInfos = await Promise.all(filenames.map(async name => {
            const stats = await fs.stat(fullpath)
            const { mtimeMs, birthtimeMs, size } = stats
            const isDirectory = stats.isDirectory()
            const ext = path.extname(name)
            return { mtimeMs, birthtimeMs, size, name, ext, isDirectory }
        }))
        return res.send(fileInfos)
    } catch (error) {
        console.log(error)
        res.status(404).send({ err: 'no such file or directory : ' + path.parse(error.path).name })
    }
})

router.post('/file', async (req, res) => {
    const { name, cwd, isDirectory } = req.body
    console.log(path.join(dirname, cwd))
    if (!(await fs.stat(path.join(dirname, cwd))).isDirectory()) {
        return res.status(404).send({ err: 'no such directory' + cwd })
    } else {
        if (isDirectory) {
            return fs.mkdir(path.join(dirname, cwd, name))
                .then(_ => res.send({ success: true }))
                .catch(err => res.send(500).send({ err: 'something went wrong' }))
        } else {
            return fs.writeFile(path.join(dirname, cwd, name))
                .then(_ => res.send({ success: true }))
                .catch(err => res.status(500).send({ err: 'something went wrong' }))
        }
    }
})

module.exports = router