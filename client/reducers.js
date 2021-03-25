import { combineReducers } from 'redux';
import assets from './modules/IDE/reducers/assets';
import collections from './modules/IDE/reducers/collections';
import console from './modules/IDE/reducers/console';
import editorAccessibility from './modules/IDE/reducers/editorAccessibility';
import files from './modules/IDE/reducers/files';
import ide from './modules/IDE/reducers/ide';
import loading from './modules/IDE/reducers/loading';
import preferences from './modules/IDE/reducers/preferences';
import project from './modules/IDE/reducers/project';
import search from './modules/IDE/reducers/search';
import sketches from './modules/IDE/reducers/projects';
import sorting from './modules/IDE/reducers/sorting';
import repos from './modules/IDE/reducers/repos';
import toast from './modules/IDE/reducers/toast';
import user from './modules/User/reducers';
import submissions from './modules/IDE/reducers/submissions';

const rootReducer = combineReducers({
  assets,
  collections,
  console,
  editorAccessibility,
  files,
  ide,
  loading,
  preferences,
  project,
  repos,
  search,
  sketches,
  sorting,
  submissions,
  toast,
  user
});

export default rootReducer;
