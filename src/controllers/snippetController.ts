import { Request, Response, NextFunction } from "express";
import { SnippetService } from "../services/snippetServices.ts";
import { Snippet } from "../generated/prisma/browser.ts";

const handleResponse = (
  res: Response,
  status: number,
  message: string,
  data: Snippet | null = null
) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

interface ReqStructure {
  code: string;
  language: string;
}

export class SnippetController {
  constructor(private snippetService = new SnippetService()) {}

  getSnippetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const snippet = await this.snippetService.getSnippetById(id);
      
      if (!snippet) {
        return handleResponse(res, 404, "Snippet not found", null);
      }
      
      handleResponse(res, 200, "Snippet fetched successfully", snippet);
    } catch (err) {
      next(err);
    }
  };

  createSnippet = async (
    req: Request<{}, {}, ReqStructure>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const snippet = await this.snippetService.createSnippet(req.body);
      handleResponse(res, 201, "Snippet created successfully", snippet);
    } catch (err) {
      next(err);
    }
  };
}