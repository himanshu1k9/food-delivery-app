const menuRepository = require('../repositories/menu.repository');
const AppError = require('../utils/ApiError');

class MenuService {
    constructor(repo) {
        this.repo = repo;
    }

    async getMenuForDisplay() {
        const items = await this.repo.getAllAvailable();
        return items;
    }
}

module.exports = new MenuService(menuRepository);