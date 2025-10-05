import {EventSource} from '../../src/types/event';
import {convertStringToFavoriteItemArray} from '../../src/utils/favorite';

const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

describe('convertStringToFavoriteItemArray', () => {
  beforeEach(() => {
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should convert valid JSON string to FavoriteItem array', () => {
    const validJson = JSON.stringify([
      {id: '1', source: EventSource.YELP},
      {id: '2', source: EventSource.TICKETMASTER},
    ]);

    const result = convertStringToFavoriteItemArray(validJson);

    expect(result).toEqual([
      {id: '1', source: EventSource.YELP},
      {id: '2', source: EventSource.TICKETMASTER},
    ]);
    expect(result).toHaveLength(2);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should return empty array for invalid JSON string', () => {
    const invalidJson = 'not-a-valid-json';

    const result = convertStringToFavoriteItemArray(invalidJson);

    expect(result).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Invalid string:',
      expect.any(SyntaxError),
    );
  });

  it('should return empty array for empty string', () => {
    const emptyString = '';

    const result = convertStringToFavoriteItemArray(emptyString);

    expect(result).toEqual([]);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should handle empty array JSON correctly', () => {
    const emptyArrayJson = '[]';

    const result = convertStringToFavoriteItemArray(emptyArrayJson);

    expect(result).toEqual([]);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should filter out malformed FavoriteItem objects', () => {
    const malformedJson = JSON.stringify([
      {id: '1', source: EventSource.FOURSQUARE}, // Valid
      {id: '2'}, // Missing source
      {source: EventSource.YELP}, // Missing id
      {id: '3', source: 'InvalidSource'}, // Invalid source
      {id: '', source: EventSource.YELP}, // Empty id
      null, // Non-object
      'string', // Non-object
    ]);

    const result = convertStringToFavoriteItemArray(malformedJson);

    expect(result).toEqual([{id: '1', source: EventSource.FOURSQUARE}]);
    expect(result).toHaveLength(1);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should return empty array for non-array JSON input', () => {
    const nonArrayJson = JSON.stringify({id: '1', source: EventSource.YELP});

    const result = convertStringToFavoriteItemArray(nonArrayJson);

    expect(result).toEqual([]);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should return empty array for non-string input', () => {
    // @ts-expect-error: Testing invalid input
    const result = convertStringToFavoriteItemArray(null);

    expect(result).toEqual([]);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});
