export const VER = "/api/v1";

export const dataMethod = [
  {
    text: "GET",
    value: "GET",
  },
  {
    text: "POST",
    value: "POST",
  },
  {
    text: "PUT",
    value: "PUT",
  },
  {
    text: "DELETE",
    value: "DELETE",
  },
  {
    text: "PATCH",
    value: "PATCH",
  },
];

export const dataModule = [
  {
    text: "USER",
    value: "USER",
  },
  {
    text: "ROLE",
    value: "ROLE",
  },
  {
    text: "PERMISSION",
    value: "PERMISSION",
  },
];

export const ALL_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

export const ALL_MODULES = {
  USER: "USER",
  ROLE: "ROLE",
  PERMISSION: "PERMISSION",
  FORM: "FORM",
  UNIVERSITY: "UNIVERSITY",
  REVIEW_APPLICANT: "REVIEW_APPLICANT",
  DASHBOARD: "DASHBOARD",
};
export const ALL_MODULES_ARRAY = Object.values(ALL_MODULES);

export const ALL_PERMISSIONS = {
  DASHBOARD: {
    VIEW: {
      module: ALL_MODULES.DASHBOARD,
      api_path: VER + "/dashboard",
      method: "GET",
    },
  },
  USER: {
    VIEW: {
      module: ALL_MODULES.USER,
      api_path: VER + "/users",
      method: "GET",
    },
    CREATE_LIST_USERS: {
      module: ALL_MODULES.USER,
      api_path: VER + "/users/batch",
      method: "POST",
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
    UPDATE_STATUS: {
      module: ALL_MODULES.USER,
      api_path: VER + "/users/status/:id",
      method: "PATCH",
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
    UPDATE_STATUS: {
      module: ALL_MODULES.ROLE,
      api_path: VER + "/roles/status/:id",
      method: "PATCH",
    },
    UPDATE_ROLE_PERMISSION: {
      module: ALL_MODULES.ROLE,
      api_path: VER + "/roles/permission/:id",
      method: "PATCH",
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
    GET_ALL_PERMISSIONS: {
      module: ALL_MODULES.PERMISSION,
      api_path: VER + "/permissions/all",
      method: "GET",
    },
    GET_ALL_PERMISSIONS_BY_ROLEID: {
      module: ALL_MODULES.PERMISSION,
      api_path: VER + "/permissions/role/:id",
      method: "GET",
    },
  },
  FORM: {
    VIEW: {
      module: ALL_MODULES.FORM,
      api_path: VER + "/forms",
      method: "GET",
    },
    CREATE: {
      module: ALL_MODULES.FORM,
      api_path: VER + "/forms",
      method: "POST",
    },
    UPDATE: {
      module: ALL_MODULES.FORM,
      api_path: VER + "/forms/:id",
      method: "PATCH",
    },
    DELETE: {
      module: ALL_MODULES.FORM,
      api_path: VER + "/forms/:id",
      method: "DELETE",
    },
    GET_BY_ID: {
      module: ALL_MODULES.FORM,
      api_path: VER + "/forms/:id",
      method: "GET",
    },
  },
  UNIVERSITY: {
    VIEW: {
      module: ALL_MODULES.UNIVERSITY,
      api_path: VER + "/universities",
      method: "GET",
    },
    CREATE: {
      module: ALL_MODULES.UNIVERSITY,
      api_path: VER + "/universities",
      method: "POST",
    },
    UPDATE: {
      module: ALL_MODULES.UNIVERSITY,
      api_path: VER + "/universities/:id",
      method: "PATCH",
    },
  },
  REVIEW_APPLICANT: {
    VIEW: {
      module: ALL_MODULES.REVIEW_APPLICANT,
      api_path:
        VER + "/review-applicant/form-response/assigned/for-reviewers/:id",
      method: "GET",
    },
    VIEW_DETAIL: {
      module: ALL_MODULES.REVIEW_APPLICANT,
      api_path: VER + "/review-applicant",
      method: "GET",
    },
    REVIEW_SCORE_APPLICANT: {
      module: ALL_MODULES.REVIEW_APPLICANT,
      api_path: VER + "/review-applicant/scores",
      method: "POST",
    },
    REIVEW_APPLICANT_HISTORY: {
      module: ALL_MODULES.REVIEW_APPLICANT,
      api_path: VER + "/review-applicant/completed",
      method: "GET",
    },
  },
};
