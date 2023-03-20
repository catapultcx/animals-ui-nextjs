import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from 'react';

export type OnChange = ChangeEventHandler<HTMLInputElement>;

export type OnSubmit = FormEventHandler<HTMLFormElement>;

export type OnCancel = MouseEventHandler<HTMLButtonElement>;

export enum FormState {
  INITIAL,
  READY_FOR_VALIDATION,
  SUBMITTED
}