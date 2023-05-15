import { faker } from '@faker-js/faker';
import TodoModel from '../models/todo.js';
import UserModel from '../models/user.js';
import db from '../db/index.js';

const main = async () => {
    const users = [...Array(10)].map(item => {
        return {
            userId: faker.datatype.uuid(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }
    })
    const createdUsers = await UserModel.insertMany(users)
    console.log('Created users!')


    const todos = [...Array(20)].map(item => {
        const user = createdUsers[Math.floor(Math.random() * 10)]
        return {
            text: faker.string.alpha(20),
            user: user._id
        }
    })
    await TodoModel.insertMany(todos)
    console.log('Created todos!')

}

const run = async () => {
    await main()
    db.close()
}

run()