import API, { route } from "@forge/api";


export default class JiraApiService {
    constructor() {

    }

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
}