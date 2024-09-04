export default function userValidator(user) {
    const ErrorMessages = [];

    if (!user) {
        ErrorMessages.push("Missing user information");
        return;
    }

    if (!user.firstName?.trim()) ErrorMessages.push("First Name is required");
    if (!user.lastName?.trim()) ErrorMessages.push("Last Name is required");
    if (!user.email?.trim()) ErrorMessages.push("Email is required");
    if (!user.dateOfBirth?.trim()) ErrorMessages.push("Date of birth is required");

    const address = user.address;
    if (!address) ErrorMessages.push("Address is required");
        return ErrorMessages;



    if (!address.city?.trim()) ErrorMessages.push("City is required");
    if (!address.country?.trim()) ErrorMessages.push("Country is required");

    return ErrorMessages;
}