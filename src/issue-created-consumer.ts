import Resolver from "@forge/resolver"
import ComponentToSkillMapper from "./services/ComponentToSkillMapper";
import JiraApiService from "./services/JiraApiService";
import Skill from "./types/Skill";

const resolver: Resolver = new Resolver();
const apiService: JiraApiService = new JiraApiService();
const skillMapper: ComponentToSkillMapper = new ComponentToSkillMapper();

resolver.define("issue-created", async ({ payload, context }) => {
    const issueId: number = payload as unknown as number;
    const component: string = await apiService.getIssueComponent(issueId);
    const skills: Array<Skill> = skillMapper.getSkillsForComponent(component);

    console.log(JSON.stringify(skills));
});

export const handler = resolver.getDefinitions();