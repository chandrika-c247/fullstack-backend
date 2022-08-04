import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { ITodo, Todo } from '@/models/Todo';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export default class TodoService {
    static async create(resource: ITodo): Promise<ITodo> {
        return await resource.save();
    }

    static async list(filterOptions: QueryOptions = {}, findOptions: QueryOptions = {}, sortOptions: ILooseObject = {}, page?: number, limit?: number): Promise<any> {
        const cursor = await Todo.find(filterOptions, findOptions)
            .sort(sortOptions)
            .skip(Math.max(page - 1, 0) * limit)
            .limit(limit);
        const count = await Todo.count(filterOptions);
        return { data: cursor, total: count };
    }

    static async readById(id: string): Promise<ITodo | null> {
        return Todo.findById(id).select('-__v').exec();
    }

    static async updateById(administratorId: string, administratorFields: UpdateQuery<ITodo>): Promise<ITodo> {
        const existingTodo = await Todo.findByIdAndUpdate(administratorId, administratorFields, { new: true }).exec();
        return existingTodo;
    }

    static async update(query: FilterQuery<ITodo>, doc: UpdateQuery<ITodo>, options: QueryOptions = {}) {
        return Todo.updateOne(query, doc, options);
    }

    static async deleteById(id: string): Promise<ITodo | null> {
        return Todo.findByIdAndDelete(id);
    }

    static async find(query: FilterQuery<ITodo>, findOptions: QueryOptions = {}, sortOptions: ILooseObject = {}, page?: number, limit?: number): Promise<ITodo[]> {
        const cursor = Todo.find(query, findOptions);
        if (sortOptions) {
            cursor.sort(sortOptions);
        }
        if (page != undefined && limit) {
            cursor.skip(Math.max(page - 1, 0) * limit).limit(limit);
        }
        return cursor;
    }
}
