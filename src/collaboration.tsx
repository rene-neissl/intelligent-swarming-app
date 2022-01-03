import ForgeUI, { Cell, Fragment, Row, Table, Text, User, useEffect, useProductContext, useState } from "@forge/ui";
import ComponentToSkillMapper from "./services/ComponentToSkillMapper";
import JiraApiService from "./services/JiraApiService";
import MatchingService, { EuclideanDistance, QuadraticWorkloadFactor } from "./services/MatchingService";
import Agent from "./types/Agent";
import IntelligentMatchingResult from "./types/IntelligentMatchingResult";
import Request from "./types/Request";

export const Collaboration = () => {
    const issueId = useProductContext().platformContext["issueId"];
    const apiService: JiraApiService = new JiraApiService();
    const skillMapper: ComponentToSkillMapper = new ComponentToSkillMapper();
    const intelligentMatching: MatchingService = new MatchingService();

    const [matches, setMatches] = useState<Array<IntelligentMatchingResult>>(new Array<IntelligentMatchingResult>());

    useEffect(async () => {
        const component: string = await apiService.getIssueComponent(issueId);
        const request: Request = new Request(issueId, skillMapper.getSkillsForComponent(component));
        const agents: Array<Agent> = await apiService.getAssignableAgents();
        const matches: Array<IntelligentMatchingResult> = intelligentMatching.calculateScoreForAgents(agents, request, EuclideanDistance, QuadraticWorkloadFactor);
        setMatches(matches);
    }, []);

    return (
        <Fragment>
            <Table>
                {matches && matches.map(match => <Row><Cell><User accountId={match.agent.id} /></Cell><Cell><Text>{match.score.toPrecision(3)}</Text></Cell></Row>)}
            </Table>
        </Fragment>
    );
}