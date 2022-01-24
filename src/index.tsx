import ForgeUI, { render, ProjectPage, Fragment, useProductContext, IssuePanel } from '@forge/ui';
import { Collaboration } from './collaboration';
import { SkillManagement } from './skill-management';
import { UserManagement } from './user-management';
// import { DebugComponent } from './debug';

const App = () => {
    const context = useProductContext();

    if (context.moduleKey === "intelligent-swarming-app-core") {
        return (
            <ProjectPage>
                <Fragment>
                    <UserManagement />
                    <SkillManagement />
                    {/*
                    The DebugComponent is only used during development. It provides neat features to clear the stored data and
                    reset users and their skills. As of writing this, Atlassian Forge does not provide a mechanism for determine 
                    the environment where the app is currently running. As a result, the component can not be disabled when in
                    production environment, so it is commented out for now.
                    */}
                    {/* <DebugComponent /> */}
                </Fragment>
            </ProjectPage>
        );
    }
    else if (context.moduleKey === "intelligent-swarming-app-collaboration") {
        return (
            <IssuePanel>
                <Collaboration />
            </IssuePanel>
        )
    }
};

export const run = render(<App />);