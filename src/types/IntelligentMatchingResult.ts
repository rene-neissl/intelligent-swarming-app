import Agent from "./Agent";
import Request from "./Request";

export default class IntelligentMatchingResult {
    agent: Agent;
    request: Request;
    score: number;

    constructor(agent: Agent, request: Request, score: number) {
        this.agent = agent;
        this.request = request;
        this.score = score;
    }
}