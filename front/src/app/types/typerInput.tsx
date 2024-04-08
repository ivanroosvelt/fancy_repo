import { BaseConstants } from '../api/mockServer/types/mockServer';

export interface TyperInputPayload {
  context: {
    baseConstants: BaseConstants;
    baseText: string;
  };
}
