export default function validateName(name) {
    // Regular expression to allow only letters and spaces
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    return nameRegex.test(name);
}
