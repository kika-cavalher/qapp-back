// ============================================
// Database
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true,
  },
  description: String,
  abbreviation: Boolean,
  created_at: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", ProjectSchema);

// ============================================
// Admin Bro
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

// use mongoose in AdminBro
AdminBro.registerAdapter(AdminBroMongoose)

// config
const adminBroOptions = new AdminBro({
	resources: [Project],
  rootPath: '/admin'
})
const router = AdminBroExpress.buildRouter(adminBroOptions)


// ============================================
// Server
const express = require("express");
const server = express();

server
  .use(adminBroOptions.options.rootPath, router)

// =============================================
// Run App
const run = async () => {
  await mongoose.connect("mongodb+srv://qapp:123@qapp.8mins.mongodb.net/qapp-db", {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });

  await server.listen(5500, () => console.log("Server started"));
}

run()