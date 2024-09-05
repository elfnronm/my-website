import axios from 'axios';
import React from 'react';

function Register() {

// Kayıt işlemi için fonksiyon
const handleRegister = async (e) => {
  e.preventDefault(); // Sayfanın yenilenmesini engellemek için

  // Formdan gelen verileri alıyoruz
  const data = {
    username: e.target.username.value,
    email: e.target.email.value,
    password: e.target.password.value,
    confirmPassword: e.target['confirm-password'].value,
  };

  // Şifrelerin eşleşip eşleşmediğini kontrol et
  if (data.password !== data.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    // Axios ile backend'e POST isteği gönderiyoruz
    const response = await axios.post('http://localhost:3001/register', {
      username: data.username,
      email: data.email,
      password: data.password,
    });

    // Başarılı ise mesaj gösteriyoruz
    alert('Registration successful');
  } catch (error) {
    // Hata durumunda hata mesajı gösteriyoruz
    console.error('There was an error!', error);
    alert('Registration failed');
  }
};


  return (
    <div className="login-container">
      <h1>Create an Account</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" name="confirm-password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}


export default Register;
