import {
  RepositoryBranch,
  RepositoryBranchType,
  RepositoryConfig,
} from '@onezerocompany/config';
import eslintConfig from './projects/configs/eslint-config';

const projects = [eslintConfig];

const branches = [
  new RepositoryBranch({
    name: 'main',
    type: RepositoryBranchType.main,
  }),
];

const repository = new RepositoryConfig({
  displayName: 'OneZero Coding',
  repo: {
    owner: 'onezerocompany',
    name: 'coding',
    url: 'https://github.com/onezerocompany/coding',
  },
  author: {
    name: 'OneZero Company',
    email: 'github@onezero.support',
    url: 'https://onezero.company',
  },
  branches,
  projects,
});

export default repository;
