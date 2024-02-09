const AuthReducer = (state, action) => {

    let value = -1

    switch (action.type) {
        case "MAINLOGIN": {
            return {
                currentUser: action.payload,
            };
        }
        case "PERMISSION_LEVEL": {
            let email = action.payload.email
            if (email.endsWith("student.com")) {
                value = 0
            } else if (email.endsWith("verifier.com")) {
                value = 1
            } else if (email.endsWith("admin.com")) {
                value = 2
            }
            return {
                accessLevel: value,
                permissionLevel: action.payload,
            };
        }
        case "LOGOUT": {
            console.log("SHOULD NO BE CALLED AT ALL ")

            return {
                currentUser: null,
                permissionLevel: 0
            }
        }
        default:
            return state;
    }
};

export default AuthReducer;