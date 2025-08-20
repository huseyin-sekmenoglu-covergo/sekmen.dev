export async function onRequestDelete(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const token = url.searchParams.get("token");

  if (token !== env.ADMIN_TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

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
