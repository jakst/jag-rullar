import Image from "next/image";
import { Flex, Spacer, Text, useTheme, View } from "vcc-ui";
import { type Car } from "../types";
import { createUrls } from "../utils";
import { A } from "./A";

interface Props {
  car: Car;
}

export function CarDisplayCard({ car }: Props) {
  const theme = useTheme();

  const { imageUrl, learnUrl, shopUrl } = createUrls(car.id);

  return (
    <View extend={{ width: 300 }}>
      <Text
        variant="columbus"
        subStyle="emphasis"
        extend={{
          textTransform: "uppercase",
          // The specific style shown in the design draft is not available as a pre-configured
          // variat/sub-style. Overriding the color seems to be the only option.
          color: theme.color.foreground.secondary,
        }}
      >
        {car.bodyType}
      </Text>

      <Text variant="amundsen">
        {car.modelName}{" "}
        <Text
          variant="columbus"
          // Same as for the body type above
          extend={{ color: theme.color.foreground.secondary }}
        >
          {car.modelType}
        </Text>
      </Text>

      <Spacer size={2} />

      {/*
       w300/h225 matches the w800/h600 dimensions of the image files used here.
       If these images varied in size we would have to rely on the object-fit CSS-
       property to avoid image stretching and layout shift simultaneously. */}
      <Image
        src={imageUrl}
        alt={`${car.modelName} viewed from the side, with the front of the car pointing to the left`}
        width={300}
        height={225}
      />

      <Flex
        extend={{
          flexDirection: "row",
          justifyContent: "center",
          gap: theme.baselineGrid * 3,
          textTransform: "uppercase",
        }}
      >
        <A href={learnUrl}>Learn</A>
        <A href={shopUrl}>Shop</A>
      </Flex>
    </View>
  );
}
