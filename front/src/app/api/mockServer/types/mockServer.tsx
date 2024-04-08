import { TyperInputPayload } from '@/app/types/typerInput';
import { User } from '@/app/types/user';

export interface MockServerPayload {
  user: User;
}

export interface MockServerResponse {
  typerInputPayload: TyperInputPayload;
}

export interface BaseConstants {
  baseLetters: string;
  baseLength: string;
}
