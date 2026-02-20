export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }

  const GAS_URL = "https://script.google.com/macros/s/AKfycbwsLXWVNrLhWNZtwxB0n-0CRT9E_pGQA1eIJhw00rb9fIIfiLsGd6ChCFyorXJOxRH-/exec"; // GANTI

  if (request.method === "GET") {
    const res = await fetch(GAS_URL);
    const text = await res.text();
    return new Response(text, {
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

    const text = await res.text();
    return new Response(text, {
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response("Method not allowed", { status: 405 });
}
