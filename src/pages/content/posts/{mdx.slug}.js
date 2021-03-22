import React, { Fragment } from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

import './styles.css';

const MdxPage = ({
  data: {
    mdx: {
      frontmatter: { title, embeddedImagesRemote, embeddedImagesLocal },
      body,
    },
  },
}) => {
  return (
    <Fragment>
      <Link to="/">Back</Link>
      <h1>{title}</h1>
      <MDXProvider>
        <MDXRenderer
          remoteImages={embeddedImagesRemote}
          localImages={embeddedImagesLocal}
        >
          {body}
        </MDXRenderer>
      </MDXProvider>
    </Fragment>
  );
};

export const query = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        embeddedImagesRemote {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        embeddedImagesLocal {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
      body
    }
  }
`;

export default MdxPage;
