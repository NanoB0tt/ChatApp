import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  base: "0px",
  sm: "320px",
  md: "768px",
  lg: "1024px",
  xl: "1200px",
  "2xl": "1536px",
};

export const theme = extendTheme({ breakpoints });
