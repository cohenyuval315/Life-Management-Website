
export class WorkerBuilder extends Worker {
  constructor(worker) {
    const code = worker.toString();
    const blob = new Blob([`(${code})()`]);
    return new Worker(URL.createObjectURL(blob));
  }
}

export function spawnWorker(worker) {
  const code = worker.toString();
  const blob = new Blob([`(${code})()`]);
  return new Worker(URL.createObjectURL(blob));
}


export class SharedWorkerBuilder extends SharedWorker {
  constructor(worker,port='') {
    const code = worker.toString();
    const blob = new Blob([`(${code})()`]);
    return new SharedWorker(URL.createObjectURL(blob));
  }
  
}