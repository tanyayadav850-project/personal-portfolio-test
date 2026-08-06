console.log("Portfolio Website Loaded");

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("http://localhost:5000/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message
            })
        });

        const data = await response.json();

        if (data.success) {
            alert("Thank you, " + name + "! Your message has been saved successfully.");
            contactForm.reset();
        } else {
            alert("Something went wrong. Please try again.");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Unable to connect to the server.");
    }
});