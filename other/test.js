const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password:', error);
    }
}


const verifyPassword = async (plainPassword, hashedPassword) => {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Error verifying password');
    }
};

const main = async () =>{
    const password = "Password"
    const password2 = "password"
    const hashedPassword = await hashPassword(password)
    const hashedPassword2 = await hashPassword(password2)


    match1 = await bcrypt.compare(password, hashedPassword);
    match2 = await bcrypt.compare(password, hashedPassword2);
    match3 = await bcrypt.compare(password2, hashedPassword);
    match4 = await bcrypt.compare(password2, hashedPassword2);
    console.log(match1, match2, match3, match4)

}

main()
