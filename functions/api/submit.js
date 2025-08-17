export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return new Response("Missing fields", { status: 400 });
    }

    // Insert into D1
    await env.DB.prepare(
      "INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, datetime('now'))"
    ).bind(name, email, message).run();

    return new Response("Saved", { status: 200 });
  } catch (err) {
    return new Response("Error: " + err.message, { status: 500 });
  }
}
