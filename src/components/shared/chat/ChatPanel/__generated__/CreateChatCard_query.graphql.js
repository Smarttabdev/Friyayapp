/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CreateChatCard_query$ref: FragmentReference;
declare export opaque type CreateChatCard_query$fragmentType: CreateChatCard_query$ref;
export type CreateChatCard_query = {|
  +defaultTopic: {|
    +id: string,
    +title: string,
  |},
  +currentTopic?: ?{|
    +id: string,
    +title: string,
  |},
  +$refType: CreateChatCard_query$ref,
|};
export type CreateChatCard_query$data = CreateChatCard_query;
export type CreateChatCard_query$key = {
  +$data?: CreateChatCard_query$data,
  +$fragmentRefs: CreateChatCard_query$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "title",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "hasTopic"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "topicId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CreateChatCard_query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Topic",
      "kind": "LinkedField",
      "name": "defaultTopic",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "condition": "hasTopic",
      "kind": "Condition",
      "passingValue": true,
      "selections": [
        {
          "alias": "currentTopic",
          "args": [
            {
              "kind": "Variable",
              "name": "id",
              "variableName": "topicId"
            }
          ],
          "concreteType": "Topic",
          "kind": "LinkedField",
          "name": "topic",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ]
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f76d5108003a0d31b50e4f3fbf8b9db8';

module.exports = node;
