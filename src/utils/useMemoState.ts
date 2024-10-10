// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useState, useMemo } from "react";

export const useMemoState = <T>(
  init: T,
  [state, setState] = useState<T>(init),
) =>
  useMemo(
    () => [state, setState] as [T, React.Dispatch<React.SetStateAction<T>>],
    [state, setState],
  );
