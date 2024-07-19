const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = "https://zztxrkhfcilrdciqdsqn.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function insertItemsToDatabase(items) {
  try {
    const { data, error } = await supabase.from("item").insert(items).select();

    if (error) {
      console.error("Error inserting items:", error.message);
    } else {
      console.log(`${data.length} items inserted successfully`);
    }
  } catch (error) {
    console.error("Unexpected error during database insertion:", error.message);
  }
}

// Limitation: we are only getting the latest 3 items, for now and for simplicity
async function getItemsFromDatabase(limit = 3) {
  try {
    const { data, error } = await supabase
      .from("item")
      .select("url")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching items:", error.message);
      return [];
    } else {
      console.log(`${data.length} items fetched successfully`);
      return data;
    }
  } catch (error) {
    console.error("Unexpected error during database fetch:", error.message);
    return [];
  }
}

// test function
async function testDatabaseOperations() {
  console.log("Starting database operations test...");

  const testItems = [
    { url: "https://example.com/test1.jpg" },
    { url: "https://example.com/test2.jpg" },
  ];

  console.log("Inserting test items...");
  await insertItemsToDatabase(testItems);

  console.log("Fetching latest items...");
  const fetchedItems = await getItemsFromDatabase();
  console.log("Fetched items:", fetchedItems);

  console.log("Test completed.");
}

module.exports = {
  insertItemsToDatabase,
  getItemsFromDatabase,
};

if (require.main === module) {
  testDatabaseOperations().catch(console.error);
}
