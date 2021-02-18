import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import userController from "./controllers/user.controller";
import commonMiddleware from "../common/middlewares/common.middleware";
import userMiddleware from "./middlewares/user.middleware";

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UserRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/users")
      .get(userController.getAllUsers)
      .post([
        commonMiddleware.isAuth,
        userMiddleware.validateCreateUserBody,
        userController.createUser
      ]);

    this.app.route("/users/:userId").get([userController.getUserById]);

    this.app
      .route("/users/:userId/projects")
      .get([userController.getProjectsByUserId]);

    this.app.route("/users/:userId/votes").get(userController.getVotesByUserId);

    this.app
      .route("/users/:userId/comments")
      .get(userController.getCommentsByUserId);

    this.app.route("/hashtags").get(userController.getHashTags);
    return this.app;
  }
}
