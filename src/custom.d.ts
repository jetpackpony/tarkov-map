declare module '*.webp' {
  const content: string;
  export default content;
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
