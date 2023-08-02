import { config } from '@onezerocompany/atlas';

export function printProject({
  loadedConfig,
  verbose,
}: {
  loadedConfig: config.LoadConfigOutput;
  verbose: boolean;
}) {
  console.log(`Name: ${loadedConfig.config?.displayName}\n`);

  console.log('Repository:');
  console.log(`  owner: ${loadedConfig.config?.repo.owner}`);
  console.log(`  name: ${loadedConfig.config?.repo.name}`);
  console.log(`  url: ${loadedConfig.config?.repo.url}`);

  console.log('\nAuthor:');
  console.log(`  name: ${loadedConfig.config?.author.name}`);
  console.log(`  email: ${loadedConfig.config?.author.email}`);
  console.log(`  url: ${loadedConfig.config?.author.url}`);

  console.log(`\nLicense: ${loadedConfig.config?.license}`);

  console.log('\nBranches:');
  for (const branch of loadedConfig.config?.branches ?? []) {
    console.log(`- ${branch.name} (type: ${branch.type})`);
  }

  console.log('\nProjects:');
  for (const project of loadedConfig.config?.projects ?? []) {
    console.log(`- ${project.name}`);
    console.log(`  id: ${project.id}`);
    console.log(`  path: ${project.path}`);
    console.log(`  type: ${project.type}`);
    if (project.lint_steps?.length ?? 0 > 0) {
      console.log(`  lint steps:`);
      for (const lintStep of project.lint_steps ?? []) {
        console.log(`  - ${lintStep.name}`);
        console.log(`    id: ${lintStep.id}`);
        console.log(`    type: ${lintStep.type}`);
        console.log(
          `    depends_on: [${(lintStep.dependsOn ?? [])?.join(', ')}]`,
        );
      }
    }
    if (project.test_steps?.length ?? 0 > 0) {
      console.log(`  test steps:`);
      for (const testStep of project.test_steps ?? []) {
        console.log(`  - ${testStep.name}`);
        console.log(`    id: ${testStep.id}`);
        console.log(`    type: ${testStep.type}`);
        console.log(
          `    depends_on: [${(testStep.dependsOn ?? [])?.join(', ')}]`,
        );
      }
    }
    if (project.build_steps?.length ?? 0 > 0) {
      console.log(`  build steps:`);
      for (const buildStep of project.build_steps ?? []) {
        console.log(`  - ${buildStep.name}`);
        console.log(`    id: ${buildStep.id}`);
        console.log(`    type: ${buildStep.type}`);
        console.log(
          `    depends_on: [${(buildStep.dependsOn ?? [])?.join(', ')}]`,
        );
      }
    }
  }

  if (verbose) {
    console.log(`git root: ${loadedConfig.gitRoot}`);
    console.log(`config file path: ${loadedConfig.configFilePath}`);
  }

  console.log(`\n`);
}
