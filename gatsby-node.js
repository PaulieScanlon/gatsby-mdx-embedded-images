const { createRemoteFileNode } = require('gatsby-source-filesystem');

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, printTypeDefinitions } = actions;

  createTypes(`
    type Mdx implements Node {
      frontmatter: Frontmatter
    }

    type Frontmatter @dontInfer {
      title: String!
      embeddedImagesRemote: [File] @link(by: "url")
      embeddedImagesLocal: [File] @fileByRelativePath
    }
    `);

  printTypeDefinitions({ path: './typeDefs.txt' });
};

exports.onCreateNode = ({
  node,
  createNodeId,
  actions: { createNode },
  cache,
  store
}) => {
  if (
    node.internal.type === 'Mdx' &&
    node.frontmatter &&
    node.frontmatter.embeddedImagesRemote
  ) {
    return Promise.all(
      node.frontmatter.embeddedImagesRemote.map((url) => {
        try {
          return createRemoteFileNode({
            url,
            parentNodeId: node.id,
            createNode,
            createNodeId,
            cache,
            store
          });
        } catch (error) {
          console.error(error);
        }
      })
    );
  }
};
