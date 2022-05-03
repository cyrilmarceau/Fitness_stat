import API from "@api";
import Muscles from "@components/Muscles";
import Workouts from "@components/Workouts";
import { useAuth } from "@contexts/authContext";
import { BaseLayout, LayoutView } from "@layout/BaseLayout";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Button, Colors, Text, View } from "react-native-ui-lib";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const HomeScreen = ({ navigation }) => {
    const auth = useAuth();
    const [muscles, setMuscles] = useState([]);
    const tabBarHeight = useBottomTabBarHeight() + 15;

    const getMuscles = async () => {
        const datas = await API.getMuscles();
        setMuscles(datas);
    };
    console.log(tabBarHeight);
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
