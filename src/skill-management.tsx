import ForgeUI, { Button, Form, Fragment, Heading, ModalDialog, Table, TextField, useState } from "@forge/ui";

export const SkillManagement = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    const onSubmit = async (formData: FormData) => {

        setModalOpen(false);
    };

    return (
        <Fragment>
            <Heading>Skill Management</Heading>
            <Table>

            </Table>
            <Button onClick={() => setModalOpen(true)} appearance="primary" text="Add New Skill"/>
            {isModalOpen && (
                <ModalDialog header="Add New Skill" onClose={() => setModalOpen(false)} width="small">
                    <Form onSubmit={onSubmit} submitButtonText="Add" submitButtonAppearance="primary">
                        <TextField label="Skill Name" name="skill-name" isRequired={true} type="text"/>
                    </Form>
                </ModalDialog>
            )}
        </Fragment>
    );
}