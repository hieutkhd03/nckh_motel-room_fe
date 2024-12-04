import axios from "axios";

const API_URL = "http://localhost:8080/auth/"; // Cập nhật URL với prefix '/auth'

class AuthService {
  // Đăng nhập: Gửi email và password, nhận về token và fullName
  login(email, password) {
    return axios
      .post(API_URL + "login", { email, password }) // Gửi email và password đến '/auth/login'
      .then((response) => {
        if (response.data.token) {
          // Lưu token và thông tin người dùng vào localStorage và cookie
          localStorage.setItem("user", JSON.stringify(response.data));
          this.setCookie(
            "user",
            JSON.stringify({
              token: response.data.token,
              fullName: response.data.fullName,
              email: email, // Lưu email vào cookie để dùng sau
            }),
            1
          ); // Lưu cookie trong 1 ngày
        }
        return response.data;
      })
      .catch((error) => {
        console.error("Login failed: ", error);
        throw error; // Bắt lỗi nếu có lỗi khi đăng nhập
      });
  }

  // Đăng ký: Gửi email, password, fullName, address và phone
  register(email, password, fullName, address, phone) {
    return axios
      .post(API_URL + "register", { email, password, fullName, address, phone }) // Gửi dữ liệu đăng ký
      .then((response) => {
        return response.data; // Trả về dữ liệu phản hồi từ server
      })
      .catch((error) => {
        console.error("Registration failed: ", error);
        throw error; // Bắt lỗi nếu có lỗi khi đăng ký
      });
  }

  // Đăng xuất: Xóa thông tin người dùng khỏi localStorage và cookie
  logout() {
    this.deleteCookie("user"); // Xóa cookie user
    localStorage.removeItem("user"); // Xóa thông tin người dùng trong localStorage
  }

  // Lấy thông tin người dùng hiện tại từ cookie
  getCurrentUser() {
    const user = this.getCookie("user");
    return user ? JSON.parse(user) : null;
  }

  // Lấy vai trò người dùng hiện tại
  getCurrentUserRole() {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  // Lấy header Authorization để gửi cùng với yêu cầu API (JWT token)
  authHeader() {
    const user = this.getCurrentUser();
    return user && user.token ? { Authorization: "Bearer " + user.token } : {};
  }

  // Đặt giá trị cookie
  setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Thời gian hết hạn cookie
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  }

  // Lấy giá trị cookie
  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Xóa cookie
  deleteCookie(name) {
    document.cookie = `${name}=; Max-Age=-99999999; path=/`;
  }
}

export default new AuthService();
