import App from '@/app';
import validateEnv from '@utils/validateEnv';
import UserRoute from '@routes/users.route';

validateEnv();

const app = new App([new UserRoute()]);

app.listen();
