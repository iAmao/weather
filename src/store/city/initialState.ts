import { GenericObject } from '../../types';

export interface City {
	id: number;
	name: string;
	poster?: string;
	weather?: GenericObject<string | number>
};

export interface CurrentCityWeather {
	current?: any;
	location?: any;
	expiresAt?: number;
	poster?: string;
}

export interface CityState {
	sortedPks: string[];
	cities: {
		[key: string]: City;
	};
	loading: boolean;
	current: CurrentCityWeather;
	expiresAt: number;
};

const initialCityState = {
	loading: false,
	sortedPks: [],
	cities: {},
	expiresAt: 0,
	current: {},
};

export default initialCityState;
