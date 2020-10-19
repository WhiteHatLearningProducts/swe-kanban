const {Sequelize, Model, DataTypes} = require('sequelize')
const path = require('path')
const sequelize = process.env.NODE_ENV === 'test'
    ? new Sequelize('sqlite::memory:', null, null, {dialect: 'sqlite'})
    : new Sequelize({dialect: 'sqlite', storage: path.join(__dirname, 'data.db')})

class User extends Model {}
User.init({
    name: DataTypes.STRING,
    avatar: DataTypes.STRING
}, {sequelize})
class Board extends Model {}
Board.init({
    title: DataTypes.STRING
}, {sequelize})
class Task extends Model {}
Task.init({
    desc: DataTypes.STRING,
    status: DataTypes.NUMBER
}, {sequelize})
Board.hasMany(Task, {as: 'tasks'})
Task.belongsTo(Board)
User.hasMany(Task)
Task.belongsTo(User)
User.belongsToMany(Board, {through: Task})

module.exports = {
    Board,
    User,
    Task,
    sequelize
}