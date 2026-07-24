import type { StructureResolver } from "sanity/structure";

const pillars = ["Movement", "Nutrition", "Sleep", "Stress", "Hormones", "Recovery", "Longevity", "Mindset"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Back to Protocol content")
    .items([
      S.listItem().title("All articles").child(S.documentTypeList("article").title("All articles")),
      S.listItem().title("Articles by pillar").child(
        S.list().title("Articles by pillar").items(
          pillars.map((pillar) => S.listItem().title(pillar).child(S.documentList().title(`${pillar} articles`).schemaType("article").filter('_type == "article" && pillar == $pillar').params({ pillar })))
        )
      ),
      S.divider(),
      S.documentTypeListItem("author").title("Authors"),
    ]);
