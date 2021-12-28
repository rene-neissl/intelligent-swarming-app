import Resolver from "@forge/resolver"
import JiraApiService from "./services/JiraApiService";
import Skill from "./types/Skill";

const resolver: Resolver = new Resolver();
const apiService: JiraApiService = new JiraApiService();

resolver.define("issue-created", async ({ payload, context }) => {
    const issueId: number = payload as unknown as number;
    const component: string = await apiService.getIssueComponent(issueId);

});

export const handler = resolver.getDefinitions();