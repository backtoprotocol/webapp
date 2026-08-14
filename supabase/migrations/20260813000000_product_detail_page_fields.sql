-- Adds the columns needed to render a full product detail page (gallery, variants,
-- pricing/financing, availability, seller, highlights, and other-seller offers)
-- without hard-coding anything in the frontend. Run this in the Supabase SQL editor
-- (or `supabase db push` once the project is linked with DB credentials).

alter table public.amazon_products
  add column if not exists category text,
  add column if not exists subcategory text,
  add column if not exists model_number text,
  add column if not exists sku text,
  add column if not exists images text[],
  add column if not exists video_url text,
  add column if not exists color_options jsonb,
  add column if not exists variant_group_label text,
  add column if not exists variant_options jsonb,
  add column if not exists compare_at_price numeric,
  add column if not exists monthly_price numeric,
  add column if not exists financing_note text,
  add column if not exists pickup_available boolean,
  add column if not exists pickup_note text,
  add column if not exists shipping_estimate text,
  add column if not exists free_shipping boolean,
  add column if not exists ship_to_zip text,
  add column if not exists seller_rating numeric,
  add column if not exists seller_review_count integer,
  add column if not exists return_policy_url text,
  add column if not exists highlights jsonb,
  add column if not exists more_offers jsonb;

comment on column public.amazon_products.color_options is
  'jsonb array of { "name": string, "image_url": string }';
comment on column public.amazon_products.variant_options is
  'jsonb array of { "label": string, "value": string } paired with variant_group_label, e.g. "Processor Model"';
comment on column public.amazon_products.highlights is
  'jsonb array of { "label": string, "value": string } shown in the highlights grid';
comment on column public.amazon_products.more_offers is
  'jsonb array of { "label": string, "price_min": number, "price_max": number, "url": string } for other sellers';
