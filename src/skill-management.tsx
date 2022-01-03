import ForgeUI, { Button, Cell, Form, Fragment, Heading, ModalDialog, Row, Table, TextField, Text, useState } from "@forge/ui";
import StorageService from "./services/StorageService";
import Skill from "./types/Skill";

export const SkillManagement = () => {
    const storageService: StorageService = new StorageService();

    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [skills, setSkills] = useState<Array<Skill>>(() => storageService.getSkills());

    const skillKey: string = "skill";

    const onSubmit = async (formData: FormData): Promise<void> => {
        setSkills(await storageService.addSkill(new Skill(formData[skillKey], "")));
        setModalOpen(false);
    };

    return (
        <Fragment>
            <Heading>Skill Management</Heading>
            <Table>
                {skills && skills.map(skill => <Row><Cell><Text>{skill.name}</Text></Cell></Row>)}
            </Table>
            <Button onClick={() => setModalOpen(true)} appearance="primary" text="Add New Skill"/>
            {isModalOpen && (
                <ModalDialog header="Add New Skill" onClose={() => setModalOpen(false)} width="small">
                    <Form onSubmit={onSubmit} submitButtonText="Add" submitButtonAppearance="primary">
                        <TextField label="Skill Name" name={skillKey} isRequired={true} type="text"/>
                    </Form>
                </ModalDialog>
            )}
        </Fragment>
    );
}