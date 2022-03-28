import React from "react";
import { graphql, StaticQuery, navigate } from "gatsby";
import styled from "styled-components";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Typography } from "@mui/material";

interface Categories {
  allWcProductsCategories: {
    edges: [
      {
        node: {
          name: string;
          id: string;
          slug: string;
        };
      }
    ];
  };
}

const CategoryItem = styled.li`
  list-style-type: none;
  font-size: 0.7rem;
`;

const CategoryList = styled.ul`
  margin: 0;
  padding: 0;
  text-align: right;
  border-left: 2px solid orange;
`;

const Title = styled.h2`
  text-align: right;
`;

const SidebarContainer = styled.div`
  /* max-width: 150px; */
  max-height: 100vh;
  overflow-y: scroll;
  width: 200px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default function CategorySidebar() {
  return (
    <StaticQuery
      query={graphql`
        query {
          allWcProductsCategories {
            edges {
              node {
                name
                id
                slug
              }
            }
          }
        }
      `}
      render={(data: Categories) => (
        <Box sx={{ width: "300px", bgcolor: "background.paper" }}>
          <Typography variant="h6" component="div">Categories</Typography>
          <Divider />
          <nav aria-label="categories">
            <List dense>
              {data.allWcProductsCategories.edges.map((category) => {
                return (
                  <ListItemButton
                    component="a"
                    key={category.node.id}
                    onClick={() => {
                      navigate(`/wcProductsCategories/${category.node.slug}`);
                    }}
                  >
                    <ListItemText primary={category.node.name} />
                  </ListItemButton>
                );
              })}
            </List>
          </nav>
        </Box>
      )}
    />
  );
}
