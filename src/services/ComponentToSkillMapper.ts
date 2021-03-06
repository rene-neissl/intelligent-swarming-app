import Skill from "../types/Skill";

export default class ComponentToSkillMapper {
    public getSkillsForComponent(component: string): Array<Skill> {
        let skills: Array<Skill> = new Array<Skill>();

        switch (component) {
            case "Server":
                skills.push(new Skill("Spring Boot", "", 2));
                skills.push(new Skill("Angular", "", 0));
                skills.push(new Skill("Netzwerktechnik", "", 1));
                skills.push(new Skill("Docker", "", 1));
                skills.push(new Skill("Windows", "", 0));
                skills.push(new Skill("Linux", "", 0));
                break;
        
            case "User Interface":
                skills.push(new Skill("Spring Boot", "", 0));
                skills.push(new Skill("Angular", "", 2));
                skills.push(new Skill("Netzwerktechnik", "", 1));
                skills.push(new Skill("Docker", "", 0));
                skills.push(new Skill("Windows", "", 0));
                skills.push(new Skill("Linux", "", 0));
                break;

            case "SDK":
                skills.push(new Skill("Spring Boot", "", 1));
                skills.push(new Skill("Angular", "", 0));
                skills.push(new Skill("Netzwerktechnik", "", 1));
                skills.push(new Skill("Docker", "", 0));
                skills.push(new Skill("Windows", "", 2));
                skills.push(new Skill("Linux", "", 0));
                break;

            case "Client-Server-Communication":
                skills.push(new Skill("Spring Boot", "", 1));
                skills.push(new Skill("Angular", "", 1));
                skills.push(new Skill("Netzwerktechnik", "", 2));
                skills.push(new Skill("Docker", "", 2));
                skills.push(new Skill("Windows", "", 1));
                skills.push(new Skill("Linux", "", 1));
                break;

            case "Triggers & Notifications":
                skills.push(new Skill("Spring Boot", "", 1));
                skills.push(new Skill("Angular", "", 0));
                skills.push(new Skill("Netzwerktechnik", "", 2));
                skills.push(new Skill("Docker", "", 1));
                skills.push(new Skill("Windows", "", 0));
                skills.push(new Skill("Linux", "", 1));
                break;

            default:
                console.log("Unknown component: " + component);
                break;
        }

        return skills;
    } 
}