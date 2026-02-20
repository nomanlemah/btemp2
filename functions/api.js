export async function onRequest(context) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbwsLXWVNrLhWNZtwxB0n-0CRT9E_pGQA1eIJhw00rb9fIIfiLsGd6ChCFyorXJOxRH-/exec";
  const TOKEN = "ISI_TOKEN_SAMA_DENGAN_GAS";

  const req = context.request;

  // Teruskan request ke GAS
  const res = await fetch(GAS_URL, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      "X-API-TOKEN": TOKEN
    },
    body: req.method === "POST"
      ? await req.text()
      : null
  });

  return new Response(await res.text(), {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
