import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

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

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleShowClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      {
        email,
        password,
        name,
        phone,
      }
    );

    setLoading(false);
    if (res.status == 203) setError(true);
    else {
      setError(false);
      setEmail("");
      setName("");
      setPhone("");
      setPassword("");
      toast.success(res.data);
      // navigate("/login");
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
        <Heading color=""> User Registration </Heading>
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
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="full_name"
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    value={email}
                    placeholder="Email "
                    onChange={(e) => {
                      setError(false);
                      setEmail(e.target.value);
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
                    type="text"
                    value={phone}
                    placeholder="Phone Number"
                    // onChange={(e) => setPhone(e.target.value)}
                    onChange={(e) => {
                      if (e.target.value.length <= 10) {
                        setPhone(e.target.value);
                      }
                    }}
                    name="phn_number"
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
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="" color={"red"}>
                  {error && "Email Already Exist !"}
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
                {loading ? "please Wait..." : "Sign Up"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already Register With Us?{" "}
        <Button color="teal.500" onClick={() => navigate("/login")}>
          Sign In
        </Button>
      </Box>
    </Flex>
  );
};

export default SignUp;
