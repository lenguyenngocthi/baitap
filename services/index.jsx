import { request, gql } from "graphql-request";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  //api trả về kết quả 
  return result.postsConnection.edges;
};

//get categories
// export const getCategories = async() => {
//   const query = gql`
//     query MyQuery {
//       categories {
//         name
//         slug
//       }
//     }
//   `;
//   const result = await request(graphqlAPI, query);
//   return result.categories;
// }


export const getCategories = async () => {
  const query = gql`
    query MyQuery {
      categories {
        slug
        name
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.categories;
}

// get recent post 
export const getRecentPosts = async () => {
  const query = gql`
    query MyQuery {
      posts(orderBy: createdAt_ASC, last: 3) {
        featuredImage {
          url
          createdAt
        }
        title
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts;
};

//get similar post
export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
};


//get Post detail 


export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.post
};