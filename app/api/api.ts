import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.luxxzone.shop/api";

export async function showProductList(
  category_id: number,
  sex_degree: number,
  options?: { sub_category_id?: number; page?: number; limit?: number }
) {
  const params: Record<string, number> = { category_id, sex_degree };
  if (options?.sub_category_id != null) params.sub_category_id = options.sub_category_id;
  if (options?.page != null) params.page = options.page;
  if (options?.limit != null) params.limit = options.limit;
  const { data } = await axios.get(`${API_BASE_URL}/products`, { params });
  return data;
}

export async function getCategories() {
  const { data } = await axios.get(`${API_BASE_URL}/categories`);
  return data;
}