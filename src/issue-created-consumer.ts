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
const intelligentMatching: MatchingService = new MatchingService();

resolver.define("issue-created", async ({ payload, context }) => {
    const issueId: number = payload as unknown as number;
    const component: string = await apiService.getIssueComponent(issueId);

    const request: Request = new Request(issueId, skillMapper.getSkillsForComponent(component));
    const agents: Array<Agent> = await apiService.getAssignableAgents();
    const match: IntelligentMatchingResult = intelligentMatching.findAgentForRequest(agents, request, EuclideanDistance, QuadraticWorkloadFactor);
    console.log(JSON.stringify(match));

    await apiService.assignRequestToAgent(match.request, match.agent);
});

export const handler = resolver.getDefinitions();