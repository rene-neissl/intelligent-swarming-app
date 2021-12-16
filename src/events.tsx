import api, { route } from "@forge/api";

export async function handleIssueCreated(event, context) {
    console.log(JSON.stringify(event));
    assignIssue(event.issue.id)
}

async function assignIssue(issueId:string) {
    // User-Id will be set according to Intelligent Swarming
    var userId = "61448bf5e7c3280070ada128";

    var bodyData = `{
        "accountId": "${userId}"
    }`;

    const response = await api.asApp().requestJira(route`/rest/api/3/issue/${issueId}/assignee`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: bodyData
    });
      
    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log(await response.json());
}