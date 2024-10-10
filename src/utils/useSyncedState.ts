// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { State } from "./State.js";

export function useSyncedState<T, U>(
  defaultValue: U,
  [externalState, setExternalState]: State<T>,
  convertToInternal: (external: T) => U,
  convertToExternal: (internal: U) => T,
): [...State<U>, Error | undefined] {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [internalState, setInternalState] = useState<U>(() => {
    try {
      return convertToInternal(externalState);
    } catch (e) {
      setError(e as Error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      const convertedState = convertToInternal(externalState);
      setError(undefined);
      if (JSON.stringify(convertedState) !== JSON.stringify(internalState))
        setInternalState(convertedState);
    } catch (e) {
      setError(e as Error);
    }
  }, [externalState, convertToInternal]);

  const setInternal: Dispatch<SetStateAction<U>> = (
    action: SetStateAction<U>,
  ) => {
    const updatedInternalState =
      typeof action === "function"
        ? (action as (prevState: U) => U)(internalState)
        : action;
    setInternalState(updatedInternalState);

    try {
      const newExternalState = convertToExternal(updatedInternalState);
      setError(undefined);
      if (
        setExternalState &&
        JSON.stringify(newExternalState) !== JSON.stringify(externalState)
      )
        setExternalState(newExternalState);
    } catch (e) {
      setError(e as Error);
    }
  };

  return [internalState, setInternal, error];
}
