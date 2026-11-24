import bcrypt from "bcryptjs";

const saltRounds = parseInt(process.env.SALT)

export const hashPasswrod = async (plainText) =>
{
    return bcrypt.hash(plainText, saltRounds);
}

export const compareHash = async (password, hashedPassword) => //password = password entered by user in login & hashed password which is password already stored in db
{
   return bcrypt.compare(password,hashedPassword)
}
