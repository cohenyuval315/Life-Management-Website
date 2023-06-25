function consoleLogFunctionDuration(method) {
    const startTime = performance.now();
    method()
    const duration = performance.now() - startTime;
    console.log(`someMethodIThinkMightBeSlow took ${duration}ms`);
}