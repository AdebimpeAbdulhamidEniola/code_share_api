import { body } from "express-validator";

export const createSnippetValidator = [
  body("code")
    .notEmpty()
    .withMessage("Code cannot be empty"),

  body("language")
    .notEmpty()
    .withMessage("Language is required"),
];
