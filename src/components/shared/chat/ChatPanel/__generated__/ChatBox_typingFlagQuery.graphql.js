/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ChatBox_typingFlagQuery$ref: FragmentReference;
declare export opaque type ChatBox_typingFlagQuery$fragmentType: ChatBox_typingFlagQuery$ref;
export type ChatBox_typingFlagQuery = {|
  +typingFlag: ?{|
    +id: string,
    +channel: string,
    +users: $ReadOnlyArray<{|
      +id: string,
      +name: string,
    |}>,
  |},
  +$refType: ChatBox_typingFlagQuery$ref,
|};
export type ChatBox_typingFlagQuery$data = ChatBox_typingFlagQuery;
export type ChatBox_typingFlagQuery$key = {
  +$data?: ChatBox_typingFlagQuery$data,
  +$fragmentRefs: ChatBox_typingFlagQuery$ref,
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
  "name": "ChatBox_typingFlagQuery",
  "selections": [
    {
      "alias": "typingFlag",
      "args": [
        {
          "kind": "Variable",
          "name": "channel",
          "variableName": "channel"
        },
        {
          "kind": "Literal",
          "name": "flag",
          "value": "typing"
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
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
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
(node/*: any*/).hash = '175c948bf57f3bde22037531343fb0fc';

module.exports = node;
