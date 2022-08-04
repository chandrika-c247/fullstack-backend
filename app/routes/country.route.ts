import UserAuthenticator from '@common/middlewares/UserAuthenticator';
import CountryController from '@controllers/CountryController';
import { Router } from 'express';

const path = '/country';
const CountryRouter = Router({ mergeParams: true });

/**
 * @openapi
 * /country:
 *   get:
 *     tags: [country]
 *     summary: Get Country.
 *     description: Get all country .
 *     operationId: countryList
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
 *                      $ref: '#/components/schemas/Country'
 *                 message:
 *                    type: string
 *                    example: Country(s) retrieved successfully
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
CountryRouter.get(`${path}`, UserAuthenticator.isAdminAuthenticated(), CountryController.countryList);
/**
 * @openapi
 * /country/{countryCode}:
 *   get:
 *     tags: [state]
 *     summary: Get State.
 *     description: Get state list by country.
 *     operationId: stateList
 *     parameters:
 *       - in: path
 *         name: countryCode
 *         schema:
 *           type: string
 *           example: 'US'
 *         required: true
 *         description: To get state list by using country code.
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
 *                      $ref: '#/components/schemas/State'
 *                  message:
 *                      type: string
 *                      example: State(s) retrieved successfully
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
CountryRouter.get(`${path}/:countryCode`, UserAuthenticator.isAdminAuthenticated(), CountryController.stateList);
/**
 * @openapi
 * /country/{countryCode}/{stateIso}:
 *   get:
 *     tags: [city]
 *     summary: Get city.
 *     description: Get city list by country and state.
 *     operationId: cityList
 *     parameters:
 *       - in: path
 *         name: countryCode
 *         schema:
 *           type: string
 *           example: US
 *         required: true
 *         description: To get city list enter country code.
 *       - in: path
 *         name: stateIso
 *         schema:
 *           type: string
 *           example: NY
 *         required: true
 *         description: To get city list enter state iso code.
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
 *                      $ref: '#/components/schemas/City'
 *                  message:
 *                      type: string
 *                      example: City(s) retrieved successfully
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
CountryRouter.get(`${path}/:countryCode/:stateIso`, UserAuthenticator.isAdminAuthenticated(), CountryController.cityList);

export default CountryRouter;
