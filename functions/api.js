export async function onRequest(context) {
  const { request } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }

  const GAS_URL = "https://script.google.com/macros/s/AKfycbwsLXWVNrLhWNZtwxB0n-0CRT9E_pGQA1eIJhw00rb9fIIfiLsGd6ChCFyorXJOxRH-/exec"; // GANTI

  if (request.method === "GET") {
    const res = await fetch(GAS_URL);
    return new Response(await res.text(), {
      headers: { "Content-Type": "application/json" }
    });
  }

  if (request.method === "POST") {
    const body = await request.text();
    const res = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    });
    return new Response(await res.text(), {
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response("Not allowed", { status: 405 });
}
