import { type CollectionConfig } from "payload";

import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import { superAdminOnlyAdmin, superAdminOnly } from "@/access/roleBasedAccess";
// import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { currencyField } from "@/fields/currencyField";
import { defaultLexical } from "@/fields/defaultLexical";
import { slugField } from "@/fields/slug";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";

export const ProductNew: CollectionConfig = {
  slug: "productnew",
  labels: {
    singular: {
      en: "Product",
      zh: "产品",
      hr: "Proizvod", // Croatian
    },
    plural: {
      en: "Products list",
      zh: "产品列表",
      hr: "Popis proizvoda", // Croatian
    }
  },
  admin: {
    defaultColumns: ["title"],
    useAsTitle: "title",
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          path: `/product/${typeof data?.slug === "string" ? data.slug : ""}`,
          locale: req.locale
        });
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
      }
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        path: `/product/${typeof data?.slug === "string" ? data.slug : ""}`,
        locale: req.locale
      }),
    group: {
      en: "Products",
      zh: "产品",
      hr: "Proizvodi", // Croatian
    }
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Product name",

        hr: "Naziv proizvoda", // Croatian
      },
      type: "text",
      localized: true,
      required: true
    },
    ...slugField(),
    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "Content"

          },
          fields: [
            {
              name: "description",
              label: {
                en: "Product description",

                hr: "Opis proizvoda", // Croatian
              },
              localized: true,
              type: "richText",
              editor: defaultLexical
            },
            {
              name: "images",
              label: {
                en: "Product images",

                hr: "Slike proizvoda", // Croatian
              },
              type: "upload",
              relationTo: "media",
              hasMany: true,
              maxRows: 10,
              minRows: 1,
              required: true,
              admin: {
                description: {
                  en: "If you have variants, first image will be variant image.",

                  hr: "Ako imate varijante, prva slika će biti slika varijante.", // Croatian
                }
              }
            },
            {
              name: "details",
              type: "array",
              label: {
                en: "Details",

                hr: "Detalji", // Croatian
              },
              labels: {
                singular: {
                  en: "Detail",

                  hr: "Detalj", // Croatian
                },
                plural: {
                  en: "Details",

                  hr: "Detalji", // Croatian
                }
              },
              admin: {
                components: {
                  RowLabel: "@/collections/(ecommerce)/Products/components/RowLabels/DetailLabel#DetailLabel"
                }
              },
              fields: [
                {
                  name: "title",
                  label: {
                    en: "Title",

                    hr: "Naslov", // Croatian
                  },
                  localized: true,
                  type: "text",
                  required: true
                },
                {
                  name: "content",
                  label: {
                    en: "Content",

                    hr: "Sadržaj", // Croatian
                  },
                  localized: true,
                  required: true,
                  type: "richText",
                  editor: defaultLexical
                },
              ]
            },
          ]
        },
        {
          label: {
            en: "Variants options",

            hr: "Opcije varijanti", // Croatian
          },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "enableVariants",
                  label: {
                    en: "Enable variants",

                    hr: "Omogući varijante", // Croatian
                  },
                  type: "checkbox",
                  admin: {
                    width: "fit-content"
                  }
                },
              ]
            },
            
          ]
        },
        {
          label: {
            en: "Product details"

          },
          admin: {
            // todo: not working condition, waiting for payload team to fix conditional tabs.
            // condition: (data) => {
            //   return !data.enableVariants && !data.enableVariantPrices;
            // }
          },
          fields: [
            {
              name: "categoriesArr",
              label: {
                en: "Product categories"

              },
              labels: {
                singular: {
                  en: "Category"

                },
                plural: {
                  en: "Categories"

                }
              },
              type: "array",
              fields: [
                {
                  name: "category",
                  label: {
                    en: "Category"

                  },
                  type: "relationship",
                  index: true,
                  relationTo: "productCategories",
                  required: true
                },
                {
                  name: "subcategories",
                  index: true,
                  type: "relationship",
                  label: {
                    en: "Subcategories"

                  },
                  relationTo: "productSubCategories",
                  filterOptions: ({ siblingData }) => {
                    const siblingDataTyped: {
                      category: string;
                    } = siblingData as any;
                    return {
                      category: {
                        equals: siblingDataTyped.category
                      }
                    };
                  },
                  hasMany: true
                },
              ]
            },
            {
              name: "stock",
              label: {
                en: "Stock"

              },
              type: "number",
              admin: {
                condition: (data) => !data.enableVariants,
                description: {
                  en: "Define stock for whole product. A stock of 0 disables checkout for this product."

                }
              },
              defaultValue: 0,
              required: true
            },
            {
              name: "weight",
              label: {
                en: "Weight (g)"

              },
              type: "number",
              admin: {
                condition: (data) => !data.enableVariantWeights,
                description: {
                  en: "Define weight for whole product."

                }
              },
              defaultValue: 0,
              required: true
            },
            {
              name: "pricing",
              type: "array",
              label: {
                en: "Pricing"

              },
              minRows: 1,
              required: true,
              labels: {
                singular: {
                  en: "Price"

                },
                plural: {
                  en: "Prices"

                }
              },
              admin: {
                condition: (data) => !data.enableVariantPrices,
                components: {
                  RowLabel: "@/components/(ecommerce)/RowLabels/PriceRowLabel#PriceRowLabel"
                }
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "value",
                      type: "number",
                      index: true,
                      label: {
                        en: "Price"

                      },
                      required: true
                    },
                    currencyField,
                  ]
                },
              ]
            },
            {
              name: "bought",
              index: true,
              label: {
                en: "Bought"

              },
              type: "number",
              defaultValue: 0
            },
          ]
        },
      ]
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100
      },
      schedulePublish: true
    },
    maxPerDoc: 50
  }
};
