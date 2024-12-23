import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import restaurants from "../data/restaurants";
import { useNavigation } from "@react-navigation/native";

export default function Restaurants({ selectedCategory }) {
  const navigation = useNavigation();

  const filteredRestaurants = selectedCategory
    ? restaurants.filter(
        (restaurant) => restaurant.category === selectedCategory
      )
    : restaurants;

  const renderRestaurant = ({ item }) => (
    <View style={styles.restaurantContainer}>
      <TouchableOpacity
        style={styles.restaurantCard}
        onPress={() => navigation.navigate("Restaurant", { restaurant: item })}
      >
        <Image source={{ uri: item.image }} style={styles.restaurantImage} />
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>

            <View style={styles.deliveryContainer}>
              <Ionicons name="time-outline" size={16} color="#d53f8c" />
              <Text style={styles.deliveryText}>{item.deliveryTime}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {selectedCategory ? selectedCategory : "Popular"} Restaurants
      </Text>
      <FlatList
        data={filteredRestaurants}
        renderItem={renderRestaurant}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: "#d53f8c",
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
  restaurantContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  restaurantCard: {
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#d53f8c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
  },
  restaurantImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 15,
  },
  restaurantName: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9E6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#FFB800",
  },
  deliveryContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff5f7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deliveryText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#d53f8c",
  },
});
