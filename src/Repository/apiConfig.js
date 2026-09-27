/** @format */

const endPoints = {
  auth: {
    login: "/admin/login",
    myProfile: "/admin/getprofile",
    forgetPassword: "/admin/forget/Password",
    verifyOtp: "/admin/forgot/Verifyotp",
    updatePassword: (id) => `/admin/changePassword/${id}`,
  },
  users: {
    allUser: ({
      page = 1,
      limit = 10,
      search = "",
      isVerified = null,
      status = null,
    }) =>
      `/admin/searchUser?userType=&page=${page}&limit=${limit}&search=${search}&status=${status}&isVerified=${isVerified}`,
    updateStatus: (id) => `/admin/users/${id}/update-verification-status`,
    getUserById: (id) => `/admin/profile/${id}`,
    updateUserById: (id) => `/admin/update/user/${id}`,
    uploadUserPic: (id) => `/admin/upload-profile-picture/${id}`,
    removeUser: (id) => `/admin/users/profile/delete/${id}`,
  },
  dashboard: {
    userCount: "/admin/allcount",
  },
  notifications: {
    getAll: "/admin/notifications/user",
    remove: (id) => `/admin/notifications/delete/${id}`,
    create: "/admin/notifications",
  },
  policy: {
    get: "/admin/privacy",
    remove: (id) => `/admin/privacy/${id}`,
    create: "/admin/privacy",
    getbyId: (id) => `/admin/privacy/${id}`,
    edit: (id) => `/admin/privacy/${id}`,
  },
  posts: {
    getPostByUserId: ({ id, type = "", page = 1, limit = 10 }) =>
      `/admin/getPostsFilterByUserId/${id}?type=${type}&page=${page}&limit=${limit}`,
    removePost: (id) => `/admin/post/${id}`,
  },
  freindRequest: {
    getbyUserId: ({ id, page = 1, limit = 10, query }) =>
      `/admin/getFriendRequestsByUserId/${id}?page=${page}&limit=${limit}&search=${query}`,
  },
  friends: {
    getByUserId: ({ id, page = 1, limit = 10, query }) =>
      `/admin/getAllFriendsByUserId/${id}?page=${page}&limit=${limit}&search=${query}`,
  },
  help: {
    get: "/admin/call-us",
    getById: (id) => `/admin/call-us/${id}`,
    create: "/admin/call/us",
    edit: (id) => `/admin/call-us/${id}`,
    remove: (id) => `/admin/call-us/${id}`,
  },
  Queries: {
    getAll: "/admin/contact-us",
    getById: (id) => `/admin/contact-us/${id}`,
    sendResponse: `/admin/contact-us/reply`,
    delete: (id) => `/admin/contact-us/${id}`,
  },
  terms: {
    getAll: "/admin/terms-and-conditions",
    getById: (id) => `/admin/terms-and-conditions/${id}`,
    edit: (id) => `/admin/terms-and-conditions/${id}`,
    remove: (id) => `/admin/terms-and-conditions/${id}`,
    create: `/admin/terms-and-conditions`,
  },
  trending: {
    photos: (filter = "") => `/admin/getMostPopularPosts?filter=${filter}`,
  },
  faq: {
    getAll: "/admin/faqs",
    create: "/admin/faqs/create",
    getbyId: (id) => `/admin/faqs/${id}`,
    edit: (id) => `/admin/faqs/${id}`,
    remove: (id) => `/admin/faqs/${id}`,
  },
};

export default endPoints;
