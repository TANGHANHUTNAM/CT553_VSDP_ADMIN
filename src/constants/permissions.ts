export const VER = "/api/v1";

export const ALL_MODULES = {
  AUTH: "AUTH",
  USER: "USER",
  ROLE: "ROLE",
  PERMISSION: "PERMISSION",
};

export const ALL_PERMISSIONS = {
  USER: {
    VIEW: {
      module: ALL_MODULES.USER,
      api_path: VER + "/users",
      method: "GET",
    },
    CREATE: {
      module: ALL_MODULES.USER,
      api_path: VER + "/users",
      method: "POST",
    },
    UPDATE: {
      module: ALL_MODULES.USER,
      api_path: VER + "/users/:id",
      method: "PATCH",
    },
    DELETE: {
      module: ALL_MODULES.USER,
      api_path: VER + "/users/:id",
      method: "DELETE",
    },
    GET_BY_ID: {
      module: ALL_MODULES.USER,
      api_path: VER + "/users/:id",
      method: "GET",
    },
  },
  ROLE: {
    VIEW: {
      module: ALL_MODULES.ROLE,
      api_path: VER + "/roles",
      method: "GET",
    },
    CREATE: {
      module: ALL_MODULES.ROLE,
      api_path: VER + "/roles",
      method: "POST",
    },
    UPDATE: {
      module: ALL_MODULES.ROLE,
      api_path: VER + "/roles/:id",
      method: "PATCH",
    },
    DELETE: {
      module: ALL_MODULES.ROLE,
      api_path: VER + "/roles/:id",
      method: "DELETE",
    },
    GET_BY_ID: {
      module: ALL_MODULES.ROLE,
      api_path: VER + "/roles/:id",
      method: "GET",
    },
  },
  PERMISSION: {
    VIEW: {
      module: ALL_MODULES.PERMISSION,
      api_path: VER + "/permissions",
      method: "GET",
    },
    CREATE: {
      module: ALL_MODULES.PERMISSION,
      api_path: VER + "/permissions",
      method: "POST",
    },
    UPDATE: {
      module: ALL_MODULES.PERMISSION,
      api_path: VER + "/permissions/:id",
      method: "PATCH",
    },
    DELETE: {
      module: ALL_MODULES.PERMISSION,
      api_path: VER + "/permissions/:id",
      method: "DELETE",
    },
    GET_BY_ID: {
      module: ALL_MODULES.PERMISSION,
      api_path: VER + "/permissions/:id",
      method: "GET",
    },
  },
};
