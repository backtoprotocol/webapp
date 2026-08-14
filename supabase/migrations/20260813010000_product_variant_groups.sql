-- Links rows in amazon_products that represent the same product in different
-- configurations (color / processor / storage / etc.) so the frontend can
-- render a dynamic variant picker instead of hand-authored JSON blobs.
-- Rows sharing the same variant_group_id are treated as siblings; the
-- distinct values of color/processor/storage_capacity/ram across the group
-- become the selectable options, each linking to the sibling row that has it.

alter table public.amazon_products
  add column if not exists variant_group_id text;

create index if not exists idx_amazon_products_variant_group_id
  on public.amazon_products (variant_group_id);

-- Superseded by the dynamic variant-group derivation above.
alter table public.amazon_products
  drop column if exists color_options,
  drop column if exists variant_group_label,
  drop column if exists variant_options,
  drop column if exists more_offers;
