import ForgeUI, { Cell, Fragment, Row, Table, Text, User, useEffect, useProductContext, useState, Head } from "@forge/ui";
import ComponentToSkillMapper from "./services/ComponentToSkillMapper";
import JiraApiService from "./services/JiraApiService";
import MatchingService, { EuclideanDistance, QuadraticWorkloadFactor } from "./services/MatchingService";
import Agent from "./types/Agent";
import IntelligentMatchingResult from "./types/IntelligentMatchingResult";
import Request from "./types/Request";

export const Collaboration = () => {
    const apiService: JiraApiService = new JiraApiService();
    const skillMapper: ComponentToSkillMapper = new ComponentToSkillMapper();
    const intelligentMatching: MatchingService = new MatchingService(EuclideanDistance, QuadraticWorkloadFactor);

    const issueId = useProductContext().platformContext["issueId"];
    const [matches, setMatches] = useState<Array<IntelligentMatchingResult>>(new Array<IntelligentMatchingResult>());

    useEffect(async () => {
        const component: string = await apiService.getIssueComponent(issueId);
        const request: Request = new Request(issueId, skillMapper.getSkillsForComponent(component));
        const agents: Array<Agent> = await apiService.getAssignableAgents();
        setMatches(intelligentMatching.calculateScoreForAgents(agents, request));
    }, []);

    return (
        <Fragment>
            <Table>
                <Head>
                    <Cell>
                        <Text>Agent</Text>
                    </Cell>
                    <Cell>
                        <Text>Score</Text>
                    </Cell>
                </Head>
                {matches && matches.map(match => 
                    <Row>
                        <Cell>
                            <User accountId={match.agent.id} />
                        </Cell>
                        <Cell>
                            <Text>{match.score.toPrecision(3)}</Text>
                        </Cell>
                    </Row>
                )}
            </Table>
        </Fragment>
    );
}