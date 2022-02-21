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
                        "@components": "./src/components",
                        "@form-builder": "./src/components/form",
                        "@layout": "./src/components/layout",
                        "@navigations": "./src/components/navigations",
                        "@fields": "./src/fields",
                        "@utils": "./src/utils",
                        "@views-auth": "./src/views/auth",
                        "@api": "./src/api",
                        "@redux": "./src/redux",
                    },
                },
            ],
        ],
    };
};
