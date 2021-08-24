/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type channelsUpdateChannelFlagMutationVariables = {|
  channel: string,
  flag: string,
  active: boolean,
|};
export type channelsUpdateChannelFlagMutationResponse = {|
  +updateChannelFlag: ?{|
    +channelFlag: ?{|
      +id: string,
      +channel: string,
      +users: $ReadOnlyArray<{|
        +id: string
      |}>,
    |}
  |}
|};
export type channelsUpdateChannelFlagMutation = {|
  variables: channelsUpdateChannelFlagMutationVariables,
  response: channelsUpdateChannelFlagMutationResponse,
|};
*/


/*
mutation channelsUpdateChannelFlagMutation(
  $channel: String!
  $flag: String!
  $active: Boolean!
) {
  updateChannelFlag(input: {channel: $channel, flag: $flag, active: $active}) {
    channelFlag {
      id
      channel
      users {
        id
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "active"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "channel"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "flag"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "active",
            "variableName": "active"
          },
          {
            "kind": "Variable",
            "name": "channel",
            "variableName": "channel"
          },
          {
            "kind": "Variable",
            "name": "flag",
            "variableName": "flag"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "UpdateChannelFlagPayload",
    "kind": "LinkedField",
    "name": "updateChannelFlag",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ChannelFlag",
        "kind": "LinkedField",
        "name": "channelFlag",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "channel",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "users",
            "plural": true,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "channelsUpdateChannelFlagMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "channelsUpdateChannelFlagMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "0c095f278f390247d52bfea59eb09d9b",
    "id": null,
    "metadata": {},
    "name": "channelsUpdateChannelFlagMutation",
    "operationKind": "mutation",
    "text": "mutation channelsUpdateChannelFlagMutation(\n  $channel: String!\n  $flag: String!\n  $active: Boolean!\n) {\n  updateChannelFlag(input: {channel: $channel, flag: $flag, active: $active}) {\n    channelFlag {\n      id\n      channel\n      users {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a2bfc90888195339aa8a6279e513139f';

module.exports = node;
