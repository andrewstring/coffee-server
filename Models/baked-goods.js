const key = "bakedGoods";

const validator = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "description", "cost", "dateAdded"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and must be required",
        },
        picture: {
          bsonType: "string",
          description: "url of the picture, not required",
        },
        description: {
          bsonType: "string",
          description: "must be a string and must be required",
        },
        cost: {
          bsonType: "decimal",
          description: "must be a decimal value and must be required",
        },
        ingredients: {
          bsonType: "array",
          description: "array of all the ingredients, not required",
          minItems: 0,
          uniqueItems: false,
          items: {
            bsonType: "string",
            description: "the ingredient",
          },
        },
        tags: {
          bsonType: "array",
          description: "array of all the tags, not required",
          minItems: 0,
          uniqueItems: false,
          items: {
            bsonType: "string",
            description: "the tag",
          },
        },
        dateAdded: {
          bsonType: "date",
          description: "date that must be required, automatically inserted",
        },
        dateUpdated: {
          bsonType: "date",
          description:
            "updated date that must be required, automatically inserted",
        },
      },
    },
  },
};

module.exports = { key, validator };
