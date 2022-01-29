import API, { route } from "@forge/api";
import Request from "../types/Request";
import Agent from "../types/Agent";
import StorageService from "./StorageService";

export default class JiraApiService {
    constructor(
        private storageService: StorageService = new StorageService()
    ) { }

    public async getIssueComponent(issueId: number): Promise<string> {
        const response = await API.asApp().requestJira(route`/rest/api/3/issue/${issueId}?fields=components`, {
            headers: {
                "Accept": "application/json"
            }
        });
    
        if (response.status !== 200) {
            console.log(`(getIssueComponent) ${response.status}: ${await response.json()}`);
            throw new Error("API Request failed");
        }

        return (await response.json()).fields.components[0].name;
    }

    public async getAssignableAgents(): Promise<Array<Agent>> {
        const agents: Array<Agent> = new Array<Agent>();
        const response = await API.asApp().requestJira(route`/rest/api/3/users`, {
            headers: {
              'Accept': 'application/json'
            }
        });

        if (response.status !== 200) {
            console.log(`(getAssignableAgents) ${response.status}: ${await response.json()}`);
            throw new Error("API Request failed");
        }
        
        for (const agent of await response.json()) {
            if (agent.accountType === "atlassian") {
                agents.push(new Agent(agent.accountId, await this.storageService.getSkillsForAgent(agent.accountId), await this.getIssueCountForAgentId(agent.accountId)));
            }
        }

        return agents;
    }

    public async getIssueCountForAgentId(agentId: string): Promise<number> {
        const response = await API.asApp().requestJira(route`/rest/api/3/search?maxResults=0&jql=assignee=${agentId}%20and%20resolution=null`, {
            headers: {
              'Accept': 'application/json'
            }
        });
        
        if (response.status !== 200) {
            console.log(`(getIssueCountForAgentId) ${response.status}: ${await response.json()}`);
            throw new Error("API Request failed");
        }
        
        return (await response.json()).total;
    }

    public async assignRequestToAgent(request: Request, agent: Agent): Promise<void> {
        let body: string = `{
            "accountId": "${agent.id}"
        }`;

        const response = await API.asApp().requestJira(route`/rest/api/3/issue/${request.id}/assignee`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: body
        });

        if (response.status !== 204) {
            console.log(`(assignRequestToAgent) ${response.status}: ${await response.json()}`);
            throw new Error("API Request failed");
        }
    }
}