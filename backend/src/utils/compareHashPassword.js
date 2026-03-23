import bcrypt from "bcrypt";

export const compareHashPassword = async (password, dbPassword) => {
    return await bcrypt.compare(password, dbPassword);
}