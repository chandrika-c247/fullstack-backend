import { RESPONSE_CODE, RESPONSE_FAILURE, RESPONSE_SUCCESS } from '@/common/Constants';
import { locale } from '@/config/locales';
import TodoFactory from '@/factories/TodoFactory';
import TodoService from '@/services/TodoService';
import { sendResponse } from '@/utils/common';
import { logger } from '@/utils/logger';
import { isEmpty, isObjectId } from '@utils/util';
import { NextFunction, Request, Response } from 'express';

class TodoController {
    static async create(req: Request, res: Response) {
        if (isEmpty(req.body)) return sendResponse(res, {}, locale('TODO_INVALID_DATA'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
        const todoData = TodoFactory.generateTodo(req.body);
        const todo = await TodoService.create(todoData);

        return sendResponse(res, todo, locale('TODO_CREATE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.CREATED);
    }

    static getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { task, status } = req.query;
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            let filter = {};
            let sortOptions: any = { _id: -1 };
            if (task) {
                filter = {
                    ...filter,
                    task,
                };
            }
            if (status) {
                filter = {
                    ...filter,
                    status,
                };
            }
            if (req.query.task) {
                req.query.sortBy === 'desc' ? (sortOptions = { task: -1 }) : (sortOptions = { task: 1 });
            }
            if (req.query.status) {
                req.query.sortBy === 'desc' ? (sortOptions = { status: -1 }) : (sortOptions = { status: 1 });
            }
            const todos = await TodoService.list(filter, {}, sortOptions, page, limit);
            return sendResponse(res, todos, locale('TODO_GET_ALL_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('TodoController.getAll() Error: ', error);
            next(error);
        }
    };

    static getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.todoId)) return sendResponse(res, {}, locale('TODO_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const todoId: string = req.params.todoId;
            const findOneTodoData = await TodoService.readById(todoId);
            return sendResponse(res, findOneTodoData, locale('TODO_GET_ONE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('TodoController.getOne() Error: ', error);
            next(error);
        }
    };

    static update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.todoId)) return sendResponse(res, {}, locale('TODO_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            if (isEmpty(req.body)) return sendResponse(res, {}, locale('TODO_INVALID_DATA'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const todoId: string = req.params.todoId;
            const todoData = req.body;
            const updateTodoData = await TodoService.updateById(todoId, { $set: todoData });

            return sendResponse(res, updateTodoData, locale('TODO_UPDATE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('TodoController.update() Error: ', error);
            next(error);
        }
    };

    static delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.todoId)) return sendResponse(res, {}, locale('TODO_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const todoId: string = req.params.todoId;
            await TodoService.deleteById(todoId);

            return sendResponse(res, null, locale('TODO_DELETE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('TodoController.delete() Error: ', error);
            next(error);
        }
    };
}

export default TodoController;
