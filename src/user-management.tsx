import ForgeUI, { Form, Fragment, Heading, ModalDialog, UserPicker, Range, useState, User } from "@forge/ui";
import JiraApiService from "./services/JiraApiService";
import StorageService from "./services/StorageService";
import Agent from "./types/Agent";
import Skill from "./types/Skill";

const MaxSkillLevel: number = 2;

export const UserManagement = () => {
    const storageService: StorageService = new StorageService();
    const apiService: JiraApiService = new JiraApiService();

    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedAgent, setSelectedAgent] = useState<Agent>(undefined);

    const onUserSelectionSubmit = async (formData: FormData) => {
        const userId: string = formData["user"];
        setSelectedAgent(new Agent(userId, await storageService.getSkillsForAgent(userId), await apiService.getIssueCountForAgentId(userId)));
        setModalOpen(true);
    };

    const onSkillSelectionSubmit = async (formData: FormData) => {
        const skills: Array<Skill> = await storageService.getSkills();
        await storageService.updateAgent(new Agent(selectedAgent.id, skills.map(skill => new Skill(skill.name, "", formData[skill.name] || 0)), await apiService.getIssueCountForAgentId(selectedAgent.id)));

        setSelectedAgent(undefined);
        setModalOpen(false);
    };

    return (
        <Fragment>
            <Heading>User Management</Heading>
            <Form onSubmit={onUserSelectionSubmit} submitButtonText="Configure Skills" submitButtonAppearance="primary">
                <UserPicker label="User" name="user" isMulti={false} isRequired={true} />
            </Form>
            {isModalOpen && (
                <ModalDialog header="Configure Skills" onClose={() => setModalOpen(false)} width="small">
                    <User accountId={selectedAgent.id} />
                    <Form onSubmit={onSkillSelectionSubmit} submitButtonText="Confirm" submitButtonAppearance="primary">
                        {selectedAgent && selectedAgent.skills.map(skill =>
                            <Range label={skill.name} name={skill.name} defaultValue={skill.level || 0} min={0} max={MaxSkillLevel} step={1} />
                        )}
                    </Form>
                </ModalDialog>
            )}
        </Fragment>
    );
}