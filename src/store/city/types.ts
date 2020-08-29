import { GenericActionType } from '../types';

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
