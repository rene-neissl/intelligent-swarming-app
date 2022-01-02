import API, { route } from "@forge/api";
import Agent from "src/types/Agent";
import StorageService from "./StorageService";


export default class JiraApiService {
    constructor(
        private storageService: StorageService = new StorageService()
    ) {}

    public async getIssueComponent(issueId: number): Promise<string> {
        const response = await API.asApp().requestJira(route`/rest/api/3/issue/${issueId}?fields=components`, {
            headers: {
                "Accept": "application/json"
            }
        });
    
        // TODO: Error handling
        console.log(`Response: ${response.status} ${response.statusText}`);

        const issueData = await response.json();
        return issueData.fields.components[0].name;
    }

    public async getIssueCountForAgent(agent: Agent): Promise<number> {
        const response = await API.asApp().requestJira(route`/rest/api/3/search?maxResults=0&jql=assignee=${agent.id}`, {
            headers: {
              'Accept': 'application/json'
            }
        });
        
        console.log(`Response: ${response.status} ${response.statusText}`);
        
        const issueData = await response.json();
        return issueData.total;
    }

    public async getAllAgents(): Promise<Array<Agent>> {
        const agents: Array<Agent> = new Array<Agent>();
        const response = await API.asApp().requestJira(route`/rest/api/3/users`, {
            headers: {
              'Accept': 'application/json'
            }
        });

        console.log(`Response: ${response.status} ${response.statusText}`);
        
        const agentData = await response.json();
        agentData.forEach(async (agent) => {
            agents.push(new Agent(agent.accountId, await this.storageService.getSkillsForAgent(agent.accountId)))
        });

        return agents;
    }
}