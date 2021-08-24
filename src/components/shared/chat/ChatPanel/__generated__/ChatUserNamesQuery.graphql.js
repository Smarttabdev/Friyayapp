/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ChatUserNames_presenceQuery$ref = any;
export type ChatUserNamesQueryVariables = {|
  channel: string
|};
export type ChatUserNamesQueryResponse = {|
  +$fragmentRefs: ChatUserNames_presenceQuery$ref
|};
export type ChatUserNamesQuery = {|
  variables: ChatUserNamesQueryVariables,
  response: ChatUserNamesQueryResponse,
|};
*/


/*
query ChatUserNamesQuery(
  $channel: String!
) {
  ...ChatUserNames_presenceQuery_43Dw1G
}

fragment ChatUserNames_presenceQuery_43Dw1G on Query {
  channelPresences: channelFlag(channel: $channel, flag: "presence") {
    id
    channel
    users {
      id
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
  "kind": "Variable",
  "name": "channel",
  "variableName": "channel"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatUserNamesQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ChatUserNames_presenceQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChatUserNamesQuery",
    "selections": [
      {
        "alias": "channelPresences",
        "args": [
          (v1/*: any*/),
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
          (v2/*: any*/),
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
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "32c33319e999c7f81a5ac000c69bc863",
    "id": null,
    "metadata": {},
    "name": "ChatUserNamesQuery",
    "operationKind": "query",
    "text": "query ChatUserNamesQuery(\n  $channel: String!\n) {\n  ...ChatUserNames_presenceQuery_43Dw1G\n}\n\nfragment ChatUserNames_presenceQuery_43Dw1G on Query {\n  channelPresences: channelFlag(channel: $channel, flag: \"presence\") {\n    id\n    channel\n    users {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e911a859af3c45672a4f0286de906e26';

module.exports = node;
