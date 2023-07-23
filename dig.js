const fs = require("fs-extra");
const path = require("path");
const yargs = require("yargs");
const dotenv = require("dotenv");
dotenv.config();
const connectToDB = require("./config/database");

// Define the command-line options
const argv = yargs
  .command("make:controller <name>", "Create a new controller", (yargs) => {
    yargs.positional("name", {
      describe: "Controller name",
      type: "string",
    });
  })
  .command("make:model <name>", "Create a new mongoose model", (yargs) => {
    yargs.positional("name", {
      describe: "Model name",
      type: "string",
    });
  })
  .command("make:middleware <name>", "Create a new middleware", (yargs) => {
    yargs.positional("name", {
      describe: "Middleware name",
      type: "string",
    });
  })
  .command("make:migration <name>", "Create a new migration", (yargs) => {
    yargs.positional("name", {
      describe: "Migration name",
      type: "string",
    });
  })
  .command("migrate", "Run all pending migrations")
  .help()
  .alias("help", "h").argv;

const controllersDir = path.join(__dirname, "app", "Http", "Controllers");
const modelsDir = path.join(__dirname, "app", "Models");
const middlewareDir = path.join(__dirname, "app", "Http", "Middlewares");
const migrationsDir = path.join(__dirname, "database", "migrations");

async function generateController(controllerName) {
  try {
    const controllerNameParts = controllerName.split("/");
    const controllerFileName = `${controllerNameParts.pop()}Controller.js`;
    const controllerPath = path.join(controllersDir, ...controllerNameParts);

    // Create nested directories if they don't exist
    await fs.ensureDir(controllerPath);

    // Generate the controller content
    const controllerContent = generateControllerContent(controllerName);

    // Create the new controller file
    const newControllerPath = path.join(controllerPath, controllerFileName);
    await fs.writeFile(newControllerPath, controllerContent);

    console.log(`Controller ${controllerName} created successfully.`);
  } catch (err) {
    console.error("Error creating controller:", err);
  }
}

function generateControllerContent(controllerName) {
  // Customize the controller content here
  return `
class ${controllerName}Controller {
  // Controller methods go here
}

module.exports = ${controllerName}Controller;
`;
}

async function generateModel(modelName) {
  try {
    const modelFileName = `${modelName}.js`;
    const modelPath = path.join(modelsDir, modelFileName);

    // Generate the model content
    const modelContent = generateModelContent(modelName);

    // Create the new model file
    await fs.writeFile(modelPath, modelContent);

    console.log(`Model ${modelName} created successfully.`);
  } catch (err) {
    console.error("Error creating model:", err);
  }
}

function generateModelContent(modelName) {
  // Customize the model content here
  return `
  const mongoose = require("mongoose");
  
  const ${modelName}Schema = new mongoose.Schema({
    // Schema fields go here
  });
  
  const ${modelName} = mongoose.model("${modelName}", ${modelName}Schema);
  
  module.exports = ${modelName};
  `;
}

async function generateMiddleware(middlewareName) {
  try {
    const middlewareFileName = `${middlewareName}.js`;
    const middlewarePath = path.join(middlewareDir, middlewareFileName);

    // Generate the middleware content
    const middlewareContent = generateMiddlewareContent(middlewareName);

    // Create the new middleware file
    await fs.writeFile(middlewarePath, middlewareContent);

    console.log(`Middleware ${middlewareName} created successfully.`);
  } catch (err) {
    console.error("Error creating middleware:", err);
  }
}

function generateMiddlewareContent(middlewareName) {
  // Customize the middleware content here
  return `
  // ${middlewareName} middleware
  const ${middlewareName}Middleware = (req, res, next) => {
    // Middleware logic goes here
    next();
  };
  
  module.exports = ${middlewareName}Middleware;
  `;
}

async function generateMigration(migrationName) {
  try {
    const migrationFileName = `${Date.now()}_${migrationName}.js`;
    const migrationPath = path.join(migrationsDir, migrationFileName);

    // Generate the migration content
    const migrationContent = generateMigrationContent(migrationName);

    // Create the new migration file
    await fs.writeFile(migrationPath, migrationContent);

    console.log(`Migration ${migrationName} created successfully.`);
  } catch (err) {
    console.error("Error creating migration:", err);
  }
}

function generateMigrationContent(migrationName) {
  const tableName = migrationName.split("_")[1];
  // Customize the migration content here
  return `
// Migration: ${tableName}
// Put your migration logic here
const mongoose = require("mongoose");
  
const ${tableName}Schema = new mongoose.Schema({
  // Schema fields go here
});

const ${tableName} = mongoose.model("${tableName}", ${tableName}Schema);

module.exports = ${tableName};

`;
}

async function runMigrations() {
  try {
   // * will be done in the next chapter
  } catch (err) {
    console.error("Error running migrations:", err);
  }
}

// Check the command and execute the corresponding function
const command = argv._[0];
if (command === "make:controller") {
  const controllerName = argv.name;
  generateController(controllerName);
} else if (command === "make:model") {
  const modelName = argv.name;
  generateModel(modelName);
} else if (command === "make:middleware") {
  const middlewareName = argv.name;
  generateMiddleware(middlewareName);
} else if (command === "make:migration") {
  const migrationName = argv.name;
  generateMigration(migrationName);
} else if (command === "migrate") {
  runMigrations();
}
