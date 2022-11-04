
import { ListItem, OrderedList, Box, Divider } from "@chakra-ui/react";
import Link from "next/link";
export default function Home({ data }: any) {
console.log(data)
  return (
    <Box
      w="70%"
      m="auto"
      mt="10%"
      display="flex"
      alignItems={"center"}
      justifyContent="center"
    >
      <OrderedList>
        { data && data.map((elem: any) => (
          <Link href={`users/${elem.id}`}>
            <ListItem
              key={elem.id}
              _hover={{ background: "gray.100", transition: "1s" }}
              p="10px"
              borderRadius={"15px"}
              cursor="pointer"
              fontSize={"32px"}
            >
              {elem.login}
            </ListItem>
            <Divider />
          </Link>
        ))}
       
      </OrderedList>
    </Box>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.github.com/users`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
