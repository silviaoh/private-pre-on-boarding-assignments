import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
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
