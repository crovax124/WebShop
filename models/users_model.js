const { get } = require('express/lib/response');
const bcrypt = require('bcryptjs');

const db = require('../data/database');


class User {
    constructor(email, password, fullname, street, postalcode, city) {
        this.email = email,
        this.password = password,
        this.fullname = fullname,
        this.address = {
            street: street,
            postalcode: postalcode,
            city: city,
        };
    };

   async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 12);
       await get.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.name,
            address: this.address,
        });
    };
};

module.exports = User;