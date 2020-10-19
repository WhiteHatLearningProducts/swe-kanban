const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const {User, Board, Task, sequelize} = require('./src/models')
const app = express()

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.get('/', async (req, res) => {
    const boards = await Board.findAll({}, {plain: true})
    const users = await User.findAll({}, {plain: true})
    res.render('landing', {
        boards: JSON.stringify(boards),
        users: JSON.stringify(users)
    })
})

app.get('/boards/:id', async (req, res) => {
    const board = await Board.findByPk(req.params.id, {
        plain: true,
        include: [
            {model: Task, as: 'tasks'},
            {model: User, as: 'user'}
        ]
    })
    const tasks = await Promise.all(board.tasks.map(task => task.getUser()))
    console.log(tasks)
    const users = await User.findAll({}, {plain: true})
    res.render('board', {
        board: JSON.stringify(board),
        users: JSON.stringify(users)
    })
})

app.post('/users', (req, res) => {
    res.send()
})

app.listen(3000, () => {
    sequelize.sync(() => {
        console.log('Kanban app running on port', 3000)
    })
})
