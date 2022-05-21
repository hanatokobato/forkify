export function formatRecipe(data: any) {
  return {
    id: data.id,
    userId: data.user_id,
    title: data.title,
    publisher: data.publisher,
    image: data.image_url,
    key: data.key,
  };
}
