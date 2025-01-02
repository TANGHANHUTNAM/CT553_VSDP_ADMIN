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
      module: "USER",
      api_path: VER + "/users",
      method: "GET",
    },
    CREATE: {
      module: "USER",
      api_path: VER + "/users",
      method: "POST",
    },
    UPDATE: {
      module: "USER",
      api_path: VER + "/users/:id",
      method: "PATCH",
    },
    DELETE: {
      module: "USER",
      api_path: VER + "/users/:id",
      method: "DELETE",
    },
  },
  ROLE: {
    VIEW: {
      module: "ROLE",
      api_path: VER + "/roles",
      method: "GET",
    },
    CREATE: {
      module: "ROLE",
      api_path: VER + "/roles",
      method: "POST",
    },
    UPDATE: {
      module: "ROLE",
      api_path: VER + "/roles/:id",
      method: "PATCH",
    },
    DELETE: {
      module: "ROLE",
      api_path: VER + "/roles/:id",
      method: "DELETE",
    },
  },
  PERMISSION: {
    VIEW: {
      module: "PERMISSION",
      api_path: VER + "/permissions",
      method: "GET",
    },
    CREATE: {
      module: "PERMISSION",
      api_path: VER + "/permissions",
      method: "POST",
    },
    UPDATE: {
      module: "PERMISSION",
      api_path: VER + "/permissions/:id",
      method: "PATCH",
    },
    DELETE: {
      module: "PERMISSION",
      api_path: VER + "/permissions/:id",
      method: "DELETE",
    },
  },
};
