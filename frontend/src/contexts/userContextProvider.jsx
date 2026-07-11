// import { useState, useEffect } from "react";
// import { userContext } from "./userContext";

// const UserProvider = ({ children }) => {

//     const [userDetails, setUserDetails] = useState({
//         fullName: "",
//         email: "",
//         gender: "",
//         contactNo: "",
//         dateOfBirth: "",
//         photo: null,
//     })

//     const [extraDetails, setExtraDetails] = useState(() => {
//         const savedExtra = localStorage.getItem("extraDetails");
//         return savedExtra
//             ? JSON.parse(savedExtra)
//             : {
//                 lastLogin: [],
//                 loginCount: 0,
//             };
//     });

//     useEffect(() => {
//         localStorage.setItem("userDetails", JSON.stringify(userDetails));
//     }, [userDetails]);

//     useEffect(() => {
//         localStorage.setItem("extraDetails", JSON.stringify(extraDetails));
//     }, [extraDetails]);

//     return (
//         <userContext.Provider value={{ userDetails, setUserDetails, extraDetails, setExtraDetails }}>
//             {children}
//         </userContext.Provider>
//     )
// }

// export default UserProvider






import { useState, useEffect } from "react";
import { userContext } from "./userContext";

const UserProvider = ({ children }) => {

    const [userDetails, setUserDetails] = useState(() => {
        const savedUser = localStorage.getItem("userDetails");

        return savedUser
            ? JSON.parse(savedUser)
            : {
                fullName: "",
                email: "",
                gender: "",
                contactNo: "",
                dateOfBirth: "",
                photo: null,
            };
    });

    const [extraDetails, setExtraDetails] = useState(() => {
        const savedExtra = localStorage.getItem("extraDetails");

        return savedExtra
            ? JSON.parse(savedExtra)
            : {
                lastLogin: [],
                loginCount: 0,
            };
    });

    useEffect(() => {
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }, [userDetails]);

    useEffect(() => {
        localStorage.setItem("extraDetails", JSON.stringify(extraDetails));
    }, [extraDetails]);

    return (
        <userContext.Provider
            value={{
                userDetails,
                setUserDetails,
                extraDetails,
                setExtraDetails,
            }}
        >
            {children}
        </userContext.Provider>
    );
};

export default UserProvider;