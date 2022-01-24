import { ListResult, QueryBuilder, storage } from "@forge/api";
import Skill from "src/types/Skill";

export default class StorageService {
    private skillsKey: string = "skills"

    public async getSkills(): Promise<Array<Skill>> {
        return storage.get(this.skillsKey);
    }

    public async addSkill(skill: Skill): Promise<Array<Skill>> {
        let skills: Array<Skill> = await this.getSkills() || new Array<Skill>();

        if (skills.find(s => s.name === skill.name) == null) {
            skills.push(skill);
        }

        await storage.set(this.skillsKey, skills);
        return skills;
    }

    public async deleteSkills(): Promise<void> {
        return storage.delete(this.skillsKey);
    }

    public async getSkillsForAgent(userId: string): Promise<Array<Skill>> {
        return await storage.get(userId) || await this.getSkills();
    }

    public async updateSkillsForAgent(agentId: string, skills: Array<Skill>): Promise<void> {
        await storage.set(agentId, skills);
    }

    /* ================================= */
    /* ======== DEBUG FUNCTIONS ======== */
    /* ================================= */

    deleteSkillsForAgents = async (): Promise<void> => {
        const itemKeysToDelete: string[] = [];
        await this.findDataToDelete(undefined, itemKeysToDelete);
        await this.deleteItems(itemKeysToDelete);
    }

    findDataToDelete = async (cursor: any, itemKeysToDelete: string[]): Promise<void> => {
        const data = await this.getData(cursor);
        if (data.results.length) {
            data.results.forEach(async (item) => {
                itemKeysToDelete.push(item.key);
            });
            if (data.nextCursor) {
                await this.findDataToDelete(data.nextCursor, itemKeysToDelete);
            }
        }
    }

    getData = async (cursor: any): Promise<ListResult> => {
        let query: QueryBuilder = storage.query().limit(10);
        if (cursor) {
            query = query.cursor(cursor)
        }
        return query.getMany();
    }

    deleteItems = async (itemKeysToDelete: string[]): Promise<void> => {
        const keysToRetry: string[] = [];
        const deletionPromises: Promise<any>[] = itemKeysToDelete.map(async (itemKey) => {
            try {
                return await storage.delete(itemKey);
            } catch {
                keysToRetry.push(itemKey);
            }
        });
        await Promise.all(deletionPromises);
        if (keysToRetry.length) {
            return new Promise((resolve, reject) => {
                setTimeout(async () => {
                    await this.deleteItems(keysToRetry);
                    resolve();
                }, 1000);
            });
        }
    }
}