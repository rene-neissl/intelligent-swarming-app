import ForgeUI, { Button, Cell, Form, Fragment, Heading, ModalDialog, Row, Table, TextField, Text, useState } from "@forge/ui";
import { addSkill, getSkills } from "./services/storage-service";

export const SkillManagement = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [skills, setSkills] = useState<string[]>(() => getSkills());

    const onSubmit = async (formData: FormData) => {
        setSkills(await addSkill(formData["skill"]))
        setModalOpen(false);
    };

    return (
        <Fragment>
            <Heading>Skill Management</Heading>
            <Table>
                {skills && skills.map(skill => <Row><Cell><Text>{skill}</Text></Cell></Row>)}
            </Table>
            <Button onClick={() => setModalOpen(true)} appearance="primary" text="Add New Skill"/>
            {isModalOpen && (
                <ModalDialog header="Add New Skill" onClose={() => setModalOpen(false)} width="small">
                    <Form onSubmit={onSubmit} submitButtonText="Add" submitButtonAppearance="primary">
                        <TextField label="Skill Name" name="skill" isRequired={true} type="text"/>
                    </Form>
                </ModalDialog>
            )}
        </Fragment>
    );
}