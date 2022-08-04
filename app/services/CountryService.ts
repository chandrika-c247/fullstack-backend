import { City, Country } from 'country-state-city-js';

export default class CountryService {
    static async countryList(): Promise<any> {
        const countries = Country();
        return countries;
    }

    static async stateList(id: any): Promise<any> {
        const countries: any = Country(id, { states: true });
        return countries.states;
    }

    static async cityList(countryCode: any, stateIso: any): Promise<any> {
        const cities = City(countryCode, stateIso);
        return cities;
    }
}
