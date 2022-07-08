import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Pressable,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import * as Yup from "yup";
import { useFormik } from "formik";
import tw from "twrnc";

import Button from "../../../components/button";
import { register } from "../../../services/auth";
import Input from "../../../components/input";

const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const initialValues = {
    names: "",
    address: "",
    phone: "",
    nationalId: "",
    email: "",
    password: "",
    type: "VOTER",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string().required("Phone is required"),
    nationalId: Yup.string().required("NationalId is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
  });

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    getFieldProps,
  } = formik;

  const handleSubmit = async () => {
    setLoading(true);
    setAuthError("");
    const res = await register(values);
    console.log(res)
    setLoading(false);
    if (!res?.success)
      return setAuthError(res?.message || "Something went wrong");
    navigation.navigate("Login");
  };

  return (
    <View style={tw`h-[100%] bg-white  justify-end items-center`}>
      <SafeAreaView style={tw`h-[85%] w-full bg-white `}>
        <ScrollView>
          <View>
            <View style={tw`w-full`}>
              <Text style={tw`text-center font-extrabold text-xl`}>
                NEC Voting System
              </Text>
              <Text style={tw`text-center font-extrabold text-xl`}>
                Register
              </Text>
            </View>

            {authError.length > 0 && (
              <Text style={tw`mt-4 text-red-500 text-center`}>{authError}</Text>
            )}
            <View style={tw`mt-8`}>
              <View style={tw`px-6 py-2`}>
                <Input
                  Icon={
                    <MaterialIcons
                      name="person-outline"
                      size={24}
                      color="silver"
                    />
                  }
                  placeholder="Full Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  borderColor={touched.name && errors.name ? "red" : "gray"}
                />
                {touched.name && errors.name && (
                  <Text style={tw`text-red-500`}>{errors.name}</Text>
                )}

                <Input
                  Icon={
                    <MaterialIcons
                      name="person-outline"
                      size={24}
                      color="silver"
                    />
                  }
                  placeholder="Address"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.address}
                  borderColor={
                    touched.address && errors.address ? "red" : "gray"
                  }
                />
                {touched.address && errors.address && (
                  <Text style={tw`text-red-500`}>{errors.address}</Text>
                )}

                <Input
                  Icon={
                    <MaterialIcons
                      name="person-outline"
                      size={24}
                      color="silver"
                    />
                  }
                  placeholder="Phone"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.phone}
                  borderColor={touched.phone && errors.phone ? "red" : "gray"}
                />
                {touched.phone && errors.phone && (
                  <Text style={tw`text-red-500`}>{errors.phone}</Text>
                )}

                <Input
                  Icon={
                    <MaterialIcons
                      name="person-outline"
                      size={24}
                      color="silver"
                    />
                  }
                  placeholder="NationalId"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.address}
                  borderColor={
                    touched.nationalId && errors.nationalId ? "red" : "gray"
                  }
                />
                {touched.nationalId && errors.nationalId && (
                  <Text style={tw`text-red-500`}>{errors.nationalId}</Text>
                )}

                <View style={tw`mt-4`}></View>
                <Input
                  Icon={<Feather name="mail" size={24} color="silver" />}
                  placeholder="Your Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  borderColor={touched.email && errors.email ? "red" : "gray"}
                />
                {touched.email && errors.email && (
                  <Text style={tw`text-red-500`}>{errors.email}</Text>
                )}

                <View style={tw`mt-4`}>
                  <Input
                    Icon={<Feather name="lock" size={24} color="silver" />}
                    placeholder="Password"
                    security={true}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    borderColor={
                      touched.password && errors.password ? "red" : "gray"
                    }
                  />
                  {touched.password && errors.password && (
                    <Text style={tw`text-red-500`}>{errors.password}</Text>
                  )}
                </View>

                <View style={tw`mt-8`}>
                  <Button
                    mode={"contained"}
                    style={tw`bg-[#193074] w-full p-[10] mt-4`}
                    onPress={handleSubmit}
                  >
                    {loading ? "Registering..." : "Register"}
                  </Button>

                  <Pressable onPress={() => navigation.navigate("Login")}>
                    <View style={tw`mt-4`}>
                      <Text style={tw`text-xl underline text-gray-500`}>
                        Have account? Login
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SignUp;
