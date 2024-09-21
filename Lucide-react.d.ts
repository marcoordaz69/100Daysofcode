
declare module 'lucide-react' {
    import { FC, SVGProps } from 'react';
  
    export interface IconProps extends SVGProps<SVGSVGElement> {
      size?: string | number;
      color?: string;
      stroke?: string | number;
    }
  
    export type Icon = FC<IconProps>;
  
    export const Camera: Icon;
    export const Heart: Icon;
    export const Coffee: Icon;
    // Add other icons you use...
  }