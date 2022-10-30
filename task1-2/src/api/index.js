import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: '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',
});

export const getIssuesAPI = async (page = 0) =>
  await octokit
    .request(`GET /repos/angular/angular-cli/issues`, {
      sort: 'comments',
      page,
    })
    .then(res => res.data);

export const getIssueAPI = async issueNumber =>
  await octokit
    .request(`GET /repos/angular/angular-cli/issues/${issueNumber}`, {})
    .then(res => res.data);
