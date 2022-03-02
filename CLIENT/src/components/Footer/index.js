import React from 'react';

import { FooterContainer,
         LinksWrapper,
         LinkItem,
         SpanItem,
         StyledLink,
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
                <StyledLink 
                to="/equipe"
                >
                    <SpanItem>L'</SpanItem><SpanItem>é</SpanItem><SpanItem>q</SpanItem><SpanItem>u</SpanItem><SpanItem>i</SpanItem><SpanItem>p</SpanItem><SpanItem>e</SpanItem>
                    
                </StyledLink>
            </LinkItem>
            <LinkItem>
                <StyledLink 
                    to="/contact"
                    >
                    <SpanItem>N</SpanItem><SpanItem>o</SpanItem><SpanItem>u</SpanItem><SpanItem>s</SpanItem><SpanItem> </SpanItem><SpanItem>c</SpanItem><SpanItem>o</SpanItem><SpanItem>n</SpanItem><SpanItem>t</SpanItem><SpanItem>a</SpanItem><SpanItem>c</SpanItem><SpanItem>t</SpanItem><SpanItem>e</SpanItem><SpanItem>r</SpanItem>
                    
                </StyledLink>
            </LinkItem>
            <LinkItem>
            <StyledLink 
                    to="/mentionslegales"
                    >
                    <SpanItem>M</SpanItem><SpanItem>e</SpanItem><SpanItem>n</SpanItem><SpanItem>t</SpanItem><SpanItem>i</SpanItem><SpanItem>o</SpanItem><SpanItem>n</SpanItem><SpanItem>s</SpanItem><SpanItem> </SpanItem><SpanItem>l</SpanItem><SpanItem>é</SpanItem><SpanItem>g</SpanItem><SpanItem>a</SpanItem><SpanItem>l</SpanItem><SpanItem>e</SpanItem><SpanItem>s</SpanItem>
                    
                </StyledLink>
            </LinkItem>
        </LinksWrapper>
    </FooterContainer>
  )
};

