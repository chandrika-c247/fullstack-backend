import UserAuthenticator from '@common/middlewares/UserAuthenticator';
import TodoController from '@controllers/TodoController';
import { Router } from 'express';

const path = '/todo';
const TodoRouter = Router({ mergeParams: true });

/**
 * @openapi
 * /todo:
 *   get:
 *     tags: [todo]
 *     summary: Get Todo.
 *     description: Get all todo .
 *     operationId: getAll
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Numbers of records from server.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *           minimum: 1
 *         description: Page number of pagination request.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: 'desc'
 *         description: Sort by asending or decending.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: '_id'
 *         description: Sort by colum name.
 *       - in: query
 *         name: task
 *         schema:
 *           type: string
 *           example: ''
 *         description: Filter by task.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: ''
 *         description: Filter by status.
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/schemas/Todo'
 *                 message:
 *                    type: string
 *                    example: Todo(s) retrieved successfully
 *                 success:
 *                    type: boolean
 *                    example: true
 *       500:
 *         description: Server could not handle the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *     security: [jwt_api_auth: []]
 */
TodoRouter.get(`${path}`, UserAuthenticator.isAdminAuthenticated(), TodoController.getAll);
/**
 * @openapi
 * /todo/{todoId}:
 *   get:
 *     tags: [todo]
 *     summary: Get Todo.
 *     description: Get specific todo .
 *     operationId: getOne
 *     parameters:
 *       - in: path
 *         name: todoId
 *         schema:
 *           type: string
 *           example: 5f60b26b692cf083f81e3bde
 *         required: true
 *         description: To get a single todo by using its ID.
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                      type: object
 *                      $ref: '#/components/schemas/Todo'
 *                  message:
 *                      type: string
 *                      example: Todo retrieved successfully
 *                  success:
 *                      type: boolean
 *                      example: true
 *       500:
 *         description: Server could not handle the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *     security: [jwt_api_auth: []]
 */
TodoRouter.get(`${path}/:todoId`, UserAuthenticator.isAdminAuthenticated(), TodoController.getOne);
/**
 * @openapi
 * /todo/{todoId}:
 *   patch:
 *     tags: [todo]
 *     summary: Edit Todo.
 *     description: Edit specific todo.
 *     operationId: update
 *     parameters:
 *       - in: path
 *         name: todoId
 *         schema:
 *           type: string
 *           example: 5f60b26b692cf083f81e3bde
 *         required: true
 *         description: Id of todo to update
 *     requestBody:
 *       description: Available properties to update
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/TodoCreate'
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Todo'
 *                 message:
 *                   type: string
 *                   example: Todo updated successfully.
 *                 success:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Server was not able to handle request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated Employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *     security: [jwt_api_auth: []]
 */
TodoRouter.patch(`${path}/:todoId`, UserAuthenticator.isAdminAuthenticated(), TodoController.update);
/**
 * @openapi
 * /todo/{todoId}:
 *   delete:
 *     tags: [todo]
 *     summary: Delete Todo.
 *     description: Delete specific todo.
 *     operationId: delete
 *     parameters:
 *       - in: path
 *         name: todoId
 *         schema:
 *           type: string
 *           example: 5f60b26b692cf083f81e3bde
 *         required: true
 *         description: Id of todo to delete
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: Todo deleted successfully.
 *                 success:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Server was not able to handle the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *       409:
 *         description: Found active todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *     security: [jwt_api_auth: []]
 */
TodoRouter.delete(`${path}/:todoId`, UserAuthenticator.isAdminAuthenticated(), TodoController.delete);
/**
 * @openapi
 * /todo:
 *   post:
 *     tags: [todo]
 *     summary: Create Todo.
 *     description: Create todo.
 *     operationId: create
 *     requestBody:
 *       description: create Todo
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/TodoCreate'
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Todo'
 *                 message:
 *                   type: string
 *                   example: Todo created successfully.
 *                 success:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Server was not able to handle request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated Employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *     security: [jwt_api_auth: []]
 */
TodoRouter.post(`${path}`, UserAuthenticator.isAdminAuthenticated(), TodoController.create);

export default TodoRouter;
