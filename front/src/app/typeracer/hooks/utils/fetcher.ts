export const fetcher = (args: any) => fetch(args).then((res) => res.json());

export const postData = async (url: string, data: any) => {
  const jsonOut = JSON.stringify(data);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonOut
  });

  if (!response.ok) {
    console.error('PostData Error: ', response);
    throw new Error('No se pudo enviar la solicitud');
  }

  const json = await response.json();
  return json;
};
