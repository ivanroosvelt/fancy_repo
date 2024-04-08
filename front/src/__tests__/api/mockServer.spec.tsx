import { generateUserContext } from '../../app/api/mockServer/functions/generateUserContext';
import { DEFAULT_USER } from '../../app/typeracer/hooks/useUser';
import { User } from '../../app/types/user';
import { describe, it, expect } from 'vitest';
import { z } from 'zod';
const TyperInputPayload = z.object({
  context: z.object({
    baseConstants: z.object({
      baseLetters: z.string(),
      baseLength: z.string()
    }),
    baseText: z.string()
  })
});
describe('mockServer', () => {
  it('should generate user context', async () => {
    const user: User = DEFAULT_USER;
    const result = await generateUserContext(user);
    const isValid = TyperInputPayload.safeParse(result.typerInputPayload);
    expect(isValid.success).toBe(true);
  });
});
