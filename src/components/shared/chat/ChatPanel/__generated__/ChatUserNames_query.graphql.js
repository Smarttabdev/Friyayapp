/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ChatUserNames_query$ref: FragmentReference;
declare export opaque type ChatUserNames_query$fragmentType: ChatUserNames_query$ref;
export type ChatUserNames_query = {|
  +users: ?$ReadOnlyArray<{|
    +id: string,
    +name: string,
    +username: string,
  |}>,
  +groups: ?$ReadOnlyArray<{|
    +id: string,
    +title: ?string,
    +userFollowers: $ReadOnlyArray<{|
      +id: string,
      +name: string,
      +username: string,
    |}>,
  |}>,
  +onlinePresences: ?{|
    +id: string,
    +channel: string,
    +users: $ReadOnlyArray<{|
      +id: string
    |}>,
  |},
  +$refType: ChatUserNames_query$ref,
|};
export type ChatUserNames_query$data = ChatUserNames_query;
export type ChatUserNames_query$key = {
  +$data?: ChatUserNames_query$data,
  +$fragmentRefs: ChatUserNames_query$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
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
    "name": "username",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChatUserNames_query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "users",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Group",
      "kind": "LinkedField",
      "name": "groups",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "userFollowers",
          "plural": true,
          "selections": (v1/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "onlinePresences",
      "args": [
        {
          "kind": "Literal",
          "name": "channel",
          "value": "domain"
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
        (v0/*: any*/),
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
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": "channelFlag(channel:\"domain\",flag:\"presence\")"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd0b4f3f7e80751d633dcd1a189300a09';

module.exports = node;
