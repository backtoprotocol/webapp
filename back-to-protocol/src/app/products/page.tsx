import { redirect } from "next/navigation";

// Keep the conventional plural catalogue URL working alongside /search.
export default function ProductsPage() {
  redirect("/search");
}
