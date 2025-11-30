import express from "express"
import { SnippetController } from "../controllers/snippetController.ts";
import { createSnippetValidator } from "../middleware/snippetValidator.ts";
import { validate } from "../middleware/validate.ts";

const router = express.Router()
const snippetController = new SnippetController()


router.get("/:id", snippetController.getSnippetById)
router.post("/", createSnippetValidator, validate, snippetController.createSnippet)

export default router;

