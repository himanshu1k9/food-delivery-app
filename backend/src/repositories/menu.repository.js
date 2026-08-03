const { Menu } = require('../models/menu.model');

class MenuRepository {
    constructor() {
        this.model = Menu;
    }

    async getAllAvailable() {
        return this.model.findAll({
            where: { isAvailable: true },
            order: [['name', 'ASC']]
        });
    }

    async getById(id) {
        return this.model.findByPk(id);
    }
}

module.exports = new MenuRepository();