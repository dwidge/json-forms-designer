// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Dispatch, SetStateAction, useState } from "react";

export function useStateWithOptionalSetter<T>(
  initialState: T,
): [T, Dispatch<SetStateAction<T>>?] {
  const [state, setState] = useState<T>(initialState);

  return [state, setState] as [T, Dispatch<SetStateAction<T>>?];
}
