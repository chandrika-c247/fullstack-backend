import { Document, model, Schema } from 'mongoose';

interface ITodo extends Document {
    task: string;
    status: string;
}

const todoSchema = new Schema({
    task: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Todo = model<ITodo>('Todo', todoSchema, 'todos');

export { Todo, ITodo };
