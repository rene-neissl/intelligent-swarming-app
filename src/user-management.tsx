import ForgeUI, { Form, Fragment, Heading, ModalDialog, UserPicker, Range, useState } from "@forge/ui";

export const UserManagement = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<string>(undefined);

    const onUserSelectionSubmit = async (formData: FormData) => {
        setSelectedUserId(formData["user"]);
        setModalOpen(true);
    };

    const onSkillSelectionSubmit = async (formData: FormData) => {
        setSelectedUserId(undefined);
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
                    {/* <User accountId={selectedUserId} /> */}
                    <Form onSubmit={onSkillSelectionSubmit} submitButtonText="Confirm" submitButtonAppearance="primary">
                        <Range label="Skill name" name="skill-name" defaultValue={4} min={0} max={5} step={1} />
                    </Form>
                </ModalDialog>
            )}
        </Fragment>
    );
}