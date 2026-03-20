import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.luxxzone.shop/api";

export async function showProductList(category_id: number, sex_degree: number, sub_category_id?: number) {
  const params: Record<string, number> = { category_id, sex_degree };
  if (sub_category_id != null) params.sub_category_id = sub_category_id;
  const { data } = await axios.get(`${API_BASE_URL}/products`, { params });
  return data;
}

export async function getCategories() {
  const { data } = await axios.get(`${API_BASE_URL}/categories`);
  return data;
}