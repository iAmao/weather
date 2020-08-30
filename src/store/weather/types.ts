import {
  GenericActionType
} from '../types';

export interface WeatherState {
	weather: {
		[key: string]: any;
	},
  favourites: string[];
	loading: boolean,
};

export interface Weather {
	name: string;
	country: string;
	temperature: number;
	wind_speed: number;
  wind_degree: number;
  wind_dir: 'N' | 'S' | 'W' | 'E';
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  weather_descriptions: string[];
  weather_icons: string[];
  expiresAfter?: number;
}

export type GetCityWeatherAction = (city: string, expiresAfter: number) => GenericActionType<{
  query: string;
  expiresAfter: number;
}>

export type RemoveNoteFromWeatherAction = (key: string) => GenericActionType<{
  key: string;
}>

export type AddNoteToWeatherAction = (key: string, content: string) => GenericActionType<{
  key: string;
  content: string;
}>

export type AddWeatherToFavoritesAction = (key: string) => GenericActionType<{
  key: string;
}>

export type RemoveWeatherFromFavoritesAction = (key: string) => GenericActionType<{
  key: string;
}>
