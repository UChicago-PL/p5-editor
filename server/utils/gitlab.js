import axios from 'axios';

function gitlabApi(token) {
  return axios.create({
    baseURL: `${process.env.GITLAB_URL}/api/v4`,
    headers: { Authorization: `Bearer ${token}` }
  });
}

/**
 * @param api         The axios API (see gitlabApi).
 * @param projectName The name of the gitlab project.
 */
async function listFilePaths(api, projectName, page = 1) {
  const response = await api.get(`/projects/${projectName}/repository/tree`, {
    params: { recursive: true, per_page: 100, page }
  });
  const paths = response.data.filter((item) => item.type === 'blob').map((item) => item.path);
  const nextPage = response.headers['x-next-page'];
  if (!nextPage) {
    return paths;
  }
  return paths.concat(await listFilePaths(api, projectName, nextPage));
}

/**
 * @typedef {Object} MergeRequestSettings
 * @property token         The gitlab API token.
 * @property projectName   The gitlab project name.
 * @property branch        The name of the branch from which to create the merge request.
 * @property title         The title of the merge request.
 * @property description   The description of the merge request.
 * @property commitMessage A commit message associated with the merge.
 * @property files         A mapping of file path to file contents.
 */

/**
 * @param {MergeRequestSettings}
 */
export async function createMergeRequest({ token, projectName, branch, title, description, commitMessage, files }) {
  const api = gitlabApi(token);
  projectName = encodeURIComponent(projectName);

  const project = await api.get(`/projects/${projectName}`);
  const targetBranch = project.data.default_branch;
  const existingPaths = new Set(await listFilePaths(api, projectName));

  const actions = Object.entries(files).map(([filePath, fileContents]) => ({
    action: existingPaths.has(filePath) ? 'update' : 'create',
    file_path: filePath,
    content: typeof fileContents === 'string' ? fileContents : fileContents.content,
    encoding: typeof fileContents === 'string' ? 'text' : fileContents.encoding
  }));

  await api.post(`/projects/${projectName}/repository/commits`, {
    branch,
    start_branch: targetBranch,
    commit_message: commitMessage,
    actions
  });

  const mergeRequest = await api.post(`/projects/${projectName}/merge_requests`, {
    source_branch: branch,
    target_branch: targetBranch,
    title,
    description
  });
  return mergeRequest.data;
}
