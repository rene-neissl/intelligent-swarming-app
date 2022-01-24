import Resolver from "@forge/resolver"
import ComponentToSkillMapper from "./services/ComponentToSkillMapper";
import JiraApiService from "./services/JiraApiService";
import MatchingService, { EuclideanDistance, QuadraticWorkloadFactor } from "./services/MatchingService";
import Agent from "./types/Agent";
import IntelligentMatchingResult from "./types/IntelligentMatchingResult";
import Request from "./types/Request";

const resolver: Resolver = new Resolver();
const apiService: JiraApiService = new JiraApiService();
const skillMapper: ComponentToSkillMapper = new ComponentToSkillMapper();
const intelligentMatching: MatchingService = new MatchingService(EuclideanDistance, QuadraticWorkloadFactor);

resolver.define("issue-created", async ({ payload, context }) => {
    const issueId: number = payload as unknown as number;

    try {
        const agents: Array<Agent> = await apiService.getAssignableAgents();

        // Get the Jira Component from the request category.
        const component: string = await apiService.getIssueComponent(issueId); 

        // Determine required skills to solve a request for the given component.
        const request: Request = new Request(issueId, skillMapper.getSkillsForComponent(component));

        // Perform Intelligent Matching to find perfect agent for this request.
        const match: IntelligentMatchingResult = intelligentMatching.findAgentForRequest(agents, request);

        // Assign request to the best agent.
        await apiService.assignRequestToAgent(match.request, match.agent);
    } catch(e) {
        console.log(e);
    }
});

export const handler = resolver.getDefinitions();