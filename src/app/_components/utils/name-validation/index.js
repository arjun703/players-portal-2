export default function NameValidation(name) {
    // Regular expression to allow only letters and spaces
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    return nameRegex.test(name);
}
