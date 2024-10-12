import { StyleSheet, Text, View, Pressable, Button } from "react-native";
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
          <Text style={{ marginTop: 40 }}>Sprite {sprite.id}</Text>
          <Pressable
            style={styles.removeButton}
            onPress={() => removeSprite(sprite.id)}
          >
            <FontAwesome name="minus-circle" size={30} color="red" />
          </Pressable>
          <Button
            title="Add Action"
            onPress={() => {
              if (sprite.id) {
                navigation.navigate("SpriteAction", {
                  spriteId: sprite.id,
                });
              } else {
                console.warn("Invalid sprite data");
              }
            }}
            color="green"
            style={styles.addActionButton}
          />
        </View>
      ))}

      <Pressable style={styles.addSpriteBox} onPress={addSprite}>
        <FontAwesome name="plus-circle" size={50} color="gray" />
        <Text style={{ textAlign: "center" }}>Add New Sprite</Text>
      </Pressable>
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
    justifyContent: "space-between", // Use space-between to position items
    marginHorizontal: 10,
    position: "relative",
    paddingBottom: 10, // Add some padding to the bottom for the button
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
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});
