//Bu kod, kullanıcının kaydolması (register) ve giriş yapması (login) için iki farklı rota (route) tanımlar.
//Bu rotalar, frontend tarafından gönderilen HTTP isteklerini alır ve bunları işler.


//Bu kod parçası, Express.js'i içe aktarır ve router adında bir router oluşturur.
//User modelini de içe aktarır, bu model MongoDB veritabanıyla etkileşim kurar.

const express = require('express');
const bcrypt = require('bcryptjs'); // Şifreleri karşılaştırmak için
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;


    try {
        // Şifreyi hash'leyerek güvenli hale getiriyoruz
        const hashedPassword = await bcrypt.hash(password, 10);

        // Yeni kullanıcı oluşturuyoruz ve hash'lenmiş şifreyi kaydediyoruz
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        // Başarılı kayıt işlemi sonucunda kullanıcıyı döndürüyoruz
        res.status(201).json(user);
    } catch (err) {
        // Eğer hata varsa, 400 hatasıyla birlikte hata mesajını gönderiyoruz
        res.status(400).json({ error: err.message });
    }
});

// Giriş (Login) işlemi
router.post('/login', async (req, res) => {
    const { username, password } = req.body;  // Artık email değil, username ile giriş yapacağız

    try {
        const user = await User.findOne({ username });  // Kullanıcı adıyla veritabanında kullanıcıyı arıyoruz

        if (!user) {
            // Eğer kullanıcı bulunmazsa hata mesajı döneriz
            return res.status(404).json({ message: 'User not found. Please register.' });
        }

        // Şifre kontrolü
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Giriş başarılıysa bir JWT token döneriz
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;
