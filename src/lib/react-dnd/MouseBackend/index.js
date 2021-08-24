import MouseBackend from './MouseBackend';

const createBackend = manager => new MouseBackend(manager);

export default createBackend;
