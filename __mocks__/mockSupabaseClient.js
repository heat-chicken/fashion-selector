const from = jest.fn(() => ({
    insert: jest.fn(() => ({
      select: jest.fn(),
    })),
  }));
  
  const supabase = { from };
  
module.exports = supabase;