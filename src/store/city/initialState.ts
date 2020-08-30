import { GenericObject } from '../../types';

export interface City {
	id: number;
	name: string;
	poster?: string;
	weather?: GenericObject<string | number>
};

export interface CityState {
	sortedPks: string[];
	cities: {
		[key: string]: City;
	};
	loading: boolean;
	expiresAt: number;
};

const initialCityState = {
	loading: false,
	sortedPks: [],
	cities: {},
	expiresAt: 0,
};

export default initialCityState;
