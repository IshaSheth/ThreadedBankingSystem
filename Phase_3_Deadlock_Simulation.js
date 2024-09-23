let resourceA = false;
let resourceB = false;

const lockResourcesInOrder = async (taskName, firstResource, secondResource) => {
    while (firstResource || secondResource) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait until resources are free
    }
    firstResource = true;
    secondResource = true;

    console.log(`${taskName} has locked both resources.`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate task
    console.log(`${taskName} is releasing both resources.`);
    
    firstResource = false;
    secondResource = false;
};

const createDeadlock = async () => {
    await Promise.all([
        lockResourcesInOrder("Bank Thread 1", resourceA, resourceB),
        lockResourcesInOrder("Bank Thread 2", resourceB, resourceA)
    ]);
};

createDeadlock();
