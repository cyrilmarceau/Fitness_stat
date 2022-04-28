module.exports = function (api) {
    api.cache(true);
    return {
        // presets: ["babel-preset-expo"],
        presets: ["module:metro-react-native-babel-preset", "@babel/preset-typescript"],
        // plugins: ["react-native-reanimated/plugin", ["module-resolver"]],
        plugins: [
            "react-native-reanimated/plugin",
            "inline-dotenv",
            [
                "module-resolver",
                {
                    root: ["./src"],
                    extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
                    alias: {
                        "*": ".",
                        "@src": "./src",
                        "@api": "./src/api",
                        "@components": "./src/components",
                        "@form-builder": "./src/components/form",
                        "@constants": "./src/constants",
                        "@contexts": "./src/contexts",
                        "@helpers": "./src/helpers",
                        "@i18n": "./src/i18n",
                        "@layout": "./src/layouts",
                        "@layout-navigations": "./src/layouts/navigations",
                        "@styles": "./src/styles",
                        "@fields": "./src/utils/fields",
                        "@validations": "./src/utils/validations",
                        "@views-auth": "./src/views/auth",
                        "@views-app": "./src/views/app",
                    },
                },
            ],
        ],
    };
};
