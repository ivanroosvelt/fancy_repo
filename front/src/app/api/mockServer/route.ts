import { MockServerPayload } from './types/mockServer';
import { generateUserContext } from './functions/generateUserContext';

export async function POST(request: Request) {
  const payload = (await request.json()) as MockServerPayload;
  let response = {};
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    response = await generateUserContext(payload.user);
  } catch (error) {
    return new Response(`Webhook error: ${error}`, {
      status: 400
    });
  }

  return new Response(JSON.stringify(response), {
    status: 200
  });
}
