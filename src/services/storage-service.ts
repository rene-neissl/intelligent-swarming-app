import { storage } from "@forge/api";

export const getSkills = async (): Promise<string[]> => {
    return await storage.get("skills");
};

export const addSkill = async (skill: string): Promise<string[]> => {
    let skills: string[] = await getSkills() || new Array<string>();

    if (skills.find(s => s === skill) == null)
    {
        skills.push(skill);
    }

    await storage.set("skills", skills);
    return skills;
};

export const deleteSkills = async (): Promise<void> => {
    return await storage.delete("skills");
};