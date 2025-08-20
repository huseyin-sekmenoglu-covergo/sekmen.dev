export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (token !== env.ADMIN_TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { results } = await env.DB.prepare(
      "SELECT id, name, email, company, phone, message, created_at FROM contacts ORDER BY created_at DESC"
    ).all();

    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response("Error: " + err.message, { status: 500 });
  }
}
