import { PrettierLintStep, Project, ProjectType } from '@onezerocompany/config';

export default {
  id: 'eslint-config',
  name: '@onezerocompany/eslint-config',
  path: 'configs/eslint-config',
  type: ProjectType.node,
  lintSteps: [
    new PrettierLintStep({
      id: 'prettier',
      name: 'Prettier',
      configPackage: '@onezerocompany/prettier-config',
    }),
  ],
} as Project;
