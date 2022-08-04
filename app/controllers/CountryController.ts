import { RESPONSE_CODE, RESPONSE_SUCCESS } from '@/common/Constants';
import { locale } from '@/config/locales';
import CountryService from '@/services/CountryService';
import { sendResponse } from '@/utils/common';
import { logger } from '@/utils/logger';
import { NextFunction, Request, Response } from 'express';

class CountryController {
    static countryList = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const todos = await CountryService.countryList();
            return sendResponse(res, todos, locale('COUNTRY_GET_ALL_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('CountryController.countryList() Error: ', error);
            next(error);
        }
    };

    static stateList = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const countryCode: string = req.params.countryCode;
            const findOneTodoData = await CountryService.stateList(countryCode);
            return sendResponse(res, findOneTodoData, locale('STATE_GET_ALL_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('CountryController.stateList() Error: ', error);
            next(error);
        }
    };

    static cityList = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const countryCode: string = req.params.countryCode;
            const stateIso: string = req.params.stateIso;
            const findOneTodoData = await CountryService.cityList(countryCode, stateIso);
            return sendResponse(res, findOneTodoData, locale('CITY_GET_ALL_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('CountryController.cityList() Error: ', error);
            next(error);
        }
    };
}

export default CountryController;
