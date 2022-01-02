export default class Skill {
    name: string;
    description: string;
    level: number;

    constructor(name: string, description: string, level: number = 0) {
        this.name = name;
        this.description = description;
        this.level = level >= 0 ? level : 0;
    }
}