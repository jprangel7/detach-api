const Item = require('../models/Item');
const User = require('../models/User');

module.exports = {

    async index(request, response) {
        try {
            allItems = await Item.find();

            return response.status(200).send(allItems)

        } catch (err) {
            return response.send(err)
        }
    },

    async search(request, response) {
        try {

            const items = await Item.find(request.body);

            return response.status(200).json(items);

        } catch (err) {
            return response.send(err);
        }
    },

    async create(request, response) {
        try {
            const files = request.files;
            const { title, description, value, type } = request.body;
            const user = await User.findOne({ "_id": request.userId });

            item = await Item.create({
                title,
                description,
                value,
                thumbnail: files,
                type,
                city: user.city,
                uf: user.uf,
                user,
            });

            return response.json({ item });

        } catch (err) {
            return response.send(err);
        }
    },

    async update(request, response) {
        try {
            const { id } = request.headers;
            const newData = request.body;
            const files = request.files;

            if (files.length > 0)
                newData.thumbnail = files;

            item = await Item.findOne({ "_id": id });

            if (!item)
                return response.status(400).send('Item not found');

            if (item.user != request.userId)
                return response.status(401).send();

            Object.keys(newData).forEach(property => {
                if (newData[property] !== item[property])
                    item[property] = newData[property];
            })

            await Item.findByIdAndUpdate(item.id, item);

            return response.status(200).send();

        } catch (err) {
            return response.send(err);
        }
    },

    async delete(request, response) {
        try {
            const { id } = request.body;
            item = await Item.findOne({ "_id": id });

            if (!item)
                return response.status(400).send('Item not found');

            if (item.user != request.userId)
                return response.status(401).send();

            await Item.deleteOne({ "_id": id });

            return response.status(204).send();

        } catch (err) {
            return response.send(err);
        }
    }

};