import TodoModel from '../models/todo.js';

export const create = async (req, res) => {
    try {
        const doc = new TodoModel({
            text: req.body.text,
            user: res.locals.userId
        });
        const todo = await doc.save();
        res.json(todo);
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

export const update = async (req, res) => {
    try {
        const todoId = req.params.id;
        const existing = await TodoModel.findById(todoId);
        if (!existing) {
            return res.status(403).send({ error: "Todo is not existing" })
        }

        const todo = await TodoModel.findOneAndUpdate(
            { _id: todoId },
            { text: req.body.text },
            { new: true, upsert: true },
        );

        res.json(todo);
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

export const remove = async (req, res) => {
    try {
        const todoId = req.body.id;

        const existing = await TodoModel.findById(todoId);
        if (!existing) {
            return res.status(403).send({ error: "Todo is not existing" })
        }

        await TodoModel.findOneAndDelete({ _id: todoId })

        res.status(200).json('success');
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}