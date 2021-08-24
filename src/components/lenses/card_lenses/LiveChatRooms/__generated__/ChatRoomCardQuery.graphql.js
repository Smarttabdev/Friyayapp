/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ChatRoomCardQueryVariables = {|
  channel: string
|};
export type ChatRoomCardQueryResponse = {|
  +channelPresences: ?{|
    +id: string,
    +channel: string,
    +users: $ReadOnlyArray<{|
      +id: string,
      +avatarUrl: ?string,
    |}>,
  |}
|};
export type ChatRoomCardQuery = {|
  variables: ChatRoomCardQueryVariables,
  response: ChatRoomCardQueryResponse,
|};
*/


/*
query ChatRoomCardQuery(
  $channel: String!
) {
  channelPresences: channelFlag(channel: $channel, flag: "presence") {
    id
    channel
    users {
      id
      avatarUrl
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "channel"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": "channelPresences",
    "args": [
      {
        "kind": "Variable",
        "name": "channel",
        "variableName": "channel"
      },
      {
        "kind": "Literal",
        "name": "flag",
        "value": "presence"
      }
    ],
    "concreteType": "ChannelFlag",
    "kind": "LinkedField",
    "name": "channelFlag",
    "plural": false,
    "selections": [
      (v1/*: any*/),
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "avatarUrl",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatRoomCardQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChatRoomCardQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "a3406a8d1f219d4a52a2f3083e180d98",
    "id": null,
    "metadata": {},
    "name": "ChatRoomCardQuery",
    "operationKind": "query",
    "text": "query ChatRoomCardQuery(\n  $channel: String!\n) {\n  channelPresences: channelFlag(channel: $channel, flag: \"presence\") {\n    id\n    channel\n    users {\n      id\n      avatarUrl\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0107e46ebdaed192d345833b6f004356';

module.exports = node;
