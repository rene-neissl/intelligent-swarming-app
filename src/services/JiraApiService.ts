import API, { authorize, route } from "@forge/api";
import Request from "../types/Request";
import Agent from "../types/Agent";
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

    public async getAssignableAgentsForProject(projectKey: string): Promise<Array<Agent>> {
        const agents: Array<Agent> = new Array<Agent>();
        const response = await API.asApp().requestJira(route`/rest/api/3/users`, {
            headers: {
              'Accept': 'application/json'
            }
        });

        console.log(`Response: ${response.status} ${response.statusText}`);
        
        const agentData = await response.json();
        for (const agent of agentData) {
            if (agent.accountType === "atlassian") {
                agents.push(new Agent(agent.accountId, await this.storageService.getSkillsForAgent(agent.accountId), await this.getIssueCountForAgentId(agent.accountId)));
            }
        }

        return agents;
    }

    public async getIssueCountForAgentId(agentId: string): Promise<number> {
        const response = await API.asApp().requestJira(route`/rest/api/3/search?maxResults=0&jql=assignee=${agentId}`, {
            headers: {
              'Accept': 'application/json'
            }
        });
        
        console.log(`Response: ${response.status} ${response.statusText}`);
        
        const issueData = await response.json();
        return issueData.total;
    }

    public async assignRequestToAgent(request: Request, agent: Agent): Promise<void> {
        // const perms = await API.asApp().requestJira(route`/rest/api/3/mypermissions?projectKey=AAAS&permissions=BROWSE_PROJECTS,ASSIGN_ISSUES`, {
        //     headers: {
        //       'Accept': 'application/json'
        //     }
        // });
        // console.log(await perms.json());

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

        console.log(`Response: ${response.status} ${response.statusText}`);
        console.log(await response.json());
    }
}