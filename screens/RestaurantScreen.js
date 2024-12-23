import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantScreen({ route }) {
  const navigation = useNavigation();
  const { restaurant } = route.params;
  const { cartItems } = useCart();

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItemCard}
      onPress={() => navigation.navigate("DishDetail", { dish: item })}
    >
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
      <View style={styles.menuItemInfo}>
        <View>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={(e) => {
              e.stopPropagation();
              console.log(`Quick add ${item.name} to cart`);
            }}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Restaurant Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <View style={styles.restaurantDetails}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{restaurant.rating}</Text>
              </View>
              <Text style={styles.categoryText}>{restaurant.category}</Text>
              <Text style={styles.deliveryText}>{restaurant.deliveryTime}</Text>
            </View>
          </View>
        </View>

        {/* Cart Button */}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate("Cart")}
        >
          <Ionicons name="cart-outline" size={24} color="white" />
          {cartItemCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <FlatList
        data={restaurant.menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.menuList}
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
    backgroundColor: "#d53f8c",
    padding: 15,
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    flex: 1,
  },
  cartButton: {
    padding: 5,
    marginLeft: 15,
  },
  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "#FFD700",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  badgeText: {
    color: "#d53f8c",
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    paddingHorizontal: 6,
  },
  backButton: {
    marginBottom: 15,
  },
  headerInfo: {
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: "white",
    marginBottom: 8,
  },
  restaurantDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  ratingText: {
    color: "white",
    marginLeft: 4,
    fontFamily: "Poppins_500Medium",
  },
  categoryText: {
    color: "white",
    marginRight: 10,
    fontFamily: "Poppins_400Regular",
  },
  deliveryText: {
    color: "white",
    fontFamily: "Poppins_400Regular",
  },
  menuList: {
    padding: 15,
  },
  menuItemCard: {
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#d53f8c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  menuItemImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  menuItemInfo: {
    padding: 15,
  },
  menuItemName: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#d53f8c",
  },
  addButton: {
    backgroundColor: "#d53f8c",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
