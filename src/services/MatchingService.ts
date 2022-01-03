import Agent from "../types/Agent";
import IntelligentMatchingResult from "../types/IntelligentMatchingResult";
import Request from "../types/Request";
import Skill from "../types/Skill";

type DistanceMetric = (a: Array<Skill>, r: Array<Skill>) => number;
type WorkloadFactor = (w: number) => number;

export default class MatchingService {
    public findAgentForRequest(agents: Array<Agent>, request: Request, distance: DistanceMetric, workload: WorkloadFactor): IntelligentMatchingResult {
        let bestMatch: IntelligentMatchingResult;
        let bestScore: number = Infinity;

        agents.forEach(agent => {
            let result: IntelligentMatchingResult = this.calculateSimilarity(agent, request, distance, workload);
            if (result.score < bestScore)
            {
                bestScore = result.score;
                bestMatch = result;
            }
        }); 

        return bestMatch;
    }

    public calculateScoreForAgents(agents: Array<Agent>, request: Request, distance: DistanceMetric, workload: WorkloadFactor): Array<IntelligentMatchingResult> {
        return agents.map(agent => this.calculateSimilarity(agent, request, distance, workload))
            .sort((x: IntelligentMatchingResult, y: IntelligentMatchingResult) => x.score - y.score);
    }

    private calculateSimilarity(agent: Agent, request: Request, distance: DistanceMetric, workload: WorkloadFactor): IntelligentMatchingResult {
        let similarityScore: number = distance(agent.skills, request.requiredSkills);
        let score = similarityScore * workload(agent.requestsAssigned);
        return new IntelligentMatchingResult(agent, score);
    }
}

export const EuclideanDistance: DistanceMetric = (a: Array<Skill>, r: Array<Skill>): number => {
    let squaredDistance: number = 0;
    
    a.forEach(aSkill => {
        const rSkill: Skill = r.find(skill => skill.name === aSkill.name);
        const skillDistance: number = Math.pow(aSkill.level - rSkill.level, 2);

        squaredDistance += skillDistance;
    });
    
    let euclideanDistance = Math.sqrt(squaredDistance);
    return euclideanDistance;
}

export const QuadraticWorkloadFactor: WorkloadFactor = (w: number): number => {
    if (w < 0) {
        return 1;
    }

    return 1 + Math.pow(w / 5, 2);
}