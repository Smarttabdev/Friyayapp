import { commitMutation } from 'Lib/relay';

export const updateChannelFlag = ({ channel, flag, active }) =>
  commitMutation({
    mutation: graphql`
      mutation channelsUpdateChannelFlagMutation(
        $channel: String!
        $flag: String!
        $active: Boolean!
      ) {
        updateChannelFlag(
          input: { channel: $channel, flag: $flag, active: $active }
        ) {
          channelFlag {
            id
            channel
            users {
              id
            }
          }
        }
      }
    `,
    vars: { channel, flag, active }
  });
