import Skill from "./Skill";

export default class Agent {
    constructor(
        public id: string,
        public skills: Array<Skill>
    ) { }
}