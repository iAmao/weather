import { GenericObject } from '../types';

export interface ActionPayload {
	type: string;
	payload: any;
};

export interface ResponsePayload {
	response?: GenericObject<any>; //;
	message?: string;
	[key: string]: any;
};

export interface GenericActionType<T> {
	type: string;
	payload?: T;
};
