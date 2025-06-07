import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { auth, db } from "./firebase-config.js";

// Function to handle user sign-up
async function signUpUser(event) {
    event.preventDefault(); // Prevent form from auto-submitting

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Validate inputs
        if (!email || !password) {
            alert("Email and password are required.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("✅ User signed up:", user.uid);

        // Create Firestore profile for the user
        await createUserProfile(user);

        alert("Sign-up successful! Your profile has been created.");

        // Redirect to login page
        window.location.href = "/loginpage.html"; 
    } catch (error) {
        console.error("⚠️ Sign-up error:", error.code, error.message);
        alert(`Failed to sign up: ${error.message}`);
    }
}

// Function to create a user profile in Firestore
async function createUserProfile(user) {
    try {
        const userDoc = doc(db, "users", user.uid);
        await setDoc(userDoc, {
            email: user.email,
            isAdmin: false,
            projectsCompleted: 0,
            timeSpent: "0 hours"
        });

        console.log("✅ User profile created in Firestore!");
    } catch (error) {
        console.error("⚠️ Firestore Error:", error.code, error.message);
        alert("An error occurred while saving your profile. Please try again.");
    }
}

// Attach event listener to the form
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("signupForm").addEventListener("submit", signUpUser);
});
