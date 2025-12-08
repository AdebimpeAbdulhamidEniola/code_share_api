import express from "express"
import { getSnippetById, createSnippet } from "../controllers/snippetController.ts";
import { createSnippetValidator } from "../middleware/snippetValidator.ts";
import { validate } from "../middleware/validate.ts";

const router = express.Router()

router.get("/:id", getSnippetById)
router.post("/", createSnippetValidator, validate, createSnippet)

export default router;

