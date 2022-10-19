import React from "react";
import { graphql, useStaticQuery, navigate } from "gatsby";
import styled from "styled-components";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Card } from '@nextui-org/react'

import { Typography } from "@mui/material";
import CategoryDropdown from './CategoryDropdown'

interface Categories {
  allWcProductsCategories: {
    edges: [
      {
        node: {
          name: string;
          id: string;
          slug: string;
          wordpress_parent_id: number;
          wordpress_children: [
            {
              name: string;
              slug: string;
            }
          ];
          wordpress_parent: {
            name: string;
            slug: string;
          };
        };
      }
    ];
  };
}

const Nav = styled.nav`
  margin: 1rem;
`;

export default function CategorySidebar() {
  const data: Categories = useStaticQuery(graphql`
    query {
      allWcProductsCategories {
        edges {
          node {
            name
            id
            slug
            wordpress_parent_id
            wordpress_children {
              name
              slug
            }
            wordpress_parent {
              name
              slug
            }
          }
        }
      }
    }
  `);

  return (
    <Card css={{ maxWidth: '10%', minWidth: '190px'}}>
      <Card.Header>
        <Typography variant="h6" component="div">
          Categories
        </Typography>
      </Card.Header>

      <Divider />

      <Nav aria-label="categories">
        <List dense>
          {data.allWcProductsCategories.edges.map((category) => {
            {
              return category.node.wordpress_children.length! > 0 ? (
                <CategoryDropdown key={category.node.id + category.node.slug} category={category} />
              ) : (
                <ListItemButton
                  key={category.node.id}
                  onClick={() => {
                    navigate(`/wcProductsCategories/${category.node.slug}`);
                  }}
                >
                  <ListItemText primary={category.node.name} />
                </ListItemButton>
              );
            }
          })}
        </List>
      </Nav>
    </Card>
  );
}
