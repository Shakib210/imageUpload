import userRoute from './userRoute.js';


const configureAllRoutes = (app) => {
    userRoute(app)
}

export default configureAllRoutes;