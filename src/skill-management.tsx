import ForgeUI, { Button, Cell, Form, Fragment, Heading, ModalDialog, Row, Table, TextField, Text, useState, TextArea } from "@forge/ui";
import StorageService from "./services/StorageService";
import Skill from "./types/Skill";

export const SkillManagement = () => {
    const storageService: StorageService = new StorageService();

    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [skills, setSkills] = useState<Array<Skill>>(() => storageService.getSkills());

    const skillNameKey: string = "name";
    const skillDescriptionKey: string = "description";

    const onSubmit = async (formData: FormData): Promise<void> => {
        setSkills(await storageService.addSkill(new Skill(formData[skillNameKey], formData[skillDescriptionKey])));
        setModalOpen(false);
    };

    return (
        <Fragment>
            <Heading>Skill Management</Heading>
            <Table>
                {skills && skills.map(skill => 
                    <Row>
                        <Cell>
                            <Text>{skill.name}</Text>
                        </Cell>
                        <Cell>
                            <Text>{skill.description}</Text>
                        </Cell>
                    </Row>
                )}
            </Table>
            <Button onClick={() => setModalOpen(true)} appearance="primary" text="Add New Skill"/>
            {isModalOpen && (
                <ModalDialog header="Add New Skill" onClose={() => setModalOpen(false)} width="small">
                    <Form onSubmit={onSubmit} submitButtonText="Add" submitButtonAppearance="primary">
                        <TextField label="Name" name={skillNameKey} isRequired={true} type="text"/>
                        <TextArea label="Description" name={skillDescriptionKey} isRequired={true} spellCheck={true}/>
                    </Form>
                </ModalDialog>
            )}
        </Fragment>
    );
}