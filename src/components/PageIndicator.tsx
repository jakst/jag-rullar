import { Block, useTheme } from "vcc-ui";

export function PageIndicator({ active = false }: { active?: boolean }) {
  const theme = useTheme();

  return (
    <Block
      extend={{
        width: theme.baselineGrid,
        height: theme.baselineGrid,
        backgroundColor: active
          ? theme.color.foreground.primary
          : theme.color.ornament.divider,
        borderRadius: 999,
      }}
    />
  );
}
