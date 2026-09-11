-- Preserve every Amazon breadcrumb while keeping category/subcategory compatibility.
alter table public.amazon_products
  add column if not exists category_path text[];

comment on column public.amazon_products.category_path is
  'Ordered Amazon breadcrumb categories, from broadest to most specific.';
