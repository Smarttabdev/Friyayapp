/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ChatUserNames_presenceQuery$ref: FragmentReference;
declare export opaque type ChatUserNames_presenceQuery$fragmentType: ChatUserNames_presenceQuery$ref;
export type ChatUserNames_presenceQuery = {|
  +channelPresences: ?{|
    +id: string,
    +channel: string,
    +users: $ReadOnlyArray<{|
      +id: string
    |}>,
  |},
  +$refType: ChatUserNames_presenceQuery$ref,
|};
export type ChatUserNames_presenceQuery$data = ChatUserNames_presenceQuery;
export type ChatUserNames_presenceQuery$key = {
  +$data?: ChatUserNames_presenceQuery$data,
  +$fragmentRefs: ChatUserNames_presenceQuery$ref,
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
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "channel"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChatUserNames_presenceQuery",
  "selections": [
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
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '7f3dc7aa860fd2124d45d9b4f82f0e62';

module.exports = node;
