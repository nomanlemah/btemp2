export async function onRequest(context) {
  const { request, env } = context;

  const GAS_URL = "https://script.google.com/macros/s/AKfycbwsLXWVNrLhWNZtwxB0n-0CRT9E_pGQA1eIJhw00rb9fIIfiLsGd6ChCFyorXJOxRH-/exec";
  const TOKEN = env.API_TOKEN; // dari Secret

  const url = new URL(GAS_URL);
  url.searchParams.set("token", TOKEN);

  const newRequest = new Request(url.toString(), {
    method: request.method,
    headers: {
      "Content-Type": "application/json"
    },
    body: request.method === "POST" ? await request.text() : null
  });

  return fetch(newRequest);
}
