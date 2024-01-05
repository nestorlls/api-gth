import { Login, Register } from './auth';
import { GetUserProperties } from './userProperty/getAll';
import { DeleteUser, GetUserById, GetallUsers, UpdateUser } from './user';
import { AddFavorite, GetAllFavorites, RemoveFavorite } from './userFavorites';
import { CreateProperty, DeleteProperty, GetAllProperties, GetPropertyById, UpdateProperty } from './properties';

export const useCases = {
  auth: {
    Login,
    Register,
  },
  users: {
    GetallUsers,
    GetUserById,
    UpdateUser,
    DeleteUser,
  },
  properties: {
    GetAllProperties,
    GetPropertyById,
    CreateProperty,
    UpdateProperty,
    DeleteProperty,
  },
  userfavorites: {
    GetAllFavorites,
    AddFavorite,
    RemoveFavorite,
  },
  userProperties: {
    GetUserProperties,
  },
};
