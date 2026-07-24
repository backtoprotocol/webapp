import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { SanityImage } from "@/components/sanity-image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-6 text-lg leading-8 text-slate-700">{children}</p>,
    h2: ({ children }) => <h2 className="mt-12 text-3xl font-semibold tracking-tight text-slate-950">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-9 text-xl font-semibold text-slate-950">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="my-10 border-l-2 border-indigo-500 pl-6 text-2xl font-medium leading-9 tracking-tight text-slate-950">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-6 list-disc space-y-3 pl-6 text-lg leading-8 text-slate-700 marker:text-indigo-500">{children}</ul>,
    number: ({ children }) => <ol className="mt-6 list-decimal space-y-3 pl-6 text-lg leading-8 text-slate-700 marker:text-indigo-500">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const isExternal = value?.href?.startsWith("http");
      return <a href={value?.href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined} className="font-medium text-indigo-700 underline decoration-indigo-200 underline-offset-4 hover:text-slate-950">{children}</a>;
    },
  },
  types: {
    articleImage: ({ value }) => (
      <figure className="my-10 overflow-hidden rounded-2xl">
        <SanityImage value={value.image} width={960} height={640} className="h-auto w-full" />
        {value.caption ? <figcaption className="bg-slate-50 px-4 py-3 text-sm text-slate-500">{value.caption}</figcaption> : null}
      </figure>
    ),
    callout: ({ value }) => (
      <aside className="my-10 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6">
        {value.title ? <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-700">{value.title}</p> : null}
        <p className="mt-2 leading-7 text-slate-700">{value.text}</p>
      </aside>
    ),
  },
};

export function ArticleBody({ value }: { value?: Parameters<typeof PortableText>[0]["value"] }) {
  if (!value || !Array.isArray(value)) return null;
  return <PortableText value={value} components={components} />;
}
