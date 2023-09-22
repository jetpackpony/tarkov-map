declare module "*.webp" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

interface ObjectConstructor {
  keys<T>(
    o: T,
  ): T extends object
    ? (keyof T)[]
    : T extends number
    ? []
    : T extends Array | string
    ? string[]
    : never;
  entries<T, V>(
    o: T,
  ): T extends object
    ? [keyof T, T[keyof T]][]
    : T extends number
    ? []
    : T extends ArrayLike<V>
    ? [string, V][]
    : never;
}

interface Document {
  readonly mozFullScreenElement: Element | null;
  readonly msFullscreenElement: Element | null;
  readonly webkitFullscreenElement: Element | null;
  mozCancelFullScreen(): Promise<void>;
  webkitExitFullscreen(): Promise<void>;
  msExitFullscreen(): Promise<void>;
}

interface HTMLElement {
  mozRequestFullScreen(): Promise<void>;
  webkitRequestFullscreen(): Promise<void>;
  msRequestFullscreen(): Promise<void>;
}
