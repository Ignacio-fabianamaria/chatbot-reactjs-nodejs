require('dotenv').config();
const bcrypt = require('bcrypt');

const password1 = process.env.USER1_PASSWORD;
const password2 = process.env.USER2_PASSWORD;
const password3 = process.env.USER3_PASSWORD;

const hash1 = bcrypt.hashSync(password1, 10);
const hash2 = bcrypt.hashSync(password2, 10);
const hash3 = bcrypt.hashSync(password3, 10);

console.log(`Hash1: ${hash1}`); // Hash1: $2b$10$tFehfkIC/l.ZJy38ZKGOvOhjXykPlMIP90FrYonm539Mxgh3mDTiy
console.log(`Hash2: ${hash2}`); // Hash2: $2b$10$MygSGEs9BYgAp5bu3r10RO2XgU8cZUZQJkSz/h3glgAQN2C11Kbpu
console.log(`Hash3: ${hash3}`); // Hash3: $2b$10$WsADEdE3TUo2YlcyxxS2F.bSkZzG8IIPrMaEBQl66G.virLPHmPPe

