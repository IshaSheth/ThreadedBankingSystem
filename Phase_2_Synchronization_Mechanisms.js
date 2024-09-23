// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

let mutex = false;
const sharedResource = { value: 0 };

const lockResource = async () => {
    while (mutex) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait for the mutex to be released
    }
    mutex = true;
};

const unlockResource = () => {
    mutex = false;
};

const synchronizedTask = async (taskName, operation) => {
    await lockResource();
    console.log(`${taskName} is accessing the shared resource...`);
    sharedResource.value += operation;
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate operation
    console.log(`${taskName} completed. Shared resource value: ${sharedResource.value}`);
    unlockResource();
};

const performSynchronizedTasks = async () => {
    await Promise.all([
        synchronizedTask("Bank Thread 1", 5),
        synchronizedTask("Bank Thread 2", -3),
        synchronizedTask("Bank Thread 3", 2)
    ]);
};

performSynchronizedTasks();
