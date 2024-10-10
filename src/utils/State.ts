// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Dispatch, SetStateAction } from "react";

export type State<T> = [T, Dispatch<SetStateAction<T>>?];