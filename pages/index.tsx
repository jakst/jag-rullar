import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { Flex, IconButton, useTheme } from "vcc-ui";
import carsJsonData from "../public/api/cars.json";
import { CarDisplayCard } from "../src/components/CarDisplayCard";
import { type Car } from "../src/types";

export default function HomePage({ cars }: Props) {
  const theme = useTheme();

  return (
    <>
      <Flex
        as="ul" // Render as "ul" for better a11y
        extend={{
          flexDirection: "row",
          gap: theme.baselineGrid * 2,
          width: "100%",
          overflowX: "scroll",

          // Reset margin/padding added by browser for "ul"
          margin: 0,
          padding: 0,
        }}
      >
        {cars.map((car, index) => (
          <CarDisplayCard
            key={car.id}
            car={car}
            priority={index <= 3} // Preload the first 4 images
          />
        ))}
      </Flex>

      <Flex
        extend={{
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: theme.baselineGrid,
          padding: theme.baselineGrid * 2,
        }}
      >
        <IconButton
          aria-label="Show previous page with cars"
          iconName="navigation-chevronback"
          variant="outline"
          onClick={() => {}}
        />
        <IconButton
          aria-label="Show next page with cars"
          iconName="navigation-chevronforward"
          variant="outline"
          onClick={() => {}}
        />
      </Flex>
    </>
  );
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      cars: carsJsonData as Car[],
    },
  };
}
