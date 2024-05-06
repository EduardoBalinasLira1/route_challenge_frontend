import { ChangeEvent } from "react";

export interface IInput {
    type: string;
    className: string;
    id: string;
    name: string;
    value: string | number;
    onChange:  (event: ChangeEvent<HTMLInputElement>) => void
    placeholder: string
}