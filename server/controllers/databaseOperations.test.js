const { insertItemsToDatabase, getItemsFromDatabase }= require('./databaseOperations');
const supabase = require('../../mocks/mockSupabaseClient');

//insertItemsToDatabase - lines 8 - 20

jest.mock('../../mocks/mockSupabaseClient'); // Adjust the path as necessary

describe('insertItemsToDatabase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log the number of inserted items on success', async () => {
    const items = [{ name: 'item1' }];
    const mockSelect = jest.fn(() => ({
      data: items,
      error: null,
    }));
    supabase.from.mockReturnValue({
      insert: jest.fn(() => ({
        select: mockSelect,
      })),
    });

    console.log = jest.fn();

    await insertItemsToDatabase(items);

    expect(console.log).toHaveBeenCalledWith('1 items inserted successfully');
    expect(supabase.from).toHaveBeenCalledWith('item');
    expect(supabase.from().insert).toHaveBeenCalledWith(items);
    expect(supabase.from().insert().select).toHaveBeenCalled();
  });

  it('should log an error message on insertion error', async () => {
    const items = [{ name: 'item1' }];
    const mockSelect = jest.fn(() => ({
      data: null,
      error: { message: 'Insertion error' },
    }));
    supabase.from.mockReturnValue({
      insert: jest.fn(() => ({
        select: mockSelect,
      })),
    });

    console.error = jest.fn();

    await insertItemsToDatabase(items);

    expect(console.error).toHaveBeenCalledWith('Error inserting items:', 'Insertion error');
    expect(supabase.from).toHaveBeenCalledWith('item');
    expect(supabase.from().insert).toHaveBeenCalledWith(items);
    expect(supabase.from().insert().select).toHaveBeenCalled();
  });

  it('should log an unexpected error message on unexpected error', async () => {
    const items = [{ name: 'item1' }];
    supabase.from.mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    console.error = jest.fn();

    await insertItemsToDatabase(items);

    expect(console.error).toHaveBeenCalledWith('Unexpected error during database insertion:', 'Unexpected error');
    expect(supabase.from).toHaveBeenCalledWith('item');
  });
});

//getItemsFromDatabase - lines 23 - 42