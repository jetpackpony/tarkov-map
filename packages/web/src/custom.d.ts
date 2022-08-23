declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

interface ObjectConstructor {
  keys<T>(o: T):
    T extends object ? (keyof T)[] :
    T extends number ? [] :
    T extends Array<any> | string ? string[] :
    never,
  entries<T, V>(o: T):
    T extends object ? [(keyof T), T[keyof T]][] :
    T extends number ? [] :
    T extends ArrayLike<V> ? [string, V][] :
    never,
};
