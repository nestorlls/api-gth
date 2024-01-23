import { Login, Register } from './auth';
import { GetUserProperties } from './userProperty/getAll';
import { DeleteUser, GetUserById, GetallUsers, UpdateUser } from './user';
import {
  AddFavorite,
  ContactAdvertiser,
  GetFavoritesAndContactedPropeties,
  RemoveFavorite,
  UnContactAdvertiser,
} from './userFavoritesAndContacted';
import { CreateProperty, DeleteProperty, GetAllProperties, GetPropertyById, UpdateProperty } from './properties';
import { DeleteFile, UploadFile } from './uploadFile';

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
  userfavoritesAndContacts: {
    GetFavoritesAndContactedPropeties,
    AddFavorite,
    RemoveFavorite,
    ContactAdvertiser,
    UnContactAdvertiser,
  },
  userProperties: {
    GetUserProperties,
  },
  UploadFile: {
    UploadFile,
    DeleteFile,
  },
};
