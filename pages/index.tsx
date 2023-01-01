import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { Flex, useTheme } from "vcc-ui";
import carsJsonData from "../public/api/cars.json";
import { CarDisplayCard } from "../src/components/CarDisplayCard";
import { type Car } from "../src/types";

export default function HomePage({ cars }: Props) {
  const theme = useTheme();

  return (
    <>
      <Flex extend={{ flexDirection: "row", gap: theme.baselineGrid * 2 }}>
        {cars.map((car) => (
          <CarDisplayCard key={car.id} car={car} />
        ))}
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
