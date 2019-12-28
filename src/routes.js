//toda navegação da app
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'; 

import Main from "./pages/main";
import User from "./pages/user";

const Routes = createAppContainer(
    createStackNavigator({
        Main,
        User
    }, {
        headerLayoutPreset: "center",
        headerBackTitleVisible: false,
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#E71D36'
            },
            headerTintColor: '#fff',
        },
    })
);

export default Routes