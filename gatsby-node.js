const { createRemoteFileNode } = require('gatsby-source-filesystem');

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, printTypeDefinitions } = actions;

  createTypes(`
    type Mdx implements Node {
      frontmatter: Frontmatter  
    }

    type Frontmatter @dontInfer {
      title: String!
      embeddedImagesRemote: [File] @link(from: "embeddedImagesRemote___NODE")
      embeddedImagesLocal: [File] @fileByRelativePath
    }
    `);

  printTypeDefinitions({ path: './typeDefs.txt' });
};

exports.onCreateNode = ({
  node,
  createNodeId,
  actions: { createNode, createNodeField, createParentChildLink },
  cache,
  store
}) => {
  if (node.internal.type === 'Mdx') {
    if (node.frontmatter && node.frontmatter.embeddedImagesRemote) {
      let collection = [];
      node.frontmatter.embeddedImagesRemote.map(async (item) => {
        let fileNode;
        try {
          fileNode = await createRemoteFileNode({
            url: item,
            parentNodeId: node.id,
            createNode,
            createNodeId,
            cache,
            store
          });
        } catch (error) {
          console.error(error);
        }
        if (fileNode) {
          collection.push(fileNode.id);
          node.frontmatter.embeddedImagesRemote___NODE = [...collection];
        }
      });
    }
  }
};
