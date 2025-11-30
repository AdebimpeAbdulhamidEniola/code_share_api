import { SnippetRepository } from "../repository/snippetRepository.ts";


export class SnippetService {
    constructor(private repo = new SnippetRepository()) {}

    //Create a snippet 
    async createSnippet(data: {code:string, language:string}) {
       return await this.repo.createSnippet(data)
    }

    async getSnippetById(id: string) {
        return await this.repo.getSnippetById(id)
    }
}