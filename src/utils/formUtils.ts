import { ChangeEventHandler, FormEventHandler } from "react";

export type OnChange = ChangeEventHandler<HTMLInputElement>;
export type OnSubmit = FormEventHandler<HTMLFormElement>;

export enum FormStatus {
  IDLE,
  CONFIRM,
  VALIDATED
}
