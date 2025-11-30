import { prismaConnect} from "../lib/prisma.ts";


export class SnippetRepository {
    constructor (private prisma = prismaConnect) {}

    //Saving a Snippet
    //Creating Snnippet in the DB
    async createSnippet(data: {
        code: string,
        language: string
    }) {
        const snippet = await this.prisma.snippet.create({data})
        return snippet
    }

    async getSnippetById(id: string) {
        const returnedSnippet = await this.prisma.snippet.findUnique({
            where: {id: id}
        })
        return returnedSnippet
    }
}
