export const mockProperty = {
  id: '507f191e810c19729de860ea',
  type: 'sale',
  user: '507f191e810c19729de860ea',
  address: 'address',
  description: 'description',
  price: 100,
  rent: 100,
  maintance: 100,
  propertyType: 'flat',
  bedrooms: 1,
  bathrooms: 1,
  petAllowed: false,
  area: 100,
};

export const mockPropertyService = {
  getAllProperties: jest.fn().mockReturnValue([mockProperty]),
  getPropertyById: jest.fn().mockReturnValue(mockProperty),
  getAllPropertiesByUser: jest.fn().mockReturnValue([mockProperty]),
  createProperty: jest.fn().mockReturnValue(mockProperty),
  updateProperty: jest.fn().mockReturnValue(mockProperty),
  deleteProperty: jest.fn().mockReturnValue(mockProperty),
};
