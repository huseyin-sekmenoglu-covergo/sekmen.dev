export async function onRequestDelete({ request, env }) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response("Missing ID", { status: 400 });
  }

  try {
    await env.DB.prepare("DELETE FROM contacts WHERE id = ?").bind(id).run();
    return new Response("Deleted", { status: 200 });
  } catch (err) {
    return new Response("Error: " + err.message, { status: 500 });
  }
}
