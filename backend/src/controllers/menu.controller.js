const menuService = require('../services/menu.service');

class MenuController {
    constructor(service) {
        this.service = service;
    }

    getMenu = async (req, res, next) => {
        try {
            const menuItems = await this.service.getMenuForDisplay();
            res.status(200).json({
                status: 'success',
                results: menuItems.length,
                data: menuItems,
            });
        } catch (error) {
            next(error); // Pass to global error handler
        }
    };
}

module.exports = new MenuController(menuService);