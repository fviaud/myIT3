import { auth } from "../firebase";
// import { UserAvatar } from "components";

const apiUserMap = (user) => ({
    id: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
});

const authentication = {};

authentication.signIn = async (user) => {
    try {
        const { email, password } = user;
        const value = await auth.signInWithEmailAndPassword(email, password);
        console.log(apiUserMap(value.user))
    } catch (error) {
        console.log("Error")
    }
};

export default authentication;
