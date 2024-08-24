 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUVvaWo0QWRxdHR5L2svN0NyeU9PRENvOXNTVzhibzVaeTlxTGQvUVZXST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZDN4eDV6Wi9Oa1c3TnhIRHo4WlloMjdIM0JHOEVXSjhGVlNtSWRUZ0Yybz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhT0ladHpuVlRxODVaWk9qb05rb3hXZFA5ZkwwS0VsNWhsc2ZYSmpzN0VJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4aVF3Y2x6YjFoTm84MVMrcUd3bmpXNGs5NGpDa2V1eUpEWkdLYjBPQkE0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVJdkZ1Y0hORFFHSFRUTTZVNCthZmhMTWFJdDMyaDVlRFd4ZEM0WXloM3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhQTkNiVnoxVTc3eVVHdS9yOFhLaHRSWFFzdkxpWHQ1UCtJeXgrTk85MGc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU1ZNUljZmV4Ym5CNGhoaGsyQ1JSWkVjRkpoTVByeVF0RmhUMzBxRDNsQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY3I2NjloK1NadG0xRmh5Z3RJb0JCS2VtdkxYRk03bGlRc1kwOG85YXlUWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBEa1ZhVHVrNkhNQ3BlVndKYnJ5VWxzS0swekFJanNwK1dmTDJaUFQvV2tXM1lkYXh5aFpkMWNyTnNreEQ2WEN6REtWV1dJMXJoaVoyM2ViR3FMWGp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI5LCJhZHZTZWNyZXRLZXkiOiJwQ0FNcnVNcU1Sa0lnQTdzdU8rQllCaDluVkFtTVNQY1I5YVJXeDR1OGd3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJWRGtkWGhmalI5V3kwSC0xSkxIU0ZRIiwicGhvbmVJZCI6ImY0MWJmNDQ0LTQ1MzYtNDk1Yy05ZmVlLWViZTllNjRkMmJlZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2U3htSUJ0QUxLa1RpbDl3SEdDd1Y2YW56QWc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOVNoSlRBbStuUGpuOGdPOHR3WnBZTi9nSGs0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjhBM1dNMlpDIiwibWUiOnsiaWQiOiI1MDkzNTYxMDU4NzoxMkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSnFJdys0QkVOV2dqYllHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiM3JYcjdubDlVV3hWUkFUWmtudm5XamExSG9wVTNsanczS3EreDdCSEJEUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNXc4UHlPVTVoV3hGcnVBL20vcDVFeG9KOHllMU5HK0dxMUV6TnpCSDhRTVZDdlBKc3hHOUk0NUN2VGYvREswOElpVXFjM0QwQ0pRMm5pcDhIRzNKQmc9PSIsImRldmljZVNpZ25hdHVyZSI6IkdQYVFiTnhQUlpwd2tqVTF3OWJadGlEUnlXMklnK1NuaFN6VVZHaHl2N1ltaGJGUmJRQ0hnckg4TXFFU0h6WXdWVDNMM05aSVFyS1BrYnN3TjBnOGl3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTA5MzU2MTA1ODc6MTJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZDYxNis1NWZWRnNWVVFFMlpKNzUxbzJ0UjZLVk41WThOeXF2c2V3UndRMCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDA3NjEzMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBc0QifQ== || 'Byte;;;',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "TALKDROVE",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923072380380",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
