import * as exports from './graphs';
Object.entries(exports).forEach(([name, exported]) => window[name] = exported);