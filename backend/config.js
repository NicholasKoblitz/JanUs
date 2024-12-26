require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || "JanUs-Secret";

const COMET_URL = "https://215851690468e749.api-us.cometchat.io/v3/";
const API_KEY = '7a206718ea2245a90d00d043f313ab5192048e02'
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtYnBneWVveWRqa2h3cWd4YmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwMTU2NjcsImV4cCI6MjA0ODU5MTY2N30.VFtcf68tvTJ96EnVhzhSFty3OOwUb0oyOPtVkwTg6VM"


const BCRYPT_WORK_FACTOR = 12;


module.exports = {
    SECRET_KEY,
    BCRYPT_WORK_FACTOR,
    COMET_URL,
    API_KEY,
    SUPABASE_KEY
}