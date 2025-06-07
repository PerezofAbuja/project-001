import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

async function createUserProfile(user) {
    const userDoc = doc(db, "users", user.uid);
    await setDoc(userDoc, {
        email: user.email,
        isAdmin: false, 
        projectsCompleted: 0,
        timeSpent: "0 hours"
    });
    console.log("✅ User profile created in Firestore!");
}

async function signUpUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log("User signed up:", user.uid);
        await createUserProfile(user); // Create Firestore profile

    } catch (error) {
        console.error("Sign-up error:", error.message);
    }
}

onAuthStateChanged(auth, async user => {
    if (user) {
        console.log("Logged-in UID:", user.uid);

        const userDoc = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDoc);

        if (!userSnapshot.exists()) {
            console.log("No user data found, creating profile...");
            await createUserProfile(user); // Auto-create profile if missing
        } else {
            console.log("User data found:", userSnapshot.data());
        }

        const userData = userSnapshot.data();

        if (userData.isAdmin) {
            console.log("✅ Admin access granted!");
            loadAdminDashboard(); // Load admin dashboard
        } else {
            alert("You are not authorized to view visitor profiles.");
            return;
        }
    } else {
        window.location.href = "login.html"; 
    }
});

async function loadAdminDashboard() {
    const usersCollection = await getDocs(collection(db, "users"));
    
    const userTable = document.getElementById("adminUserTable");
    userTable.innerHTML = ""; // Clear previous data
    
    usersCollection.docs.forEach(doc => {
        console.log("Processing user:", doc.id);
        const userData = doc.data();
        const row = userTable.insertRow();
        row.innerHTML = `
            <td>${userData.email}</td>
            <td>${userData.projectsCompleted}</td>
            <td>${userData.timeSpent} hrs</td>
        `;
    });

    console.log("✅ Admin dashboard updated!");
}



