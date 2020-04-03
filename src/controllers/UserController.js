const bcrypr = require('bcryptjs');

const generateToken = require('../utils/generateToken');
const User = require('../models/User');

module.exports = {

    async index(request, response) {
        try {
            const allUsers = await User.find();

            return response.status(200).send(allUsers)

        } catch (err) {
            return response.send(err)
        }
    },

    async create(request, response) {
        try {
            const newUser = request.body;
            const { email } = newUser;

            if (await User.findOne({ email }))
                return response.status(409).send({ error: 'This Email is already in use.' });

            user = await User.create(newUser);

            user.password = undefined;

            const token = generateToken({ id: user.id });

            return response.status(201).send({ user, token });

        } catch (err) {
            return response.send(err)
        }
    },

    async authenticate(request, response) {
        try {
            const { email, password } = request.body;
            const user = await User.findOne({ email }).select('+password');

            if (!user)
                return response.status(400).send({ error: 'User not found' });

            if (!await bcrypr.compare(password, user.password))
                return response.status(400).send({ error: 'Invalid password' });

            user.password = undefined;

            const token = generateToken({ id: user.id });

            return response.status(200).send({ user, token });

        } catch (err) {
            return response.send(err);
        }
    },

    async update(request, response) {
        try {
            const newData = request.body;
            const user = await User.findOne({ "_id": request.userId });

            Object.keys(newData).forEach(property => {
                if (newData[property] !== user[property])
                    user[property] = newData[property];
            })

            await User.findByIdAndUpdate(user.id, user);

            return response.status(200).send();

        } catch (err) {
            return response.send(err);
        }
    },

    async delete(request, response) {
        try {

            await User.deleteOne({ "_id": request.userId });

            return response.status(204).send('User Deleted');

        } catch (err) {
            return response.send(err);
        }
    }

};