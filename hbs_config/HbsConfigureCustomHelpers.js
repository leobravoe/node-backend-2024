const hbs = require("hbs");

class HbsConfigureCustomHelpers {
    /**
     * Define o custom helper do hbs, para realizar comporações de igualdade dentro de um view .hbs
     */
    static run() {
        hbs.registerHelper("igual", function (value1, value2) {
            if (value1 == value2)
                return true;
            return false;
        });
    }
};

module.exports = HbsConfigureCustomHelpers;
