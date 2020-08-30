import { GenericActionType } from '../types';
import { CoordinatePosition } from '../../types';

export interface FetchCitiesByPopulationActionPayload {
	limit?: number;
	expiresAt?: number;
};

export interface FetchCitiesActionPayload extends FetchCitiesByPopulationActionPayload {
	sort?: string;
}

export type FetchCitiesActionType = GenericActionType<FetchCitiesActionPayload>;

export type FetchCitiesAction = (payload: FetchCitiesActionPayload) => FetchCitiesActionType;
export type FetchCitiesByPopulationAction = (payload: FetchCitiesByPopulationActionPayload) => FetchCitiesActionType
export type RemoveCityAction = (id: number) => GenericActionType<{
	id: number;
}>
export type FindMyCityByCoordsAction = (payload: CoordinatePosition) => GenericActionType<{
	position: CoordinatePosition;
}>
