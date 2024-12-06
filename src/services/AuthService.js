import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
  // Đăng nhập
  login(email, password) {
    return axios
      .post(API_URL + "login", { email, password })
      .then((response) => {
        if (response.data?.success) {
          // Lưu thông tin người dùng vào localStorage nếu success
          const userData = response.data.data;
          localStorage.setItem("user", JSON.stringify(userData));
          return userData; // Trả về thông tin người dùng
        }
        throw response.data.error; // Ném lỗi từ backend để frontend xử lý
      });
  }

  // Đăng ký
  register(email, password, fullName, address, phone) {
    return axios
      .post(API_URL + "register", { email, password, fullName, address, phone }) // Gửi dữ liệu đăng ký
      .then((response) => {
        if (response.data?.success) {
          return response.data; // Trả về dữ liệu phản hồi từ server nếu success là true
        } else {
          throw response.data.error; // Ném lỗi nếu success là false
        }
      });
  }

  // Đăng xuất: Xóa thông tin người dùng khỏi localStorage
  logout() {
    localStorage.removeItem("user"); // Xóa thông tin người dùng trong localStorage
  }

  // Lấy thông tin người dùng hiện tại từ localStorage
  getCurrentUser() {
    const user = localStorage.getItem("user"); // Lấy dữ liệu từ localStorage
    return user ? JSON.parse(user) : null;
  }

  // Lấy vai trò người dùng hiện tại từ thông tin BE trả về
  getCurrentUserRole() {
    const user = this.getCurrentUser();
    return user ? user.role : null; // Trả về role nếu tồn tại
  }

  // Tạo header Authorization (JWT token) để gửi cùng với yêu cầu API
  authHeader() {
    const user = this.getCurrentUser();
    return user && user.token ? { Authorization: "Bearer " + user.token } : {};
  }
}

export default new AuthService();
