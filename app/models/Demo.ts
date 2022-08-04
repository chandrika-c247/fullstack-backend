import { Document, model, Schema } from 'mongoose';

interface IDemo extends Document {
    firstname: string;
    lastname: string;
    role: string;
    username: string;
    email: string;
}

const demoSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user'],
    },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Demo = model<IDemo>('Demo', demoSchema, 'demo');

export { Demo, IDemo };
