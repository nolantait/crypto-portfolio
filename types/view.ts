import type React from "react";

export type Component<T> = (props: T) => React.ReactElement;
