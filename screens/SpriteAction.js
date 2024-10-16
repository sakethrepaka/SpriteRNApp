import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import MaterialIcons for delete icon
import { addAction, deleteAction } from "../slices/spriteSlice";
import { useDispatch, useSelector } from "react-redux";
import { SvgXml } from "react-native-svg";
import RNPickerSelect from "react-native-picker-select";

const actions = [
  "Move X by 30",
  "Move Y by 30",
  "Rotate 360",
  "Go to 0",
  "Random Position",
  "Say Hello for 5 sec",
  "Increase Size",
  "Decrease Size",
  "Repeat",
  "Hide for 3s",
  "Shake",
  "Pulse",
];

const SpriteActionScreen = ({ route, navigation }) => {
  const { spriteId } = route.params;
  const [selectedSpriteId, setSelectedSpriteId] = useState(spriteId);

  const [actionItems, setActionItems] = useState([]);
  const [codeItems, setCodeItems] = useState(actions);
  const storedActions = useSelector(
    (state) => state.actions[selectedSpriteId] || []
  );
  const store = useSelector((state) => state.actions || []);
  console.log(store, "store");
  const dispatch = useDispatch();

  const handleBoxMove = (item) => {
    const uniqueId = `${item}-${Date.now()};`;
    setActionItems((prev) => [...prev, { id: uniqueId, text: item }]);
    console.log(selectedSpriteId, "selected");
    dispatch(
      addAction({
        spriteId: selectedSpriteId,
        actionText: { id: uniqueId, text: item },
      })
    );
  };

  const handleDeleteAction = (itemToDelete) => {
    setActionItems((prev) =>
      prev.filter((item) => item.id !== itemToDelete.id)
    );
    dispatch(
      deleteAction({ spriteId: selectedSpriteId, actionText: itemToDelete })
    );
  };

  useEffect(() => {
    if (actionItems.length == 0) {
      setActionItems(storedActions);
    }
  }, []);

  useEffect(() => {
    setActionItems(storedActions);
  }, [selectedSpriteId]);

  const handleSpriteIdChange = (value) => {
    setSelectedSpriteId(value);
  };

  return (
    <>
      <View style={styles.textbox}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.header}>Sprite ID: {selectedSpriteId}</Text>
        </View>
        <RNPickerSelect
          onValueChange={handleSpriteIdChange}
          items={Object.keys(store).map((id) => ({
            label: `Sprite ${id}`,
            value: id,
          }))}
          value={selectedSpriteId}
          style={{ inputIOS: styles.dropdown, inputAndroid: styles.dropdown }}
          placeholder={{ label: "Select Sprite ID...", value: null }}
        />
      </View>

      <View style={styles.container}>
        <View
          style={styles.codeBox}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <Text style={styles.title}>Code</Text>
          {codeItems.map((action) => (
            <DraggableBox key={action} text={action} onMove={handleBoxMove} />
          ))}
        </View>
        <ScrollView
          style={styles.actionBox}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.actiontitle}>Action</Text>
            {/* <SvgXml
              style={{ marginLeft: 10 }}
              xml={selectedSvg}
              height="40"
              width="40"
            ></SvgXml> */}
          </View>
          {actionItems.map((item) => (
            <View key={item.id} style={styles.actionItem}>
              <Text style={styles.actionText}>{item.text}</Text>
              <TouchableOpacity onPress={() => handleDeleteAction(item)}>
                <Icon name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const DraggableBox = ({ text, onMove }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [isDragging, setIsDragging] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isDragging,
      onPanResponderGrant: () => {
        setIsDragging(true);
      },
      onPanResponderMove: (e, gestureState) => {
        pan.setValue({ x: gestureState.dx, y: 0 });
      },
      onPanResponderRelease: (e, gestureState) => {
        const { dx } = gestureState;
        if (dx >= 50) {
          onMove(text);
        }
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
        setIsDragging(false);
      },
      onPanResponderTerminate: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
        setIsDragging(false);
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.draggableBox,
        pan.getLayout(),
        { zIndex: isDragging ? 1 : 0 },
      ]}
    >
      <Text>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#f5f5f5", // Light background color for the whole screen
  },
  header: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  textbox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  codeBox: {
    flex: 1,
    backgroundColor: "#4A90E2", // Blue background for Code box
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  actionBox: {
    flex: 1,
    backgroundColor: "#50C878", // Green background for Action box
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff", // White text for titles
  },
  actiontitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff", // White text for titles
    marginTop: 10,
  },
  draggableBox: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  actionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#FF5733", // Red background for action items
    marginBottom: 10,
    borderRadius: 5,
  },
  actionText: {
    fontSize: 16,
    color: "#fff", // White text for action items
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default SpriteActionScreen;
