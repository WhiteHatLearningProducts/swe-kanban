const {sequelize, Restaurant} = require('./models')

beforeAll(() => {
    return sequelize.sync()
})

describe('Restaurant', () => {
    test('can create a Restaurant', async () => {
        const restaurant = await Restaurant.create({name: "Rising Sun", image: "https://img.src.jpg"})
        expect(restaurant.id).toBe(1)
    })
})