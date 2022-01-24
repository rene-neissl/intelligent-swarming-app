import ForgeUI, { Form, Fragment, Heading, ModalDialog, UserPicker, Range, useState, User } from "@forge/ui";
import StorageService from "./services/StorageService";
import Agent from "./types/Agent";
import Skill from "./types/Skill";

const MaxSkillLevel: number = 2;

export const UserManagement = () => {
    const storageService: StorageService = new StorageService();

    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedAgent, setSelectedAgent] = useState<Agent>(undefined);

    const userKey: string = "user";

    const onUserSelectionSubmit = async (formData: FormData) => {
        const userId: string = formData[userKey];
        setSelectedAgent(new Agent(userId, await storageService.getSkillsForAgent(userId), 0));
        setModalOpen(true);
    };

    const onSkillSelectionSubmit = async (formData: FormData) => {
        const skills: Array<Skill> = await storageService.getSkills();
        skills.forEach(skill => skill.level = formData[skill.name] || 0);

        await storageService.updateSkillsForAgent(selectedAgent.id, skills);

        setSelectedAgent(undefined);
        setModalOpen(false);
    };

    return (
        <Fragment>
            <Heading>User Management</Heading>
            <Form onSubmit={onUserSelectionSubmit} submitButtonText="Configure Skills" submitButtonAppearance="primary">
                <UserPicker label="User" name={userKey} isMulti={false} isRequired={true} />
            </Form>
            {isModalOpen && (
                <ModalDialog header="Configure Skills" onClose={() => setModalOpen(false)} width="small">
                    {selectedAgent && <User accountId={selectedAgent.id} />}
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