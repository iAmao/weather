import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mode: string;
  }
}

export const lightTheme: DefaultTheme = {
	mode: "light",
};

export const darkTheme: DefaultTheme = {
	mode: "dark",
};
