// ===============================
// Unique Data Tracker System
// ===============================

// ---------- 1️⃣ ID GENERATOR ----------
function* idGenerator() {
    let count = 1;
    while (true) {
        yield "U" + String(count++).padStart(3, "0");
    }
}

let idGen = idGenerator();

// ---------- 2️⃣ DATA STRUCTURES ----------
const userSet = new Set();              // Stores unique emails
const userMap = new Map();              // Key: email, Value: user object
const idMap = new Map();                // Key: ID, Value: email (for search by ID)

// ---------- 3️⃣ ADD USER ----------
function addUser(email, name) {
    if (userSet.has(email)) {
        console.log(`❌ User with email ${email} already exists.`);
        return;
    }

    const newId = idGen.next().value;

    userSet.add(email);

    const userData = {
        id: newId,
        name: name,
        email: email,
        score: 0,
        entries: []   // bonus: multiple entries support
    };

    userMap.set(email, userData);
    idMap.set(newId, email);

    console.log(`✅ User added successfully! ID: ${newId}`);
}

// ---------- 4️⃣ UPDATE USER DATA ----------
function updateUserData(email, newData) {
    if (!userSet.has(email)) {
        console.log(`❌ User not found.`);
        return;
    }

    const user = userMap.get(email);

    // Update fields dynamically
    Object.assign(user, newData);

    console.log(`✅ User data updated for ${email}`);
}

// ---------- 5️⃣ ADD MULTIPLE ENTRY (Bonus) ----------
function addUserEntry(email, entry) {
    if (!userSet.has(email)) {
        console.log("❌ User not found.");
        return;
    }

    userMap.get(email).entries.push(entry);
    console.log("✅ Entry added.");
}

// ---------- 6️⃣ SEARCH USER BY ID ----------
function searchUserById(id) {
    if (!idMap.has(id)) {
        console.log("❌ No user found with this ID.");
        return;
    }

    const email = idMap.get(id);
    console.log("🔎 User Found:", userMap.get(email));
}

// ---------- 7️⃣ REMOVE USER ----------
function removeUser(email) {
    if (!userSet.has(email)) {
        console.log("❌ User not found.");
        return;
    }

    const id = userMap.get(email).id;

    userSet.delete(email);
    userMap.delete(email);
    idMap.delete(id);

    console.log(`🗑 User ${email} removed successfully.`);
}

// ---------- 8️⃣ RESET SYSTEM ----------
function resetSystem() {
    userSet.clear();
    userMap.clear();
    idMap.clear();
    idGen = idGenerator();  // Restart generator

    console.log("🔄 System reset successfully.");
}

// ---------- 9️⃣ DISPLAY ALL USERS ----------
function displayAllUsers() {
    console.log("\n===== 📋 ALL USERS =====");

    if (userMap.size === 0) {
        console.log("No users available.");
        return;
    }

    for (const [email, data] of userMap) {
        console.log(`
ID: ${data.id}
Name: ${data.name}
Email: ${email}
Score: ${data.score}
Entries: ${JSON.stringify(data.entries)}
--------------------------`);
    }
}


// ===============================
// 🧪 SAMPLE TEST EXECUTION
// ===============================

addUser("john@gmail.com", "John");
addUser("alice@gmail.com", "Alice");
addUser("john@gmail.com", "Duplicate");   // Duplicate test

updateUserData("john@gmail.com", { score: 50 });
addUserEntry("john@gmail.com", "Login Activity");
addUserEntry("john@gmail.com", "Purchased Course");

searchUserById("U001");

removeUser("alice@gmail.com");

displayAllUsers();