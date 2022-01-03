import Skill from "./Skill";

export default class Request {
    id: number;
    requiredSkills: Array<Skill>;

    constructor(id: number, requiredSkills: Array<Skill>) {
        this.id = id;
        this.requiredSkills = requiredSkills;
    }
}