// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const omitUndefined = <T extends object>(o: T): T =>
  Object.fromEntries(
    Object.entries(o).filter(([k, v]) => v !== undefined),
  ) as T;
