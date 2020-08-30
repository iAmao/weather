import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mode: string;
    colors: {
    	primary: string;
    	secondary: string;
    	default: string;
    	orange: string;
    };
    textColors: {
    	primary: string;
    	secondary: string;
    	default: string;
    }
  }
}

export const lightTheme: DefaultTheme = {
	mode: "light",
	colors: {
		primary: '#00bbf9',
		secondary: '#ef233c',
		default: '#2b2d42',
		orange: '#fb8b24',
	},
	textColors: {
		primary: 'white',
		secondary: '#ef233c',
		default: '#2b2d42'
	}
};

export const darkTheme: DefaultTheme = {
	mode: "dark",
	colors: {
		primary: '#4361EE',
		secondary: '#ef233c',
		default: '#edf2f4',
		orange: '#fb8b24',
	},
	textColors: {
		primary: 'white',
		secondary: '#ef233c',
		default: '#2b2d42'
	}
};
