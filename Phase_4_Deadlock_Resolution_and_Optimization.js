//
 
let resources = {
    resourceA: false,
    resourceB: false
};
 
const tryLockResourcesWithTimeout = async (taskName, firstResourceKey, secondResourceKey) => {
    const startTime = Date.now();
    const timeout = 2000; // Timeout after 2 seconds
 
    while (resources[firstResourceKey] || resources[secondResourceKey]) {
        if (Date.now() - startTime > timeout) {
            console.log(`${taskName} timeout occurred, aborting operation to avoid deadlock.`);
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait until resources are free
    }
 
    // Lock both resources
    resources[firstResourceKey] = true;
    resources[secondResourceKey] = true;
 
    console.log(`${taskName} has locked both ${firstResourceKey} and ${secondResourceKey}.`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate task
    console.log(`${taskName} is releasing both ${firstResourceKey} and ${secondResourceKey}.`);
 
    // Release both resources
    resources[firstResourceKey] = false;
    resources[secondResourceKey] = false;
};
 
const resolveDeadlockWithTimeout = async () => {
    await Promise.all([
        tryLockResourcesWithTimeout("Bank Thread 1", "resourceA", "resourceB"),
        tryLockResourcesWithTimeout("Bank Thread 2", "resourceB", "resourceA")
    ]);
};
 
resolveDeadlockWithTimeout();