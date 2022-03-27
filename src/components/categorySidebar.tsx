import React from "react";
import { graphql, StaticQuery } from "gatsby";
import styled from "styled-components";

interface Categories {
  allWcProductsCategories: {
    edges: [
      {
        node: {
          name: string;
          id: string;
        };
      }
    ];
  };
}

const CategoryItem = styled.li`
  list-style-type: none;
  font-size: 0.7rem;
`

const CategoryList = styled.ul`
  margin: 0;
  padding: 0;
  text-align: right;
  border-left: 2px solid orange;
`

const Title = styled.h2`
  text-align: right;
`

const SidebarContainer = styled.div`
  /* max-width: 150px; */
  max-height: 100vh;
  overflow-y: scroll;
  width: 200px;
  ::-webkit-scrollbar {
    display: none;
  }
`

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
              }
            }
          }
        }
      `}
      render={(data: Categories) => (
        <SidebarContainer>
          <Title>Categories</Title>
          <CategoryList>
            {data.allWcProductsCategories.edges.map((category) => {
              return <CategoryItem key={category.node.id}>{category.node.name}</CategoryItem>;
            })}
          </CategoryList>
        </SidebarContainer>
      )}
    />
  );
}
