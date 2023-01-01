import Image from "next/image";
import { Flex, Spacer, Text, useTheme, View } from "vcc-ui";
import { DISPLAY_CARD_WIDTH } from "../constants";
import { type Car } from "../schemas";
import { createUrls } from "../utils";
import { A } from "./A";

interface Props {
  car: Car;
  priority?: boolean;
}

export function CarDisplayCard({ car, priority = false }: Props) {
  const theme = useTheme();

  const { imageUrl, learnUrl, shopUrl } = createUrls(car.id);

  return (
    <View as="li" extend={{ width: 300, scrollSnapAlign: "start" }}>
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
          extend={{
            // Same as for the body type above
            color: theme.color.foreground.secondary,
            display: "block",
            fromM: { display: "inline" },
          }}
        >
          {car.modelType}
        </Text>
      </Text>

      <Spacer size={2} />

      {/*
       The image files have the dimensions w800/h600, i.e. 4/3. If these images
       varied in size we would have to rely on the object-fit CSS-property to
       avoid image stretching and layout shift simultaneously. */}
      <Image
        src={imageUrl}
        alt={`${car.modelName} viewed from the side, with the front of the car pointing to the left`}
        width={DISPLAY_CARD_WIDTH}
        height={(DISPLAY_CARD_WIDTH / 4) * 3}
        priority={priority}
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
