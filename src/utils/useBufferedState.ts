// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { State } from "./State.js";

export function useBufferedState<T>(
  [externalState, setExternalState]: State<T>,
  autoSaveOnUnmount: boolean = true,
  debounceMs: number | undefined = undefined
): [
  value: T,
  setValue: Dispatch<SetStateAction<T>>,
  changed: boolean,
  save: () => void,
  revert: () => void,
] {
  const [internalState, setInternalState] = useState<T>(externalState);
  const [changed, setChanged] = useState<boolean>(false);

  const internalStateRef = useRef(internalState);
  const changedRef = useRef(changed);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    internalStateRef.current = internalState;
    changedRef.current = changed;
  }, [internalState, changed]);

  useEffect(() => {
    if (!changed) setInternalState(externalState);
  }, [externalState, changed]);

  const setValue: Dispatch<SetStateAction<T>> = (action: SetStateAction<T>) => {
    const updatedInternalState =
      typeof action === "function"
        ? (action as (prevState: T) => T)(internalState)
        : action;

    if (updatedInternalState !== internalState) {
      setInternalState(updatedInternalState);
      setChanged(true);

      if (debounceMs !== undefined) {
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

        debounceTimerRef.current = setTimeout(() => {
          save();
        }, debounceMs);
      }
    }
  };

  const save = () => {
    if (changedRef.current && setExternalState) {
      setExternalState(internalStateRef.current);
      setChanged(false);
    }
  };

  const revert = () => {
    if (changedRef.current) {
      setInternalState(externalState);
      setChanged(false);
    }
  };

  useEffect(
    () => () => {
      if ((autoSaveOnUnmount || debounceMs !== undefined) && changedRef.current)
        save();

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    },
    []
  );

  return [internalState, setValue, changed, save, revert];
}
