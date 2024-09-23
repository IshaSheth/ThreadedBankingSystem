const AsyncTask1 = async () => {
    console.log("Bank Thread 1: Reading data...");
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate reading
    console.log("Bank Thread 1: Data read complete.");
};

const AsyncTask2 = async () => {
    console.log("Bank Thread 2: Transection data...");
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate writing
    console.log("Bank Thread 2: Data write complete.");
};

const AsyncTask3 = async () => {
    console.log("Bank Thread 3: Calculating data...");
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate calculation
    console.log("Bank Thread 3: Data calculation complete.");
};

const InitiateThreads = async () => {
    console.log("Bank System Starting threads...");
    await Promise.all([AsyncTask1(), AsyncTask2(), AsyncTask3()]);
    console.log("Bank All threads completed.");
};

InitiateThreads();
