import { storage } from "@forge/api";
import Skill from "src/types/Skill";

export default class StorageService {
    constructor(
        private skillsKey: string = "skills"
    ) { }

    getSkills = async (): Promise<Skill[]> => {
        return await storage.get(this.skillsKey);
    };

    addSkill = async (skill: Skill): Promise<Skill[]> => {
        let skills: Skill[] = await this.getSkills() || new Array<Skill>();
    
        if (skills.find(s => s.name === skill.name) == null)
        {
            skills.push(skill);
        }
    
        await storage.set(this.skillsKey, skills);
        return skills;
    };

    deleteSkills = async (): Promise<void> => {
        return await storage.delete(this.skillsKey);
    };
}