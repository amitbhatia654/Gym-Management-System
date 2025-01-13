import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { add } from "../reduxStore/UserSlice";

import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);

const LoginSignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      {
        email,
        password,
      }
    );

    if (res.status == 200) {
      const user = {
        id: res.data.user._id,
        name: res.data.user.name,
        isAdmin: res.data.user.isAdmin,
      };
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(add(user));
    }

    setLoading(false);
    if (res.status == 203) setError(true);
    else {
      setError(false);
      toast.success(res.data.message);
      navigate("/");
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="">Login To Dashboard</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="email address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(false);
                    }}
                    name="email"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right" color={"red"}>
                  {error && "Email Or Password Not Match !"}
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                {loading ? "please Wait..." : "Sign In"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Button color="teal.500" onClick={() => navigate("/register")}>
          Sign Up
        </Button>
      </Box>
    </Flex>
  );
};

export default LoginSignupPage;
