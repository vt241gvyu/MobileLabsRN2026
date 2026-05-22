import { TopTabButtonBar } from "@/components/top-tab-button-bar";
import { Ionicons } from "@expo/vector-icons";
import type { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import React from "react";

const { Navigator } = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Navigator);
type TabBarIconProps = Parameters<
  NonNullable<MaterialTopTabNavigationOptions["tabBarIcon"]>
>[0];

export default function TabLayout() {
  return (
    <TopTabs
      screenOptions={{
        swipeEnabled: false,
      }}
      tabBar={(props) => <TopTabButtonBar {...props} />}
    >
      <TopTabs.Screen
        name="home"
        options={{
          title: "Головна",
          tabBarIcon: ({ color }: TabBarIconProps) => (
            <Ionicons name="home" size={20} color={color} />
          ),
        }}
      />
      <TopTabs.Screen
        name="gallery"
        options={{
          title: "Фотогалерея",
          tabBarIcon: ({ color }: TabBarIconProps) => (
            <Ionicons name="images" size={20} color={color} />
          ),
        }}
      />
      <TopTabs.Screen
        name="profile"
        options={{
          title: "Профіль",
          tabBarIcon: ({ color }: TabBarIconProps) => (
            <Ionicons name="person" size={20} color={color} />
          ),
        }}
      />
    </TopTabs>
  );
}
