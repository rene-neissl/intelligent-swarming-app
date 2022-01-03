import ForgeUI, { render, ProjectPage, Fragment, useProductContext, IssuePanel, Text } from '@forge/ui';
import { DebugComponent } from './debug';
import { SkillManagement } from './skill-management';
import { UserManagement } from './user-management';

const App = () => {
    const context = useProductContext();

    if (context.moduleKey === "intelligent-swarming-app-core") {
        return (
            <ProjectPage>
                <Fragment>
                    <UserManagement />
                    <SkillManagement />
                    <DebugComponent />
                </Fragment>
            </ProjectPage>
        );
    }
    else if (context.moduleKey === "intelligent-swarming-app-collaboration") {
        return (
            <IssuePanel>
                <Fragment>
                    <Text>Hello World!</Text>
                </Fragment>
            </IssuePanel>
        )
    }
};

export const run = render(<App />);