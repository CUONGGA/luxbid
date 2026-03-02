const bcrypt = require('bcrypt');
const User = require('../models/User');

class RegisterController {
  async register(req, res) {
    try {
      let { name, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.render('auth/register', {
          hideNavbar: true,
          error: 'Mật khẩu xác nhận không khớp'
        });
      }

      name = name.trim();
      email = email.trim().toLowerCase();
      password = password.trim();

      if (!name || !email || !password) {
        return res.render('auth/register', {
          hideNavbar: true,
          error: 'Vui lòng nhập đầy đủ thông tin'
        });
      }

      if (password.length < 6) {
        return res.render('auth/register', {
          hideNavbar: true,
          error: 'Mật khẩu phải ít nhất 6 ký tự'
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.render('auth/register', {
          hideNavbar: true,
          error: 'Email đã tồn tại'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        name,
        username: name, // name = username
        email,
        password: hashedPassword,
        provider: 'local'
      });

      req.session.successRegister = true;

      req.session.save(() => {
        res.redirect('/auth/login');
      });

    } catch (err) {
      console.error(err);
      res.render('auth/register', {
        hideNavbar: true,
        error: 'Đăng ký thất bại, thử lại'
      });
    }
  }
}

module.exports = new RegisterController();