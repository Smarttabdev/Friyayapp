/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ChatUserNames_chat$ref: FragmentReference;
declare export opaque type ChatUserNames_chat$fragmentType: ChatUserNames_chat$ref;
export type ChatUserNames_chat = {|
  +id: string,
  +user: {|
    +id: string,
    +name: string,
    +username: string,
  |},
  +private: ?boolean,
  +sharePublic: boolean,
  +shareFollowing: boolean,
  +shareSettings: ?$ReadOnlyArray<{|
    +sharingObjectType: ?string,
    +sharingObjectId: ?string,
  |}>,
  +$refType: ChatUserNames_chat$ref,
|};
export type ChatUserNames_chat$data = ChatUserNames_chat;
export type ChatUserNames_chat$key = {
  +$data?: ChatUserNames_chat$data,
  +$fragmentRefs: ChatUserNames_chat$ref,
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
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChatUserNames_chat",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
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
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "private",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sharePublic",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "shareFollowing",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ShareSetting",
      "kind": "LinkedField",
      "name": "shareSettings",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "sharingObjectType",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "sharingObjectId",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Tip",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '415f4337601a0ef59f37fb540eb2cf4e';

module.exports = node;
