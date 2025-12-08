import { Request, Response, NextFunction } from "express";
import { Snippet } from "../generated/prisma/browser.ts";
import { findSnippetById, createNewSnippet } from "../models/snippetModel.ts";

interface ReqStructure {
  code: string;
  language: string;
  theme: string
}

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

export const getSnippetById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const snippet = await findSnippetById(id);

    if (!snippet) {
      return handleResponse(res, 404, "Snippet not found", null);
    }

    handleResponse(res, 200, "Snippet fetched successfully", snippet);
  } catch (err) {
    next(err);
  }
};

export const createSnippet = async (
  req: Request<{}, {}, ReqStructure>,
  res: Response,
  next: NextFunction
) => {
  try {
    const snippet = await createNewSnippet(req.body);
    handleResponse(res, 201, "Snippet created successfully", snippet);
  } catch (err) {
    next(err);
  }
};