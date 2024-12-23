import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import Category from "../components/Category";
import Restaurants from "../components/Restaurants";
import Logout from "../components/Logout";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { cartItems } = useCart();

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Food Categories</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate("Cart")}
          >
            <Ionicons name="cart-outline" size={24} color="#d53f8c" />
            {cartItemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <Logout />
        </View>
      </View>
      <Category
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <Restaurants
        selectedCategory={selectedCategory}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#d53f8c",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartButton: {
    marginRight: 15,
    padding: 5,
  },
  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "#d53f8c",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    paddingHorizontal: 6,
  },
});
