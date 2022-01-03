import Skill from "./Skill";

export default class Agent {
    id: string;
    skills: Array<Skill>;
    requestsAssigned: number;

    constructor(id: string, skills: Array<Skill>, requestsAssigned: number) {
        this.id = id;
        this.skills = skills;
        this.requestsAssigned = requestsAssigned;
    }
}