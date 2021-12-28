import Skill from "../types/Skill";

export default class ComponentToSkillMapper {
    public getSkillsForComponent(component: string): Array<Skill> {
        let skills: Array<Skill> = new Array<Skill>();

        switch (component) {
            case "Server":
                skills.push(new Skill("ASP.NET", 2));
                skills.push(new Skill("Network", 1));
                skills.push(new Skill("Docker", 1));
                break;
        
            case "User Interface":
                skills.push(new Skill("Typescript", 2));
                skills.push(new Skill("Network", 1));
                break;

            case "SDK":
                skills.push(new Skill("ASP.NET", 1));
                skills.push(new Skill("Network", 1));
                skills.push(new Skill("Windows", 2));
                break;

            case "Client-Server Communication":
                skills.push(new Skill("ASP.NET", 1));
                skills.push(new Skill("Typescript", 1));
                skills.push(new Skill("Network", 2));
                skills.push(new Skill("Docker", 2));
                skills.push(new Skill("Windows", 1));
                skills.push(new Skill("Linux", 1));
                break;

            case "Triggers & Notifications":
                skills.push(new Skill("ASP.NET", 1));
                skills.push(new Skill("Network", 2));
                skills.push(new Skill("Docker", 1));
                skills.push(new Skill("Linux", 1));
                break;

            default:
                console.log("Unknown component: " + component);
                break;
        }

        return skills;
    } 
}