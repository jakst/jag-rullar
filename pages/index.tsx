import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { useRef } from "react";
import { Block, Flex, IconButton, useTheme } from "vcc-ui";
import carsJsonData from "../public/api/cars.json";
import { CarDisplayCard } from "../src/components/CarDisplayCard";
import { PageIndicator } from "../src/components/PageIndicator";
import { useScrollContainer } from "../src/hooks/useScrollContainer";
import { carSchema } from "../src/schemas";

export default function HomePage({ cars }: Props) {
  const theme = useTheme();

  const listRef = useRef<HTMLUListElement | null>(null);

  const {
    moveLeft,
    moveRight,
    forwardsEnabled,
    backwardsEnabled,
    pages,
    progress,
  } = useScrollContainer(listRef);

  return (
    <>
      <Flex
        ref={listRef}
        as="ul" // Render as "ul" for better a11y
        extend={{
          flexDirection: "row",
          gap: theme.baselineGrid * 2,
          width: "100%",
          overflowX: "scroll",
          boxSizing: "border-box",
          paddingInline: theme.baselineGrid * 2,
          scrollSnapType: "x mandatory",
          scrollPadding: theme.baselineGrid * 2,

          // Reset margin/padding added by browser for "ul"
          margin: 0,
          paddingBlock: 0,
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

      {pages > 1 && (
        <Block
          extend={{
            flexDirection: "row",
            justifyContent: "center",
            gap: theme.baselineGrid,
            marginTop: theme.baselineGrid * 2,

            display: "flex",
            fromM: {
              display: "none",
            },
          }}
        >
          {Array.from(new Array(pages)).map((_, index) => (
            <PageIndicator key={index} active={index + 1 === progress} />
          ))}
        </Block>
      )}

      <Block
        extend={{
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: theme.baselineGrid,
          padding: theme.baselineGrid * 2,

          display: "none",
          fromM: {
            display: "flex",
          },
        }}
      >
        <IconButton
          aria-label="Show previous page with cars"
          iconName="navigation-chevronback"
          variant="outline"
          disabled={!backwardsEnabled}
          onClick={moveLeft}
        />
        <IconButton
          aria-label="Show next page with cars"
          iconName="navigation-chevronforward"
          variant="outline"
          disabled={!forwardsEnabled}
          onClick={moveRight}
        />
      </Block>
    </>
  );
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cars = carSchema.parse(carsJsonData);

  return {
    props: {
      cars,
    },
  };
}
