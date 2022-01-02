import Skill from "./Skill";

export default class Agent {
    id: string;
    skills: Array<Skill>;

    constructor(id: string,skills: Array<Skill>) {
        this.id = id;
        this.skills = skills || new Array<Skill>();
    }
}