import React, { useState, useEffect } from "react";
import { BaseLayout, LayoutView } from "@layout/BaseLayout";
import { ScrollView } from "react-native";
import { useAuth } from "@contexts/authContext";
import { Text, Card, Colors, View, Button } from "react-native-ui-lib";
import API from "@api";
import Workouts from "@components/Workouts";
import Muscles from "@components/Muscles";

const HomeScreen = ({ navigation }) => {
    const auth = useAuth();

    const [muscles, setMuscles] = useState([]);

    const getMuscles = async () => {
        const datas = await API.getMuscles();
        setMuscles(datas);
    };

    useEffect(() => {
        getMuscles();
    }, []);

    return (
        <BaseLayout enablePadding={false}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <LayoutView>
                    <Text h1 textD marginV-15>
                        Hello {auth.member.firstname}
                    </Text>
                </LayoutView>

                <View>
                    <LayoutView>
                        <Text h5 marginT-15>
                            Mes derniers entraînements :)
                        </Text>
                        <Button
                            label={"Tous mes entraînements"}
                            outline
                            outlineColor={Colors.primary}
                            outlineWidth={2}
                            marginV-15
                            borderRadius={9}
                        />
                        <Workouts />
                    </LayoutView>
                </View>

                <View>
                    <LayoutView>
                        <Text h5 marginT-15>
                            Trouve des exercices !
                        </Text>
                        <Button
                            label={"Tous les exercices"}
                            outline
                            outlineColor={Colors.primary}
                            outlineWidth={2}
                            avoidMinWidth
                            marginV-15
                            borderRadius={9}
                        />
                    </LayoutView>
                    <ScrollView
                        style={{ marginLeft: 20 }}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                    >
                        <Muscles muscles={muscles} />
                    </ScrollView>
                </View>
            </ScrollView>
        </BaseLayout>
    );
};

export default HomeScreen;
