import { FileSystemTree } from '@webcontainer/api';

export const files: FileSystemTree = {
    'index.js': {
        file: {
            contents: `
import express from 'express';
const app = express();
const port = 3111;

app.get('/', (req, res) => {
  res.send('Welcome to a WebContainers app! 🥳');
});

app.listen(port, () => {
});`
        }
    },
    'package.json': {
        file: {
            contents: `
{
  "name": "example-app",
  "type": "module",
  "dependencies": {
    "express": "latest",
    "nodemon": "latest"
  },
  "scripts": {
    "start": "nodemon --watch './' index.js"
  }
}`
        }
    },
    test: {
        directory: {
            'index.js': {
                file: {
                    contents: `
tesat`
                }
            },
            test2: {
                directory: {
                    'index.js': {
                        file: {
                            contents: `
tesat`
                        }
                    },
                    test3: {
                        directory: {
                            'index.js': {
                                file: {
                                    contents: `
tesat`
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
