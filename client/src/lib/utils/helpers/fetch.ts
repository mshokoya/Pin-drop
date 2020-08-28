type Obj = {[key: string]: string}

interface Args {
  url: string;
  method?: string;
  headers?: Obj
  body?: Obj
}

export default async ({url, method, headers, body}: Args): Promise<Response> => {
  return await fetch(url, {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  })
  .then(async res => await res.json())
  .catch(error => error)
}