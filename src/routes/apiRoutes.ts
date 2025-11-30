import express from "express"
import { SnippetController } from "../controllers/snippetController.ts";

const router = express.Router()
const snippetController = new SnippetController()

// router.get("/:id", snippetController.getSnippetById)
// router.post("/", snippetController.createSnippet)

router.get("/:id", snippetController.getSnippetById)
router.post("/",  snippetController.createSnippet)
router.get("/test", (req, res) => {
    res.send("API is working")
})

export default router;

