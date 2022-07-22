const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config.js");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../expressError");

class User {


    static async authenticate(username, password) {
        const result = await db.query(
              `SELECT firstName,
                      lastName,
                      username,
                      password,
                      isTeacher
               FROM users
               WHERE username = $1`,
            [username],
        );
    
        const user = result.rows[0];
    
        if (user) {
          // compare hashed password to a new hash from password
          const isValid = await bcrypt.compare(password, user.password);
          if (isValid === true) {
            delete user.password;
            return user;
          }
        }
        throw new UnauthorizedError("Invalid username/password");
    }



    static async register(
        { firstName, lastName, username, password, isTeacher}) {
      const duplicateCheck = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
          [username],
      );
  
      if (duplicateCheck.rows[0]) {
        throw new BadRequestError(`Duplicate username: ${username}`);
      }
  
      const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
  
      const result = await db.query(
            `INSERT INTO users
             (firstName,
              lastName,
              username,
              password,
              isTeacher)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING firstName, lastName, username, isTracher,`
          [
            firstName,
            lastName,
            username,
            isTeacher
          ],
      );
  
      const user = result.rows[0];
  
      return user;
    }
}