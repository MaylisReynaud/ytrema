import React from 'react';

import { FooterContainer,
         LinksWrapper,
         LinkItem,
         ActiveLinkStyle,
         LinkStyle,
         ParagraphItem
 } from './style';
 import { Link } from 'react-router-dom';


export function Footer(props) {
  return (
    <FooterContainer> 
        <LinksWrapper>
            <ParagraphItem>
            © ÿ tréma 2022
            </ParagraphItem>
            <LinkItem>
                L'équipe
            </LinkItem>
            <LinkItem>
                Nous contacter
            </LinkItem>
            <LinkItem>
                Mentions légles
            </LinkItem>
        </LinksWrapper>
    </FooterContainer>
  )
};

