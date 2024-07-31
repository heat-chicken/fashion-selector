// insertItemsToDatabase.test.js
const mSupabase = require('../../__mocks__/mockSupabaseClient'); // Adjust the path as necessary
const { insertItemsToDatabase } = require('./databaseOperations'); // Adjust the path as necessary

jest.mock('../../__mocks__/mockSupabaseClient'); // Adjust the path as necessary

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
    mSupabase.from.mockReturnValue({
      insert: jest.fn(() => ({
        select: mockSelect,
      })),
    });

    console.log = jest.fn();

    await insertItemsToDatabase(items, mSupabase);

    expect(console.log).toHaveBeenCalledWith('1 items inserted successfully');
    expect(mSupabase.from).toHaveBeenCalledWith('item');
    expect(mSupabase.from().insert).toHaveBeenCalledWith(items);
    expect(mSupabase.from().insert().select).toHaveBeenCalled();
  });

  it('should log an error message on insertion error', async () => {
    const items = [{ name: 'item1' }];
    const mockSelect = jest.fn(() => ({
      data: null,
      error: { message: 'Insertion error' },
    }));
    mSupabase.from.mockReturnValue({
      insert: jest.fn(() => ({
        select: mockSelect,
      })),
    });

    console.error = jest.fn();

    await insertItemsToDatabase(items, mSupabase);

    expect(console.error).toHaveBeenCalledWith('Error inserting items:', 'Insertion error');
    expect(mSupabase.from).toHaveBeenCalledWith('item');
    expect(mSupabase.from().insert).toHaveBeenCalledWith(items);
    expect(mSupabase.from().insert().select).toHaveBeenCalled();
  });

  it('should log an unexpected error message on unexpected error', async () => {
    const items = [{ name: 'item1' }];
    mSupabase.from.mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    console.error = jest.fn();

    await insertItemsToDatabase(items, mSupabase);

    expect(console.error).toHaveBeenCalledWith('Unexpected error during database insertion:', 'Unexpected error');
    expect(mSupabase.from).toHaveBeenCalledWith('item');
  });
});


// //getItemsFromDatabase - lines 23 - 42