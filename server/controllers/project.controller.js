import archiver from 'archiver';
import format from 'date-fns/format';
import isUrl from 'is-url';
import jsdom, { serializeDocument } from 'jsdom';
import isAfter from 'date-fns/isAfter';
import request from 'request';
import slugify from 'slugify';
import Project from '../models/project';
import LogItem from '../models/logItem';
import User from '../models/user';
import { resolvePathToFile } from '../utils/filePath';
import generateFileSystemSafeName from '../utils/generateFileSystemSafeName';
import isPartOfStudy from './user.controller/isPartOfStudy';

export { default as createProject, apiCreateProject } from './project.controller/createProject';
export { default as deleteProject } from './project.controller/deleteProject';
export {
  default as getProjectsForUser,
  apiGetProjectsForUser
} from './project.controller/getProjectsForUser';

export function updateProject(req, res) {
  Project.findById(req.params.project_id, (findProjectErr, project) => {
    if (!project.user.equals(req.user._id)) {
      res.status(403).send({ success: false, message: 'Session does not match owner of project.' });
      return;
    }
    if (req.body.updatedAt && isAfter(new Date(project.updatedAt), new Date(req.body.updatedAt))) {
      res.status(409).send({ success: false, message: 'Attempted to save stale version of project.' });
      return;
    }
    Project.findByIdAndUpdate(
      req.params.project_id,
      {
        $set: req.body
      },
      {
        new: true,
        runValidators: true
      }
    )
      .populate('user', 'username')
      .exec((updateProjectErr, updatedProject) => {
        if (updateProjectErr) {
          console.log('updateProjectErr', updateProjectErr);
          res.status(400).json({ success: false });
          return;
        }
        isPartOfStudy(req.user.github, (e, studyParticipant) => {
          if (studyParticipant) {
            // eslint-disable-next-line no-use-before-define
            createLogItem({
              logType: 'snapshot',
              username: req.user.username,
              projectId: updatedProject._id,
              projectName: updatedProject.name,
              projectFiles: updatedProject.files,
              timestamp: Date.now(),
              userAgent: req.headers['user-agent']
            });
          }
        });

        if (req.body.files && updatedProject.files.length !== req.body.files.length) {
          const oldFileIds = updatedProject.files.map((file) => file.id);
          const newFileIds = req.body.files.map((file) => file.id);
          const staleIds = oldFileIds.filter((id) => newFileIds.indexOf(id) === -1);
          staleIds.forEach((staleId) => {
            updatedProject.files.id(staleId).remove();
          });
          updatedProject.save((innerErr, savedProject) => {
            if (innerErr) {
              console.log('updateProject error save', innerErr);
              res.status(400).json({ success: false });
              return;
            }
            res.json(savedProject);
          });
        } else {
          res.json(updatedProject);
        }
      });
  });
}

export function getProject(req, res) {
  const { project_id: projectId, username } = req.params;
  User.findByUsername(username, (err, user) => {
    if (!user) {
      res.status(404).send({ message: 'Project with that username does not exist.' });
      return;
    }
    Project.findOne({ user: user._id, $or: [{ _id: projectId }, { slug: projectId }] })
      .populate('user', 'username')
      .exec((e, project) => {
        // eslint-disable-line
        if (e) {
          console.log('getProject error', e);
          return res.status(404).send({ message: 'Project with that id does not exist' });
        }
        return res.json(project);
      });
  });
}

export function getProjectsForUserId(userId) {
  return new Promise((resolve, reject) => {
    Project.find({ user: userId })
      .sort('-createdAt')
      .select('name files id createdAt updatedAt')
      .exec((err, projects) => {
        if (err) {
          console.log('getProjectsForUserId error', err);
        }
        resolve(projects);
      });
  });
}

export function getProjectAsset(req, res) {
  Project.findById(req.params.project_id)
    .populate('user', 'username')
    .exec((err, project) => {
      if (err) {
        res.status(404).send({ message: 'Project with that id does not exist' });
        return;
      }
      if (!project) {
        res.status(404).send({ message: 'Project with that id does not exist' });
        return;
      }

      const filePath = req.params[0];
      const resolvedFile = resolvePathToFile(filePath, project.files);
      if (!resolvedFile) {
        res.status(404).send({ message: 'Asset does not exist' });
        return;
      }
      if (!resolvedFile.url) {
        res.send(resolvedFile.content);
        return;
      }
      request({ method: 'GET', url: resolvedFile.url, encoding: null }, (innerErr, response, body) => {
        if (innerErr) {
          return res.status(404).send({ message: 'Asset does not exist' });
        }
        return res.send(body);
      });
    });
}

export function getProjects(req, res) {
  if (req.user) {
    getProjectsForUserId(req.user._id).then((projects) => {
      res.json(projects);
    });
  } else {
    // could just move this to client side
    res.json([]);
  }
}

export function projectExists(projectId, callback) {
  Project.findById(projectId, (err, project) => (project ? callback(true) : callback(false)));
}

