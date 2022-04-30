import { LayoutView } from "@layout/BaseLayout";
import React from "react";
import { Card, Colors, View, Text, Button } from "react-native-ui-lib";

const Workouts = () => {
    return (
        <>
            <View flex style={{ flexDirection: "row" }}>
                <Card
                    marginR-20
                    marginB-15
                    style={{ minHeight: 150, width: "47%" }}
                    onPress={() => console.log("pressed")}
                >
                    <Card.Section
                        bg-white
                        padding-20
                        flex-3
                        content={[
                            {
                                text: "Le 29 avril 2022",
                                text70: true,
                                color: Colors.secondary,
                            },
                            {
                                text: "épaules - triceps",
                                text80: true,
                                color: Colors.secondary,
                            },
                        ]}
                        contentStyle={{
                            alignItems: "center",
                            justifyContent: "center",

                            flex: 1,
                        }}
                    />
                </Card>
                <Card
                    marginR-20
                    marginB-15
                    style={{ minHeight: 150, width: "47%" }}
                    onPress={() => console.log("pressed")}
                >
                    <Card.Section
                        bg-white
                        padding-20
                        flex-3
                        content={[
                            {
                                text: "Le 27 avril 2022",
                                text70: true,
                                color: Colors.secondary,
                            },
                            {
                                text: "pectoraux - biceps",
                                text80: true,
                                color: Colors.secondary,
                            },
                        ]}
                        contentStyle={{
                            alignItems: "center",
                            justifyContent: "center",

                            flex: 1,
                        }}
                    />
                </Card>
            </View>

            <View flex style={{ flexDirection: "row" }}>
                <Card
                    marginR-20
                    style={{ minHeight: 150, width: "47%" }}
                    onPress={() => console.log("pressed")}
                >
                    <Card.Section
                        bg-white
                        padding-20
                        flex-3
                        content={[
                            {
                                text: "Le 25 avril 2022",
                                text70: true,
                                color: Colors.secondary,
                            },
                            {
                                text: "dos - triceps",
                                text80: true,
                                color: Colors.secondary,
                            },
                        ]}
                        contentStyle={{
                            alignItems: "center",
                            justifyContent: "center",

                            flex: 1,
                        }}
                    />
                </Card>
                <Card
                    marginR-20
                    style={{ minHeight: 150, width: "47%" }}
                    onPress={() => console.log("pressed")}
                >
                    <Card.Section
                        bg-white
                        padding-20
                        flex-3
                        content={[
                            {
                                text: "Le 22 avril 2022",
                                text70: true,
                                color: Colors.secondary,
                            },
                            {
                                text: "epaules - triceps",
                                text80: true,
                                color: Colors.secondary,
                            },
                        ]}
                        contentStyle={{
                            alignItems: "center",
                            justifyContent: "center",

                            flex: 1,
                        }}
                    />
                </Card>
            </View>
        </>
    );
};

export default Workouts;
