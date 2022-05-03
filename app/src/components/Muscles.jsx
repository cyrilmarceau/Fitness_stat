import React from "react";
import { Card, Colors } from "react-native-ui-lib";

const Muscles = ({ muscles }) => {
    return (
        <>
            {muscles?.map((muscle) => {
                return (
                    <Card
                        key={muscle.key}
                        marginR-20
                        style={{ minHeight: 100 }}
                        width={200}
                        onPress={() => console.log("pressed", muscle.key)}
                    >
                        <Card.Section
                            bg-white
                            padding-20
                            flex-3
                            content={[
                                {
                                    text: muscle.value,
                                    text50: true,
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
                );
            })}
        </>
    );
};

export default Muscles;
