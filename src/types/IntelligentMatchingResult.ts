import Agent from "./Agent";

export default class IntelligentMatchingResult {
    agent: Agent;
    score: number;

    constructor(agent: Agent, score: number) {
        this.agent = agent;
        this.score = score;
    }
}