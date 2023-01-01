import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import carsJsonData from "../public/api/cars.json";
import { HelloWorld } from "../src/components/HelloWorld";
import { type Car } from "../src/types";

export default function HomePage(props: Props) {
  return (
    <>
      <HelloWorld />
      <pre>{JSON.stringify(props.cars, null, 2)}</pre>
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
