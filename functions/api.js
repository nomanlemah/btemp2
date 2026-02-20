export default {
  async fetch(request, env) {

    const auth = request.headers.get("Authorization");
    if (auth !== `Bearer ${env.API_TOKEN}`) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      );
    }

    // forward ke GAS
    const gas = await fetch(env.GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: await request.text()
    });

    return new Response(await gas.text(), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
