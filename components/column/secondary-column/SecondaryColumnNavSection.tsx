'use client'

import * as Accordion from '@radix-ui/react-accordion';
import { styled, keyframes } from '@stitches/react';
import { ColumnNavButton } from './SecondaryColumnNavButton';

export const ColumnNavSection = ({
  atBottom,
  spaceTop,
  content,
  fullContent,
}: {
  atBottom?: boolean,
  spaceTop?: boolean,
  content: Array<any>,
  fullContent?: any
}) => {

  const openAnimHelp = keyframes({
    from: { height: 0 },
    to: { height: 'var(--radix-accordion-content-height)' },
  });
  
  const closeAnimHelp = keyframes({
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: 0 },
  });
  
  const AccordionContent = styled(Accordion.Content, {
    overflow: 'hidden',
    '&[data-state="open"]': { animation: `${openAnimHelp} 300ms ease-out` },
    '&[data-state="closed"]': { animation: `${closeAnimHelp} 300ms ease-out` },
  });

  let openAccordionSaved = JSON.parse((typeof window !== 'undefined') && sessionStorage.getItem(`accordion-${fullContent?.href}`) || "[]");

  const toggleAccordionOpen = ({key}:{key: string}) => {
    openAccordionSaved = JSON.parse((typeof window !== 'undefined') && sessionStorage.getItem(`accordion-${fullContent?.href}`) || "[]");
    const keyIndex = openAccordionSaved.findIndex((x: string) => x === key)
    let newOpenAccordion = []
    if (keyIndex >= 0) {
      newOpenAccordion = [...openAccordionSaved]
      newOpenAccordion.splice(keyIndex, 1)
    } else {
      newOpenAccordion = [...openAccordionSaved, key]
    }

    if(fullContent) {
      sessionStorage.setItem(`accordion-${fullContent?.href}`, JSON.stringify(newOpenAccordion))
    }
    return
  }

  return (
    <nav 
      className={
        `${atBottom
        ? 'mt-auto'
        : spaceTop 
        ? 'mt-5'
        : 'mt-0'} 
        'space-y-1 px-2'`
      }
      aria-label="Column"
    >
    {content.map((item) => (
      <Accordion.Root type="multiple" key={item.href} defaultValue={openAccordionSaved}>
        <Accordion.Item value={item.href} >
          <ColumnNavButton item={item} content={fullContent} onClickFunction={toggleAccordionOpen}/>

          {item.children?.length > 0 &&
          <AccordionContent> 
            <ColumnNavSection content={item.children} fullContent={item}/>
          </AccordionContent>}

        </Accordion.Item>
      </Accordion.Root>
    ))}
    </nav>
  )
}
