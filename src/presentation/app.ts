import express, { Express } from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
import categoriesRoutes from "./routes/categories";
import stockItemsRoutes from "./routes/stock_items";
import shoppingListsRoutes from "./routes/shopping_lists";
import config from "@infrastructure/config/environment";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp(): Express {
  const app = express();

  // View engine setup
  const viewPath = path.join(__dirname, "views");
  const partialsPath = path.join(viewPath, "partials");

  // Registrar partials directory
  hbs.registerPartials(partialsPath);

  // Registrar helpers customizados
  hbs.registerHelper('eq', (a: any, b: any) => a === b);

  app.set("views", viewPath);
  app.set("view engine", "hbs");

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    express.static(path.join(__dirname, "public"), {
      maxAge: "1d",
    }),
  );

  // Routes
  app.use("/categories", categoriesRoutes);
  app.use("/stock-items", stockItemsRoutes);
  app.use("/shopping-lists", shoppingListsRoutes);

  // Home route
  app.get("/", (_req, res) => {
    res.redirect("/categories");
  });

  // Error handling middleware
  app.use(
    (
      err: any,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      console.error(err);
      res.status(err.status || 500).render("error", {
        error: err.message || "Erro interno do servidor",
      });
    },
  );

  return app;
}
