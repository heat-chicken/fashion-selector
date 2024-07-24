const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const supabaseUrl = "https://lcrvtqwzfotayluyrocd.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const SB_func = {}

SB_func.insertItemsToDatabase = async function (req, res, next) {
  const items = req.body;
  console.log(items)
  
  try {
    const { data, error } = await supabase
      .from('item')
      .insert(items)
      .select();
    if (error) {
      console.error('Error inserting items:', error.message);
    } else {
      console.log(`${data.length} items inserted successfully`);
    }
  } catch (error) {
    console.error('Unexpected error during database insertion:', error.message);
  }
}

SB_func.getSavedImg =  async function (eq, res, next){

    try {
        const { data, error } = await supabase
          .from('item') // Replace 'item' with your table name
          .select('*'); // Select all columns, you can customize this as needed
    
        if (error) {
          console.error('Error fetching data:', error);
        } else {
          console.log('Data fetched successfully:', data);
          res.json(data);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }

      


}
module.exports = SB_func; 