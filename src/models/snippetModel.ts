import { prismaConnect } from "../lib/prisma.ts";

export const findSnippetById = async (id: string) => {
  return await prismaConnect.snippet.findUnique({
    where: { id: id },
  });
};

export const createNewSnippet = async (data: {
  code: string;
  language: string;
  theme: string;
}) => {
  return await prismaConnect.snippet.create({
    data,
  });
};