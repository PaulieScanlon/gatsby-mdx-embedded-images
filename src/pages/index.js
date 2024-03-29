import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

const IndexPage = () => {
  const {
    allSitePage: { edges }
  } = useStaticQuery(graphql`
    query {
      allSitePage(filter: { path: { regex: "//content//" } }) {
        edges {
          node {
            pageContext
            path
          }
        }
      }
    }
  `);

  return (
    <main>
      <h1>Index Page</h1>
      <ul>
        <h2>Content links</h2>
        {edges.map((item, index) => {
          const {
            pageContext: { slug },
            path
          } = item.node;

          return (
            <li key={index}>
              <Link to={path}>{slug}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default IndexPage;
