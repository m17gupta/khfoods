import { type CollectionConfig } from "payload";

import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import { superAdminOnlyAdmin, superAdminOnly } from "@/access/roleBasedAccess";
// import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { currencyField } from "@/fields/currencyField";
import { defaultLexical } from "@/fields/defaultLexical";
import { slugField } from "@/fields/slug";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";

export const Attributes: CollectionConfig = {
  slug: "attributes",
  labels: {
    singular: {
      en: "Attribute",
      zh: "产品",
      hr: "Proizvod", // Croatian
    },
    plural: {
      en: "Attribute list",
      zh: "产品列表",
      hr: "Popis proizvoda", // Croatian
    },
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "defaultvalues",
      label: "Default Values",
      type: "array",
      fields: [
        {
          name: "value",
          label: "Value",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
