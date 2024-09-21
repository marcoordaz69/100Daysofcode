import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      [x: string]: Interpolation<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, never>>;
      [x: string]: Interpolation<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, never>>;
      secondary: Interpolation<FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>>;
      background: string;
      text: string;
      accent: string;
    }
  }
}