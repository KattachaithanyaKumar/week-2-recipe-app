import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import AnimatedLoader from "react-native-animated-loader";

const Home = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      console.clear();
      // console.log(
      //   "============================Fetching categories============================"
      // );
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await res.json();
      setCategoriesData(data.categories);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handlePressEnter = () => {
    console.log("Press Enter");
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.screen}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>
            Find <Text style={styles.titleYellow}>best recipes </Text>
          </Text>
          <Text style={styles.title}>for cooking </Text>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={24} color={"#EEAF0E"} />
            <TextInput
              placeholder="Search"
              style={styles.input}
              onSubmitEditing={handlePressEnter}
            />
          </View>
        </View>

        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            {categoriesData?.map((category, index) => (
              <Text key={index}>{category.strCategory}</Text>
            ))}
          </View>
        )}
      </ScrollView>
      {/* <AnimatedLoader
        visible={loading}
        overlayColor="rgba(0,0,0,0.75)"
        animationStyle={styles.lottie}
        source={require("../assets/loader.json")}
        speed={1}
      /> */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
  titleBox: {
    // backgroundColor: "red",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  titleYellow: {
    color: "#EEAF0E",
  },
  searchBox: {
    flexDirection: "row",
    borderColor: "#EEAF0E",
    borderWidth: 1,
    padding: 12,
    marginTop: 24,
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 2,
    marginLeft: 8,
  },
});
