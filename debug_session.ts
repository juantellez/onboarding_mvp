const { getOnboardingSessionById } = require('./src/actions/admin');

async function test() {
    const id = "a30b9677-3f49-470f-aeb2-91dbb85e0a2a"; // ID seen in logs
    console.log("Fetching session:", id);
    try {
        const result = await getOnboardingSessionById(id);
        console.log("Result:", JSON.stringify(result, null, 2));
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
