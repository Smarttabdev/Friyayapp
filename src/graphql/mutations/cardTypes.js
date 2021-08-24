import { commitMutation } from 'Lib/relay';

export const updateCardTypes = ({ topicId, config, toolConfig }) =>
  commitMutation({
    mutation: graphql`
      mutation cardTypesUpdateCardTypesMutation(
        $topicId: ID!
        $config: JSON!
        $toolConfig: JSON!
      ) {
        updateCardTypes(
          input: { topicId: $topicId, config: $config, toolConfig: $toolConfig }
        ) {
          id
        }
      }
    `,
    vars: {
      topicId: toGid('Topic', topicId),
      config,
      toolConfig
    }
  });
