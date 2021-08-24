/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LiveVideoRoomCardQueryVariables = {|
  channel: string
|};
export type LiveVideoRoomCardQueryResponse = {|
  +channelPresences: ?{|
    +id: string,
    +channel: string,
    +users: $ReadOnlyArray<{|
      +id: string,
      +name: string,
      +avatarUrl: ?string,
    |}>,
  |}
|};
export type LiveVideoRoomCardQuery = {|
  variables: LiveVideoRoomCardQueryVariables,
  response: LiveVideoRoomCardQueryResponse,
|};
*/


/*
query LiveVideoRoomCardQuery(
  $channel: String!
) {
  channelPresences: channelFlag(channel: $channel, flag: "presence") {
    id
    channel
    users {
      id
      name
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
            "name": "name",
            "storageKey": null
          },
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
    "name": "LiveVideoRoomCardQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LiveVideoRoomCardQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "599ef869e574731816b0ac052cadcb46",
    "id": null,
    "metadata": {},
    "name": "LiveVideoRoomCardQuery",
    "operationKind": "query",
    "text": "query LiveVideoRoomCardQuery(\n  $channel: String!\n) {\n  channelPresences: channelFlag(channel: $channel, flag: \"presence\") {\n    id\n    channel\n    users {\n      id\n      name\n      avatarUrl\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '85c9b0964cbdff794e7bbe1cde635114';

module.exports = node;
