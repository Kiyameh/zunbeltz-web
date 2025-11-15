import { Tabs } from "radix-ui";
import ShowcaseGrid from "./ShowcaseGrid";
import ShowcaseGridItem from "./ShowcaseGridItem";
import s from "./ComponentTabs.module.css";

interface ButtonVariant {
  classes: string;
  label: string;
}

interface IconButtonVariant {
  classes: string;
}

interface AnchorVariant {
  classes: string;
  label: string;
  href: string;
}

interface ComponentTabsProps {
  buttonVariants: ButtonVariant[];
  iconButtonVariants: IconButtonVariant[];
  anchorVariants: AnchorVariant[];
  defaultValue?: string;
}

export default function ComponentTabs({
  buttonVariants,
  iconButtonVariants,
  anchorVariants,
  defaultValue = "buttons",
}: ComponentTabsProps) {
  return (
    <Tabs.Root defaultValue={defaultValue} className={s.root}>
      <Tabs.List className={s.list} aria-label="Component categories">
        <Tabs.Trigger value="buttons" className={s.trigger}>
          Buttons
        </Tabs.Trigger>
        <Tabs.Trigger value="icon-buttons" className={s.trigger}>
          Icon Buttons
        </Tabs.Trigger>
        <Tabs.Trigger value="anchors" className={s.trigger}>
          Anchors
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="buttons" className={s.content}>
        <ShowcaseGrid title="Button Variants">
          {buttonVariants.map((variant, index) => (
            <ShowcaseGridItem key={index} classes={variant.classes}>
              <button className={variant.classes}>
                {variant.label}

                <svg
                  className="icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </ShowcaseGridItem>
          ))}
        </ShowcaseGrid>
      </Tabs.Content>

      <Tabs.Content value="icon-buttons" className={s.content}>
        <ShowcaseGrid title="Icon Button Variants">
          {iconButtonVariants.map((variant, index) => (
            <ShowcaseGridItem key={index} classes={variant.classes}>
              <button className={variant.classes}>
                <svg
                  className="icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </ShowcaseGridItem>
          ))}
        </ShowcaseGrid>
      </Tabs.Content>

      <Tabs.Content value="anchors" className={s.content}>
        <ShowcaseGrid title="Anchor Variants">
          {anchorVariants.map((variant, index) => (
            <ShowcaseGridItem key={index} classes={variant.classes}>
              <a href={variant.href} className={variant.classes}>
                {variant.label}
              </a>
            </ShowcaseGridItem>
          ))}
        </ShowcaseGrid>
      </Tabs.Content>
    </Tabs.Root>
  );
}
