import ForgeUI, { Button, Fragment, Heading } from "@forge/ui";
import StorageService from "./services/StorageService";

export const DebugComponent = () => {
    const storageService: StorageService = new StorageService();

    return (
        <Fragment>
            <Heading>Debug Section</Heading>
            <Button onClick={storageService.deleteSkills} appearance="danger" text="Delete all skills"/>
        </Fragment>
    );
}