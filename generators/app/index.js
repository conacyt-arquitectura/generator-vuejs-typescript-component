"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`
      Welcome to the ${chalk.red(
        "VueJS Typescript Component"
      )} generator!
      `)
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "The name of your component",
        default: _.upperFirst(_.camelCase(this.appname)),
        validate: async function(input) {
          if (!input) {
            return false;
          }

          return true;
        }
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  configuring() {
    this.props.name = _.upperFirst(_.camelCase(this.props.name));
    this.props.nameKebab = _.kebabCase(this.props.name);
  }

  writing() {
    this.fs.copy(
      this.templatePath("src/shims-tsx.d.ts.ejs"),
      this.destinationPath("src/shims-tsx.d.ts")
    );
    this.fs.copy(
      this.templatePath("src/shims-vue.d.ts.ejs"),
      this.destinationPath("src/shims-vue.d.ts")
    );
    this.fs.copy(
      this.templatePath("src/shims-tsx.d.ts.ejs"),
      this.destinationPath("example/shims-tsx.d.ts")
    );
    this.fs.copy(
      this.templatePath("src/shims-vue.d.ts.ejs"),
      this.destinationPath("example/shims-vue.d.ts")
    );
    this.fs.copy(
      this.templatePath("tsconfig.json.ejs"),
      this.destinationPath("tsconfig.json")
    );
    this.fs.copy(
      this.templatePath("babel.config.js.ejs"),
      this.destinationPath("babel.config.js")
    );
    this.fs.copyTpl(
      this.templatePath("bili.config.ts.ejs"),
      this.destinationPath("bili.config.ts"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("package.json.ejs"),
      this.destinationPath("package.json"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("README.md.ejs"),
      this.destinationPath("README.md"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("src/index.ts.ejs"),
      this.destinationPath("src/index.ts"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath(`src/ComponentName.component.ts.ejs`),
      this.destinationPath(`src/${this.props.nameKebab}.component.ts`),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("src/ComponentNameComponent.vue.ejs"),
      this.destinationPath(`src/${this.props.nameKebab}.component.vue`),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("example/App.vue.ejs"),
      this.destinationPath("example/App.vue"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("example/main.ts.ejs"),
      this.destinationPath("example/main.ts"),
      this.props
    );
  }

  install() {
    this.npmInstall();
  }
};
