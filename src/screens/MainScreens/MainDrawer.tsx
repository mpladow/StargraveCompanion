import { createDrawerNavigator } from '@react-navigation/drawer';
import CrewHome from './Crew/CrewHome';
import ReferenceHome from './Reference/ReferenceHome';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Crew" component={CrewHome}/>
            {/* <Drawer.Screen name="Reference" component={ReferenceHome}/> */}
        </Drawer.Navigator>
        // <CrewHome/>
    )
}

export default MainDrawer