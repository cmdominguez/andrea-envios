import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import {
  Badge,
  Box,
  Button,
  Center,
  HStack,
  Input,
  Tag,
} from "@chakra-ui/react";

const url = "https://apidestinatarios.andreani.com/api/envios/";

export default function Home() {
  const [trackingNumber, setTrackingNumber] = React.useState("");
  const [trazas, setTrazas] = React.useState([]);
  const getShippingStatusTrace = React.useCallback(async () => {
    const response = await fetch(`${url}${trackingNumber}/trazas`);
    if (response.ok) {
      const data = await response.json();
      setTrazas(data);
    }
  }, [trackingNumber]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <HStack mb={4}>
          <Center w="400px" h="40px">
            <Input
              placeholder="Numero de tracking"
              onChange={(e) => {
                setTrackingNumber(e.target.value);
              }}
            />
          </Center>
          <Center w="100px" h="40px" color="white">
            <Button colorScheme="blue" onClick={getShippingStatusTrace} disabled={!trackingNumber}>
              Buscar
            </Button>
          </Center>
        </HStack>

        {trazas.map((traza, k) => {
          return (
            <Box
              key={k}
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              mb={4}
            >
              <Box p="6">
                <Box display="flex" alignItems="baseline">
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    {traza.fecha.dia} {traza.fecha.hora}
                  </Badge>
                </Box>

                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                  {traza.estado}
                </Box>

                {traza.sucursal && traza.sucursal !== " " ? (
                  <Tag>{traza.sucursal}</Tag>
                ) : null}

                <Box display="flex" mt="2" alignItems="center">
                  <Box as="span" ml="2" color="gray.600" fontSize="sm">
                    Estado interno 🤔: {traza.evento}
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </main>
    </div>
  );
}
