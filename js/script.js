const formSteps = document.querySelectorAll(".form-step");

const nextBtns = document.querySelectorAll(".nextBtn");

const prevBtns = document.querySelectorAll(".prevBtn");

const progressBar = document.getElementById("progressBar");

let currentStep = 0;


// SHOW STEP

function showStep(step) {

    formSteps.forEach((stepItem, index) => {

        if (index === step) {

            stepItem.classList.add("active");

        } else {

            stepItem.classList.remove("active");

        }

    });

    const progress =
        ((step + 1) / formSteps.length) * 100;

    progressBar.style.width = progress + "%";

    progressBar.innerText = `Step ${step + 1}`;
}

showStep(currentStep);


// NEXT BUTTON

nextBtns.forEach((btn) => {

    btn.addEventListener("click", () => {

        if (currentStep < formSteps.length - 1) {

            currentStep++;

            showStep(currentStep);

        }

    });

});


// PREVIOUS BUTTON

prevBtns.forEach((btn) => {

    btn.addEventListener("click", () => {

        if (currentStep > 0) {

            currentStep--;

            showStep(currentStep);

        }

    });

});


// EMAIL VALIDATION

function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


// MOBILE VALIDATION

function validateMobile(mobile) {

    return /^[6-9]\d{9}$/.test(mobile);

}


// AADHAAR VALIDATION

function validateAadhaar(aadhaar) {

    return /^\d{12}$/.test(aadhaar);

}


// PASSWORD STRENGTH

const password = document.getElementById("password");

const passwordStrength =
    document.getElementById("passwordStrength");

password.addEventListener("keyup", () => {

    const strongPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (strongPassword.test(password.value)) {

        passwordStrength.innerHTML =
            "Strong Password";

        passwordStrength.style.color = "green";

    } else {

        passwordStrength.innerHTML =
            "Password must contain uppercase, lowercase, number & special character";

        passwordStrength.style.color = "red";

    }

});


// PASSWORD TOGGLE

document.getElementById("togglePassword")
    .addEventListener("click", () => {

        const type =
            password.type === "password"
                ? "text"
                : "password";

        password.type = type;

    });


// DARK MODE

document.getElementById("darkModeBtn")
    .addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

    });


// DYNAMIC DROPDOWN

const course =
    document.getElementById("course");

const department =
    document.getElementById("department");

course.addEventListener("change", () => {

    let options = `<option value="">Select Department</option>`;

    if (course.value === "btech") {

        options += `
            <option>CSE</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>Mechanical</option>
        `;

    }

    else if (course.value === "mba") {

        options += `
            <option>Finance</option>
            <option>Marketing</option>
            <option>HR</option>
        `;

    }

    else if (course.value === "mca") {

        options += `
            <option>Computer Applications</option>
        `;

    }

    department.innerHTML = options;

});


// AUTO SAVE

document.querySelectorAll("input, textarea")
    .forEach((input) => {

        input.addEventListener("keyup", () => {

            if (input.id) {

                localStorage.setItem(
                    input.id,
                    input.value
                );

            }

        });

    });


// LOAD SAVED DATA

window.addEventListener("load", () => {

    document.querySelectorAll("input, textarea")
        .forEach((input) => {

            if (input.id) {

                const savedValue =
                    localStorage.getItem(input.id);

                if (savedValue) {

                    input.value = savedValue;

                }

            }

        });

});


// FORM SUBMIT

document.getElementById("registrationForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const mobile =
            document.getElementById("mobile").value.trim();

        const aadhaar =
            document.getElementById("aadhaar").value.trim();

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const profileImage =
            document.getElementById("profileImage");

        // EMAIL VALIDATION

        if (!validateEmail(email)) {

            alert("Invalid Email Address");

            return;

        }

        // MOBILE VALIDATION

        if (!validateMobile(mobile)) {

            alert("Invalid Mobile Number");

            return;

        }

        // AADHAAR VALIDATION

        if (!validateAadhaar(aadhaar)) {

            alert("Invalid Aadhaar Number");

            return;

        }

        // PASSWORD MATCH

        if (password.value !== confirmPassword) {

            alert("Passwords do not match");

            return;

        }

        // IMAGE VALIDATION

        const file = profileImage.files[0];

        if (!file) {

            alert("Please upload profile image");

            return;

        }

        if (file.size > 2 * 1024 * 1024) {

            alert("Image size must be below 2MB");

            return;

        }

        // SUCCESS TOAST

        const toast = new bootstrap.Toast(
            document.getElementById("successToast")
        );

        toast.show();

        // CLEAR LOCAL STORAGE

        localStorage.clear();

        // REDIRECT

        setTimeout(() => {

            window.location.href = "success.html";

        }, 2000);

    });