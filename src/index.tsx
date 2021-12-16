import ForgeUI, { render, ProjectPage, Fragment } from '@forge/ui';
import { SkillManagement } from './skill-management';
import { UserManagement } from './user-management';

const App = () => {
    return (
        <Fragment>
            <UserManagement />
            <SkillManagement />
        </Fragment>
    );
};

export const run = render(
    <ProjectPage>
        <App />
    </ProjectPage>
);