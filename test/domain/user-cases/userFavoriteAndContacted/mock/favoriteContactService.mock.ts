export const mockFavoriteContactedService = {
  getFavoritesAndContactedProperties: jest.fn().mockReturnValue([]),
  addFavorite: jest.fn().mockReturnValue({}),
  removeFavorite: jest.fn().mockReturnValue({}),
  contactAdvertiser: jest.fn().mockReturnValue({}),
  unContactedAdvertiser: jest.fn().mockReturnValue({}),
};
