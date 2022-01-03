import ForgeUI, { render, ProjectPage, Fragment, useProductContext } from '@forge/ui';
import { DebugComponent } from './debug';
import { SkillManagement } from './skill-management';
import { UserManagement } from './user-management';

const App = () => {
    return (
        <Fragment>
            <UserManagement />
            <SkillManagement />
            <DebugComponent />
        </Fragment>
    );
};

export const run = render(
    <ProjectPage>
        <App />
    </ProjectPage>
);