module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        cwd: "babelrc",
        root: ["./src"],
        extensions: [".js", ".ios.js", ".android.js"],
        alias: {
          _assets: "./src/assets",
          _components: "./src/components",
          _atoms: "./src/components/atoms",
          _molecules: "./src/components/molecules",
          _organisms: "./src/components/organisms",
          _templates: "./src/components/templates",
          _navigations: "./src/navigations",
          _screens: "./src/screens",
          _utils: "./src/utils",
          _hooks: "./src/hooks",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
