import { registerBlockType } from "@quillforms/blocks";
import display from "./display";
import mergeTag from "./merge-tag";

registerBlockType("picture-choice", {
  supports: {
    editable: true
  },
  attributes: {
    choices: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: {
            type: "string"
          },
          label: {
            type: "string"
          },
          imageUrl: {
            type: "string"
          }
        }
      }
    },
    imgWidth: {
      type: "number",
      default: "178"
    },
    imgHeight: {
      type: "number",
      default: "156"
    },
    verticalAlign: {
      type: "boolean",
      default: false
    },
    multiple: {
      type: "boolean"
    }
  },
  display,
  mergeTag
});
