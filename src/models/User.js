const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },  // Bu alan bir String türündedir ve gereklidir (required: true).

    // Bu alan da bir String türündedir, gereklidir ve veritabanında benzersiz olmalıdır
    email: { type: String, required: true, unique: true }, //(unique: true). Bu, aynı e-posta adresine sahip iki kullanıcının kaydedilmesini engeller.

    password: { type: String, required: true },  // Bu alan da bir String türündedir ve gereklidir.

});

const User = mongoose.model('User', userSchema);

module.exports = User;
