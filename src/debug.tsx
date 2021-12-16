import ForgeUI, { Button, Fragment, Heading } from "@forge/ui";
import { deleteSkills } from "./services/storage-service";

export const DebugComponent = () => {
    return (
        <Fragment>
            <Heading>Debug Section</Heading>
            <Button onClick={deleteSkills} appearance="danger" text="Delete all skills"/>
        </Fragment>
    );
}