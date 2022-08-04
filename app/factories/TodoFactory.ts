import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { ITodo, Todo } from '@/models/Todo';
import InvalidBuildDataError from '@common/errors/InvalidBuildDataError';
import BaseFactory from './BaseFactory';

export default class TodoFactory extends BaseFactory {
    public static checkKeysInModel(keys: string | string[]) {
        return super._checkKeysInModel(keys, Todo);
    }

    static generateTodo(data: any): ITodo {
        if (this.checkValidBuildData(data)) {
            if (data.email) data.email = data.email.toLowerCase();
            return new Todo(data);
        } else {
            throw new InvalidBuildDataError('Todo');
        }
    }

    static checkValidBuildData(data: ILooseObject): boolean {
        return !!data && data.task && data.status;
    }
}
