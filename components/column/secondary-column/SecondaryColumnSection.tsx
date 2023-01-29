"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { styled, keyframes } from "@stitches/react";
import { SecondaryItem } from "./SecondaryColumn";
import { SecondaryColumnNavButton } from "./SecondaryColumnNavButton";

export const SecondaryColumnSection = ({
  atBottom,
  spaceTop,
  itemList,
  parentItem,
}: {
  atBottom?: boolean;
  spaceTop?: boolean;
  itemList: SecondaryItem[];
  parentItem?: any;
}) => {
  const openAnimHelp = keyframes({
    from: { height: 0 },
    to: { height: "var(--radix-accordion-content-height)" },
  });

  const closeAnimHelp = keyframes({
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: 0 },
  });

  const AccordionContent = styled(Accordion.Content, {
    overflow: "hidden",
    '&[data-state="open"]': { animation: `${openAnimHelp} 300ms ease-out` },
    '&[data-state="closed"]': { animation: `${closeAnimHelp} 300ms ease-out` },
  });

  let openAccordionSaved = JSON.parse(
    (typeof window !== "undefined" &&
      sessionStorage.getItem(`accordion-${parentItem?.href}`)) ||
      "[]"
  );

  const toggleAccordionOpen = ({ key }: { key: string }) => {
    openAccordionSaved = JSON.parse(
      (typeof window !== "undefined" &&
        sessionStorage.getItem(`accordion-${parentItem?.href}`)) ||
        "[]"
    );
    const keyIndex = openAccordionSaved.findIndex((x: string) => x === key);
    let newOpenAccordion = [];
    if (keyIndex >= 0) {
      newOpenAccordion = [...openAccordionSaved];
      newOpenAccordion.splice(keyIndex, 1);
    } else {
      newOpenAccordion = [...openAccordionSaved, key];
    }

    if (parentItem) {
      sessionStorage.setItem(
        `accordion-${parentItem?.href}`,
        JSON.stringify(newOpenAccordion)
      );
    }
    return;
  };

  return (
    <nav
      className={`${atBottom ? "mt-auto" : spaceTop ? "mt-5" : "mt-0"} 
        'space-y-1 px-2'`}
      aria-label="Column"
    >
      {itemList.map((item) => (
        <Accordion.Root
          type="multiple"
          key={item.name}
          defaultValue={openAccordionSaved}
        >
          <Accordion.Item value={item.href}>
            <SecondaryColumnNavButton
              item={item}
              content={parentItem}
              onClickFunction={toggleAccordionOpen}
            />

            {item.children && item.children?.length > 0 && (
              <AccordionContent>
                <SecondaryColumnSection
                  itemList={item.children}
                  parentItem={item}
                />
              </AccordionContent>
            )}
          </Accordion.Item>
        </Accordion.Root>
      ))}
    </nav>
  );
};
