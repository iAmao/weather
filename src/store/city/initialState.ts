export interface City {
	name: string;
	poster?: string;
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
