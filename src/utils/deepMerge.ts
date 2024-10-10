// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

type DeepMerge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T & keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? DeepMerge<T[K], U[K]>
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : K extends keyof U
        ? U[K]
        : never;
};

const isObject = (obj: any): obj is Record<string, any> =>
  obj !== null && typeof obj === "object" && !Array.isArray(obj);

export const deepMerge = <T extends object, U extends object>(
  obj1: T,
  obj2: U,
): DeepMerge<T, U> =>
  Object.entries(obj2).reduce<DeepMerge<T, U>>(
    (acc, [key, value]) =>
      isObject(value) && isObject(acc[key as keyof T])
        ? {
            ...acc,
            [key]: deepMerge(acc[key as keyof T] as object, value),
          }
        : { ...acc, [key]: value },
    { ...obj1 } as DeepMerge<T, U>,
  );

export const deepMergeTest = () => {
  const obj1 = { a: 1, b: { x: 10, y: 20 }, c: 3 };
  const obj2 = { b: { x: 15, z: 30 }, d: 4 };

  const merged = deepMerge(obj1, obj2);
  console.log(merged);
  // Output: { a: 1, b: { x: 15, y: 20, z: 30 }, c: 3, d: 4 }
};
