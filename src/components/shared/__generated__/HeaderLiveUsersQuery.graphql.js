/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type HeaderLiveUsersQueryVariables = {|
  channel: string
|};
export type HeaderLiveUsersQueryResponse = {|
  +channelPresences: ?{|
    +id: string,
    +channel: string,
    +users: $ReadOnlyArray<{|
      +id: string
    |}>,
  |}
|};
export type HeaderLiveUsersQuery = {|
  variables: HeaderLiveUsersQueryVariables,
  response: HeaderLiveUsersQueryResponse,
|};
*/


/*
query HeaderLiveUsersQuery(
  $channel: String!
) {
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
          (v1/*: any*/)
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
    "name": "HeaderLiveUsersQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HeaderLiveUsersQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "f54eff31b114ce76a8cb550594877107",
    "id": null,
    "metadata": {},
    "name": "HeaderLiveUsersQuery",
    "operationKind": "query",
    "text": "query HeaderLiveUsersQuery(\n  $channel: String!\n) {\n  channelPresences: channelFlag(channel: $channel, flag: \"presence\") {\n    id\n    channel\n    users {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6fa758b144bcc7ef68362db654e0e844';

module.exports = node;
