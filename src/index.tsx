import ForgeUI, { render, ProjectPage, Fragment, Text } from '@forge/ui';

const App = () => {
    return (
        <Fragment>
            <Text>Hello Intelligen Swarming App!</Text>
        </Fragment>
    );
};

export const run = render(
    <ProjectPage>
        <App />
    </ProjectPage>
);

export async function handleIssueCreated(event, context) {
    console.log("Event received");
}