import { marked } from '../../index';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
 // eslint-disable-next-line no-restricted-globals
  self.onmessage = (message) => {
    console.log(message.data)
    const markdownString = message.data
    postMessage(marked.parse(markdownString));
  };
};