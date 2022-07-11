import React, { useEffect, useState } from "react";
import { View, Text, Pressable, SafeAreaView,ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";
import tw from "twrnc";
import MyButton from "../../components/button";
import { createVote, getCandidates, getProfile } from "../../services/auth";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [authError, setAuthError] = useState("");
  const isFocused = useIsFocused();

  const getUserProfile = async () => {
    const profile = await getProfile();
    if (!profile?.data) return navigation.navigate("Login");
    setUser(profile?.data);

    const res = await getCandidates();
    setCandidates(res?.data?.docs || []);
  };

  useEffect(() => {
    isFocused && getUserProfile()
  },[isFocused]);

  const handleLogout = () => {
    SecureStore.deleteItemAsync("token");
    navigation.navigate("Login");
  };

  const handleVote = async (candidate) => {
    let res = await createVote({ user: user._id, candidate });
    if (!res?.success) {
      setAuthError(res?.message || "Something went wrong");
      setTimeout(() => {
        setAuthError("");
      }, 3000);
      return;
    }
    res = await getCandidates();
    setCandidates(res?.data?.docs || []);
  };

  return (
    <View style={tw`h-full flex pt-20 items-center`}>
      <SafeAreaView>
        <ScrollView>
          <View>
            <Text style={tw`font-bold text-xl text-center`}>
              Welcome in Voting MS
            </Text>
            <Text style={tw`font-bold text-xl text-center mb-10`}>
              {user.names}
            </Text>
            {candidates?.map((el) => (
              <View key={el._id} style={tw` mb-4 w-[80]`}>
                <Card>
                  {el.profilePicture && el.profilePicture !== "" ? <Card.Cover source={{ uri: el.profilePicture }} /> : <View></View>}
                
                  <Card.Title
                    title={el.names}
                    subtitle={
                      authError !== "" ? (
                        <Text style={tw`mt-4 text-red-500 text-center`}>
                          {authError}
                        </Text>
                      ) : (
                        <Text>{el.total_votes || 0} votes</Text>
                      )
                    }
                  />
                  <Card.Content>
                    <Paragraph>{el.missionStatement}</Paragraph>
                  </Card.Content>
                  <Card.Actions>
                    <Button
                      onPress={() => {
                        handleVote(el._id);
                      }}
                    >
                      Vote
                    </Button>
                  </Card.Actions>
                </Card>
              </View>
            ))}

            <View style={tw`mt-8`}>
              <Pressable
                onPress={() => {
                  navigation.navigate("AddCandidate");
                }}
              >
                {user.category === "ADMIN" ? (
                  <MyButton
                    style={tw`bg-black text-white mb-4 w-full rounded-[10px]`}
                  >
                    Create Candidate
                  </MyButton>
                ) : (
                  <View></View>
                )}
              </Pressable>
              <Pressable onPress={handleLogout}>
                <MyButton
                  style={tw`bg-red-500 text-white mb-4 w-full rounded-[10px]`}
                >
                  LOGOUT
                </MyButton>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
