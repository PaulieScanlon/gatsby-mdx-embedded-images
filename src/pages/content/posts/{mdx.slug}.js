import React, { Fragment } from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

import './styles.css';

import { transformImages } from '../../../utils/';

const components = {
  GatsbyImage: (props) => (
    <GatsbyImage alt={props.alt} image={getImage(props.image)} />
  )
};

const MdxPage = ({
  data: {
    mdx: {
      frontmatter: { title, embeddedImagesRemote, embeddedImagesLocal },
      body
    }
  }
}) => {
  return (
    <Fragment>
      <Link to="/">Back</Link>
      <h1>{title}</h1>
      <MDXProvider components={components}>
        <MDXRenderer
          remoteImages={transformImages(embeddedImagesRemote)}
          localImages={transformImages(embeddedImagesLocal)}
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
            gatsbyImageData(
              quality: 70
              layout: FULL_WIDTH
              width: 512
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        embeddedImagesLocal {
          childImageSharp {
            gatsbyImageData(
              quality: 70
              layout: FULL_WIDTH
              width: 512
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
      body
    }
  }
`;

export default MdxPage;
