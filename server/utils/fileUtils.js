export const fileExtensionsArray = [
  'aac',
  'aif',
  'aiff',
  'bin',
  'bmp',
  'css',
  'csv',
  'flac',
  'frag',
  'gif',
  'htm',
  'html',
  'jpeg',
  'jpg',
  'js',
  'json',
  'jsx',
  'm4a',
  'm4p',
  'm4v',
  'md',
  'mov',
  'mp2',
  'mp3',
  'mp4',
  'mpe',
  'mpeg',
  'mpg',
  'mpv',
  'obj',
  'oga',
  'ogg',
  'otf',
  'png',
  'svg',
  'tsv',
  'ttf',
  'txt',
  'vert',
  'wav',
  'webm'
];

export const mimeTypes = `image/*,audio/*,text/javascript,text/html,text/css,
application/json,application/x-font-ttf,application/x-font-truetype,text/plain,
text/csv,.obj,video/webm,video/ogg,video/quicktime,video/mp4`;

export const fileExtensions = fileExtensionsArray.map((ext) => `.${ext}`).join(',');
export const fileExtensionsAndMimeTypes = `${fileExtensions},${mimeTypes}`;

export const MEDIA_FILE_REGEX = new RegExp(
  `^(?!(http:\\/\\/|https:\\/\\/)).*\\.(${fileExtensionsArray.join('|')})$`,
  'i'
);

export const MEDIA_FILE_QUOTED_REGEX = new RegExp(
  `^('|")(?!(http:\\/\\/|https:\\/\\/)).*\\.(${fileExtensionsArray.join('|')})('|")$`,
  'i'
);

export const STRING_REGEX = /(['"])((\\\1|.)*?)\1/gm;
// these are files that have to be linked to with a blob url
export const PLAINTEXT_FILE_REGEX = /.+\.(json|txt|csv|vert|frag|tsv)$/i;
// these are files that users would want to edit as text (maybe svg should be here?)
export const TEXT_FILE_REGEX = /.+\.(json|txt|csv|tsv|vert|frag|js|css|html|htm|jsx)$/i;
export const NOT_EXTERNAL_LINK_REGEX = /^(?!(http:\/\/|https:\/\/))/;
export const EXTERNAL_LINK_REGEX = /^(http:\/\/|https:\/\/)/;

export const CREATE_FILE_REGEX = /.+\.(json|txt|csv|tsv|js|css|frag|vert|html|md)$/i;
