/**
 * @file Contains interfaces to octokit.
 * @copyright 2022 OneZero Company
 * @license MIT
 * @author Luca Silverentand <luca@onezero.company>
 */

import { setFailed } from '@actions/core';
import { getOctokit } from '@actions/github';
import { getOptionalInput } from '../getOptionalInput';

const token = getOptionalInput('token') ?? process.env['GITHUB_TOKEN'];
if (typeof token !== 'string') {
  setFailed(
    "No github token provided. Please provide a token in the 'token' input.",
  );
  process.exit(1);
}
export const octokit = getOctokit(token);
export const { graphql } = octokit;
