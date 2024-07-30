const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const supabaseUrl = "https://lcrvtqwzfotayluyrocd.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const SB_func = {}

SB_func.insertItemsToDatabase = async function (req, res, next) {
  const { url } = req.body;
  const userEmail = req.user?.email;

  if (!userEmail) {
    return res.status(401).json({ error: "User email not found in token" });
  }

  try {
    const { data, error } = await supabase
      .from("item")
      .insert({ url, user_email: userEmail })
      .select();
    if (error) {
      console.error("Error inserting items:", error.message);
      return res.status(500).json({ error: "Failed to save image" });
    } else {
      console.log(`${data.length} items inserted successfully`);
      res.status(200).json({ message: "Image saved successfully" });
    }
  } catch (error) {
    console.error("Unexpected error during database insertion:", error.message);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

SB_func.getSavedImg = async function (req, res, next) {
  const userEmail = req.user.email;
  console.log("Fetching images for user:", userEmail);

  try {
    const { data, error } = await supabase
      .from("item") // Replace 'item' with your table name
      .select("*") // Select all columns, you can customize this as needed
      .eq("user_email", userEmail);

    if (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Failed to fetch images" });
    } else {
      console.log("Data fetched successfully:", data);
      res.json(data);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};
module.exports = SB_func; 