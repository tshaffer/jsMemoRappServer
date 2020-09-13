"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./routes/routes");
const restaurants_1 = __importDefault(require("./routes/restaurants"));
const tags_1 = __importDefault(require("./routes/tags"));
const users_1 = __importDefault(require("./routes/users"));
class App {
    constructor() {
        // load env variables
        this.route = new routes_1.Routes();
        dotenv_1.default.config({ path: './/src/config/config.env' });
        console.log('port env: ' + process.env.PORT);
        db_1.default();
        this.app = express_1.default();
        this.config();
        // Body parser
        // this.app.use(express.json());
        this.app.use(express_1.default.json({
            limit: '100mb',
        }));
        // this.app.use(logger);
        // Dev logging middleware
        if (process.env.NODE_ENV === 'development') {
            this.app.use(morgan_1.default('dev'));
        }
        this.route.routes(this.app);
        this.app.use('/api/v1', restaurants_1.default);
        this.app.use('/api/v1', tags_1.default);
        this.app.use('/api/v1', users_1.default);
        // Workaround to allow empty strings
        // https://github.com/Automattic/mongoose/issues/7150
        // const Str = mongoose.Schema.Types.String as any;
        // Str.checkRequired((v: any) => v != null);
        // mongoose.connect(mongoDB);
        // mongoose.Promise = global.Promise;
        // const db = mongoose.connection;
        // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        // db.once('open', function callback() {
        //   console.log('stravatron db open successful');
        // });
        console.log('end of constructor');
    }
    config() {
        // pre Heroku
        // const port = process.env.PORT || 8000;
        // this.app.set('port', port);
        // for Heroku, from mrs
        let port = process.env.PORT;
        if (port === undefined || port === null || port === '') {
            port = 8000;
        }
        this.app.set('port', port);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map