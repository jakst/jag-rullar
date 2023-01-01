import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { Flex, useTheme } from "vcc-ui";
import carsJsonData from "../public/api/cars.json";
import { CarDisplayCard } from "../src/components/CarDisplayCard";
import { HelloWorld } from "../src/components/HelloWorld";
import { type Car } from "../src/types";

export default function HomePage({ cars }: Props) {
  const theme = useTheme();

  return (
    <>
      <HelloWorld />

      <Flex extend={{ flexDirection: "row", gap: theme.baselineGrid * 2 }}>
        {cars.map((car) => (
          <CarDisplayCard key={car.id} car={car} />
        ))}
      </Flex>

      <pre>{JSON.stringify(cars, null, 2)}</pre>
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