export function projectForUserExists(username, projectId, callback) {
  User.findByUsername(username, (err, user) => {
    if (!user) {
      callback(false);
      return;
    }
    Project.findOne(
      { user: user._id, $or: [{ _id: projectId }, { slug: projectId }] },
      (innerErr, project) => {
        if (!project) {
          callback(false);
          return;
        }
        callback(true);
      }
    );
  });
}

function bundleExternalLibs(project, zip, callback) {
  const indexHtml = project.files.find((file) => file.name.match(/\.html$/));
  let numScriptsResolved = 0;
  let numScriptTags = 0;

  function resolveScriptTagSrc(scriptTag, document) {
    const path = scriptTag.src.split('/');
    const filename = path[path.length - 1];
    const { src } = scriptTag;

    if (!isUrl(src)) {
      numScriptsResolved += 1;
      if (numScriptsResolved === numScriptTags) {
        indexHtml.content = serializeDocument(document);
        callback();
      }
      return;
    }

    request({ method: 'GET', url: src, encoding: null }, (err, response, body) => {
      if (err) {
        console.log('resolveScriptTagSrc', err);
      } else {
        zip.append(body, { name: filename });
        scriptTag.src = filename;
      }

      numScriptsResolved += 1;
      if (numScriptsResolved === numScriptTags) {
        indexHtml.content = serializeDocument(document);
        callback();
      }
    });
  }

  jsdom.env(indexHtml.content, (innerErr, window) => {
    const indexHtmlDoc = window.document;
    const scriptTags = indexHtmlDoc.getElementsByTagName('script');
    numScriptTags = scriptTags.length;
    for (let i = 0; i < numScriptTags; i += 1) {
      resolveScriptTagSrc(scriptTags[i], indexHtmlDoc);
    }
    if (numScriptTags === 0) {
      indexHtml.content = serializeDocument(document);
      callback();
    }
  });
}

function buildZip(project, req, res) {
  const zip = archiver('zip');
  const rootFile = project.files.find((file) => file.name === 'root');
  const numFiles = project.files.filter((file) => file.fileType !== 'folder').length;
  const { files } = project;
  let numCompletedFiles = 0;

  zip.on('error', (err) => {
    res.status(500).send({ error: err.message });
  });

  const currentTime = format(new Date(), 'yyyy_MM_dd_HH_mm_ss');
  project.slug = slugify(project.name, '_');
  res.attachment(`${generateFileSystemSafeName(project.slug)}_${currentTime}.zip`);
  zip.pipe(res);

  function addFileToZip(file, path) {
    if (file.fileType === 'folder') {
      const newPath = file.name === 'root' ? path : `${path}${file.name}/`;
      file.children.forEach((fileId) => {
        const childFile = files.find((f) => f.id === fileId);
        (() => {
          addFileToZip(childFile, newPath);
        })();
      });
    } else if (file.url) {
      request({ method: 'GET', url: file.url, encoding: null }, (err, response, body) => {
        zip.append(body, { name: `${path}${file.name}` });
        numCompletedFiles += 1;
        if (numCompletedFiles === numFiles) {
          zip.finalize();
        }
      });
    } else {
      zip.append(file.content, { name: `${path}${file.name}` });
      numCompletedFiles += 1;
      if (numCompletedFiles === numFiles) {
        zip.finalize();
      }
    }
  }

  bundleExternalLibs(project, zip, () => {
    addFileToZip(rootFile, '/');
  });
}

export function downloadProjectAsZip(req, res) {
  Project.findById(req.params.project_id, (err, project) => {
    // save project to some path
    buildZip(project, req, res);
  });
}

export function createLogItem(props) {
  const { logType, projectId, projectFiles, projectName, userAgent, timestamp, username, callback = () => {} } = props;

  LogItem.create(
    {
      logType,
      username,
      userAgent,
      projectSnapshot: {
        project: projectId,
        projectName,
        files: projectFiles
      },
      // https://mongoosejs.com/docs/guide.html#timestamps
      // Make Mongoose use Unix time (seconds since Jan 1, 1970)
      createdAt: Math.floor(timestamp / 1000)
    },
    (createLogItemErr, logItem) => {
      if (createLogItemErr) {
        console.log('createLogItemErr', createLogItemErr);
        console.log(logItem);
      }
      callback(createLogItemErr, logItem);
    }
  );
}

export function logRun(req, res) {
  Project.findById(req.params.project_id, (findProjectErr, project) => {
    if (!project.user.equals(req.user._id)) {
      res.status(403).send({ success: false, message: 'Session does not match owner of project.' });
    } else {
      isPartOfStudy(req.user.github, (e, studyParticipant) => {
        if (!studyParticipant) {
          res.status(403).json({ success: false, message: 'User is not part of study.' });
          return;
        }
        createLogItem({
          logType: req.body.type,
          username: req.user.username,
          projectId: project._id,
          projectName: project.name,
          projectFiles: req.body.files,
          userAgent: req.headers['user-agent'],
          timestamp: req.body.timestamp,
          callback: (err, logItem) => {
            if (err) {
              res.status(400).json({ success: false });
            } else {
              res.json(logItem);
            }
          }
        });
      });
    }
  });
}
