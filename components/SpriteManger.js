import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const SpriteManager = ({
  sprites,
  addSprite,
  removeSprite,
  navigation,
}) => {
  return (
    <View style={styles.spriteManagerContainer}>
      {sprites.map((sprite) => (
        <View key={sprite.id} style={styles.spriteBox}>
          <Text>Sprite {sprite.id}</Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeSprite(sprite.id)}
          >
            <FontAwesome name="minus-circle" size={30} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (sprite.id) {
                navigation.navigate("SpriteAction", {
                  spriteId: sprite.id,
                });
              } else {
                console.warn("Invalid sprite data");
              }
            }}
          >
            <Text style={styles.addActionButton}>Add Action</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addSpriteBox} onPress={addSprite}>
        <FontAwesome name="plus-circle" size={50} color="gray" />
        <Text style={{ textAlign: "center" }}>Add New Sprite</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  spriteManagerContainer: {
    flexDirection: "row",
    marginTop: 20,
    flexWrap: "wrap",
    rowGap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  spriteBox: {
    width: "28%",
    height: 120,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    position: "relative",
  },
  addSpriteBox: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addActionButton: {
    textAlign: "center",
    backgroundColor: "green",
    color: "white",
    padding: 15,
    width: "100%",
    position: "absolute",
    right: -52,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    top: 2.5,
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});
