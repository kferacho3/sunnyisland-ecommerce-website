import { ThreeElements } from "@react-three/fiber";

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {
        /** This dummy property is added to avoid ESLint complaining about an empty interface. */
        __dummy?: never;
      }
    }
  }
}
