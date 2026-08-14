"use client";

import type { ComponentProps } from "react";

// Auto-submits the form whenever a filter input changes, so checkboxes/radios apply immediately.
export function SearchFiltersForm(props: ComponentProps<"form">) {
  return (
    <form
      {...props}
      onChange={(event) => {
        event.currentTarget.requestSubmit();
      }}
    />
  );
}
